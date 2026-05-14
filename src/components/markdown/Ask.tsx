'use client';

import React from 'react';
import { useMetadata } from './MetadataContext';
import IconButton from '../IconButton';

interface AskProps {
  streamStatus?: 'loading' | 'done';
  'data-key'?: string;
  children?: React.ReactNode;
  _metadata?: Record<string, any>;
}

const askIcon = (
  <img
    src="/assets/CodeBuddyAssets/1_1463/12.svg"
    alt="ask"
    className="w-[35px] h-[35px]"
  />
);

const Ask: React.FC<AskProps> = ({ streamStatus, 'data-key': dataKey, children, _metadata }) => {
  const { metadata: contextMetadata } = useMetadata();
  const metadata = _metadata || contextMetadata;
  const questionData = dataKey ? ((metadata[dataKey] as { text?: string }) || null) : null;
  const questionText = questionData?.text || (typeof children === 'string' ? children : '');

  const handleClick = () => {
    if (questionText) {
      // 触发自定义事件，由 ChatInterface 监听
      window.dispatchEvent(new CustomEvent('ask-question', { detail: questionText }));
    }
  };

  if (streamStatus === 'loading' && !questionText) {
    return (
      <span className="inline-block w-[160px] h-[40px] bg-gray-200 rounded-[100px] animate-pulse align-middle" />
    );
  }

  if (!questionText) {
    return (
      <IconButton icon={askIcon} as="span" className="text-[24px] text-muted-text">
        暂无追问
      </IconButton>
    );
  }

  return (
    <IconButton icon={askIcon} onClick={handleClick}>
      {questionText}
    </IconButton>
  );
};

export default Ask;