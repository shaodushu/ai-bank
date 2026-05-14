'use client';

import React from 'react';
import { useMetadata } from './MetadataContext';
import XmdCard from './XmdCard';

interface Product {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  tagTextColor: string;
  maxAmount: string;
  rate: string;
}

interface ProductListProps {
  streamStatus?: 'loading' | 'done';
  'data-key'?: string;
  _metadata?: Record<string, any>;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const handleViewDetail = () => {
    window.dispatchEvent(new CustomEvent('view-product-detail', { detail: product }));
  };

  return (
    <div className="relative w-[460px] h-[366px] bg-white rounded-[24px] flex-shrink-0 overflow-hidden outline outline-1 outline-[#E6E6E6]">
      {/* 标签 */}
      <div
        className="absolute right-0 w-[120px] h-[42px] flex items-center pl-[27px]"
        style={{
          background: product.tagColor,
          borderRadius: '2px 2px 2px 20px',
        }}
      >
        <span
          className="text-[22px] font-normal font-roboto"
          style={{ color: product.tagTextColor }}
        >
          {product.tag}
        </span>
      </div>

      {/* 产品名称 */}
      <div className="pt-[40px] pl-[28px] pr-[28px]">
        <h3
          className="text-[28px] text-deep-dark font-roboto font-medium"
        >
          {product.name}
        </h3>
      </div>

      {/* 额度信息 */}
      <div className="pt-[24px] pl-[28px] pr-[28px]">
        <p className="text-[24px] text-muted-text font-roboto">
          最高可借额度&nbsp;(元)
        </p>
        <p className="text-[60px] mt-[8px] text-primary-blue font-roboto font-bold">
          {product.maxAmount}
        </p>
        <p className="text-[24px] mt-[8px] text-quaternary-text font-roboto">
          {product.rate}
        </p>
      </div>

      {/* 按钮 */}
      <div className="flex gap-[20px] pt-[28px] pl-[28px] pr-[28px]">
        <button
          onClick={handleViewDetail}
          className="w-[192px] h-[71px] rounded-[16px] text-[28px] text-primary-blue font-roboto font-medium outline outline-1 outline-[#407FFF]"
          style={{
            boxShadow: '0px 6.149px 30.746px -6.149px rgba(64, 127, 255, 0.30)',
          }}
        >
          查看详情
        </button>
        <button
          className="w-[192px] h-[71px] rounded-[16px] text-[28px] text-white font-roboto font-medium"
          style={{
            background: 'linear-gradient(90deg, #5C92FF 0%, #266EFF 100%)',
          }}
        >
          立即申请
        </button>
      </div>
    </div>
  );
};

const ProductList: React.FC<ProductListProps> = ({ streamStatus, 'data-key': dataKey, _metadata }) => {
  const { metadata: contextMetadata } = useMetadata();
  const metadata = _metadata || contextMetadata;
  const products: Product[] = dataKey ? ((metadata[dataKey] as Product[]) || []) : [];

  if (streamStatus === 'loading' && !products.length) {
    return (
      <div className="flex gap-[24px] py-4">
        <div className="w-[460px] h-[366px] bg-gray-200 rounded-[24px] animate-pulse" />
        <div className="w-[460px] h-[366px] bg-gray-200 rounded-[24px] animate-pulse" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <XmdCard className="flex gap-[24px] py-4">
        <div className="flex items-center justify-center w-[460px] h-[366px] bg-white/40 rounded-[24px]" style={{ outline: '1px dashed #D0D5DD', outlineOffset: -1 }}>
          <span className="text-[24px] text-muted-text font-pingfang">
            暂无产品数据
          </span>
        </div>
      </XmdCard>
    );
  }

  return (
    <XmdCard className="flex gap-[24px] py-4 overflow-x-auto hide-scrollbar">
      {products.map((product) => (
        <div key={product.id} className="relative">
          <ProductCard product={product} />
        </div>
      ))}
    </XmdCard>
  );
};

export default ProductList;