'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { MetadataProvider } from '@/components/markdown/MetadataContext';
import ChatInterface from '@/components/ChatInterface';
import { useChat } from '@/hooks/useChat';

function ChatPageInner() {
  const searchParams = useSearchParams();
  const { sendMessage } = useChat();
  const handledRef = useRef(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && !handledRef.current) {
      handledRef.current = true;
      sendMessage(q);
    }
  }, [searchParams, sendMessage]);

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      <div className="relative z-10">
        <ChatInterface />
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <MetadataProvider>
      <Suspense fallback={null}>
        <ChatPageInner />
      </Suspense>
    </MetadataProvider>
  );
}