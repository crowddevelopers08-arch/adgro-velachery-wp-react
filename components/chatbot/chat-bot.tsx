'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  branding,
  locale,
  nextQuestionId,
  questionById,
  questions,
  PHONE_QUESTION_ID,
  type Question,
} from './bot-config';

type Entry = {
  kind: 'bot' | 'answer';
  id: string;
  /** Rich-text HTML for bot bubbles, plain text for answers. */
  body: string;
  at: number;
};

const TYPING_MS = 900;

/** locale.justNow / minutesAgo / hoursAgo / daysAgo */
function relativeTime(at: number, now: number) {
  const s = Math.max(0, Math.floor((now - at) / 1000));
  if (s < 60) return locale.justNow;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}${locale.minutesAgo}`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}${locale.hoursAgo}`;
  return `${Math.floor(h / 24)}${locale.daysAgo}`;
}

/** Avatar shows on the first bubble of each consecutive bot group. */
const showAvatarAt = (i: number, list: Entry[]) =>
  list[i].kind === 'bot' && (i === 0 || list[i - 1].kind === 'answer');

/** Timestamp shows on answers and on the last bubble of a bot group. */
const showTimestampAt = (i: number, list: Entry[]) =>
  list[i].kind === 'answer' || i === list.length - 1 || list[i + 1].kind === 'answer';

export default function ChatBot() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentId, setCurrentId] = useState<string>(questions[0].id);
  const [typing, setTyping] = useState(true);
  const [draft, setDraft] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const scrollRef = useRef<HTMLDivElement>(null);
  const formDataRef = useRef<Record<string, string | string[]>>({});
  const current = questionById.get(currentId) as Question;

  // Reveal the active question after a typing pause, the way the widget does.
  useEffect(() => {
    setTyping(true);
    setDraft('');
    setChecked([]);
    setError(false);

    const timer = setTimeout(() => {
      setTyping(false);
      setEntries((prev) =>
        prev.some((e) => e.kind === 'bot' && e.id === current.id)
          ? prev
          : [...prev, { kind: 'bot', id: current.id, body: current.label, at: Date.now() }],
      );
    }, TYPING_MS);

    return () => clearTimeout(timer);
  }, [current]);

  // Statements carry no input — they auto-advance once shown.
  useEffect(() => {
    if (typing || current.type !== 'statement') return;
    const timer = setTimeout(() => {
      const next = nextQuestionId(current.id);
      if (next) setCurrentId(next);
    }, 700);
    return () => clearTimeout(timer);
  }, [typing, current]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [entries, typing]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  /** Sends the completed conversation to the DB + TeleCRM once the phone number is captured. */
  const submitLead = useCallback((phone: string) => {
    const data = formDataRef.current;
    const payload = {
      name: (data.name as string) || '',
      phone,
      concerns: Array.isArray(data.concerns) ? data.concerns : [],
      hairLossStage: (data.hairLossStage as string) || '',
      city: (data.city as string) || '',
      willingToVisit: (data.willingToVisit as string) || '',
      consent: true,
      source: 'Adgro Hair Velachery Chatbot',
      formName: 'Adgro Chatbot',
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    };

    fetch('/api/chatbot-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.error('Chatbot lead submission failed:', err);
    });
  }, []);

  const answer = useCallback(
    (text: string, next: string | undefined, rawValue?: string | string[]) => {
      setEntries((prev) => [
        ...prev,
        { kind: 'answer', id: `${currentId}-a`, body: text, at: Date.now() },
      ]);
      if ('field' in current && current.field) {
        formDataRef.current[current.field] = rawValue ?? text;
      }
      if (next) setCurrentId(next);
    },
    [currentId, current],
  );

  function submitText() {
    const value = draft.trim();
    if (!value) return;

    if (current.type === 'number') {
      const digits = value.replace(/\D/g, '');
      if (digits.length < current.min || digits.length > current.max) {
        setError(true);
        return;
      }
    }

    if (current.id === PHONE_QUESTION_ID) {
      submitLead(value);
    }

    answer(value, nextQuestionId(current.id));
  }

  function restart() {
    formDataRef.current = {};
    setEntries([]);
    setCurrentId(questions[0].id);
  }

  const lastIndex = entries.length - 1;
  const showComposer = !typing && (current.type === 'text' || current.type === 'number');
  const answered = useMemo(
    () => entries.some((e) => e.kind === 'answer' && e.id === `${currentId}-a`),
    [entries, currentId],
  );

  const avatarStyle = { backgroundImage: `url(${branding.avatar})` };
  const richTextClass =
    '[&_p]:my-2.5 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_p:empty]:h-5 [&_strong]:font-bold';

  return (
    /* #root — only absolutely-positioned children; it fills exactly the
       height its parent gives it, so the conversation scrolls inside it
       instead of the page. */
    <div className="relative h-full min-h-0 text-left">
      <style>{`
        @keyframes agrohairChatbotBubbleIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes agrohairChatbotLoaderDot {
          0%, 60%, 100% { opacity: 0.4; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        .agrohair-chatbot-bubble-in { animation: agrohairChatbotBubbleIn 0.25s ease-out both; }
        .agrohair-chatbot-loader-dot { animation: agrohairChatbotLoaderDot 1s infinite ease-in-out; }
      `}</style>

      <button
        type="button"
        onClick={restart}
        aria-label={locale.restart}
        title={locale.restart}
        className="absolute top-2.5 right-2.5 z-[999] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border-none bg-[#dc2626] outline-none"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[15px] w-[15px] text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 12a8 8 0 1 1-2.7-6" />
          <path d="M20 3v5h-5" />
        </svg>
      </button>

      {/* .fixed-height — the scroll region */}
      <div
        ref={scrollRef}
        className="absolute top-0 right-0 bottom-0 w-full overflow-y-auto pt-[55px] pb-[25px]"
      >
        {/* .chatbox — the 550px conversation column */}
        <div className="mx-auto mb-10 max-w-[550px] px-[15px] py-5">
        {entries.map((entry, i) => {
          const stamp = showTimestampAt(i, entries) && (
            <div
              className={`text-[12px] text-[#b0bec5] ${
                entry.kind === 'answer' ? 'float-right pr-px' : 'pl-px'
              }`}
            >
              {relativeTime(entry.at, now)}
            </div>
          );

          if (entry.kind === 'answer') {
            return (
              <div key={`${entry.id}-${i}`} className="my-5 mb-[25px] max-w-full overflow-hidden">
                <div className="float-right max-w-full agrohair-chatbot-bubble-in">
                  <div className="ml-auto table rounded-[1.3em] bg-[#dc2626] px-[17px] py-2.5 text-[15.5px] leading-5 break-words text-white">
                    {entry.body}
                  </div>
                  {stamp}
                </div>
              </div>
            );
          }

          // The active question renders its options inside its own bubble.
          const isLive = entry.id === currentId && i === lastIndex && !answered;

          return (
            <div key={`${entry.id}-${i}`} className="mb-2 max-w-full overflow-hidden">
              <div className="mr-2.5 inline-block h-9 w-9 max-w-[10%] align-top">
                {showAvatarAt(i, entries) && (
                  <div
                    className="h-9 w-9 rounded-full bg-[#dc2626] bg-[length:36px] bg-center bg-no-repeat"
                    style={avatarStyle}
                    aria-hidden
                  />
                )}
              </div>

              <div className="inline-block max-w-[86%] overflow-hidden align-top">
                <div className="table agrohair-chatbot-bubble-in rounded-[1.3em] bg-[#f8f8f8] px-[17px] py-2.5 leading-5">
                  <div
                    className={`${richTextClass} text-[15.5px] font-normal break-words text-[#455a64]`}
                    dangerouslySetInnerHTML={{ __html: entry.body }}
                  />

                  {/* Single choice */}
                  {isLive && current.type === 'option' && (
                    <div className="mt-[5px] overflow-x-hidden">
                      {current.options.map((option) => (
                        <div
                          key={option}
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            answer(
                              option,
                              current.conditions.find((c) => c.val === option)?.next ??
                                nextQuestionId(current.id),
                              option,
                            )
                          }
                          className="relative m-[5px] inline-block cursor-pointer rounded-[1.3em] border border-[#dc2626] bg-white py-2.5 pr-3.5 pl-8 text-[15.5px] leading-5 text-[#180109]"
                        >
                          <span className="absolute top-[15px] left-3 h-3 w-3 rounded-full bg-[#e1e1e1]" />
                          {option}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Multi select + Confirm footer, both inside this bubble */}
                  {isLive && current.type === 'multioption' && (
                    <div>
                      <div className="mt-[5px]">
                        {current.options.map((option) => {
                          const on = checked.includes(option);
                          return (
                            <label
                              key={option}
                              className="relative m-[5px] inline-block cursor-pointer rounded-[1.3em] border border-[#dc2626] bg-white py-2.5 pr-3.5 pl-8 text-[15.5px] leading-5 text-[#180109] select-none"
                            >
                              <span className="relative block">
                                {option}
                                <input
                                  type="checkbox"
                                  checked={on}
                                  onChange={() =>
                                    setChecked((prev) =>
                                      on ? prev.filter((v) => v !== option) : [...prev, option],
                                    )
                                  }
                                  className="absolute h-0 w-0 cursor-pointer opacity-0"
                                />
                                <span
                                  className={`absolute top-[3px] -left-[21px] h-3.5 w-3.5 rounded-[3px] border border-[#dc2626] ${
                                    on ? 'bg-transparent' : 'bg-[#e1e1e1]'
                                  }`}
                                >
                                  {on && (
                                    <span className="absolute top-px left-[5px] h-3 w-1.5 rotate-45 border-r-2 border-b-2 border-black" />
                                  )}
                                </span>
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          checked.length &&
                          answer(checked.join(', '), nextQuestionId(current.id), checked)
                        }
                        className="mt-[5px] -mr-[17px] -mb-2.5 -ml-[17px] h-[42px] cursor-pointer rounded-b-[1.3em] bg-[#dc2626] text-center text-[15px] leading-[42px] text-white"
                      >
                        {locale.confirm}
                      </div>
                    </div>
                  )}
                </div>
                {stamp}
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="mb-2 max-w-full overflow-hidden">
            <div className="mr-2.5 inline-block h-9 w-9 max-w-[10%] align-top">
              {(entries.length === 0 || entries[lastIndex].kind === 'answer') && (
                <div
                  className="h-9 w-9 rounded-full bg-[#dc2626] bg-[length:36px] bg-center bg-no-repeat"
                  style={avatarStyle}
                  aria-hidden
                />
              )}
            </div>
            <div className="inline-block align-top">
              <div className="flex min-h-[38px] items-center gap-1 rounded-[1.3em] bg-[#f8f8f8] p-[13px]">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="agrohair-chatbot-loader-dot block h-3 w-3 rounded-full bg-[#9e9ea1]"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* .powered-by — sits at the bottom, behind the composer */}
      <div className="absolute right-0 bottom-0 z-0 h-[50px] w-full overflow-hidden text-center">
        <a
          href={branding.brandUrl}
          className="block overflow-hidden p-4 text-[13px] tracking-[0.2px] text-ellipsis whitespace-nowrap text-[#180109] outline-none"
        >
          {branding.brandText} <b>{branding.brandName}</b>
        </a>
      </div>

      {/* .composer — pinned to the bottom, covering the credit when active */}
      {showComposer && (
        <div
          className={`absolute right-0 bottom-0 left-0 z-[1] mx-auto w-full max-w-[550px] border-t border-[#cfd8dc] ${
            error ? 'bg-[#fef0f0]' : 'bg-white'
          }`}
        >
          <textarea
            rows={1}
            autoFocus
            value={draft}
            inputMode={current.type === 'number' ? 'numeric' : 'text'}
            placeholder={locale.typeAnAnswer}
            onChange={(e) => {
              setError(false);
              setDraft(
                current.type === 'number'
                  ? e.target.value.replace(/[^\d+\s-]/g, '')
                  : e.target.value,
              );
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitText();
              }
            }}
            className={`w-full resize-none bg-transparent py-4 pr-[70px] pl-[17px] text-[15px] leading-5 outline-none placeholder:font-light placeholder:text-[#b0bec5] ${
              error ? 'text-[#dc2626]' : 'text-[#455a64]'
            }`}
          />
          <button
            type="button"
            onClick={submitText}
            aria-label="Send"
            className="absolute top-0 right-0 flex h-full w-[70px] cursor-pointer items-center justify-center bg-transparent"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 transition-colors ${
                draft.trim() ? 'text-[#0077e5]' : 'text-[#b0bec5]'
              }`}
              fill="currentColor"
            >
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>

          {error && current.type === 'number' && (
            <p className="px-[17px] pb-2 text-[12px] text-[#dc2626]">{current.errormsg}</p>
          )}
        </div>
      )}
    </div>
  );
}
