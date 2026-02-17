"use client";

import { useState, useEffect, Fragment } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  RefreshCw,
  Users,
  ChevronDown,
  ChevronUp,
  MapPin,
  MoreVertical,
  Globe,
  Smartphone,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------- Types ---------- */
type UIStatus = "new" | "contacted" | "scheduled" | "converted" | "lost";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment?: string;
  procedure?: string; // Alias for treatment
  city?: string; // PIN Code
  consent: boolean;
  source?: string;
  formName?: string;
  pageUrl?: string;
  userAgent?: string;
  status: string;
  telecrmSynced?: boolean;
  telecrmId?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

/* ---------- Treatment Options (from your form) ---------- */
const TREATMENT_OPTIONS = [
  "Hair Loss",
  "Alopecia Areata",
  "Dandruff",
  "Baldness",
  "Hair Thinning Treatment",
  "Receding Hair Solutions",
  "Genetic Hair Loss"
];

/* ---------- Helpers ---------- */
const dbToUIStatus = (v?: string): UIStatus => {
  const status = v?.toLowerCase() as UIStatus;
  return status === "error" ? "new" : (status ?? "new");
};

const uiToDbStatus = (v: UIStatus) => v.toUpperCase();

const safe = (v?: string) => (v ? v.toLowerCase() : "");

/* ---------- Component ---------- */
export default function LeadsTable({
  initialLeads = [],
  autoRefresh = false,
  refreshInterval = 30000,
}: {
  initialLeads?: Lead[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [treatmentFilter, setTreatmentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [syncFilter, setSyncFilter] = useState("all");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => setIsClient(true), []);

  /* ---------- Fetch Leads ---------- */
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact-form");
      const data = await res.json();
      if (res.ok) {
        setLeads(data.leads || []);
      } else {
        setLeads([]);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchLeads, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  /* ---------- Sorting ---------- */
  const handleSort = (key: keyof Lead) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    if (sortConfig.key === "createdAt" || sortConfig.key === "updatedAt") {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
    } else {
      aVal = (aVal ?? "").toString().toLowerCase();
      bVal = (bVal ?? "").toString().toLowerCase();
    }
    
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  /* ---------- Filters ---------- */
  const isWithinDateRange = (date: string, range: string) => {
    const d = new Date(date);
    const now = new Date();
    if (range === "today") return d.toDateString() === now.toDateString();
    if (range === "week") {
      const w = new Date(now);
      w.setDate(now.getDate() - 7);
      return d >= w;
    }
    if (range === "month") {
      const m = new Date(now);
      m.setMonth(now.getMonth() - 1);
      return d >= m;
    }
    return true;
  };

  const filteredLeads = sortedLeads.filter((l) => {
    const uiStatus = dbToUIStatus(l.status);
    
    const matchesSearch =
      safe(l.name).includes(safe(searchTerm)) ||
      safe(l.phone).includes(safe(searchTerm)) ||
      safe(l.email).includes(safe(searchTerm)) ||
      safe(l.treatment || l.procedure).includes(safe(searchTerm)) ||
      safe(l.city).includes(safe(searchTerm));
    
    const matchesStatus = statusFilter === "all" || uiStatus === statusFilter;
    
    const matchesTreatment =
      treatmentFilter === "all" || 
      l.treatment === treatmentFilter || 
      l.procedure === treatmentFilter;
    
    const matchesDate =
      dateFilter === "all" || isWithinDateRange(l.createdAt, dateFilter);
    
    const matchesSync =
      syncFilter === "all" ||
      (syncFilter === "synced" && l.telecrmSynced === true) ||
      (syncFilter === "unsynced" && l.telecrmSynced === false);
    
    return (
      matchesSearch && 
      matchesStatus && 
      matchesTreatment && 
      matchesDate && 
      matchesSync
    );
  });

  /* ---------- UI Helpers ---------- */
  const getStatusBadge = (status: UIStatus) => {
    const map = {
      new: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400",
      scheduled: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400",
      converted: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400",
      lost: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400",
    } as const;
    
    return (
      <Badge variant="outline" className={`${map[status]} border font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSyncBadge = (synced?: boolean, error?: string) => {
    if (error) {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400">
          <XCircle className="h-3 w-3 mr-1" />
          Failed
        </Badge>
      );
    }
    if (synced) {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="h-3 w-3 mr-1" />
          Synced
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400">
        Pending
      </Badge>
    );
  };

  const formatDate = (d: string) => {
    if (!isClient || !d) return { date: "", time: "" };
    const dt = new Date(d);
    return {
      date: dt.toLocaleDateString("en-IN", {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      time: dt.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }),
    };
  };

  const toggleLeadExpansion = (id: string) =>
    setExpandedLead((c) => (c === id ? null : id));

  /* ---------- Actions ---------- */
  const updateLeadStatus = async (id: string, status: UIStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: uiToDbStatus(status) }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === id ? { ...l, status: uiToDbStatus(status) } : l
          )
        );
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  const handleCall = (p?: string) => p && window.open(`tel:${p}`, "_self");
  const handleEmail = (e?: string) => e && window.open(`mailto:${e}`, "_self");
  const handleOpenUrl = (url?: string) => url && window.open(url, "_blank");

  const exportToCSV = () => {
    const headers = [
      "Name", "Phone", "Email", "Treatment", "PIN Code", 
      "Status", "Form Name", "Source", "Page URL", "Created At", "TeleCRM Synced"
    ];
    
    const rows = filteredLeads.map((l) => [
      l.name ?? "",
      l.phone ?? "",
      l.email ?? "",
      l.treatment || l.procedure || "",
      l.city ?? "",
      dbToUIStatus(l.status).toUpperCase(),
      l.formName ?? "",
      l.source ?? "",
      l.pageUrl ?? "",
      isClient ? new Date(l.createdAt).toLocaleString("en-IN") : l.createdAt,
      l.telecrmSynced ? "Yes" : "No",
    ]);
    
    const csv = [headers, ...rows].map((r) => 
      r.map(cell => `"${cell}"`).join(",")
    ).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uniqueFormNames = Array.from(
    new Set(leads.map((l) => l.formName).filter(Boolean))
  );

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-2 sm:p-3 md:p-4 lg:p-6">
      <Card className="border-0 sm:border shadow-none sm:shadow-sm dark:bg-gray-900 dark:border-gray-800">
        <CardHeader className="px-3 py-4 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white">
                    Leads Management
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base dark:text-gray-400">
                    Manage and track website appointment requests
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={fetchLeads}
                    disabled={loading}
                    size="sm"
                    className="flex-1 sm:flex-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 ${
                        loading ? "animate-spin" : ""
                      }`}
                    />
                    <span className="hidden xs:inline">
                      {loading ? "Refreshing..." : "Refresh"}
                    </span>
                    <span className="xs:hidden">Refresh</span>
                  </Button>
                  <Button
                    onClick={exportToCSV}
                    size="sm"
                    className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    <span className="hidden xs:inline">Export CSV</span>
                    <span className="xs:hidden">Export</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-6 gap-3 p-3 sm:p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border dark:border-gray-700">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search name, phone, email, treatment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm h-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                />
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-10 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
                  <SelectTrigger className="h-10 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <span className="truncate">Treatment</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="all">All Treatments</SelectItem>
                    {TREATMENT_OPTIONS.map((treatment) => (
                      <SelectItem key={treatment} value={treatment}>
                        {treatment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={syncFilter} onValueChange={setSyncFilter}>
                  <SelectTrigger className="h-10 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Sync Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="all">All Sync</SelectItem>
                    <SelectItem value="synced">Synced</SelectItem>
                    <SelectItem value="unsynced">Not Synced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="h-10 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Date</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Leads</p>
                <p className="text-xl font-bold dark:text-white">{leads.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">Today</p>
                <p className="text-xl font-bold dark:text-white">
                  {leads.filter(l => isWithinDateRange(l.createdAt, "today")).length}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">This Week</p>
                <p className="text-xl font-bold dark:text-white">
                  {leads.filter(l => isWithinDateRange(l.createdAt, "week")).length}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">Synced</p>
                <p className="text-xl font-bold dark:text-white">
                  {leads.filter(l => l.telecrmSynced).length}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-3 sm:px-6 pb-6">
          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-3">
            {filteredLeads.length === 0 && !loading ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No leads found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm">
                  {searchTerm || statusFilter !== "all" || treatmentFilter !== "all" || dateFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No appointment requests have been submitted yet"}
                </p>
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const uiStatus = dbToUIStatus(lead.status);
                const d = formatDate(lead.createdAt);
                return (
                  <Card key={lead.id} className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <div
                      className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      onClick={() => toggleLeadExpansion(lead.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg dark:text-white truncate max-w-[200px]">
                            {lead.name || "Unknown"}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(uiStatus)}
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {d.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCall(lead.phone);
                            }}
                            className="h-8 w-8 dark:text-gray-400 dark:hover:text-white"
                            disabled={!lead.phone}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmail(lead.email);
                            }}
                            className="h-8 w-8 dark:text-gray-400 dark:hover:text-white"
                            disabled={!lead.email}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="dark:text-gray-300">{lead.phone || "-"}</span>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="truncate dark:text-gray-300">{lead.email}</span>
                          </div>
                        )}
                        {lead.treatment && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium dark:text-gray-300">Treatment:</span>
                            <span className="dark:text-gray-300">{lead.treatment}</span>
                          </div>
                        )}
                        {lead.city && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="dark:text-gray-300">PIN: {lead.city}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          {getSyncBadge(lead.telecrmSynced, lead.error)}
                        </div>
                      </div>
                    </div>
                    {expandedLead === lead.id && (
                      <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2 dark:text-white">Additional Details</h4>
                            <div className="grid grid-cols-1 gap-3 text-sm">
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-400">Form Name</p>
                                <p className="text-gray-600 dark:text-gray-300">{lead.formName || "website leads"}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-400">Source</p>
                                <p className="text-gray-600 dark:text-gray-300">{lead.source || "-"}</p>
                              </div>
                              {lead.pageUrl && (
                                <div>
                                  <p className="font-medium text-gray-700 dark:text-gray-400">Page URL</p>
                                  <Button
                                    variant="link"
                                    className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400"
                                    onClick={() => handleOpenUrl(lead.pageUrl)}
                                  >
                                    <Globe className="h-3 w-3 mr-1" />
                                    View Page
                                  </Button>
                                </div>
                              )}
                              {lead.userAgent && (
                                <div>
                                  <p className="font-medium text-gray-700 dark:text-gray-400">Device</p>
                                  <p className="text-gray-600 dark:text-gray-300 text-xs truncate">
                                    <Smartphone className="h-3 w-3 inline mr-1" />
                                    {lead.userAgent.substring(0, 50)}...
                                  </p>
                                </div>
                              )}
                              {lead.error && (
                                <div>
                                  <p className="font-medium text-red-600 dark:text-red-400">Error</p>
                                  <p className="text-xs text-red-600 dark:text-red-400">{lead.error}</p>
                                </div>
                              )}
                              {lead.telecrmId && (
                                <div>
                                  <p className="font-medium text-gray-700 dark:text-gray-400">TeleCRM ID</p>
                                  <p className="text-gray-600 dark:text-gray-300 text-xs">{lead.telecrmId}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline" className="w-full dark:bg-gray-800 dark:border-gray-700">
                                <MoreVertical className="h-4 w-4 mr-2" />
                                Update Status
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                              {["new","contacted","scheduled","converted","lost"].map((s) => (
                                <DropdownMenuItem
                                  key={s}
                                  onClick={() => updateLeadStatus(lead.id, s as UIStatus)}
                                  className="dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block border rounded-lg overflow-hidden dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                  <tr>
                    <th
                      className="px-4 py-3 text-left cursor-pointer min-w-[140px] dark:text-gray-300"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sortConfig?.key === "name" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left min-w-[160px] dark:text-gray-300">Contact</th>
                    <th className="px-4 py-3 text-left min-w-[180px] dark:text-gray-300">Treatment</th>
                    <th className="px-4 py-3 text-left min-w-[100px] dark:text-gray-300">PIN Code</th>
                    <th className="px-4 py-3 text-left min-w-[100px] dark:text-gray-300">Sync</th>
                    <th className="px-4 py-3 text-left min-w-[100px] dark:text-gray-300">Status</th>
                    <th
                      className="px-4 py-3 text-left cursor-pointer min-w-[140px] dark:text-gray-300"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center gap-1">
                        Created
                        {sortConfig?.key === "createdAt" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left min-w-[100px] dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center dark:text-gray-400">
                        <RefreshCw className="h-4 w-4 mr-2 inline animate-spin" />
                        Loading leads…
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center dark:text-gray-400">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const uiStatus = dbToUIStatus(lead.status);
                      const d = formatDate(lead.createdAt);
                      const treatment = lead.treatment || lead.procedure;
                      
                      return (
                        <Fragment key={lead.id}>
                          <tr
                            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                            onClick={() => toggleLeadExpansion(lead.id)}
                          >
                            <td className="px-4 py-3">
                              <div className="font-medium dark:text-white">{lead.name || "Unknown"}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                  <span className="font-medium dark:text-gray-300">{lead.phone || "-"}</span>
                                </div>
                                {lead.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                    <span className="truncate max-w-[180px] dark:text-gray-300">{lead.email}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="dark:text-gray-300">{treatment || "-"}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="dark:text-gray-300">{lead.city || "-"}</span>
                            </td>
                            <td className="px-4 py-3">
                              {getSyncBadge(lead.telecrmSynced, lead.error)}
                            </td>
                            <td className="px-4 py-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <div>{getStatusBadge(uiStatus)}</div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="dark:bg-gray-800 dark:border-gray-700">
                                  {["new","contacted","scheduled","converted","lost"].map((s) => (
                                    <DropdownMenuItem
                                      key={s}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateLeadStatus(lead.id, s as UIStatus);
                                      }}
                                      className="dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                      {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col">
                                <span className="dark:text-gray-300">{d.date}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{d.time}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCall(lead.phone);
                                  }}
                                  disabled={!lead.phone}
                                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEmail(lead.email);
                                  }}
                                  disabled={!lead.email}
                                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                >
                                  <Mail className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          {expandedLead === lead.id && (
                            <tr className="bg-gray-50 dark:bg-gray-800/50">
                              <td colSpan={8} className="p-4">
                                <div className="grid grid-cols-3 gap-6">
                                  <div>
                                    <h4 className="font-medium mb-3 dark:text-white">Lead Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <span className="font-medium text-gray-600 dark:text-gray-400">Source:</span>{" "}
                                        <span className="dark:text-gray-300">{lead.source || "-"}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600 dark:text-gray-400">Form Name:</span>{" "}
                                        <span className="dark:text-gray-300">{lead.formName || "website leads"}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600 dark:text-gray-400">Consent:</span>{" "}
                                        <span className="dark:text-gray-300">{lead.consent ? "Yes" : "No"}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-3 dark:text-white">Page Information</h4>
                                    <div className="space-y-2 text-sm">
                                      {lead.pageUrl && (
                                        <div>
                                          <span className="font-medium text-gray-600 dark:text-gray-400">Page URL:</span>{" "}
                                          <Button
                                            variant="link"
                                            className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400"
                                            onClick={() => handleOpenUrl(lead.pageUrl)}
                                          >
                                            View Page
                                          </Button>
                                        </div>
                                      )}
                                      {lead.userAgent && (
                                        <div>
                                          <span className="font-medium text-gray-600 dark:text-gray-400">Device:</span>{" "}
                                          <span className="dark:text-gray-300 text-xs">
                                            {lead.userAgent.substring(0, 60)}...
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-3 dark:text-white">System Info</h4>
                                    <div className="space-y-2 text-sm">
                                      {lead.telecrmId && (
                                        <div>
                                          <span className="font-medium text-gray-600 dark:text-gray-400">TeleCRM ID:</span>{" "}
                                          <span className="dark:text-gray-300">{lead.telecrmId}</span>
                                        </div>
                                      )}
                                      {lead.error && (
                                        <div>
                                          <span className="font-medium text-red-600 dark:text-red-400">Error:</span>{" "}
                                          <span className="text-red-600 dark:text-red-400 text-xs">{lead.error}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Summary for filtered results */}
          {filteredLeads.length > 0 && !loading && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredLeads.length} of {leads.length} leads
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}