'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useMetadata } from './markdown/MetadataContext';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import ProductDetail from './markdown/ProductDetail';

interface Product {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  tagTextColor: string;
  maxAmount: string;
  rate: string;
}

const ChatInterface: React.FC = () => {
  const { messages, isLoading, error, sendMessage, setOnMetadata } = useChat();
  const { setMetadata } = useMetadata();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // 注册 metadata 回调
  useEffect(() => {
    setOnMetadata((data) => {
      setMetadata(data);
    });
  }, [setOnMetadata, setMetadata]);

  // 监听 Ask 组件的点击事件
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      sendMessage(e.detail);
    };
    window.addEventListener('ask-question', handler as EventListener);
    return () => window.removeEventListener('ask-question', handler as EventListener);
  }, [sendMessage]);

  // 监听查看详情事件
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setDetailProduct(e.detail);
    };
    window.addEventListener('view-product-detail', handler as EventListener);
    return () => window.removeEventListener('view-product-detail', handler as EventListener);
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen flex-col relative overflow-hidden">
      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto pt-[32px] relative z-10">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* 加载状态 */}
        {isLoading && (
          <div className="flex justify-start px-7 mb-6">
            <div className="bg-[#F5F5F5] rounded-[24px] px-6 py-6">
              <div className="flex space-x-2">
                <div className="h-3 w-3 animate-bounce rounded-full bg-gray-400" />
                <div className="h-3 w-3 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.1s' }} />
                <div className="h-3 w-3 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <div className="px-7 mb-4">
            <p className="text-center text-sm text-red-500">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 底部输入栏 */}
      <div className="relative z-10">
        <InputBar onSendMessage={sendMessage} isLoading={isLoading} />
      </div>

      {/* 产品详情弹窗 — 在顶层渲染，不受消息区域 overflow 影响 */}
      {detailProduct && (
        <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />
      )}
    </div>
  );
};

export default ChatInterface;