"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Maximize,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type VideoPlayerProps = {
  courseTitle: string;
  lessonTitle: string;
  lessonDescription?: string;
  lessonNumber?: number;
  totalLessons?: number;
  duration?: number;
  videoUrl?: string | null;
  notesUrl?: string | null;
  isCompleted?: boolean;
  studentCount?: number;
};

export default function VideoPlayer({
  courseTitle,
  lessonTitle,
  lessonDescription,
  lessonNumber = 1,
  totalLessons,
  duration = 0,
  videoUrl,
  notesUrl,
  isCompleted = false,
  studentCount,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /*
   * ==========================================================
   * VIDEO EVENTS
   * ==========================================================
   */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (Number.isFinite(video.duration)) {
        setVideoDuration(video.duration);
      }

      setIsLoading(false);
      setHasError(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);

      if (Number.isFinite(video.duration)) {
        setCurrentTime(video.duration);
      }
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };

    video.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    video.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    video.addEventListener(
      "play",
      handlePlay
    );

    video.addEventListener(
      "pause",
      handlePause
    );

    video.addEventListener(
      "waiting",
      handleWaiting
    );

    video.addEventListener(
      "playing",
      handlePlaying
    );

    video.addEventListener(
      "ended",
      handleEnded
    );

    video.addEventListener(
      "error",
      handleError
    );

    return () => {
      video.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      video.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      video.removeEventListener(
        "play",
        handlePlay
      );

      video.removeEventListener(
        "pause",
        handlePause
      );

      video.removeEventListener(
        "waiting",
        handleWaiting
      );

      video.removeEventListener(
        "playing",
        handlePlaying
      );

      video.removeEventListener(
        "ended",
        handleEnded
      );

      video.removeEventListener(
        "error",
        handleError
      );
    };
  }, []);

  /*
   * ==========================================================
   * FULLSCREEN EVENT
   * ==========================================================
   */

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement !== null
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  /*
   * ==========================================================
   * PLAY / PAUSE
   * ==========================================================
   */

  const togglePlay = useCallback(
    async () => {
      const video = videoRef.current;

      if (!video || hasError) {
        return;
      }

      try {
        if (video.paused) {
          setIsLoading(true);

          await video.play();
        } else {
          video.pause();
        }
      } catch (error) {
        console.error(
          "VIDEO PLAY ERROR:",
          error
        );

        setIsLoading(false);
      }
    },
    [hasError]
  );

  /*
   * ==========================================================
   * MUTE / UNMUTE
   * ==========================================================
   */

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = !video.muted;

    setIsMuted(video.muted);
  };

  /*
   * ==========================================================
   * SEEK
   * ==========================================================
   */

  const handleSeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextTime = Number(
      event.target.value
    );

    if (!Number.isFinite(nextTime)) {
      return;
    }

    video.currentTime = nextTime;

    setCurrentTime(nextTime);
  };

  /*
   * ==========================================================
   * FULLSCREEN
   * ==========================================================
   */

  const toggleFullscreen = async () => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await player.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(
        "VIDEO FULLSCREEN ERROR:",
        error
      );
    }
  };

  /*
   * ==========================================================
   * RETRY VIDEO
   * ==========================================================
   */

  const retryVideo = () => {
    const video = videoRef.current;

    setHasError(false);
    setIsLoading(true);

    if (!video) {
      return;
    }

    video.load();
  };

  /*
   * ==========================================================
   * VIDEO DURATION
   * ==========================================================
   */

  const displayDuration =
    videoDuration > 0
      ? videoDuration
      : duration > 0
      ? duration * 60
      : 0;

  const progressPercentage =
    displayDuration > 0
      ? Math.min(
          Math.max(
            (currentTime / displayDuration) *
              100,
            0
          ),
          100
        )
      : 0;

  /*
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <section
      ref={playerRef}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
    >
      {/* =====================================================
          VIDEO HEADER
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
                <Play
                  size={13}
                  fill="currentColor"
                />

                Lesson {lessonNumber}

                {totalLessons
                  ? ` / ${totalLessons}`
                  : ""}
              </span>

              {isCompleted && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={14} />

                  Completed
                </span>
              )}
            </div>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">
              {courseTitle}
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {lessonTitle}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck size={18} />

            Secure Learning
          </div>
        </div>
      </div>

      {/* =====================================================
          VIDEO PLAYER
      ===================================================== */}

      <div
        className="relative bg-slate-950"
        onMouseEnter={() =>
          setShowControls(true)
        }
        onMouseLeave={() =>
          setShowControls(true)
        }
      >
        {videoUrl && !hasError ? (
          <>
            <div className="relative aspect-video overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={videoUrl}
                preload="metadata"
                playsInline
                className="h-full w-full object-contain"
                aria-label={lessonTitle}
                onClick={togglePlay}
              />

              {/* =================================================
                  LOADING
              ================================================= */}

              {isLoading && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 shadow-2xl backdrop-blur-md">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-cyan-400" />
                  </div>
                </div>
              )}

              {/* =================================================
                  CENTER PLAY
              ================================================= */}

              {!isPlaying && !isLoading && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play lesson video"
                  className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-500 text-white shadow-2xl shadow-cyan-500/30 transition hover:scale-105 hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-300/40"
                >
                  <Play
                    size={32}
                    fill="currentColor"
                    className="ml-1"
                  />
                </button>
              )}
            </div>

            {/* =================================================
                VIDEO CONTROLS
            ================================================= */}

            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 ${
                showControls
                  ? "opacity-100"
                  : "opacity-100"
              }`}
            >
              {/* Progress */}

              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max={displayDuration || 0}
                  step="0.1"
                  value={Math.min(
                    currentTime,
                    displayDuration || 0
                  )}
                  onChange={handleSeek}
                  disabled={!displayDuration}
                  aria-label="Video progress"
                  style={{
                    background: `linear-gradient(to right, rgb(6 182 212) ${progressPercentage}%, rgba(255,255,255,0.3) ${progressPercentage}%)`,
                  }}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-cyan-500 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex items-center gap-2 text-white sm:gap-3">
                {/* Play / Pause */}

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={
                    isPlaying
                      ? "Pause video"
                      : "Play video"
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {isPlaying ? (
                    <Pause
                      size={19}
                      fill="currentColor"
                    />
                  ) : (
                    <Play
                      size={19}
                      fill="currentColor"
                    />
                  )}
                </button>

                {/* Time */}

                <span className="min-w-[92px] text-xs font-semibold text-slate-300 sm:min-w-[105px]">
                  {formatVideoTime(
                    currentTime
                  )}{" "}
                  /{" "}
                  {formatVideoTime(
                    displayDuration
                  )}
                </span>

                <div className="flex-1" />

                {/* Volume */}

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={
                    isMuted
                      ? "Unmute video"
                      : "Mute video"
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {isMuted ? (
                    <VolumeX size={19} />
                  ) : (
                    <Volume2 size={19} />
                  )}
                </button>

                {/* Fullscreen */}

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={
                    isFullscreen
                      ? "Exit fullscreen"
                      : "Enter fullscreen"
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <Maximize size={19} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <VideoUnavailable
            hasError={hasError}
            onRetry={retryVideo}
          />
        )}
      </div>

      {/* =====================================================
          LESSON INFORMATION
      ===================================================== */}

      <div className="p-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900">
                {lessonTitle}
              </h2>

              {isCompleted && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={14} />

                  Lesson Completed
                </span>
              )}
            </div>

            {lessonDescription && (
              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-600">
                {lessonDescription}
              </p>
            )}
          </div>

          {/* Lesson Notes */}

          {notesUrl && (
            <a
              href={notesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <FileText size={18} />

              Lesson Notes
            </a>
          )}
        </div>

        {/* =====================================================
            LESSON META
        ===================================================== */}

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <LessonMeta
            icon={<Clock3 size={18} />}
            label="Duration"
            value={
              duration > 0
                ? formatMinutes(duration)
                : displayDuration > 0
                ? formatVideoTime(
                    displayDuration
                  )
                : "Self-paced"
            }
          />

          <LessonMeta
            icon={<Play size={18} />}
            label="Content"
            value={
              videoUrl
                ? "Video Lesson"
                : "Coming Soon"
            }
          />

          <LessonMeta
            icon={<Eye size={18} />}
            label="Access"
            value="Enrolled Students"
          />

          <LessonMeta
            icon={
              <CheckCircle2 size={18} />
            }
            label="Status"
            value={
              isCompleted
                ? "Completed"
                : "In Progress"
            }
          />
        </div>

        {/* =====================================================
            PROFESSIONAL LEARNING NOTICE
        ===================================================== */}

        <div className="mt-7 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Professional Learning
                Environment
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Study this lesson carefully,
                review the accompanying notes,
                and mark the lesson as complete
                after finishing the learning
                material.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            COURSE INFORMATION
        ===================================================== */}

        {(studentCount !== undefined ||
          totalLessons !== undefined) && (
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-6 text-sm text-slate-500">
            {totalLessons !== undefined && (
              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-emerald-600"
                />

                <span>
                  {totalLessons} lessons in
                  this course
                </span>
              </div>
            )}

            {studentCount !== undefined && (
              <div className="flex items-center gap-2">
                <Eye
                  size={16}
                  className="text-blue-600"
                />

                <span>
                  {studentCount.toLocaleString(
                    "en-IN"
                  )}{" "}
                  learners
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <ShieldCheck
                size={16}
                className="text-emerald-600"
              />

              <span>
                Secure enrolled access
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/*
 * ==========================================================
 * LESSON META
 * ==========================================================
 */

function LessonMeta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-slate-700">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/*
 * ==========================================================
 * VIDEO UNAVAILABLE
 * ==========================================================
 */

function VideoUnavailable({
  hasError,
  onRetry,
}: {
  hasError: boolean;
  onRetry: () => void;
}) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 text-center text-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/10">
        {hasError ? (
          <AlertCircle
            size={38}
            className="text-red-400"
          />
        ) : (
          <Play
            size={38}
            className="ml-1 text-cyan-400"
          />
        )}
      </div>

      <h2 className="mt-6 text-2xl font-black sm:text-3xl">
        {hasError
          ? "Unable to Load Video"
          : "Video Coming Soon"}
      </h2>

      <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
        {hasError
          ? "The lesson video could not be loaded. Please try again or contact support if the problem continues."
          : "The video for this lesson has not been uploaded yet. Please check back soon."}
      </p>

      {hasError && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
        >
          <RotateCcw size={17} />

          Try Again
        </button>
      )}

      {!hasError && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300">
          <ShieldCheck
            size={15}
            className="text-emerald-400"
          />

          ICU Learning Portal
        </div>
      )}
    </div>
  );
}

/*
 * ==========================================================
 * VIDEO TIME FORMATTER
 * ==========================================================
 */

function formatVideoTime(
  seconds: number
) {
  if (
    !Number.isFinite(seconds) ||
    seconds <= 0
  ) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);

  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const remainingSeconds =
    totalSeconds % 60;

  if (hours > 0) {
    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(
        remainingSeconds
      ).padStart(2, "0"),
    ].join(":");
  }

  return [
    String(minutes).padStart(2, "0"),
    String(
      remainingSeconds
    ).padStart(2, "0"),
  ].join(":");
}

/*
 * ==========================================================
 * DATABASE MINUTES FORMATTER
 * ==========================================================
 */

function formatMinutes(minutes: number) {
  if (
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return "Self-paced";
  }

  const hours = Math.floor(
    minutes / 60
  );

  const remainingMinutes =
    minutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${remainingMinutes}m`;
}