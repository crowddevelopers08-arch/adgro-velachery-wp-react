/**
 * Conversation flow + branding for the Advanced GroHair Velachery chatbot.
 * Questions mirror the Bonitaa Tambaram chatbot (Hair/Skin → concerns → contact
 * details → clinic visit), rebranded for this clinic's single Velachery location.
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
  logo: '/ambatur-logo.jpg',
  avatar: '/ambatur-logo.jpg',
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
const CONCERN_TYPE = 'concernType';
const TREATMENTS = 'treatments';
const NAME = 'name';
const PHONE = 'phone';
const EMAIL = 'email';
const CITY = 'city';
const VISIT = 'visit';
const THANKYOU = 'thankyou';

const CONCERN_TYPE_OPTIONS = ['Hair', 'Skin'];

export const HAIR_CONCERNS = ['Hair Loss', 'Hair Thinning', 'Dandruff', 'Alopecia', 'Receding Hairline'];

export const SKIN_CONCERNS = [
  'Acne',
  'Pigmentation',
  'Dullness',
  'Tanning',
  'Uneven Skin Tone',
  'Open Pores',
];

/** Every concern the bot can capture — also drives the dashboard's treatment filter. */
export const CONCERN_OPTIONS = [...HAIR_CONCERNS, ...SKIN_CONCERNS];

const VISIT_OPTIONS = ['Yes, I can visit the clinic', 'Prefer a call first'];

export const questions: Question[] = [
  {
    id: WELCOME,
    type: 'statement',
    label:
      '<p>Hi! Welcome to <strong>Advanced GroHair Velachery</strong>.</p><p>Let me ask a few quick questions so our team can help you better.</p>',
  },
  {
    id: CONCERN_TYPE,
    type: 'option',
    field: 'concernType',
    label:
      '<p>What would you like to consult us for today?</p><p>Please choose whether your concern is related to <strong>Hair</strong> or <strong>Skin</strong>.</p>',
    options: CONCERN_TYPE_OPTIONS,
    conditions: CONCERN_TYPE_OPTIONS.map((val) => ({ val, next: TREATMENTS })),
  },
  {
    // Options are narrowed to the Hair or Skin list at render time (see concernOptionsFor).
    id: TREATMENTS,
    type: 'multioption',
    field: 'concerns',
    label: '<p>Please select your concern.</p>',
    options: CONCERN_OPTIONS,
  },
  {
    id: NAME,
    type: 'text',
    field: 'name',
    label: '<p>May I know your <strong>name</strong>?</p>',
  },
  {
    id: PHONE,
    type: 'number',
    field: 'phone',
    label: '<p>Please share your <strong>phone number</strong> so our team can contact you.</p>',
    errormsg: 'Please enter a valid phone number',
    min: 10,
    max: 14,
  },
  {
    id: EMAIL,
    type: 'text',
    field: 'email',
    label:
      '<p>Please share your <strong>email address</strong> so we can send consultation details if needed.</p>',
  },
  {
    id: CITY,
    type: 'text',
    field: 'city',
    label: '<p>Please share your <strong>Current Location</strong>.</p>',
  },
  {
    id: VISIT,
    type: 'option',
    field: 'willingToVisit',
    label: '<p>Would you be comfortable visiting our Velachery clinic for a consultation?</p>',
    options: VISIT_OPTIONS,
    conditions: VISIT_OPTIONS.map((val) => ({ val, next: THANKYOU })),
  },
  {
    id: THANKYOU,
    type: 'thankyou',
    label: '<p>Thank you. Our team will contact you shortly.</p>',
  },
];

export const questionById = new Map(questions.map((q) => [q.id, q]));

/** The lead is submitted once this last question is answered. */
export const SUBMIT_QUESTION_ID = VISIT;

export const THANK_YOU_PATH = '/chatbot/thank-you';

/** The concern step only lists the Hair or Skin concerns, depending on the earlier answer. */
export function concernOptionsFor(question: Question, concernType: string): string[] {
  if (question.id === TREATMENTS) return concernType === 'Skin' ? SKIN_CONCERNS : HAIR_CONCERNS;
  return question.type === 'multioption' ? question.options : [];
}

/** The bot walks the array in order unless a question declares an explicit next. */
export function nextQuestionId(id: string): string | undefined {
  const q = questionById.get(id);
  if (q && 'next' in q && q.next) return q.next;
  const i = questions.findIndex((item) => item.id === id);
  return questions[i + 1]?.id;
}
