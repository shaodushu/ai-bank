import React from 'react';
import IconButton from './IconButton';
import FadeContent from './FadeContent';

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const questions = [
  { text: '怎么申请借款', icon: '/assets/CodeBuddyAssets/1_1378/18.svg' },
  { text: '什么是经营贷和消费贷', icon: '/assets/CodeBuddyAssets/1_1378/19.svg' },
  { text: '你们有哪些借款产品？', icon: '/assets/CodeBuddyAssets/1_1378/20.svg' },
];

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onQuestionClick }) => {
  return (
    <div>
      {/* 标题 */}
      <h2 className="mb-4 text-[28px] text-primary-text font-pingfang font-medium">
        猜你想问
      </h2>

      {/* 问题按钮列表 - 逐项淡入 */}
      <div className="flex flex-col space-y-4">
        {questions.map((question, index) => (
          <FadeContent
            key={index}
            blur={true}
            duration={600}
            delay={index * 150}
          >
            <IconButton
              icon={
                <img
                  src={question.icon}
                  alt="icon"
                  className="w-[35px] h-[35px]"
                />
              }
              onClick={() => onQuestionClick(question.text)}
              className={index === 0 ? 'w-[239px]' : 'w-[335px]'}
            >
              {question.text}
            </IconButton>
          </FadeContent>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions;
