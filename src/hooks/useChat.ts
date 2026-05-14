import { useState, useCallback, useRef } from 'react';
import { Message, ChatState } from '@/types';

// 初始消息
const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: '您好！我是客户经理小新，很高兴为您服务，请问有什么可以帮到您？',
    role: 'assistant',
    timestamp: Date.now(),
  },
];

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: INITIAL_MESSAGES,
    isLoading: false,
    error: null,
  });

  // 用于外部设置 metadata 的回调
  const onMetadataRef = useRef<((data: Record<string, any>) => void) | null>(null);

  const setOnMetadata = useCallback((cb: (data: Record<string, any>) => void) => {
    onMetadataRef.current = cb;
  }, []);

  // 发送消息
  const sendMessage = useCallback(async (content: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };

    // 创建空的 assistant 消息占位
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: Date.now(),
      metadata: {},
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage, assistantMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // 调用 Next.js API Route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...state.messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('API 调用失败');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('无法读取响应流');

      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';
      let messageMetadata: Record<string, any> = {};

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // 保留未完成的行

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const payload = JSON.parse(line.slice('data: '.length));
              if (payload.type === 'text') {
                fullContent += payload.content;

                // 实时更新消息内容
                setState(prev => {
                  const msgs = [...prev.messages];
                  const lastMsg = msgs[msgs.length - 1];
                  if (lastMsg && lastMsg.role === 'assistant') {
                    msgs[msgs.length - 1] = {
                      ...lastMsg,
                      content: fullContent,
                      metadata: messageMetadata,
                    };
                  }
                  return { ...prev, messages: msgs };
                });
              } else if (payload.type === 'metadata') {
                messageMetadata = payload.data;
                // 通知外部设置 metadata
                if (onMetadataRef.current) {
                  onMetadataRef.current(messageMetadata);
                }
              }
            } catch (e) {
              console.error('解析流数据失败:', e);
            }
          }
        }
      }

      // 流结束，最终更新
      setState(prev => {
        const msgs = [...prev.messages];
        const lastMsg = msgs[msgs.length - 1];
        if (lastMsg && lastMsg.role === 'assistant') {
          msgs[msgs.length - 1] = {
            ...lastMsg,
            content: fullContent,
            metadata: messageMetadata,
          };
        }
        return { ...prev, messages: msgs, isLoading: false };
      });
    } catch (error) {
      console.error('发送消息失败:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: '发送消息失败，请稍后重试',
      }));
    }
  }, [state.messages]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    setOnMetadata,
  };
}