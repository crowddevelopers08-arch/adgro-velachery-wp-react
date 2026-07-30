/**
 * Conversation flow + branding for the Advanced GroHair Velachery chatbot.
 * UI/UX mechanics replicated from the reference Collect.chat-style widget;
 * content rebranded for this clinic's own treatments and single Velachery location.
 */

export type Condition = { val: string; next: string };

export type Question =
  | { id: string; type: 'statement'; label: string; next?: string }
  | { id: string; type: 'text'; label: string; field: string; next?: string }
  | {
      id: string;
      type: 'number';
      label: string;
      field: string;
      errormsg: string;
      min: number;
      max: number;
      next?: string;
    }
  | { id: string; type: 'multioption'; label: string; field: string; options: string[]; next?: string }
  | {
      id: string;
      type: 'option';
      label: string;
      field: string;
      options: string[];
      conditions: Condition[];
    }
  | { id: string; type: 'thankyou'; label: string };

export const branding = {
  logo: 'https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/ambatur-logo_r5v4vh.jpg',
  avatar: 'https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/ambatur-logo_r5v4vh.jpg',
  title: 'Advanced GroHair Velachery',
  subTitle: "Chennai's Trusted FUE Hair Transplant & Growth Therapy Clinic",
  brandText: 'Powered by',
  brandName: 'Advanced GroHair Velachery',
  brandUrl: '/',
};

export const locale = {
  confirm: 'Confirm',
  typeAnAnswer: 'Type an answer',
  restart: 'Restart',
  justNow: 'Just now',
  minutesAgo: 'm ago',
  hoursAgo: 'h ago',
  daysAgo: 'd ago',
};

const WELCOME = 'welcome';
const NAME = 'name';
const CONCERN = 'concern';
const STAGE = 'stage';
const PIN = 'pin';
const VISIT = 'visit';
const PHONE = 'phone';
const THANKYOU = 'thankyou';

/** Kept identical to the treatment list already used by the site's contact form & dashboard. */
export const CONCERN_OPTIONS = [
  'Hair Loss',
  'Alopecia Areata',
  'Dandruff',
  'Baldness',
  'Hair Thinning Treatment',
  'Receding Hair Solutions',
  'Genetic Hair Loss',
];

const STAGE_OPTIONS = [
  'Just Starting / Thinning',
  'Receding Hairline',
  'Bald Patches',
  'Extensive Hair Loss',
  'Not Sure',
];

const VISIT_OPTIONS = ['Yes, I can visit the clinic', 'Prefer a phone consultation first'];

export const questions: Question[] = [
  {
    id: WELCOME,
    type: 'statement',
    label:
      '<p>Hi👋 Welcome to <strong>Advanced GroHair Velachery</strong>!</p><p></p><p>We help you achieve natural, permanent hair restoration with expert-led FUE hair transplant &amp; growth therapy✨</p>',
  },
  {
    id: NAME,
    type: 'text',
    field: 'name',
    label: '<p>May I know your <strong>name</strong>, please?</p>',
  },
  {
    id: CONCERN,
    type: 'multioption',
    field: 'concerns',
    label: '<p>What is your <strong>primary hair concern</strong>?</p>',
    options: CONCERN_OPTIONS,
  },
  {
    id: STAGE,
    type: 'option',
    field: 'hairLossStage',
    label: '<p>Which <strong>stage</strong> best describes your hair loss?</p>',
    options: STAGE_OPTIONS,
    conditions: STAGE_OPTIONS.map((val) => ({ val, next: PIN })),
  },
  {
    id: PIN,
    type: 'number',
    field: 'city',
    label: '<p>What is your area <strong>PIN code</strong>?</p>',
    errormsg: 'Please enter a valid 6-digit PIN code',
    min: 6,
    max: 6,
  },
  {
    id: VISIT,
    type: 'option',
    field: 'willingToVisit',
    label: '<p>Are you willing to <strong>visit our Velachery clinic</strong> for a consultation?</p>',
    options: VISIT_OPTIONS,
    conditions: VISIT_OPTIONS.map((val) => ({ val, next: PHONE })),
  },
  {
    id: PHONE,
    type: 'number',
    field: 'phone',
    label: '<p>Great, please share your <strong>phone number</strong> so our specialist can call you</p>',
    errormsg: 'Please enter a valid phone number',
    min: 10,
    max: 14,
    next: THANKYOU,
  },
  {
    id: THANKYOU,
    type: 'thankyou',
    label:
      '<p>Thank you😊 Our hair specialist will contact you shortly to schedule your <strong>free consultation</strong>!</p>',
  },
];

export const questionById = new Map(questions.map((q) => [q.id, q]));

export const PHONE_QUESTION_ID = PHONE;

/** The bot walks the array in order unless a question declares an explicit next. */
export function nextQuestionId(id: string): string | undefined {
  const q = questionById.get(id);
  if (q && 'next' in q && q.next) return q.next;
  const i = questions.findIndex((item) => item.id === id);
  return questions[i + 1]?.id;
}
