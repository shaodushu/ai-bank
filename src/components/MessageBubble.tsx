'use client';

import React, { useMemo } from 'react';
import { XMarkdown } from '@ant-design/x-markdown';
import { Message } from '@/types';
import ProductList from './markdown/ProductList';
import CustomerManager from './markdown/CustomerManager';
import FinancialProduct from './markdown/FinancialProduct';
import LoanInfo from './markdown/LoanInfo';
import Ask from './markdown/Ask';
import PasswordInput from './markdown/PasswordInput';
import CouponCard from './markdown/CouponCard';
import FadeContent from './FadeContent';

interface MessageBubbleProps {
  message: Message;
}

// 将 content 按分隔符拆分为三部分
function parseContentParts(content: string): {
  main: string;
  disclaimer: string;
  followup: string;
} {
  const DISCLAIMER_SEP = '---DISCLAIMER---';
  const FOLLOWUP_SEP = '---FOLLOWUP---';

  const disIndex = content.indexOf(DISCLAIMER_SEP);
  if (disIndex === -1) {
    return { main: content, disclaimer: '', followup: '' };
  }

  const main = content.slice(0, disIndex).trim();
  const afterDisclaimer = content.slice(disIndex + DISCLAIMER_SEP.length);

  const folIndex = afterDisclaimer.indexOf(FOLLOWUP_SEP);
  if (folIndex === -1) {
    return { main, disclaimer: afterDisclaimer.trim(), followup: '' };
  }

  return {
    main,
    disclaimer: afterDisclaimer.slice(0, folIndex).trim(),
    followup: afterDisclaimer.slice(folIndex + FOLLOWUP_SEP.length).trim(),
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // 内容为空时不渲染
  if (!isUser && !message.content) {
    return null;
  }

  // 通过闭包将 message.metadata 注入到自定义组件中
  const metadata = message.metadata || {};
  const markdownComponents = useMemo(() => ({
    productlist: (props: any) => <ProductList {...props} _metadata={metadata} />,
    ProductList: (props: any) => <ProductList {...props} _metadata={metadata} />,
    customermanager: (props: any) => <CustomerManager {...props} _metadata={metadata} />,
    CustomerManager: (props: any) => <CustomerManager {...props} _metadata={metadata} />,
    financialproduct: (props: any) => <FinancialProduct {...props} _metadata={metadata} />,
    FinancialProduct: (props: any) => <FinancialProduct {...props} _metadata={metadata} />,
    loaninfo: (props: any) => <LoanInfo {...props} _metadata={metadata} />,
    LoanInfo: (props: any) => <LoanInfo {...props} _metadata={metadata} />,
    ask: (props: any) => <Ask {...props} _metadata={metadata} />,
    Ask: (props: any) => <Ask {...props} _metadata={metadata} />,
    passwordinput: PasswordInput,
    PasswordInput: PasswordInput,
    couponcard: (props: any) => <CouponCard {...props} _metadata={metadata} />,
    CouponCard: (props: any) => <CouponCard {...props} _metadata={metadata} />,
  }), [metadata]);

  // 用户消息：保持原有蓝色气泡样式
  if (isUser) {
    return (
      <FadeContent blur={false} duration={300} threshold={0}>
        <div className="flex justify-end mb-6 px-7">
          <div className="max-w-[694px] rounded-[24px] px-6 py-6 bg-[#407FFF] text-white">
            <p className="text-[28px] font-normal leading-relaxed font-pingfang">
              {message.content}
            </p>
          </div>
        </div>
      </FadeContent>
    );
  }

  // 助手消息：解析三部分并分区渲染
  const { main, disclaimer, followup } = parseContentParts(message.content);

  return (
    <FadeContent blur={false} duration={300} threshold={0}>
      <div className="flex justify-start mb-6 px-7">
        <div>
          {/* 第一部分：主内容 Card（原气泡样式） */}
          <div className="max-w-[694px] rounded-[24px] px-6 py-6 bg-white/60 text-primary-text">
            <div className="text-[28px] font-pingfang">
              <XMarkdown content={main} components={markdownComponents} />
            </div>
          </div>

          {/* 第二部分：免责声明 */}
          {disclaimer && (
            <div className="mt-4 px-6 py-3 text-[20px] text-gray-400 italic">
              {disclaimer}
            </div>
          )}

          {/* 第三部分：追问或其他业务组件标签 */}
          {followup && (
            <div className="mt-4">
              <XMarkdown content={followup} components={markdownComponents} />
            </div>
          )}
        </div>
      </div>
    </FadeContent>
  );
};

export default MessageBubble;