import React from 'react';
import QuickQuestions from './QuickQuestions';

interface WelcomeSectionProps {
  onQuestionClick: (question: string) => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onQuestionClick }) => {
  return (
    <div className="flex flex-col items-center px-7 pt-[147px]">
      {/* AI 头像 */}
      <div className="mb-6">
        <img
          src="/assets/CodeBuddyAssets/1_1378/21.png"
          alt="AI Assistant"
          className="w-[240px] h-[240px]"
        />
      </div>

      {/* 欢迎文案 */}
      <h1 className="mb-2 text-center font-semibold text-[36px] text-primary-text font-pingfang">
        Hello！尊敬的客户，上午好！
      </h1>

      {/* 副标题 */}
      <p className="text-center text-[28px] text-tertiary-text font-pingfang">
        我是您的智能助手，您有任何需求都可以和我说～
      </p>

      {/* 猜你想问 */}
      <div className="mt-[125px] w-full">
        <QuickQuestions onQuestionClick={onQuestionClick} />
      </div>
    </div>
  );
};

export default WelcomeSection;
