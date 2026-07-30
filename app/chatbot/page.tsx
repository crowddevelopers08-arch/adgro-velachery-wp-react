import type { Metadata } from 'next';
import ChatBot from '@/components/chatbot/chat-bot';
import { branding } from '@/components/chatbot/bot-config';

export const metadata: Metadata = {
  title: 'Chat with Us | Advanced GroHair Velachery',
  description:
    'Chat with Advanced GroHair Velachery to find the right hair loss treatment and book your free consultation.',
};

export default function ChatbotPage() {
  return (
    <>
      {/* flat colour fill behind the card */}
      <div className="fixed inset-0 z-0 h-full w-full bg-[#fceaea]" />

      {/* Locked to the viewport height so the chat's own scroll region — not the
          page — handles overflow; the composer stays reachable on every screen. */}
      <div className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-3 py-4 sm:px-4 sm:py-8">
        <div className="z-[2] flex w-full max-w-[600px] flex-1 flex-col sm:flex-none">
          {/* Logo overlaps the top edge of the card */}
          <div
            className="relative z-10 mx-auto -mb-10 h-[62px] w-[148px] shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white bg-contain bg-center bg-no-repeat shadow sm:-mb-[52px] sm:h-[84px] sm:w-[200px]"
            style={{ backgroundImage: `url(${branding.logo})` }}
            role="img"
            aria-label={branding.title}
          />

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[6.5px] bg-white pt-10 text-center shadow-lg sm:flex-none sm:h-[680px] sm:max-h-[82vh] sm:pt-[52px]">
            <div className="shrink-0 px-4">
              <h1 className="text-lg text-[#180109] sm:text-2xl">{branding.title}</h1>
              <h3 className="pb-1 text-xs font-medium text-[#180109] sm:text-sm">
                {branding.subTitle}
              </h3>
            </div>

            <div className="min-h-0 flex-1">
              <ChatBot />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
