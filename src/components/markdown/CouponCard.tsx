'use client';

import React, { useState } from 'react';
import { useMetadata } from './MetadataContext';
import XmdCard from './XmdCard';

export interface Coupon {
  id: string;
  amount: string;
  label: string;
  title: string;
  condition: string;
  validity: string;
  rules: string[];
  expiringSoon?: boolean;
}

interface CouponCardProps {
  streamStatus?: 'loading' | 'done';
  'data-key'?: string;
  _metadata?: Record<string, any>;
}

interface SingleCouponProps {
  coupon: Coupon;
}

const CouponCardSingle: React.FC<SingleCouponProps> = ({ coupon }) => {
  const [showRules, setShowRules] = useState(false);

  const blueGradient = {
    background: '#407FFF',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties;

  return (
    <div className="w-full max-w-[646px] bg-white rounded-[16px] overflow-hidden relative" style={{ outline: '1px solid rgba(0,0,0,0.05)', outlineOffset: -0.5 }}>
      {coupon.expiringSoon && (
        <div className="absolute top-0 right-0 w-[81px] h-[81px] overflow-hidden pointer-events-none">
          <svg width="81" height="81" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[1px]">
            <path d="M0 0L47.0351 0L80 32.9648L80 80L0 0Z" fill="url(#paint0_linear_1_618)"/>
            <defs>
              <linearGradient id="paint0_linear_1_618" x1="80" y1="0" x2="-1" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFF3E3"/>
                <stop offset="1" stop-color="#FFCA86"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute" style={{ color: '#E67300', fontSize: '16px', fontFamily: 'Alibaba PuHuiTi 2.0', top: '-2px', left: '22px', transform: 'rotate(45deg)', transformOrigin: 'top left', whiteSpace: 'nowrap' }}>即将到期</span>
        </div>
      )}
      <div className="px-[24px] pt-[24px] pb-[16px]">
        <div className="flex">
          <div className="w-[152px] flex-shrink-0 pt-[16px] rounded-[6px]">
            <div className="flex items-start justify-center">
              <span className="text-[22px] font-medium font-pingfang mt-[11px]" style={blueGradient}>¥</span>
              <span className="text-[56px] font-semibold font-pingfang leading-none" style={blueGradient}>{coupon.amount}</span>
            </div>
            <p className="mt-[16px] text-center text-[20px] font-pingfang font-normal" style={blueGradient}>{coupon.label}</p>
          </div>
          <div className="ml-[24px] flex-1 min-w-0 pt-[14px]">
            <div className="flex justify-between">
              <div className="min-w-0">
                <h3 className="text-[30px] font-medium font-pingfang text-[rgba(0,0,0,0.85)]">{coupon.title}</h3>
                <p className="mt-[14px] text-[22px] font-pingfang text-[rgba(0,0,0,0.45)]">{coupon.condition}</p>
                <p className="mt-[10px] text-[22px] font-pingfang text-[rgba(0,0,0,0.45)]">有效期:{coupon.validity}</p>
              </div>
              <div className="flex items-center flex-shrink-0 ml-[12px]">
                <button className="w-[98px] h-[44px] text-[22px] font-pingfang font-normal text-white rounded-[24px]" style={{ background: 'linear-gradient(90deg, #4C93FE 0%, #3A6EFF 100%)' }}>去使用</button>
            </div>
          </div>
        </div>
      </div>
        <div className="mt-[20px] h-0 border-t border-[rgba(0,0,0,0.15)]" />
        <div className="flex items-center justify-between mt-[20px]">
          <div className="flex items-center">
            <div className="w-[24px] h-[24px] mr-[8px] flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
                <circle cx="12" cy="12" r="12" fill="black" fillOpacity="0.25"/>
                <g transform="translate(10, 4)">
                  <path d="M0.23097 0L0.713905 10.7506H2.37268L2.85562 0H0.23097ZM1.5328 11.9894C1.11285 11.9894 0.7559 12.1154 0.461939 12.4093C0.146981 12.6823 0 13.0393 0 13.4802C0 13.9001 0.146981 14.2571 0.461939 14.5511C0.7559 14.845 1.11285 14.992 1.5328 14.992C1.95274 14.992 2.33069 14.845 2.64565 14.5721C2.93961 14.2781 3.08659 13.9211 3.08659 13.4802C3.08659 13.0393 2.93961 12.6823 2.64565 12.4093C2.35169 12.1154 1.97374 11.9894 1.5328 11.9894Z" fill="white"/>
                </g>
              </svg>
            </div>
            <span className="text-[22px] font-pingfang text-[rgba(0,0,0,0.45)]">提前及逾期还款需要返还优惠</span>
          </div>
          <div className="flex items-center gap-[16px]">
            <button onClick={() => setShowRules(!showRules)} className="flex items-center text-[22px] font-pingfang text-[rgba(0,0,0,0.45)]">
              <span className="mr-[4px]">查看规则</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:24,height:24}}>
                    <path d="M9 6L15 12L9 18" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
            </button>
          </div>
        </div>
      </div>
      {showRules && (
        <div className="px-[24px] py-[16px] bg-[#FAFAFA]">
          <ul className="space-y-[4px]">
            {coupon.rules.map((rule, index) => (
              <li key={index} className="text-[22px] font-pingfang text-[rgba(0,0,0,0.45)]">*{rule}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const FALLBACK_MOCK: Coupon[] = [
  {
    id: 'coupon_001',
    amount: '888',
    label: '利息抵扣券',
    title: '[12～24期] 限时免息券',
    condition: '借款 9999～200000 元可用',
    validity: '2019.04.29-2019.05.29',
    expiringSoon: true,
    rules: ['限借款金额1万元以上', '借款期数为12期', '还款方式为等额本息', '同时满足这几条才可使用优惠券'],
  },
  {
    id: 'coupon_002',
    amount: '188',
    label: '手续费折扣券',
    title: '[6～12期] 手续费折扣券',
    condition: '借款 5000～100000 元可用',
    validity: '2019.05.01-2019.06.01',
    rules: ['限借款金额5000元以上', '借款期数为6期以上', '还款方式不限'],
  },
];

const CouponCard: React.FC<CouponCardProps> = ({ streamStatus, 'data-key': dataKey, _metadata }) => {
  const { metadata: contextMetadata } = useMetadata();
  const metadata = _metadata || contextMetadata;
  const coupons: Coupon[] = dataKey ? ((metadata[dataKey] as Coupon[]) || []) : FALLBACK_MOCK;

  if (streamStatus === 'loading' && !coupons.length) {
    return (
      <div className="flex flex-col gap-[24px] py-4">
        <div className="w-full max-w-[646px] h-[259px] bg-gray-200 rounded-[16px] animate-pulse" />
      </div>
    );
  }

  if (!coupons.length) {
    return (
      <XmdCard className="flex flex-col gap-[24px] py-4">
        <div className="flex items-center justify-center w-full max-w-[646px] h-[259px] bg-white/40 rounded-[16px]" style={{ outline: '1px dashed #D0D5DD', outlineOffset: -1 }}>
          <span className="text-[24px] text-muted-text font-pingfang">暂无优惠券数据</span>
        </div>
      </XmdCard>
    );
  }

  return (
    <XmdCard className="flex flex-col gap-[24px] py-4">
      {coupons.map((coupon) => (
        <div key={coupon.id} className="relative">
          <CouponCardSingle coupon={coupon} />
        </div>
      ))}
    </XmdCard>
  );
};

export default CouponCard;