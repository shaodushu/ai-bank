'use client';

import React from 'react';

interface XmdCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * XmdCard — XMarkdown 自定义组件样式隔离容器
 *
 * 所有通过 XMarkdown components 渲染的自定义卡片组件，
 * 只需用此组件包裹根元素，即可自动获得 xmd-card 样式隔离，
 * 避免 XMarkdown 注入的排版样式污染自定义组件。
 *
 * 配合 globals.css 中的 .x-markdown .xmd-card 规则使用。
 */
const XmdCard: React.FC<XmdCardProps> = ({ children, className = '' }) => {
  return <div className={`xmd-card ${className}`.trim()}>{children}</div>;
};

export default XmdCard;