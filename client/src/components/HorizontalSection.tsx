import React, { useRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';
import { Button } from '@/components/ui/button';
import { CONTENT_LIMITS, getLatestContent } from '@/utils/paginationUtils';

interface Content {
  id: number | string;
  title: string;
  rating: string;
  score: string;
  image: string;
  year?: string;
  seasonNumber?: number;
  type?: string;
  // Add support for full database objects
  content_type?: string;
  genre?: string[];
  content_id?: string;
  movie?: any;
  web_series?: any;
  show?: any;
  originalData?: any;
  created_at?: string;
  updated_at?: string;
}

interface HorizontalSectionProps {
  title: string;
  contents: Content[];
  onSeeMore?: () => void;
  limitCards?: boolean;
}

const HorizontalSection: React.FC<HorizontalSectionProps> = ({ title, contents, onSeeMore, limitCards = true }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Process and limit content to newest items
  const displayContents = useMemo(() => {
    if (!contents || contents.length === 0) return [];

    if (limitCards) {
      return getLatestContent(contents, CONTENT_LIMITS.HORIZONTAL_SECTION);
    }

    return getLatestContent(contents);
  }, [contents, limitCards]);

  // Don't render if no content
  if (!displayContents || displayContents.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-2">
        <h2 className="section-title">{title}</h2>

        <div className="flex space-x-2">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="p-2 border border-primary/30 rounded-full hover:bg-dark-green/50 hover:arrow-hover-bg transition-all duration-200 text-primary"
            >
              <ChevronLeft className="w-4 h-4 stroke-1" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="p-2 border border-primary/30 rounded-full hover:bg-dark-green/50 hover:arrow-hover-bg transition-all duration-200 text-primary"
            >
              <ChevronRight className="w-4 h-4 stroke-1" />
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto horizontal-scroll pb-4"
          onScroll={handleScroll}
        >
          {displayContents.map((content) => (
              <ContentCard 
                key={content.id} 
                {...content}
                originalData={content.originalData || content}
              />
            ))}

          {/* See More Button */}
          <div className="w-[280px] h-[160px] flex-shrink-0 flex items-center justify-center">
            <Button
              onClick={onSeeMore}
              variant="outline"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 text-primary h-8 px-4 font-thin text-sm"
            >
              See More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSection;