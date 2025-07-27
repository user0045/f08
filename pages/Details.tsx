import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import TrailerModal from '@/components/TrailerModal';
import AutoClickAd from '@/components/AutoClickAd';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ExternalLink, ChevronDown, ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import { useAllContent } from '@/hooks/useContentQueries';

// Individual Ad Components with proper isolation
const DetailsAd1: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  const maxRetries = 3;

  const loadAd = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create unique options object
    const uniqueOptions = {
      'key': '7d2d7ee660ee84c91c4fff9fb4eb32f9',
      'format': 'iframe',
      'height': 50,
      'width': 320,
      'params': {}
    };

    // Set to global scope with unique identifier
    (window as any)[`atOptions_details1_${Date.now()}`] = uniqueOptions;
    (window as any).atOptions = uniqueOptions;

    // Create and load the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.highperformanceformat.com/7d2d7ee660ee84c91c4fff9fb4eb32f9/invoke.js';
    script.async = true;
    script.id = `details-ad-1-script-${Date.now()}`;

    script.onload = () => {
      console.log('Details Ad 1 loaded successfully');
      setAdLoaded(true);
      
      // Check if ad content actually loaded after a delay
      setTimeout(() => {
        const hasContent = container.querySelector('iframe') || 
                          container.querySelector('div[id*="container-"]') ||
                          container.children.length > 1;
        
        if (!hasContent && retryCount < maxRetries) {
          console.log(`Details Ad 1 content not found, retrying... (${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setAdLoaded(false);
        }
      }, 3000);
    };

    script.onerror = () => {
      console.error('Failed to load Details Ad 1');
      if (retryCount < maxRetries) {
        console.log(`Retrying Details Ad 1... (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 2000);
      }
    };

    container.appendChild(script);
  }, [retryCount, maxRetries]);

  React.useEffect(() => {
    if (!adLoaded && retryCount <= maxRetries) {
      const timer = setTimeout(() => {
        loadAd();
      }, 500); // Reduced initial delay

      return () => clearTimeout(timer);
    }
  }, [adLoaded, retryCount, loadAd]);

  return (
    <div
      ref={containerRef}
      className="w-full text-center ad-container"
      style={{ 
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'static',
        zIndex: 1,
        minHeight: '50px'
      }}
    />
  );
};

const DetailsAd2: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  const maxRetries = 3;

  const loadAd = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create unique options object
    const uniqueOptions = {
      'key': 'f4740102a4fd064713bb883f226e1d5f',
      'format': 'iframe',
      'height': 60,
      'width': 468,
      'params': {}
    };

    // Set to global scope with unique identifier
    (window as any)[`atOptions_details2_${Date.now()}`] = uniqueOptions;
    (window as any).atOptions = uniqueOptions;

    // Create and load the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.highperformanceformat.com/f4740102a4fd064713bb883f226e1d5f/invoke.js';
    script.async = true;
    script.id = `details-ad-2-script-${Date.now()}`;

    script.onload = () => {
      console.log('Details Ad 2 loaded successfully');
      setAdLoaded(true);
      
      // Check if ad content actually loaded after a delay
      setTimeout(() => {
        const hasContent = container.querySelector('iframe') || 
                          container.querySelector('div[id*="container-"]') ||
                          container.children.length > 1;
        
        if (!hasContent && retryCount < maxRetries) {
          console.log(`Details Ad 2 content not found, retrying... (${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setAdLoaded(false);
        }
      }, 3000);
    };

    script.onerror = () => {
      console.error('Failed to load Details Ad 2');
      if (retryCount < maxRetries) {
        console.log(`Retrying Details Ad 2... (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 2000);
      }
    };

    container.appendChild(script);
  }, [retryCount, maxRetries]);

  React.useEffect(() => {
    if (!adLoaded && retryCount <= maxRetries) {
      const timer = setTimeout(() => {
        loadAd();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [adLoaded, retryCount, loadAd]);

  return (
    <div
      ref={containerRef}
      className="w-full text-center ad-container"
      style={{ 
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'static',
        zIndex: 1,
        minHeight: '50px'
      }}
    />
  );
};

const DetailsAd3: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  const maxRetries = 3;

  const loadAd = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create unique options object with exact configuration
    const uniqueOptions = {
      'key': 'feccc4e460df1f1b7bb9d0ba6836c200',
      'format': 'iframe',
      'height': 600,
      'width': 160,
      'params': {}
    };

    // Set to global scope with unique identifier
    (window as any)[`atOptions_details3_${Date.now()}`] = uniqueOptions;
    (window as any).atOptions = uniqueOptions;

    // Create and load the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.highperformanceformat.com/feccc4e460df1f1b7bb9d0ba6836c200/invoke.js';
    script.async = true;
    script.id = `details-ad-3-script-${Date.now()}`;

    script.onload = () => {
      console.log('Details Ad 3 loaded successfully');
      setAdLoaded(true);
      
      // Check if ad content actually loaded after a delay
      setTimeout(() => {
        const hasContent = container.querySelector('iframe') || 
                          container.querySelector('div[id*="container-"]') ||
                          container.children.length > 1;
        
        if (!hasContent && retryCount < maxRetries) {
          console.log(`Details Ad 3 content not found, retrying... (${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setAdLoaded(false);
        }
      }, 3000);
    };

    script.onerror = () => {
      console.error('Failed to load Details Ad 3');
      if (retryCount < maxRetries) {
        console.log(`Retrying Details Ad 3... (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 2000);
      }
    };

    container.appendChild(script);
  }, [retryCount, maxRetries]);

  React.useEffect(() => {
    if (!adLoaded && retryCount <= maxRetries) {
      const timer = setTimeout(() => {
        loadAd();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [adLoaded, retryCount, loadAd]);

  return (
    <div
      ref={containerRef}
      className="w-full text-center ad-container"
      style={{ 
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'static',
        zIndex: 1,
        minHeight: '600px',
        minWidth: '160px'
      }}
    />
  );
};

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [currentSeasonDetails, setCurrentSeasonDetails] = useState<any>(null);
  const [currentSeasonEpisodes, setCurrentSeasonEpisodes] = useState<any[]>([]);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [adsLoaded, setAdsLoaded] = useState(false);

  const { data: allContent, isLoading } = useAllContent();

  // Load ads with proper timing - ensure all ads start loading immediately
  useEffect(() => {
    console.log('Initializing ads for Details page');
    
    // Start loading ads immediately but mark as loaded after delay
    const timer = setTimeout(() => {
      setAdsLoaded(true);
      console.log('Ads marked as ready to load');
    }, 3000); // Give more time for all ads to load properly

    return () => clearTimeout(timer);
  }, []);

  // Find the content item
  const content = React.useMemo(() => {
    if (location.state && typeof location.state === 'object') {
      return location.state;
    }

    if (!allContent || !id) return null;

    const allItems = [
      ...(allContent.movies || []),
      ...(allContent.webSeries || []),
      ...(allContent.shows || [])
    ];

    return allItems.find(item => {
      if (item.id === id || item.content_id === id) return true;
      if (typeof item.id === 'string' && item.id.includes('-season-')) {
        const baseId = item.id.split('-season-')[0];
        if (baseId === id) return true;
      }
      if (item.movie && item.movie.content_id === id) return true;
      if (item.web_series && item.web_series.content_id === id) return true;
      if (item.show && (item.show.id === id || item.show.content_id === id)) return true;
      if (typeof id === 'string' && id.includes('-season-')) {
        const baseSearchId = id.split('-season-')[0];
        if (item.id === baseSearchId || item.content_id === baseSearchId) return true;
      }
      return false;
    });
  }, [allContent, id, location.state]);

  // Extract season from URL if present
  useEffect(() => {
    if (id && typeof id === 'string' && id.includes('-season-')) {
      const seasonMatch = id.match(/-season-(\d+)$/);
      if (seasonMatch) {
        setSelectedSeason(parseInt(seasonMatch[1], 10));
      }
    } else if (content?.seasonNumber) {
      setSelectedSeason(content.seasonNumber);
    }
  }, [id, content]);

  // Fetch episode data
  useEffect(() => {
    const fetchEpisodeData = async () => {
      if (content?.content_type === 'Web Series') {
        if (content.web_series?.season_id_list && content.web_series.season_id_list.length > 0) {
          const { supabase } = await import('@/integrations/supabase/client');
          const seasonId = content.web_series.season_id_list[selectedSeason - 1];

          if (seasonId) {
            try {
              const { data: seasonData, error: seasonError } = await supabase
                .from('season')
                .select('*')
                .eq('season_id', seasonId)
                .single();

              if (!seasonError && seasonData) {
                setCurrentSeasonDetails(seasonData);

                if (seasonData.episode_id_list) {
                  const episodes = [];

                  for (const episodeId of seasonData.episode_id_list) {
                    try {
                      const { data: episodeData, error } = await supabase
                        .from('episode')
                        .select('*')
                        .eq('episode_id', episodeId)
                        .single();

                      if (!error && episodeData) {
                        episodes.push({
                          id: episodeData.episode_id,
                          title: episodeData.title || `Episode ${episodes.length + 1}`,
                          description: episodeData.description || 'No description available',
                          duration: episodeData.duration || null,
                          thumbnail_url: episodeData.thumbnail_url || null
                        });
                      }
                    } catch (err) {
                      console.error('Error fetching episode:', err);
                    }
                  }

                  setCurrentSeasonEpisodes(episodes);
                }
              }
            } catch (err) {
              console.error('Error fetching season data:', err);
            }
          }
        } else if (content.web_series?.seasons && content.web_series.seasons.length > 0) {
          const seasonData = content.web_series.seasons[selectedSeason - 1];
          if (seasonData) {
            setCurrentSeasonDetails(seasonData);

            if (seasonData.episodes && Array.isArray(seasonData.episodes)) {
              const episodes = seasonData.episodes.map((episode, index) => ({
                id: episode.episode_id || `episode-${index + 1}`,
                title: episode.title || `Episode ${index + 1}`,
                description: episode.description || 'No description available',
                duration: episode.duration || null,
                thumbnail_url: episode.thumbnail_url || null
              }));
              setCurrentSeasonEpisodes(episodes);
            }
          }
        }
      } else if (content?.content_type === 'Show' && content.show?.episode_id_list) {
        setCurrentSeasonDetails(null);

        const { supabase } = await import('@/integrations/supabase/client');
        const episodes = [];

        for (const episodeId of content.show.episode_id_list) {
          try {
            const { data: episodeData, error } = await supabase
              .from('episode')
              .select('*')
              .eq('episode_id', episodeId)
              .single();

            if (!error && episodeData) {
              episodes.push({
                id: episodeData.episode_id,
                title: episodeData.title || `Episode ${episodes.length + 1}`,
                description: episodeData.description || 'No description available',
                duration: episodeData.duration || null,
                thumbnail_url: episodeData.thumbnail_url || null
              });
            }
          } catch (err) {
            console.error('Error fetching episode:', err);
          }
        }

        setCurrentSeasonEpisodes(episodes.reverse());
      } else {
        setCurrentSeasonDetails(null);
      }
    };

    fetchEpisodeData();
    setShowAllDetails(false);
  }, [content, selectedSeason]);

  // Get content details
  const getContentDetails = React.useMemo(() => {
    if (!content) {
      return {
        description: '',
        release_year: null,
        rating_type: null,
        rating: null,
        duration: null,
        directors: [],
        writers: [],
        cast: [],
        thumbnail_url: '',
        trailer_url: '',
        genres: []
      };
    }

    if (content.content_type === 'Movie' && content.movie) {
      return {
        description: content.movie.description,
        release_year: content.movie.release_year,
        rating_type: content.movie.rating_type,
        rating: content.movie.rating,
        duration: content.movie.duration,
        directors: content.movie.director || [],
        writers: content.movie.writer || [],
        cast: content.movie.cast_members || [],
        thumbnail_url: content.movie.thumbnail_url,
        trailer_url: content.movie.trailer_url,
        genres: content.genre || []
      };
    } else if (content.content_type === 'Web Series') {
      if (currentSeasonDetails) {
        return {
          description: currentSeasonDetails.season_description || '',
          release_year: currentSeasonDetails.release_year || new Date().getFullYear(),
          rating_type: currentSeasonDetails.rating_type || 'Not Rated',
          rating: currentSeasonDetails.rating || 0,
          duration: null,
          directors: currentSeasonDetails.director || [],
          writers: currentSeasonDetails.writer || [],
          cast: currentSeasonDetails.cast_members || [],
          thumbnail_url: currentSeasonDetails.thumbnail_url || '',
          trailer_url: currentSeasonDetails.trailer_url || '',
          genres: content.genre || []
        };
      }

      if (content.web_series?.seasons && content.web_series.seasons.length > 0) {
        const season = content.web_series.seasons[selectedSeason - 1] || content.web_series.seasons[0];
        return {
          description: season.season_description || '',
          release_year: season.release_year || new Date().getFullYear(),
          rating_type: season.rating_type || 'Not Rated',
          rating: season.rating || 0,
          duration: null,
          directors: season.director || [],
          writers: season.writer || [],
          cast: season.cast_members || [],
          thumbnail_url: season.thumbnail_url || '',
          trailer_url: season.trailer_url || '',
          genres: content.genre || []
        };
      } else {
        return {
          description: content.web_series?.description || '',
          release_year: content.web_series?.release_year || new Date().getFullYear(),
          rating_type: content.web_series?.rating_type || 'Not Rated',
          rating: content.web_series?.rating || 0,
          duration: null,
          directors: content.web_series?.directors || [],
          writers: content.web_series?.writers || [],
          cast: content.web_series?.cast_members || [],
          thumbnail_url: content.web_series?.thumbnail_url || '',
          trailer_url: content.web_series?.trailer_url || '',
          genres: content.genre || []
        };
      }
    } else if (content.content_type === 'Show' && content.show) {
      return {
        description: content.show.description,
        release_year: content.show.release_year,
        rating_type: content.show.rating_type,
        rating: content.show.rating,
        duration: null,
        directors: content.show.directors || [],
        writers: content.show.writers || [],
        cast: content.show.cast_members || [],
        thumbnail_url: content.show.thumbnail_url,
        trailer_url: content.show.trailer_url,
        genres: content.show.genres || content.genre || []
      };
    }

    return {
      description: '',
      release_year: null,
      rating_type: null,
      rating: null,
      duration: null,
      directors: [],
      writers: [],
      cast: [],
      thumbnail_url: '',
      trailer_url: '',
      genres: []
    };
  }, [content, selectedSeason, currentSeasonDetails]);

  const details = getContentDetails;

  if (isLoading || !adsLoaded) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <div className="text-lg mb-4">
                  {isLoading ? 'Loading content...' : 'Loading advertisements...'}
                </div>
                {!adsLoaded && (
                  <div className="text-sm text-gray-400">
                    Preparing ad content for optimal display...
                  </div>
                )}
              </div>
            </div>
            
            {/* Hidden ad components that load during loading screen */}
            {!isLoading && !adsLoaded && (
              <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }}>
                <div id="details-ads-section-1">
                  <DetailsAd1 />
                </div>
                <div id="details-ads-section-2">
                  <DetailsAd2 />
                </div>
                <div id="details-ads-section-3">
                  <DetailsAd3 />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-lg mb-4">Content not found</div>
                <div className="text-sm text-gray-400">ID: {id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handlePlayClick = (episodeId?: string) => {
    if (!content || !content.content_id) {
      console.error('Invalid content data, cannot navigate to player');
      return;
    }

    try {
      if (content.content_type === 'Movie') {
        navigate(`/player/${content.content_id}`, { state: content, replace: false });
      } else if (episodeId) {
        navigate(`/player/${content.content_id}?episode=${episodeId}`, { state: content, replace: false });
      } else {
        if (content.content_type === 'Web Series' && currentSeasonEpisodes.length > 0) {
          const firstEpisodeId = currentSeasonEpisodes[0].id;
          navigate(`/player/${content.content_id}?episode=${firstEpisodeId}`, { state: content, replace: false });
        } else if (content.content_type === 'Show' && content.show?.episode_id_list?.length > 0) {
          const firstEpisodeId = content.show.episode_id_list[0];
          navigate(`/player/${content.content_id}?episode=${firstEpisodeId}`, { state: content, replace: false });
        } else {
          navigate(`/player/${content.content_id}`, { state: content, replace: false });
        }
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleTrailerClick = () => {
    setIsTrailerModalOpen(true);
  };

  const getCountInfo = () => {
    if (content.content_type === 'Web Series') {
      if (content.web_series?.season_id_list) {
        const seasonCount = content.web_series.season_id_list.length;
        return `${seasonCount} Season${seasonCount > 1 ? 's' : ''}`;
      } else if (content.web_series?.seasons) {
        const seasonCount = content.web_series.seasons.length;
        return `${seasonCount} Season${seasonCount > 1 ? 's' : ''}`;
      }
    } else if (content.content_type === 'Show' && content.show?.episode_id_list) {
      const episodeCount = content.show.episode_id_list.length;
      return `${episodeCount} Episode${episodeCount > 1 ? 's' : ''}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen">
      <Header />

      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
        trailerUrl={details.trailer_url || ''}
        title={content?.title || 'Content'}
      />

      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="sm"
              className="bg-primary/5 backdrop-blur-sm border border-primary/30 text-primary hover:bg-gradient-to-br hover:from-black/30 hover:via-[#0A7D4B]/5 hover:to-black/30 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="space-y-8">
            {/* Content Details Card */}
            <Card className="bg-gradient-to-br from-black/90 via-[#0A7D4B]/20 to-black/90 backdrop-blur-sm border border-border/50 wave-transition relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="player-wave-bg-1"></div>
                <div className="player-wave-bg-2"></div>
                <div className="player-wave-bg-3"></div>
              </div>

              <CardContent className="p-8 relative z-10">
                {content.content_type === 'Movie' ? (
                  <div className="space-y-6">
                    <div className="absolute top-8 right-8">
                      <div className="bg-gradient-to-r from-yellow-600/90 to-yellow-700/90 backdrop-blur-sm border border-yellow-500/50 rounded-lg px-4 py-2 shadow-lg">
                        <span className="text-yellow-100 text-sm font-bold">Movie</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div 
                          className="relative overflow-hidden rounded-lg cursor-pointer group aspect-[16/9]"
                          onClick={() => handlePlayClick()}
                        >
                          <img
                            src={details.thumbnail_url || '/placeholder.svg'}
                            alt={content.title}
                            className="w-full h-full object-cover rounded-lg border border-primary/20 shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                            <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button 
                            onClick={() => handlePlayClick()}
                            className="w-full bg-primary/10 backdrop-blur-sm border border-primary/50 text-primary hover:bg-gradient-to-br hover:from-black/60 hover:via-[#0A7D4B]/10 hover:to-black/60 hover:border-primary/30 transition-all duration-300"
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Play
                          </Button>
                          <Button 
                            onClick={handleTrailerClick}
                            variant="outline"
                            className="w-full bg-primary/5 backdrop-blur-sm border border-primary/30 text-primary hover:bg-gradient-to-br hover:from-black/30 hover:via-[#0A7D4B]/5 hover:to-black/30 hover:border-primary/20 transition-all duration-300"
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Trailer
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-6 pr-16 pt-12">
                        <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>

                        <div className="flex items-center space-x-3 flex-wrap">
                          {details.rating_type && (
                            <span className="bg-primary/20 text-primary px-2 py-1 rounded-md border border-primary/30 text-xs font-medium">
                              {details.rating_type}
                            </span>
                          )}
                          {details.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-foreground text-xs font-medium">
                                {details.rating}
                              </span>
                            </div>
                          )}
                          {details.release_year && (
                            <span className="text-muted-foreground text-xs font-medium">
                              {details.release_year}
                            </span>
                          )}
                          {details.duration && (
                            <span className="text-muted-foreground text-xs font-medium">
                              {details.duration} min
                            </span>
                          )}
                        </div>

                        <div className="space-y-4">
                          {!showAllDetails && details.description && (
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                              {details.description}
                            </p>
                          )}

                          <button 
                            onClick={() => setShowAllDetails(!showAllDetails)}
                            className="text-primary hover:text-primary/80 text-sm font-medium bg-transparent border-none p-0 cursor-pointer transition-colors duration-300 animate-pulse"
                          >
                            {showAllDetails ? 'Show Less' : 'See More'}
                          </button>

                          {showAllDetails && (
                            <div className="space-y-4 animate-in slide-in-from-top-5 duration-300">
                              {details.description && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
                                  <p className="text-muted-foreground text-sm leading-relaxed">
                                    {details.description}
                                  </p>
                                </div>
                              )}

                              {details.directors.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Directors</h4>
                                  <p className="text-muted-foreground text-sm">
                                    {details.directors.join(', ')}
                                  </p>
                                </div>
                              )}

                              {details.writers.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Writers</h4>
                                  <p className="text-muted-foreground text-sm">
                                    {details.writers.join(', ')}
                                  </p>
                                </div>
                              )}

                              {details.cast.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Cast</h4>
                                  <p className="text-muted-foreground text-sm">
                                    {details.cast.join(', ')}
                                  </p>
                                </div>
                              )}

                              {details.genres.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Genres</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {details.genres.map((genre, index) => {
                                      const genreColors = {
                                        'Action': 'bg-red-500/20 text-red-300 border-red-500/30',
                                        'Adventure': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
                                        'Comedy': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
                                        'Drama': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                                        'Horror': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
                                        'Thriller': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
                                        'Sci-Fi': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                                        'Fantasy': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
                                        'Romance': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
                                        'Crime': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
                                        'Family': 'bg-green-500/20 text-green-300 border-green-500/30'
                                      };
                                      const colorClass = genreColors[genre] || 'bg-primary/20 text-primary border-primary/30';
                                      return (
                                        <span key={index} className={`px-2 py-1 rounded-md text-xs font-medium border ${colorClass}`}>
                                          {genre}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6 relative">
                      <div className="pr-32 pt-12">
                        <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
                          <img
                            key={`${content.content_id}-${selectedSeason}-${details.thumbnail_url}`}
                            src={details.thumbnail_url || '/placeholder.svg'}
                            alt={content.title}
                            className="w-full h-full object-cover rounded-lg border border-primary/20 shadow-2xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        {content.content_type !== 'Web Series' && content.content_type !== 'Show' && (
                          <Button 
                            onClick={() => handlePlayClick()}
                            className="w-full bg-primary/10 backdrop-blur-sm border border-primary/50 text-primary hover:bg-gradient-to-br hover:from-black/60 hover:via-[#0A7D4B]/10 hover:to-black/60 hover:border-primary/30 transition-all duration-300"
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Play
                          </Button>
                        )}
                        <Button 
                          onClick={handleTrailerClick}
                          variant="outline"
                          className="w-full bg-primary/5 backdrop-blur-sm border border-primary/30 text-primary hover:bg-gradient-to-br hover:from-black/30 hover:via-[#0A7D4B]/5 hover:to-black/30 hover:border-primary/20 transition-all duration-300"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Trailer
                        </Button>
                      </div>

                      <div key={`details-${content.content_id}-${selectedSeason}-${details.rating_type}-${details.rating}`} className="space-y-4">
                        <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>

                        <div className="flex items-center space-x-3 flex-wrap">
                          {details.rating_type && (
                            <span className="bg-primary/20 text-primary px-2 py-1 rounded-md border border-primary/30 text-xs font-medium">
                              {details.rating_type}
                            </span>
                          )}
                          {details.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-foreground text-xs font-medium">
                                {details.rating}
                              </span>
                            </div>
                          )}
                          {details.release_year && (
                            <span className="text-muted-foreground text-xs font-medium">
                              {details.release_year}
                            </span>
                          )}
                          {content.content_type === 'Web Series' && (
                            <span className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 px-2 py-1 rounded-md border border-blue-500/30 text-xs font-medium">
                              Season {selectedSeason}
                            </span>
                          )}
                          {details.duration && (
                            <span className="text-muted-foreground text-xs font-medium">
                              {details.duration}
                            </span>
                          )}
                        </div>

                        <div className="space-y-4">
                          {!showAllDetails && details.description && (
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                              {details.description}
                            </p>
                          )}

                          <button 
                            onClick={() => setShowAllDetails(!showAllDetails)}
                            className="text-primary hover:text-primary/80 text-sm font-medium bg-transparent border-none p-0 cursor-pointer transition-colors duration-300 animate-pulse"
                          >
                            {showAllDetails ? 'Show Less' : 'See More'}
                          </button>

                          {showAllDetails && (
                            <div className="space-y-4 animate-in slide-in-from-top-5 duration-300">
                              {details.description && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
                                  <p className="text-muted-foreground text-sm leading-relaxed">
                                    {details.description}
                                  </p>
                                </div>
                              )}

                              {details.directors.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Directors</h4>
                                  <p className="text-muted-foreground text-sm">
                                    {details.directors.join(', ')}
                                  </p>
                                </div>
                              )}

                              {details.writers.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Writers</h4>
                                  <p className="text-muted-foreground text-sm">
                                    {details.writers.join(', ')}
                                  </p>
                                </div>
                              )}

                              {details.cast.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Cast</h4>
                                  <p className="text-muted-foreground text-sm">
                                    {details.cast.join(', ')}
                                  </p>
                                </div>
                              )}

                              {details.genres.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Genres</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {details.genres.map((genre, index) => {
                                      const genreColors = {
                                        'Action': 'bg-red-500/20 text-red-300 border-red-500/30',
                                        'Adventure': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
                                        'Comedy': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
                                        'Drama': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                                        'Horror': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
                                        'Thriller': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
                                        'Sci-Fi': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                                        'Fantasy': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
                                        'Romance': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
                                        'Crime': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
                                        'Family': 'bg-green-500/20 text-green-300 border-green-500/30'
                                      };
                                      const colorClass = genreColors[genre] || 'bg-primary/20 text-primary border-primary/30';
                                      return (
                                        <span key={index} className={`px-2 py-1 rounded-md text-xs font-medium border ${colorClass}`}>
                                          {genre}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div key={`season-${selectedSeason}-${content.content_id}`} className="space-y-6 relative">
                      <div className="absolute top-0 right-0 flex items-center gap-3 z-10">
                        {getCountInfo() && (
                          <div className="bg-gradient-to-r from-primary/20 to-primary/30 backdrop-blur-sm border border-primary/40 rounded-lg px-3 py-2 shadow-lg">
                            <span className="text-primary text-sm font-medium">
                              {getCountInfo()}
                            </span>
                          </div>
                        )}
                        <div className="bg-gradient-to-r from-yellow-600/90 to-yellow-700/90 backdrop-blur-sm border border-yellow-500/50 rounded-lg px-4 py-2 shadow-lg">
                          <span className="text-yellow-100 text-sm font-bold">
                            {content.content_type === 'Show' ? 'TV Show' : content.content_type}
                          </span>
                        </div>
                      </div>

                      <div className="h-16"></div>

                      {content.content_type === 'Web Series' && content.web_series?.season_id_list && (
                        <div className="mb-6">
                          <div className="relative">
                            <button
                              onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                              className="flex items-center justify-between w-full p-3 bg-gradient-to-br from-black/90 via-[#0A7D4B]/20 to-black/90 backdrop-blur-sm border border-primary/30 rounded-lg text-left text-primary hover:bg-gradient-to-br hover:from-black/80 hover:via-[#0A7D4B]/30 hover:to-black/80 transition-all duration-300"
                            >
                              <span>Season {selectedSeason}</span>
                              <ChevronDown className={`w-5 h-5 transition-transform ${isSeasonDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isSeasonDropdownOpen && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsSeasonDropdownOpen(false)} />
                                <div 
                                  className="absolute top-full left-0 right-0 z-50 bg-gradient-to-br from-black/95 via-[#0A7D4B]/25 to-black/95 backdrop-blur-sm border border-primary/30 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-2xl"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {content.web_series.season_id_list.map((seasonId, index) => (
                                    <button
                                      key={seasonId}
                                      onClick={() => {
                                        const newSeason = index + 1;
                                        setSelectedSeason(newSeason);
                                        setIsSeasonDropdownOpen(false);
                                        setShowAllDetails(false);
                                        setCurrentSeasonEpisodes([]);
                                      }}
                                      className={`w-full p-3 text-left transition-all duration-300 first:rounded-t-lg last:rounded-b-lg ${
                                        selectedSeason === index + 1 
                                          ? 'bg-gradient-to-r from-[#0A7D4B]/40 to-[#0A7D4B]/60 text-primary border-l-4 border-primary' 
                                          : 'text-primary hover:bg-gradient-to-r hover:from-[#0A7D4B]/20 hover:to-[#0A7D4B]/30'
                                      }`}
                                    >
                                      Season {index + 1}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {currentSeasonEpisodes.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground">
                              {content.content_type === 'Web Series' ? 'Episodes' : 'Latest Episodes'}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {currentSeasonEpisodes.length} episode{currentSeasonEpisodes.length > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className={`space-y-2 ${currentSeasonEpisodes.length > 7 ? 'max-h-96 overflow-y-auto pr-2' : ''}`}>
                            {currentSeasonEpisodes.slice(0, currentSeasonEpisodes.length > 7 ? currentSeasonEpisodes.length : 7).map((episode, index) => (
                              <div
                                key={episode.id}
                                onClick={() => handlePlayClick(episode.id)}
                                className="p-3 bg-primary/5 backdrop-blur-sm border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                              >
                                <div className="flex gap-3">
                                  <div className="flex-shrink-0 relative overflow-hidden rounded-md">
                                    <img
                                      src={episode.thumbnail_url || '/placeholder.svg'}
                                      alt={episode.title}
                                      className="w-24 h-16 object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                      <Play className="w-4 h-4 text-white opacity-0 hover:opacity-70 transition-opacity duration-300" />
                                    </div>
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-foreground truncate">{episode.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{episode.description}</p>
                                    {episode.duration && (
                                      <p className="text-xs text-muted-foreground/70 mt-1">
                                        Duration: {episode.duration} min
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Advertisement Sections */}
            <div className="space-y-6">
              {/* First Advertisement Section - Mobile Banner */}
              <div className="w-full" id="details-ads-section-1">
                <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg">
                  <CardContent className="p-4">
                    <div className="w-full flex justify-center items-center min-h-[60px]">
                      <DetailsAd1 />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Advertisement Section - Leaderboard */}
              <div className="w-full" id="details-ads-section-2">
                <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg">
                  <CardContent className="p-4">
                    <div className="w-full flex justify-center items-center min-h-[70px]">
                      <DetailsAd2 />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Third Advertisement Section - Skyscraper */}
              <div className="w-full flex justify-center" id="details-ads-section-3">
                <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg max-w-[220px]">
                  <CardContent className="p-4">
                    <div className="w-full flex justify-center items-center min-h-[300px]">
                      <DetailsAd3 />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {adsLoaded && <AutoClickAd pageType="details" />}
    </div>
  );
};

export default Details;