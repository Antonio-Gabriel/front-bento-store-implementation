import { useState } from 'react';

type LimitedTextType = {
  text: string;
  limit: number;
};

export function LimitedText({ text, limit }: LimitedTextType) {
  const [showMore, setShowMore] = useState<boolean>(false);

  const displayedText = showMore ? text : text?.slice(0, limit);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-300 text-sm text-justify">
        {displayedText}
      </span>
      {text.length > limit && (
        <span
          onClick={() => setShowMore(!showMore)}
          className="text-secondary text-xs hover:brightness-75 transition-all duration-150 cursor-pointer"
        >
          {showMore ? 'Read Less' : 'Read More'}
        </span>
      )}
    </div>
  );
}
