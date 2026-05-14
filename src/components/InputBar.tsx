import React from 'react';
import VoiceIcon from './VoiceIcon';
import KeyboardIcon from './KeyboardIcon';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [isVoiceMode, setIsVoiceMode] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode((prev) => !prev);
  };

  return (
    <div className="flex h-[134px] items-center px-5">
      {/* 左侧 "+" 按钮 — 设计稿 left: 20px, 88x88 */}
      <button className="flex w-[88px] h-[88px] flex-shrink-0 items-center justify-center rounded-full bg-white">
        <img
          src="/assets/CodeBuddyAssets/1_1170/19.svg"
          alt="+"
          className="w-[36px] h-[36px]"
        />
      </button>

      {/* 中间输入区域 — 设计稿间距 20px */}
      <div className="mx-[20px] flex flex-1 items-center">
        <div className="relative flex flex-1 items-center rounded-[100px] bg-white h-[88px]">
          {isVoiceMode ? (
            /* 语音模式：按住说话 */
            <div className="flex w-full items-center justify-center">
              <span className="text-[32px] text-dark-text font-pingfang">
                按住说话
              </span>
            </div>
          ) : (
            /* 文字模式：输入框 — 设计稿 left: 36px */
            <form onSubmit={handleSubmit} className="flex w-full items-center pl-[36px] pr-[80px]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="来说说您的问题？"
                className="flex-1 bg-transparent text-[32px] text-primary-text placeholder:text-placeholder-text outline-none font-pingfang"
                disabled={isLoading}
              />
            </form>
          )}

          {/* 右侧切换按钮 — 设计稿 right: 24px */}
          <button
            type="button"
            onClick={toggleVoiceMode}
            className="absolute right-[24px] top-1/2 -translate-y-1/2 flex w-[56px] h-[56px] items-center justify-center"
          >
            {isVoiceMode ? <VoiceIcon /> : <KeyboardIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBar;