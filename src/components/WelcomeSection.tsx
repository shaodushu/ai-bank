import React from 'react';
import QuickQuestions from './QuickQuestions';
import BlurText from './BlurText';
import ShinyText from './ShinyText';
import FadeContent from './FadeContent';

interface WelcomeSectionProps {
  onQuestionClick: (question: string) => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onQuestionClick }) => {
  return (
    <div className="flex flex-col items-center px-7 pt-[147px]">
      {/* AI 头像 - 淡入动画 */}
      <FadeContent blur={true} duration={800} delay={0}>
        <div className="mb-6">
          <img
            src="/assets/CodeBuddyAssets/1_1378/21.png"
            alt="AI Assistant"
            className="w-[240px] h-[240px]"
          />
        </div>
      </FadeContent>

      {/* 欢迎文案 - 模糊渐入文字动画 */}
      <BlurText
        text="Hello！尊敬的客户，上午好！"
        delay={80}
        animateBy="words"
        direction="top"
        className="mb-2 text-center font-semibold text-[36px] text-primary-text font-pingfang"
      />

      {/* 副标题 - 闪光文字效果 */}
      <ShinyText
        text="我是您的智能助手，您有任何需求都可以和我说～"
        speed={3}
        shineColor="#407FFF"
        color="rgba(0,0,0,0.45)"
        className="text-center text-[28px] font-pingfang"
      />

      {/* 猜你想问 - 淡入动画 */}
      <FadeContent blur={true} duration={800} delay={400} className="mt-[125px] w-full">
        <QuickQuestions onQuestionClick={onQuestionClick} />
      </FadeContent>
    </div>
  );
};

export default WelcomeSection;
