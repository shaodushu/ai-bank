'use client';

import { useRouter } from 'next/navigation';
import WelcomeSection from '@/components/WelcomeSection';
import InputBar from '@/components/InputBar';

export default function Home() {
  const router = useRouter();

  const handleQuestionClick = (question: string) => {
    router.push(`/chat?q=${encodeURIComponent(question)}`);
  };

  const handleSendMessage = (message: string) => {
    router.push(`/chat?q=${encodeURIComponent(message)}`);
  };

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      <div className="flex-1 overflow-y-auto relative z-10">
        <WelcomeSection onQuestionClick={handleQuestionClick} />
      </div>
      <div className="relative z-10">
        <InputBar onSendMessage={handleSendMessage} isLoading={false} />
      </div>
    </main>
  );
}
