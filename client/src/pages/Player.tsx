import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import AutoClickAd from '@/components/AutoClickAd';
import SpecialAdContainer from '@/components/SpecialAdContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Star, Play, Calendar, Clock } from 'lucide-react';
import { useIncrementMovieViews, useIncrementEpisodeViews, useIncrementShowEpisodeViews } from '@/hooks/useViewTracking';

// Individual Ad Components with proper isolation
const PlayerAd2: React.FC = () => {
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
      'key': '9b4e8b40e2674e797095c9825bbf58f0',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    // Set to global scope with unique identifier
    (window as any)[`atOptions_player2_${Date.now()}`] = uniqueOptions;
    (window as any).atOptions = uniqueOptions;

    // Create and load the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.highperformanceformat.com/9b4e8b40e2674e797095c9825bbf58f0/invoke.js';
    script.async = true;
    script.id = `player-ad-2-script-${Date.now()}`;

    script.onload = () => {
      console.log('Player Ad 2 loaded successfully');
      setAdLoaded(true);
      
      // Check if ad content actually loaded after a delay
      setTimeout(() => {
        const hasContent = container.querySelector('iframe') || 
                          container.querySelector('div[id*="container-"]') ||
                          container.children.length > 1;
        
        if (!hasContent && retryCount < maxRetries) {
          console.log(`Player Ad 2 content not found, retrying... (${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setAdLoaded(false);
        }
      }, 3000);
    };

    script.onerror = () => {
      console.error('Failed to load Player Ad 2');
      if (retryCount < maxRetries) {
        console.log(`Retrying Player Ad 2... (${retryCount + 1}/${maxRetries})`);
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

const PlayerAd3: React.FC = () => {
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
      'key': 'bae2d0d07c2b8e24730cc20afdd2faa5',
      'format': 'iframe',
      'height': 250,
      'width': 300,
      'params': {}
    };

    // Set to global scope with unique identifier
    (window as any)[`atOptions_player3_${Date.now()}`] = uniqueOptions;
    (window as any).atOptions = uniqueOptions;

    // Create and load the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.highperformanceformat.com/bae2d0d07c2b8e24730cc20afdd2faa5/invoke.js';
    script.async = true;
    script.id = `player-ad-3-script-${Date.now()}`;

    script.onload = () => {
      console.log('Player Ad 3 loaded successfully');
      setAdLoaded(true);
      
      // Check if ad content actually loaded after a delay
      setTimeout(() => {
        const hasContent = container.querySelector('iframe') || 
                          container.querySelector('div[id*="container-"]') ||
                          container.children.length > 1;
        
        if (!hasContent && retryCount < maxRetries) {
          console.log(`Player Ad 3 content not found, retrying... (${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setAdLoaded(false);
        }
      }, 3000);
    };

    script.onerror = () => {
      console.error('Failed to load Player Ad 3');
      if (retryCount < maxRetries) {
        console.log(`Retrying Player Ad 3... (${retryCount + 1}/${maxRetries})`);
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
        minHeight: '50px'
      }}
    />
  );
};

const PlayerAd4: React.FC = () => {
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
      'key': '78e88b204108820f7e99c412c9223d3f',
      'format': 'iframe',
      'height': 300,
      'width': 160,
      'params': {}
    };

    // Set to global scope with unique identifier
    (window as any)[`atOptions_player4_${Date.now()}`] = uniqueOptions;
    (window as any).atOptions = uniqueOptions;

    // Create and load the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.highperformanceformat.com/78e88b204108820f7e99c412c9223d3f/invoke.js';
    script.async = true;
    script.id = `player-ad-4-script-${Date.now()}`;

    script.onload = () => {
      console.log('Player Ad 4 loaded successfully');
      setAdLoaded(true);
      
      // Check if ad content actually loaded after a delay
      setTimeout(() => {
        const hasContent = container.querySelector('iframe') || 
                          container.querySelector('div[id*="container-"]') ||
                          container.children.length > 1;
        
        if (!hasContent && retryCount < maxRetries) {
          console.log(`Player Ad 4 content not found, retrying... (${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setAdLoaded(false);
        }
      }, 3000);
    };

    script.onerror = () => {
      console.error('Failed to load Player Ad 4');
      if (retryCount < maxRetries) {
        console.log(`Retrying Player Ad 4... (${retryCount + 1}/${maxRetries})`);
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
      }, 2000);

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

const Player = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get('episode');
  const content = location.state || {};
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [currentSeasonDetails, setCurrentSeasonDetails] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [adsLoaded, setAdsLoaded] = useState(false);

  const incrementMovieViews = useIncrementMovieViews();
  const incrementEpisodeViews = useIncrementEpisodeViews();
  const incrementShowEpisodeViews = useIncrementShowEpisodeViews();

  // Load ads with proper timing
  useEffect(() => {
    console.log('Initializing ads for Player page');
    const timer = setTimeout(() => {
      setAdsLoaded(true);
      console.log('Ads marked as ready to load');
    }, 2000); // Give more time for page to stabilize

    return () => clearTimeout(timer);
  }, []);

  // Fetch episode details if episodeId is provided
  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      if (episodeId) {
        setIsVideoLoading(true);
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          const { data: episodeData, error } = await supabase
            .from('episode')
            .select('*')
            .eq('episode_id', episodeId)
            .single();

          if (!error && episodeData) {
            setCurrentEpisode(episodeData);
          }
        } catch (err) {
          console.error('Error fetching episode details:', err);
        } finally {
          setIsVideoLoading(false);
        }
      } else {
        setIsVideoLoading(false);
      }
    };

    fetchEpisodeDetails();
    setVideoError(false);
  }, [episodeId]);

  // Get season details for web series
  useEffect(() => {
    const fetchSeasonDetails = async () => {
      if (content.content_type === 'Web Series' && content.web_series?.season_id_list) {
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          const seasonId = content.web_series.season_id_list[0];

          if (seasonId) {
            const { data: seasonData, error } = await supabase
              .from('season')
              .select('*')
              .eq('season_id', seasonId)
              .single();

            if (!error && seasonData) {
              setCurrentSeasonDetails(seasonData);
            }
          }
        } catch (err) {
          console.error('Error fetching season details:', err);
        }
      }
    };

    fetchSeasonDetails();
  }, [content]);

  // Get the actual video URL based on content type
  const getVideoUrl = () => {
    if (currentEpisode?.video_url) {
      return currentEpisode.video_url;
    }

    if (content.content_type === 'Movie' && content.movie?.video_url) {
      return content.movie.video_url;
    } 

    if (content.content_type === 'Web Series') {
      if (content.web_series?.seasons?.[0]?.episodes?.[0]?.video_url) {
        return content.web_series.seasons[0].episodes[0].video_url;
      }
    }

    if (content.content_type === 'Show') {
      if (content.show?.episode_id_list?.length > 0) {
        const showVideoUrl = content.videoUrl || content.video_url;
        return showVideoUrl;
      }
    }

    const fallbackUrl = content.videoUrl || content.video_url || content.movie?.video_url;
    return fallbackUrl || '';
  };

  const videoUrl = getVideoUrl();

  // Convert video page URLs to direct video URLs or embed URLs
  const getVideoUrlForPlayer = (url) => {
    if (url.includes('bitchute.com/video/')) {
      const videoId = url.split('/video/')[1].split('?')[0];
      return `https://www.bitchute.com/embed/${videoId}?autoplay=0&hide_share=1&hide_sidebar=1&hide_related=1&disable_download=1`;
    }

    if (url.includes('odysee.com/')) {
      let videoPath = '';
      if (url.includes('odysee.com/@')) {
        const parts = url.split('odysee.com/')[1];
        videoPath = parts;
      } else if (url.includes('lbry.tv/')) {
        const parts = url.split('lbry.tv/')[1];
        videoPath = parts;
      }
      if (videoPath) {
        return `https://odysee.com/$/embed/${videoPath}`;
      }
    }

    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
    }

    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}?autoplay=0`;
    }

    if (url.includes('dailymotion.com/video/')) {
      const videoId = url.split('/video/')[1];
      return `https://www.dailymotion.com/embed/video/${videoId}?autoplay=0`;
    }

    return url;
  };

  // Auto-reload logic
  useEffect(() => {
    let refreshTimer: NodeJS.Timeout;

    const setupAutoRefresh = () => {
      let estimatedDuration = 15 * 60 * 1000;

      if (currentEpisode?.duration) {
        estimatedDuration = currentEpisode.duration * 60 * 1000;
      } else if (content.content_type === 'Movie' && content.movie?.duration) {
        estimatedDuration = content.movie.duration * 60 * 1000;
      }

      estimatedDuration = Math.min(Math.max(estimatedDuration + 30000, 5 * 60 * 1000), 45 * 60 * 1000);

      if (videoUrl && videoUrl.includes('bitchute.com')) {
        estimatedDuration = Math.min(estimatedDuration, 10 * 60 * 1000);
      }

      refreshTimer = setTimeout(() => {
        window.location.reload();
      }, estimatedDuration);
    };

    if (videoUrl && !videoError) {
      setupAutoRefresh();
    }

    return () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
    };
  }, [videoUrl, videoError, currentEpisode, content]);

  // View tracking logic
  useEffect(() => {
    let viewTimer: NodeJS.Timeout;

    const sessionKey = episodeId ? `episode_${episodeId}` : `content_${id}`;
    const hasTrackedKey = `view_tracked_${sessionKey}`;
    const hasTrackedView = sessionStorage.getItem(hasTrackedKey) === 'true';

    const trackView = async () => {
      if (!hasTrackedView && content && (id || episodeId)) {
        try {
          const contentType = content.content_type?.toLowerCase() || content.type?.toLowerCase();
          let trackingPromise = null;

          if (contentType === 'movie' && id) {
            trackingPromise = incrementMovieViews.mutateAsync(id);
          } else if (episodeId) {
            trackingPromise = incrementEpisodeViews.mutateAsync(episodeId);
          } else if (contentType === 'show' && content.show?.episode_id_list?.[0]) {
            const firstEpisodeId = content.show.episode_id_list[0];
            trackingPromise = incrementShowEpisodeViews.mutateAsync(firstEpisodeId);
          } else if (contentType === 'web series' && content.web_series?.seasons?.[0]?.episodes?.[0]) {
            const firstEpisode = content.web_series.seasons[0].episodes[0];
            if (firstEpisode.episode_id) {
              trackingPromise = incrementEpisodeViews.mutateAsync(firstEpisode.episode_id);
            }
          }

          if (trackingPromise) {
            await trackingPromise;
            sessionStorage.setItem(hasTrackedKey, 'true');
          }
        } catch (error) {
          console.error('Error tracking view:', error);
        }
      }
    };

    if (content && videoUrl && !videoError && !hasTrackedView && (id || episodeId)) {
      viewTimer = setTimeout(() => {
        trackView();
      }, 30000);
    }

    return () => {
      if (viewTimer) {
        clearTimeout(viewTimer);
      }
    };
  }, [content, currentEpisode, id, incrementMovieViews, incrementEpisodeViews, incrementShowEpisodeViews, episodeId, videoUrl, videoError]);

  const getContentTypeDisplay = () => {
    switch (content.content_type) {
      case 'Movie': return 'Movie';
      case 'Web Series': return 'Web Series';
      case 'Show': return 'TV Show';
      default: 
        if (content.type === 'series') return 'Web Series';
        if (content.type === 'show') return 'TV Show';
        return content.content_type || content.type || 'Content';
    }
  };

  const getEpisodeInfo = () => {
    if (currentEpisode) {
      const episodeMatch = currentEpisode.title?.match(/episode\s*(\d+)/i);
      if (episodeMatch) {
        return `Episode ${episodeMatch[1]}`;
      }
      return `Episode ${currentEpisode.episode_number || '1'}`;
    }
    return null;
  };

  const getSeasonInfo = () => {
    if (content.content_type === 'Web Series') {
      if (currentSeasonDetails?.season_number) {
        return `Season ${currentSeasonDetails.season_number}`;
      } else if (content.seasonNumber) {
        return `Season ${content.seasonNumber}`;
      }
      return 'Season 1';
    }
    return null;
  };

  const getDuration = () => {
    if (currentEpisode?.duration) {
      return `${currentEpisode.duration} min`;
    }
    if (content.content_type === 'Movie' && content.movie?.duration) {
      return `${content.movie.duration} min`;
    }
    return null;
  };

  const getDescription = () => {
    if (currentEpisode?.description) {
      return currentEpisode.description;
    }
    if (content.content_type === 'Movie' && content.movie?.description) {
      return content.movie.description;
    } else if (content.content_type === 'Web Series' && currentSeasonDetails?.season_description) {
      return currentSeasonDetails.season_description;
    } else if (content.content_type === 'Show' && content.show?.description) {
      return content.show.description;
    }
    return content.description || 'No description available';
  };

  const getRatingInfo = () => {
    if (content.content_type === 'Movie' && content.movie) {
      return {
        rating_type: content.movie.rating_type,
        rating: content.movie.rating,
        release_year: content.movie.release_year
      };
    } else if (content.content_type === 'Web Series' && currentSeasonDetails) {
      return {
        rating_type: currentSeasonDetails.rating_type,
        rating: currentSeasonDetails.rating,
        release_year: currentSeasonDetails.release_year
      };
    } else if (content.content_type === 'Show' && content.show) {
      return {
        rating_type: content.show.rating_type,
        rating: content.show.rating,
        release_year: content.show.release_year
      };
    }
    return {
      rating_type: content.rating_type || content.rating || 'Not Rated',
      rating: content.score || content.rating || 0,
      release_year: content.year || content.release_year || new Date().getFullYear()
    };
  };

  const ratingInfo = getRatingInfo();

  const handlePlay = () => {
    console.log('Video started playing');
  };

  // Safety check
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      const hasValidContent = content && (content.content_type || content.type);
      const hasValidIds = id || episodeId;
      const hasVideoUrl = !!videoUrl;
      const isStillLoading = isVideoLoading;

      if (!hasValidContent && !hasValidIds && !hasVideoUrl && !isStillLoading) {
        navigate('/', { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [content, navigate, episodeId, id, videoUrl, isVideoLoading]);

  // Show loading screen while ads are loading
  if (!adsLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <div className="text-lg mb-4">Loading advertisements...</div>
                <div className="text-sm text-gray-400">
                  Preparing content for optimal viewing...
                </div>
              </div>
            </div>
            
            {/* Hidden ad components that load during loading screen */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }}>
              <div id="player-ads-section-2">
                <PlayerAd2 />
              </div>
              <div id="player-ads-section-3">
                <PlayerAd3 />
              </div>
              <div id="player-ads-section-4">
                <PlayerAd4 />
              </div>
              <div id="player-special-ad-section">
                <SpecialAdContainer 
                  containerId="special-ad-player-loading"
                  className="w-full text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
            {/* Video Player Section */}
            <Card className="bg-gradient-to-br from-black/90 via-[#0A7D4B]/20 to-black/90 backdrop-blur-sm border border-border/50 wave-transition relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="player-wave-bg-1"></div>
                <div className="player-wave-bg-2"></div>
                <div className="player-wave-bg-3"></div>
              </div>

              <CardContent className="p-8 relative z-10">
                {/* Video Player */}
                <div className="w-full max-w-4xl mx-auto mb-8">
                  <div className="aspect-video bg-gradient-to-br from-black/95 via-[#0A7D4B]/10 to-black/95 rounded-xl relative border border-primary/20 shadow-2xl overflow-hidden custom-video-container">
                    {isVideoLoading && !content ? (
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-black/95 via-[#0A7D4B]/10 to-black/95 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 animate-pulse">
                            <Play className="w-8 h-8 text-primary fill-current animate-spin" />
                          </div>
                          <div className="text-primary text-xl font-semibold mb-2 animate-pulse">
                            Loading Content...
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Please wait while we prepare your video
                          </p>
                        </div>
                      </div>
                    ) : videoUrl && !videoError ? (
                      <div className="relative w-full h-full">
                        {videoUrl.includes('bitchute.com') || videoUrl.includes('odysee.com') || videoUrl.includes('lbry.tv') || videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com') || videoUrl.includes('dailymotion.com') ? (
                          <iframe
                            className="w-full h-full rounded-xl"
                            src={getVideoUrlForPlayer(videoUrl)}
                            title="Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            onLoad={() => setIsVideoLoading(false)}
                            onError={() => {
                              setVideoError(true);
                              setIsVideoLoading(false);
                            }}
                            style={{
                              filter: 'contrast(1.1) brightness(1.05)',
                              outline: 'none',
                              transition: 'opacity 0.3s ease'
                            }}
                          />
                        ) : (
                          <video
                            className="w-full h-full rounded-xl object-cover custom-video-player"
                            controls
                            poster={content.image || content.thumbnail_url || content.movie?.thumbnail_url}
                            preload="metadata"
                            autoPlay={false}
                            onLoadStart={() => setIsVideoLoading(true)}
                            onCanPlay={() => setIsVideoLoading(false)}
                            onError={() => {
                              setVideoError(true);
                              setIsVideoLoading(false);
                            }}
                            onEnded={() => {
                              setTimeout(() => {
                                window.location.reload();
                              }, 2000);
                            }}
                            onPlay={handlePlay}
                            style={{
                              filter: 'contrast(1.1) brightness(1.05)',
                              outline: 'none',
                              transition: 'opacity 0.3s ease'
                            }}
                          >
                            <source src={getVideoUrlForPlayer(videoUrl)} type="video/mp4" />
                            <source src={getVideoUrlForPlayer(videoUrl)} type="video/webm" />
                            <source src={getVideoUrlForPlayer(videoUrl)} type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        )}

                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 pointer-events-none"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-black/95 via-[#0A7D4B]/10 to-black/95 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                            <Play className="w-8 h-8 text-primary fill-current" />
                          </div>
                          <div className="text-primary text-xl font-semibold mb-2">
                            {videoError ? "Unable to Play Content" : "⚠️ Video Not Available"}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {videoError ? "The video could not be loaded or played" : "No video URL found for this content"}
                          </p>
                          {!videoError && (
                            <p className="text-xs text-muted-foreground/70 mt-2">
                              Content Type: {getContentTypeDisplay()}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Information */}
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-3xl font-bold text-foreground">
                      {content.content_type === 'Web Series' ? content.title : 
                       content.content_type === 'Show' ? content.show?.title || content.title :
                       currentEpisode?.title || content.title}
                    </h1>
                    <div className="flex items-center space-x-3">
                      {content.content_type === 'Web Series' && getSeasonInfo() && (
                        <span className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 px-3 py-1 rounded-md border border-blue-500/30 text-sm font-medium">
                          {getSeasonInfo()}
                        </span>
                      )}
                      {(content.content_type === 'Web Series' || content.content_type === 'Show') && getEpisodeInfo() && (
                        <span className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 px-3 py-1 rounded-md border border-purple-500/30 text-sm font-medium">
                          {getEpisodeInfo()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 flex-wrap">
                    {ratingInfo.rating_type && (
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-md border border-primary/30 text-sm font-medium">
                        {ratingInfo.rating_type}
                      </span>
                    )}
                    {ratingInfo.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-foreground text-sm font-medium">
                          {ratingInfo.rating}
                        </span>
                      </div>
                    )}
                    {ratingInfo.release_year && (
                      <span className="text-muted-foreground text-sm font-medium">
                        {ratingInfo.release_year}
                      </span>
                    )}
                    {getDuration() && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm font-medium">
                          {getDuration()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Description</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {getDescription()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advertisement Sections */}
            <div className="space-y-6">
              {/* Special Advertisement Section - Top Priority */}
              <div className="w-full" id="player-special-ad-section">
                <Card className="bg-gradient-to-br from-black/25 via-[#0A7D4B]/12 to-black/25 backdrop-blur-sm border border-primary/25 shadow-xl">
                  <CardContent className="p-5">
                    <div className="w-full flex justify-center items-center min-h-[80px]">
                      <SpecialAdContainer 
                        containerId="special-ad-player-top"
                        className="w-full text-center"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Advertisement Section - Banner Format */}
              <div className="w-full" id="player-ads-section-2">
                <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg">
                  <CardContent className="p-4">
                    <div className="w-full flex justify-center items-center min-h-[100px]">
                      <PlayerAd2 />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Third and Fourth Advertisement Sections - Side by Side Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Third Advertisement Section - Medium Rectangle */}
                <div className="w-full flex justify-center" id="player-ads-section-3">
                  <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg max-w-[370px] w-full">
                    <CardContent className="p-4">
                      <div className="flex justify-center items-center min-h-[280px]">
                        <PlayerAd3 />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Fourth Advertisement Section - Skyscraper */}
                <div className="w-full flex justify-center" id="player-ads-section-4">
                  <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg max-w-[220px] w-full">
                    <CardContent className="p-4">
                      <div className="flex justify-center items-center min-h-[320px]">
                        <PlayerAd4 />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {adsLoaded && <AutoClickAd pageType="player" />}
    </div>
  );
};

export default Player;