import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ContentCard from '@/components/ContentCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTENT_LIMITS, calculatePagination, getLatestContent } from '@/utils/paginationUtils';

// Transform database content to display format
const transformContentForCard = (content: any) => {
  if (content.content_type === "Movie") {
    return {
      id: content.id,
      content_id: content.content_id,
      title: content.title,
      rating: content.movie?.rating_type || "PG-13",
      score: content.movie?.rating?.toString() || "8.0",
      image: content.movie?.thumbnail_url || "",
      year: content.movie?.release_year?.toString() || content.created_at?.split("-")[0],
      description: content.movie?.description || content.description,
      type: "movie",
      content_type: content.content_type,
      genre: content.genre,
      movie: content.movie,
      originalData: content,
    };
  } else if (content.content_type === "Web Series") {
    // Handle both pre-transformed season data and raw web series data
    if (content.seasonNumber && content.web_series?.seasons) {
      const seasonData = content.web_series.seasons[0];
      return {
        id: content.id,
        content_id: content.content_id,
        title: content.title,
        rating: seasonData?.rating_type || "TV-MA",
        score: seasonData?.rating?.toString() || "8.0",
        image: seasonData?.thumbnail_url || "",
        year: seasonData?.release_year?.toString() || content.created_at?.split("-")[0],
        description: seasonData?.season_description || content.description,
        type: "series",
        seasonNumber: content.seasonNumber,
        content_type: content.content_type,
        genre: content.genre,
        web_series: content.web_series,
        originalData: content,
      };
    } else if (content.web_series?.seasons) {
      // Transform first season for display
      const firstSeason = content.web_series.seasons[0];
      return {
        id: `${content.id}-season-1`,
        content_id: content.content_id,
        title: content.title,
        rating: firstSeason?.rating_type || "TV-MA",
        score: firstSeason?.rating?.toString() || "8.0",
        image: firstSeason?.thumbnail_url || "",
        year: firstSeason?.release_year?.toString() || content.created_at?.split("-")[0],
        description: firstSeason?.season_description || content.description,
        type: "series",
        seasonNumber: 1,
        content_type: content.content_type,
        genre: content.genre,
        web_series: content.web_series,
        originalData: content,
      };
    }
  } else if (content.content_type === "Show") {
    return {
      id: content.id,
      content_id: content.content_id,
      title: content.title,
      rating: content.show?.rating_type || "TV-PG",
      score: content.show?.rating?.toString() || "8.0",
      image: content.show?.thumbnail_url || "",
      year: content.show?.release_year?.toString() || content.created_at?.split("-")[0],
      description: content.show?.description || content.description,
      type: "show",
      content_type: content.content_type,
      genre: content.genre,
      show: content.show,
      originalData: content,
    };
  }

  // Fallback for already transformed content
  return content;
};

const SeeMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, contents } = location.state || { title: 'Content', contents: [] };
  const [currentPage, setCurrentPage] = useState(1);

  // Redirect to home if no content is provided
  React.useEffect(() => {
    if (!location.state || !contents || contents.length === 0) {
      navigate('/', { replace: true });
    }
  }, [location.state, contents, navigate]);

  // Sort content by newest first and calculate pagination
  const sortedContents = useMemo(() => {
    if (!contents || contents.length === 0) return [];
    return getLatestContent(contents);
  }, [contents]);

  const pagination = useMemo(() => 
    calculatePagination(sortedContents.length, currentPage, CONTENT_LIMITS.SEE_MORE_PAGE),
    [sortedContents.length, currentPage]
  );

  const paginatedContents = useMemo(() => 
    sortedContents.slice(pagination.startIndex, pagination.endIndex),
    [sortedContents, pagination.startIndex, pagination.endIndex]
  );

  // Don't render if no content
  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Add top padding to account for fixed header */}
      <div className="pt-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="sm"
              className="bg-transparent border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-thin text-foreground text-left uppercase tracking-[0.2em]" style={{ fontFamily: 'serif' }}>
              {title}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
            {paginatedContents.map((content: any, index: number) => {
              try {
                // Transform content to match ContentCard format
                const transformedContent = transformContentForCard(content);
                if (!transformedContent || !transformedContent.id) {
                  console.warn('Invalid transformed content:', content);
                  return null;
                }
                return (
                  <div key={`${transformedContent.id}-${index}`} className="w-full max-w-[300px] flex justify-center">
                    <ContentCard {...transformedContent} />
                  </div>
                );
              } catch (error) {
                console.error('Error transforming content:', error, content);
                return null;
              }
            })}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-end space-x-4 mt-8">
              <div className="text-sm text-muted-foreground">
                Showing {pagination.startIndex + 1} to {pagination.endIndex} of {sortedContents.length} items
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={!pagination.hasPrevPage}
                  className="bg-transparent border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-foreground font-medium px-3 py-1 bg-primary/10 border border-primary/30 rounded">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                  disabled={!pagination.hasNextPage}
                  className="bg-transparent border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeMore;