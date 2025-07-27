
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string;
  title: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose, trailerUrl, title }) => {
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<any>(null);
  const timeCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Function to extract video ID from various video URL formats
  const getEmbedUrl = (url: string) => {
    if (!url) return '';

    // YouTube URLs - completely hide controls and related videos
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&widget_referrer=${window.location.origin}` : '';
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&disablekb=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&widget_referrer=${window.location.origin}` : '';
    }

    // Vimeo URLs
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&controls=0` : '';
    }

    // Dailymotion URLs
    if (url.includes('dailymotion.com/video/')) {
      const videoId = url.split('dailymotion.com/video/')[1]?.split('?')[0];
      return videoId ? `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1&mute=1` : '';
    }

    // If it's already an embed URL or direct video URL, use it as is
    if (url.includes('embed') || url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg')) {
      return url;
    }

    // For other URLs, return empty string to show "not available" message
    return '';
  };

  const embedUrl = getEmbedUrl(trailerUrl);

  const handleIframeError = () => {
    setHasError(true);
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  const resetError = () => {
    setHasError(false);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current && isPlayerReady && typeof playerRef.current.getDuration === 'function') {
      try {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const progressBarWidth = rect.width;
        const clickedPositionPercentage = clickPosition / progressBarWidth;
        const videoDuration = playerRef.current.getDuration();
        
        if (videoDuration > 0) {
          const seekToTime = videoDuration * clickedPositionPercentage;
          playerRef.current.seekTo(seekToTime);
        }
      } catch (error) {
        console.log('Seek error:', error);
      }
    }
  };

  // Initialize YouTube player with API
  useEffect(() => {
    if (!isOpen) return;

    if (embedUrl.includes('youtube.com/embed')) {
      const videoId = trailerUrl.includes('youtube.com/watch') 
        ? trailerUrl.split('v=')[1]?.split('&')[0]
        : trailerUrl.includes('youtu.be/')
        ? trailerUrl.split('youtu.be/')[1]?.split('?')[0]
        : null;

      if (videoId) {
        // Add a small delay to ensure container is ready
        const initTimer = setTimeout(() => {
          if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(script);
            
            window.onYouTubeIframeAPIReady = () => {
              initializePlayer(videoId);
            };
          } else {
            // Wait for YT to be fully loaded
            if (window.YT.Player) {
              initializePlayer(videoId);
            } else {
              // If YT exists but Player isn't ready, wait a bit
              const checkYT = setInterval(() => {
                if (window.YT.Player) {
                  clearInterval(checkYT);
                  initializePlayer(videoId);
                }
              }, 100);
              
              // Clear interval after 5 seconds to prevent infinite loop
              setTimeout(() => clearInterval(checkYT), 5000);
            }
          }
        }, 100);

        return () => clearTimeout(initTimer);
      }

      function initializePlayer(videoId: string) {
        if (containerRef.current && window.YT && window.YT.Player && isOpen) {
          // Clear container first
          containerRef.current.innerHTML = '';

          // Create player div
          const playerDiv = document.createElement('div');
          playerDiv.id = 'youtube-player-' + Date.now();
          containerRef.current.appendChild(playerDiv);

          try {
            playerRef.current = new window.YT.Player(playerDiv.id, {
              height: '100%',
              width: '100%',
              videoId: videoId,
              playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                rel: 0,
                modestbranding: 1,
                showinfo: 0,
                fs: 0,
                cc_load_policy: 0,
                iv_load_policy: 3,
                autohide: 1,
                disablekb: 1,
                playsinline: 1,
                enablejsapi: 1,
                origin: window.location.origin,
                widget_referrer: window.location.origin,
                start: 0
              },
              events: {
                onReady: (event: any) => {
                  console.log('YouTube player ready');
                  if (isOpen) {
                    setIsPlayerReady(true);
                    event.target.playVideo();

                    // Start progress tracking
                    if (timeCheckIntervalRef.current) {
                      clearInterval(timeCheckIntervalRef.current);
                    }

                    timeCheckIntervalRef.current = setInterval(() => {
                      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function' && typeof playerRef.current.getDuration === 'function' && isOpen) {
                        try {
                          const currentTime = playerRef.current.getCurrentTime();
                          const totalDuration = playerRef.current.getDuration();

                          if (totalDuration > 0) {
                            const progressPercent = (currentTime / totalDuration) * 100;
                            setProgress(progressPercent);

                            // Close modal 5 seconds before video ends
                            if (totalDuration - currentTime <= 5) {
                              onClose();
                            }
                          }
                        } catch (error) {
                          console.log('Progress tracking error:', error);
                        }
                      }
                    }, 1000);
                  }
                },
                onStateChange: (event: any) => {
                  // If video ends, close modal
                  if (event.data === window.YT.PlayerState.ENDED) {
                    onClose();
                  }
                },
                onError: (error: any) => {
                  console.error('YouTube player error:', error);
                  setHasError(true);
                }
              }
            });
          } catch (error) {
            console.error('Error creating YouTube player:', error);
            setHasError(true);
          }
        }
      }
    }
  }, [isOpen, embedUrl, trailerUrl, onClose]);

  // Cleanup when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Clear interval first
      if (timeCheckIntervalRef.current) {
        clearInterval(timeCheckIntervalRef.current);
        timeCheckIntervalRef.current = null;
      }
      
      // Destroy player with proper error handling
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.destroy === 'function') {
            playerRef.current.destroy();
          } else if (typeof playerRef.current.stopVideo === 'function') {
            playerRef.current.stopVideo();
          }
        } catch (error) {
          console.log('Player cleanup error:', error);
        }
        playerRef.current = null;
      }
      
      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      
      // Reset all state
      resetError();
      setProgress(0);
      setIsPlayerReady(false);
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-full bg-gradient-to-br from-black/95 via-[#0A7D4B]/20 to-black/95 backdrop-blur-sm border border-border/50 p-6 trailer-modal">
          <DialogTitle className="sr-only">Movie Trailer</DialogTitle>
          <DialogDescription className="sr-only">Watch the trailer for this movie</DialogDescription>
          <div className="space-y-4">
            <h2 className="text-foreground text-xl font-semibold">
              {title} - Trailer
            </h2>

            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              {embedUrl && !hasError ? (
                embedUrl.includes('.mp4') || embedUrl.includes('.webm') || embedUrl.includes('.ogg') ? (
                  // For direct video files
                  <video
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    controls
                    autoPlay
                    muted
                    src={embedUrl}
                    onError={handleVideoError}
                    onTimeUpdate={(e) => {
                      const video = e.target as HTMLVideoElement;
                      if (video.duration > 0) {
                        const progressPercent = (video.currentTime / video.duration) * 100;
                        setProgress(progressPercent);

                        if (video.duration - video.currentTime <= 5) {
                          onClose();
                        }
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : embedUrl.includes('youtube.com/embed') ? (
                  // YouTube player container
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div 
                      ref={containerRef}
                      className="absolute top-0 left-0 w-full h-full rounded-lg bg-black overflow-hidden"
                      style={{ pointerEvents: 'none' }}
                    />

                    {/* Custom progress bar overlay */}
                    <div 
                      className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-full h-2 backdrop-blur-sm z-50 cursor-pointer hover:scale-y-125 transition-transform duration-200"
                      onClick={handleProgressBarClick}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                        style={{ 
                          width: `${progress}%`
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  // Other video platforms
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={embedUrl}
                    title={`${title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onError={handleIframeError}
                    style={{ pointerEvents: 'none' }}
                  />
                )
              ) : (
                // Show message when no valid URL is available or error occurred
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-black/80 via-[#0A7D4B]/10 to-black/80 rounded-lg border border-border/30">
                  <div className="text-center">
                    <div className="text-6xl mb-4 text-primary/30">🎬</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Currently Trailer Is Not Available</h3>
                    <p className="text-muted-foreground">Please check back later for the trailer.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrailerModal;
