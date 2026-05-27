'use client';

import React from 'react';
import { useMetadata } from './MetadataContext';
import XmdCard from './XmdCard';

// ============================================================
// Types
// ============================================================

export type CreditStatus = 'approved' | 'pending' | 'need_docs';

export interface CreditItem {
  id: string;
  productName: string;
  status: CreditStatus;
  /** 可借额度（已授信通过时展示） */
  availableAmount?: string;
  /** 年华利率（已授信通过时展示） */
  annualRate?: string;
  /** 审核状态标题（审核中/待补充资料时展示） */
  pendingTitle?: string;
  /** 审核描述文案的普通部分 */
  pendingDescription?: string;
  /** 审核描述文案的高亮部分 */
  pendingHighlight?: string;
  /** 审核描述文案高亮后的普通部分 */
  pendingDescriptionAfter?: string;
}

interface CreditStatusProps {
  streamStatus?: 'loading' | 'done';
  'data-key'?: string;
  _metadata?: Record<string, any>;
}

// ============================================================
// Helper: 生成摘要文案
// ============================================================

const buildSummary = (items: CreditItem[]): string => {
  const total = items.length;
  const approved = items.filter((i) => i.status === 'approved').length;
  const rest = total - approved;
  if (total === 0) return '';
  return `您近期有${total}笔授信，${approved}笔已授信通过，剩余${rest}笔正在处理中，`;
};

// ============================================================
// Sub-components
// ============================================================

/** 产品标签角标 — 卡片顶部居中
 *  design: w auto, h:57px, px:32px, rounded-b:24px, font:28px
 *  CSS:    h-[28.5px], px-4 (16px), rounded-b-xl (12px), text-sm (14px) */
const ProductTag: React.FC<{ name: string }> = ({ name }) => (
  <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[28.5px] px-4 bg-[#FFF0C6] rounded-b-xl">
    <span className="text-sm text-[#9F3A00] font-roboto whitespace-nowrap">
      {name}
    </span>
  </div>
);

/** 状态图标 — 审核中/待补充资料卡片共用
 *  design: outer 100×100px, inner 78.57×78.57px, bg #BD8A00, rounded-full
 *  CSS:    outer w-[50px] h-[50px], inner w-[39px] h-[39px] */
const StatusIcon: React.FC<{ type: 'clock' | 'doc' }> = ({ type }) => (
  <div className="flex justify-center">
    <div className="relative w-[50px] h-[50px]">
      <div className="absolute w-[39px] h-[39px] bg-[#BD8A00] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <img
        src={type === 'clock' ? '/credit-clock.svg' : '/credit-doc.svg'}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  </div>
);

/** 已授信通过卡片
 *  design: w:646px, rounded:24px, border:1px #E6E6E6
 *  内容区 pt:80px pb:40px, 内宽:550px
 *  标题 font:28px mt:0
 *  金额 font:56px mt:19px
 *  利率 gap:56px mt:8px, font:28px
 *  按钮 w:520px h:100px rounded:50px font:36px mt:24px
 *  CSS:    w-[323px] rounded-xl
 *  内容区 pt-10 pb-5, 内宽 w-[275px]
 *  标题 text-sm mt-0, 金额 text-[28px] mt-[9.5px]
 *  利率 gap-7 mt-1, font text-sm
 *  按钮 w-[260px] h-[50px] rounded-[25px] text-lg mt-3 */
const ApprovedCard: React.FC<{ item: CreditItem }> = ({ item }) => (
  <div className="relative w-[323px] bg-white rounded-xl border border-[#E6E6E6] overflow-hidden">
    {/* 产品标签 */}
    <ProductTag name={item.productName} />

    {/* 内容区域 */}
    <div className="pt-10 pb-5">
      <div className="mx-auto w-[275px]">
        {/* 标题 */}
        <p className="text-center text-sm text-dark-text font-pingfang">
          我的可借额度
        </p>

        {/* 金额 */}
        <p className="text-center text-[28px] text-[#DF3020] font-roboto font-medium mt-[9.5px]">
          {item.availableAmount}
        </p>

        {/* 利率 */}
        <div className="flex justify-center items-center gap-7 mt-1">
          <span className="text-sm text-dark-text font-pingfang">
            年华利率（单利）
          </span>
          <span className="text-sm text-dark-text font-pingfang">
            {item.annualRate}
          </span>
        </div>

        {/* 立即借款按钮 */}
        <button className="block w-[260px] h-[50px] rounded-[25px] bg-gradient-to-r from-[#5C92FF] to-[#266EFF] text-white text-lg font-alibaba font-medium mt-3 mx-auto">
          立即借款
        </button>
      </div>
    </div>
  </div>
);

/** 审核中 / 待补充资料卡片
 *  design: w:646px, rounded:24px, border:1px #E6E6E6
 *  内容区 pt:80px pb:40px
 *  标题 font:32px mt:8px (after icon)
 *  描述 font:24px mt:52px-标题高, 高亮色 #BD8A00
 *  CSS:    w-[323px] rounded-xl
 *  内容区 pt-10 pb-5
 *  标题 text-base mt-1
 *  描述 text-xs mt-[12px] (approx) */
const PendingCard: React.FC<{
  item: CreditItem;
  iconType: 'clock' | 'doc';
}> = ({ item, iconType }) => (
  <div className="relative w-[323px] bg-white rounded-xl border border-[#E6E6E6] overflow-hidden">
    {/* 产品标签 */}
    <ProductTag name={item.productName} />

    {/* 内容区域 */}
    <div className="pt-10 pb-5">
      {/* 图标 */}
      <StatusIcon type={iconType} />

      {/* 标题 — 32px design → 16px CSS → text-base */}
      <p className="text-center text-base text-dark-text font-pingfang font-medium mt-1">
        {item.pendingTitle}
      </p>

      {/* 描述 — 24px design → 12px CSS → text-xs, 高亮 #BD8A00 */}
      <p className="text-center text-xs text-[#858585] font-pingfang mt-[12px] leading-[1.5]">
        {item.pendingDescription}
        {item.pendingHighlight && (
          <span className="text-[#BD8A00]">{item.pendingHighlight}</span>
        )}
        {item.pendingDescriptionAfter}
      </p>
    </div>
  </div>
);

// ============================================================
// Card Renderer — 根据 status 分发
// ============================================================

const CreditCard: React.FC<{ item: CreditItem }> = ({ item }) => {
  switch (item.status) {
    case 'approved':
      return <ApprovedCard item={item} />;
    case 'pending':
      return <PendingCard item={item} iconType="clock" />;
    case 'need_docs':
      return <PendingCard item={item} iconType="doc" />;
    default:
      return null;
  }
};

// ============================================================
// Mock 数据
// ============================================================

const FALLBACK_MOCK: CreditItem[] = [
  {
    id: 'credit_001',
    productName: '极速消费贷',
    status: 'approved',
    availableAmount: '3,300,000',
    annualRate: '3.55%',
  },
  {
    id: 'credit_002',
    productName: '名字超级长....超级的贷款',
    status: 'pending',
    pendingTitle: '额度正在审核中',
    pendingDescription: '授信申请已提交，预计需要',
    pendingHighlight: '1-3个工作日',
    pendingDescriptionAfter: '，结果将以微信/短信的方式通知您',
  },
  {
    id: 'credit_003',
    productName: '名房抵贷-经营贷',
    status: 'need_docs',
    pendingTitle: '初审通过，待补充资料',
    pendingDescription: '授信申请已提交，预计需要',
    pendingHighlight: '1-3个工作日',
    pendingDescriptionAfter: '，结果将以微信/短信的方式通知您',
  },
];

// ============================================================
// 骨架屏
// ============================================================

const SkeletonSummary: React.FC = () => (
  <div className="w-[323px] h-3.5 bg-gray-200 rounded-sm animate-pulse" />
);

const SkeletonCardLarge: React.FC = () => (
  <div className="w-[323px] h-[226px] bg-gray-200 rounded-xl animate-pulse" />
);

const SkeletonCardSmall: React.FC = () => (
  <div className="w-[323px] h-50 bg-gray-200 rounded-xl animate-pulse" />
);

// ============================================================
// 主组件
// ============================================================

const CreditStatusComponent: React.FC<CreditStatusProps> = ({
  streamStatus,
  'data-key': dataKey,
  _metadata,
}) => {
  const { metadata: contextMetadata } = useMetadata();
  const metadata = _metadata || contextMetadata;
  const items: CreditItem[] = dataKey
    ? ((metadata[dataKey] as CreditItem[]) || [])
    : FALLBACK_MOCK;

  // 加载态
  if (streamStatus === 'loading' && !items.length) {
    return (
      <XmdCard className="py-3">
        <div className="w-[347px] rounded-xl bg-white/60 p-3 flex flex-col gap-3">
          <SkeletonSummary />
          <SkeletonCardLarge />
          <SkeletonCardSmall />
          <SkeletonCardSmall />
        </div>
      </XmdCard>
    );
  }

  // 空数据
  if (!items.length) {
    return (
      <XmdCard className="py-3">
        <div className="flex items-center justify-center w-[347px] h-50 bg-white/40 rounded-xl border border-dashed border-[#D0D5DD]">
          <span className="text-xs text-muted-text font-pingfang">
            暂无授信信息
          </span>
        </div>
      </XmdCard>
    );
  }

  const summary = buildSummary(items);

  return (
    <XmdCard className="py-3">
      <div className="w-[347px] rounded-xl bg-white/60 overflow-hidden p-3">
        {/* 摘要文案 */}
        {summary && (
          <p className="text-sm text-primary-text font-pingfang mb-[31px]">
            {summary}
          </p>
        )}

        {/* 卡片列表 */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CreditCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </XmdCard>
  );
};

export default CreditStatusComponent;
