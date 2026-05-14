'use client';

import React from 'react';
import Popup from '../Popup';

interface Product {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  tagTextColor: string;
  maxAmount: string;
  rate: string;
}

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  return (
    <Popup isOpen={!!product} onClose={onClose} position="bottom">
      <div className="flex flex-col w-full max-h-[90vh] bg-[#F9F9F9] rounded-t-[36px] shadow-xl overflow-hidden">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[28px] leading-none text-tertiary-text"
        >
          ✕
        </button>

        {/* 头部渐变背景 — 固定高度 */}
        <div className="relative h-[490px] flex-shrink-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #1262EC 0%, #1777EB 32%, rgba(44.74, 135.40, 243.75, 0.83) 79%, rgba(120.62, 181.30, 253.94, 0) 96%)',
            }}
          />
          <img
            src="/assets/CodeBuddyAssets/1_3477/8.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Logo */}
          <img
            src="/assets/CodeBuddyAssets/1_3477/9.png"
            alt="logo"
            className="absolute top-[29px] left-[48px] w-[190px] h-[45px]"
          />

          {/* 产品标题区域 */}
          <div className="absolute left-[48.58px] top-[106px]">
            {/* 标签行 */}
            <div className="flex items-center gap-2 mb-2">
              <svg width="26" height="2" viewBox="0 0 26 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="25.8966" height="1.07903" transform="matrix(1 0 -0.052336 0.99863 0.0566406 0)" fill="url(#paint0_linear_1_3487)"/>
                <defs>
                  <linearGradient id="paint0_linear_1_3487" x1="0" y1="0.539513" x2="25.8966" y2="0.539513" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#084FC8" stop-opacity="0"/>
                    <stop offset="1" stop-color="#084FC8"/>
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="text-[22px] font-alibaba"
                style={{
                  background: 'linear-gradient(180deg, #084FC8 0%, #084FC8 65.66%, #62ABFC 91.57%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 400,
                }}
              >
                额度高 · 利率低 · 放款快
              </span>
              <svg width="26" height="2" viewBox="0 0 26 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="25.8966" height="1.07903" transform="matrix(1 0 -0.052336 0.99863 0.0566406 0)" fill="url(#paint0_linear_1_3489)"/>
                <defs>
                  <linearGradient id="paint0_linear_1_3489" x1="0" y1="0.539513" x2="25.8966" y2="0.539513" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#084FC8"/>
                    <stop offset="1" stop-color="#084FC8" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* 产品名称 */}
            <h2
              className="text-[69.06px] font-black tracking-[5px] font-alibaba"
              style={{
                background: 'linear-gradient(180deg, #084FC8 0%, #084FC8 65.66%, #62ABFC 91.57%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {product.name}
            </h2>

            {/* 副标题 */}
            <p
              className="text-[30px] tracking-[3.24px] font-alibaba"
              style={{
                background: 'linear-gradient(180deg, #084FC8 0%, #084FC8 65.66%, #62ABFC 91.57%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 400,
              }}
            >
              美好生活&nbsp;&nbsp;轻松拥有
            </p>
          </div>

          {/* 装饰图片 */}
          <img
            src="/assets/CodeBuddyAssets/1_3477/10.png"
            alt=""
            className="absolute top-[52.08px] right-0 w-[349px] h-[345px]"
            style={{ transform: 'rotate(1deg)' }}
          />
        </div>

        {/* 可滚动内容区域 */}
        <div className="flex-1 overflow-y-auto px-[33px] -mt-[60px] relative z-10">
          {/* 产品详情卡片 */}
          <div className="bg-white rounded-[16px] p-6">
            {/* 额度信息 */}
            <div className="text-center">
              <p className="text-[28px] text-secondary-text font-pingfang">
                最高可借额度(元)
              </p>
              <p className="text-[92px] font-medium text-primary-text font-xwfont">
                {product.maxAmount}
              </p>
              <p className="text-[28px] text-quaternary-text font-pingfang">
                {product.rate}
              </p>
            </div>

            {/* 申请步骤 */}
            <div className="mt-[90px] bg-[#F5FAFF] rounded-[10px] p-4">
              <div className="flex items-center justify-between">
                {/* 步骤1 */}
                <div className="flex flex-col items-center w-[114px]">
                  <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9502 10.7998H26.2002" stroke="#5289DA" strokeWidth="2.4" strokeLinecap="round"/>
                    <path d="M20.0459 15.9146H26.2959" stroke="#5289DA" strokeWidth="2.4" strokeLinecap="round"/>
                    <path d="M10.5913 15.6004C12.6624 15.6004 14.3413 13.9886 14.3413 12.0004C14.3413 10.0122 12.6624 8.40039 10.5913 8.40039C8.52024 8.40039 6.84131 10.0122 6.84131 12.0004C6.84131 13.9886 8.52024 15.6004 10.5913 15.6004Z" stroke="#5289DA" strokeWidth="2.4" strokeLinecap="round"/>
                    <path d="M5.74707 19.2002C6.02245 18.1677 6.64795 17.2526 7.52496 16.5991C8.40197 15.9455 9.48061 15.5908 10.5908 15.5908C11.701 15.5908 12.7797 15.9455 13.6567 16.5991C14.5337 17.2526 15.1592 18.1677 15.4346 19.2002" stroke="#5289DA" strokeWidth="2.4" strokeLinecap="round"/>
                    <path d="M29.9502 1.2002H2.4502C1.75984 1.2002 1.2002 1.73745 1.2002 2.4002V24.0002C1.2002 24.6629 1.75984 25.2002 2.4502 25.2002H29.9502C30.6406 25.2002 31.2002 24.6629 31.2002 24.0002V2.4002C31.2002 1.73745 30.6406 1.2002 29.9502 1.2002Z" stroke="#5289DA" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[24px] mt-2 text-quaternary-text font-alibaba">
                    1.身份认证
                  </span>
                </div>

                {/* 箭头 */}
                <svg width="28" height="2" viewBox="0 0 28 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0.75H28" stroke="#ECECEC" strokeWidth="1.5" strokeDasharray="1.5 2.25"/>
                </svg>

                {/* 步骤2 */}
                <div className="flex flex-col items-center w-[116px]">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.79102 9.79102H19.6092" stroke="#5289DA" strokeWidth="2.25" strokeLinecap="round"/>
                    <path d="M9.79102 14.7002H19.6092" stroke="#5289DA" strokeWidth="2.25" strokeLinecap="round"/>
                    <path d="M9.79102 19.6094H14.7001" stroke="#5289DA" strokeWidth="2.25" strokeLinecap="round"/>
                    <path d="M19.103 28.2002H2.42747C2.10197 28.2002 1.78981 28.0709 1.55966 27.8407C1.3295 27.6106 1.2002 27.2984 1.2002 26.9729V2.42747C1.2002 2.10197 1.3295 1.78981 1.55966 1.55966C1.78981 1.3295 2.10197 1.2002 2.42747 1.2002H26.9729C27.2984 1.2002 27.6106 1.3295 27.8407 1.55966C28.0709 1.78981 28.2002 2.10197 28.2002 2.42747V19.103C28.2007 19.2624 28.1699 19.4203 28.1093 19.5677C28.0488 19.7151 27.9598 19.8492 27.8473 19.9621L19.9621 27.8473C19.8492 27.9598 19.7151 28.0488 19.5677 28.1093C19.4203 28.1699 19.2624 28.2007 19.103 28.2002V28.2002Z" stroke="#5289DA" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28.0929 19.6094H19.6094V28.0929" stroke="#5289DA" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[24px] mt-2 text-quaternary-text font-alibaba">
                    2.补充资料
                  </span>
                </div>

                {/* 箭头 */}
                <svg width="28" height="2" viewBox="0 0 28 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0.75H28" stroke="#ECECEC" strokeWidth="1.5" strokeDasharray="1.5 2.25"/>
                </svg>

                {/* 步骤3 */}
                <div className="flex flex-col items-center w-[116px]">
                  <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.1963 11.9458H30V18.4067H20.1963C18.412 18.4067 16.9658 16.9605 16.9658 15.1763C16.9659 13.392 18.4121 11.9459 20.1963 11.9458Z" stroke="#5289DA" strokeWidth="2.4" strokeLinecap="round"/>
                    <path d="M1.2002 3.6002V22.8002C1.2002 23.4367 1.46444 24.0472 1.93479 24.4973C2.40514 24.9473 3.04308 25.2002 3.70825 25.2002H28.7888C29.1214 25.2002 29.4404 25.0738 29.6756 24.8487C29.9108 24.6237 30.0429 24.3185 30.0429 24.0002V7.2002C30.0429 6.88194 29.9108 6.57671 29.6756 6.35167C29.4404 6.12662 29.1214 6.0002 28.7888 6.0002H25.0268M1.2002 3.6002C1.2002 4.23671 1.46444 4.84716 1.93479 5.29725C2.40514 5.74734 3.04308 6.0002 3.70825 6.0002H25.0268M1.2002 3.6002C1.2002 2.96368 1.46444 2.35323 1.93479 1.90314C2.40514 1.45305 3.04308 1.2002 3.70825 1.2002H25.0268V6.0002" stroke="#5289DA" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[24px] mt-2 text-quaternary-text font-alibaba">
                    3.获得额度
                  </span>
                </div>
              </div>
            </div>

            {/* 客群 */}
            <div className="mt-6">
              <h4 className="text-[28px] text-primary-text font-pingfang">
                本产品面向的客群
              </h4>
              <p className="text-[26px] mt-2 text-justify text-secondary-text font-pingfang">
                男（23-60岁）、女（23-55岁）；个人征信状况良好无不良记录。
              </p>
            </div>

            {/* 申请材料 */}
            <div className="mt-6">
              <h4 className="text-[28px] text-primary-text font-pingfang">
                具体申请材料
              </h4>
              <p className="text-[26px] mt-2 text-justify text-secondary-text font-pingfang">
                需要本人有效身份证、银行卡。
              </p>
            </div>

            {/* 还款方式 */}
            <div className="mt-6">
              <h4 className="text-[28px] text-primary-text font-pingfang">
                还款方式和计息方式
              </h4>
              <p className="text-[26px] mt-2 text-justify text-secondary-text font-pingfang">
                支持等额本息、等额本金或按月付息，定期还本；从借款日起按日计息。
              </p>
            </div>
          </div>
        </div>

        {/* 立即申请按钮 — 固定在底部 */}
        <div className="flex-shrink-0 px-[33px] pb-[30px] pt-4 flex justify-center">
          <button
            className="w-[560px] h-[100px] rounded-[100px] text-[36px] text-white font-pingfang"
            style={{
              background: 'linear-gradient(90deg, #5C92FF 0%, #266EFF 100%)',
            }}
          >
            立即申请
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ProductDetail;