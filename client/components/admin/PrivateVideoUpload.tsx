
"use client";

import { useState, type ChangeEvent } from "react";
import { upload } from "@vercel/blob/client";
import {
  CheckCircle2,
  Film,
  Loader2,
  Upload,
  XCircle,
  Lock,
} from "lucide-react";

interface PrivateVideoUploadProps {
  courseId: string;
  initialVideoUrl?: string | null;
}

const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
];

export default function PrivateVideoUpload({
  courseId,
  initialVideoUrl = "",
}: PrivateVideoUploadProps) {
  const [videoPath, setVideoPath] = useState(
    initialVideoUrl ?? ""
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isPrivateVideo = videoPath.startsWith(
    `videos/${courseId}/`
  );

  function handleUrlChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setVideoPath(event.target.value);
    setError("");
    setSuccess("");
  }

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      setError(
        "Only MP4, WebM and OGG video files are allowed."
      );
      event.target.value = "";
      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      setError("Maximum video size is 100 MB.");
      event.target.value = "";
      return;
    }

    if (file.size === 0) {
      setError("Selected video file is empty.");
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const safeName = file.name
        .replace(/[^a-zA-Z0-9._-]/g, "-")
        .slice(-150);

      const pathname =
        `videos/${courseId}/${Date.now()}-${safeName}`;

      const blob = await upload(pathname, file, {
        access: "private",
        handleUploadUrl: "/api/videos/upload",
        clientPayload: JSON.stringify({ courseId }),
      });

      if (!blob.pathname) {
        throw new Error(
          "Upload completed but video pathname was not returned."
        );
      }

      setVideoPath(blob.pathname);

      setSuccess(
        "Private video uploaded successfully. Save the lesson to finish."
      );
    } catch (uploadError) {
      console.error(
        "Private video upload failed:",
        uploadError
      );

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Video upload failed. Please try again."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      {/* Hidden field submitted to Server Action */}
      <input
        type="hidden"
        name="videoUrl"
        value={videoPath}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          <Film size={22} />
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            Lesson Video Settings
          </h3>

          <p className="text-sm text-slate-500">
            Choose YouTube hosting or Private Video Hosting.
          </p>
        </div>
      </div>

      {/* YouTube URL */}
      <div className="space-y-3 rounded-xl border border-red-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <Film size={22} className="text-red-600" />

          <h4 className="font-bold text-slate-900">
            YouTube Demo Video
          </h4>
        </div>

        <label
          htmlFor="youtubeVideoUrl"
          className="block text-sm font-semibold text-slate-700"
        >
          YouTube Video Link
        </label>

        <input
          id="youtubeVideoUrl"
          type="url"
          value={isPrivateVideo ? "" : videoPath}
          onChange={handleUrlChange}
          placeholder="https://youtu.be/ne7U2QXGlAI"
          disabled={uploading}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500"
        />

        <p className="text-xs leading-5 text-slate-500">
          Paste your YouTube video URL. Students will watch
          the video inside your ICU Learning Portal.
        </p>
      </div>

      {/* Private Video Upload */}
      <div className="space-y-3 rounded-xl border border-blue-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <Lock size={20} className="text-blue-600" />

          <h4 className="font-bold text-slate-900">
            Private Premium Video
          </h4>
        </div>

        {isPrivateVideo ? (
          <div className="flex items-start gap-3 rounded-xl bg-green-50 p-3">
            <CheckCircle2
              size={20}
              className="shrink-0 text-green-600"
            />

            <div className="min-w-0">
              <p className="font-semibold text-green-800">
                Private video attached
              </p>

              <p className="mt-1 break-all text-xs text-green-700">
                {videoPath}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Upload a private MP4, WebM or OGG video for
            premium lessons.
          </p>
        )}

        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          {uploading ? (
            <>
              <Loader2
                size={19}
                className="animate-spin"
              />
              Uploading video...
            </>
          ) : (
            <>
              <Upload size={19} />
              {isPrivateVideo
                ? "Replace Private Video"
                : "Choose and Upload Private Video"}
            </>
          )}

          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            className="hidden"
            disabled={uploading}
            onChange={handleFileChange}
          />
        </label>

        <p className="text-xs leading-5 text-slate-500">
          Allowed formats: MP4, WebM, OGG. Maximum size:
          100 MB.
        </p>
      </div>

      {/* Current Video Status */}
      {videoPath && (
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <CheckCircle2
            size={20}
            className="shrink-0 text-green-600"
          />

          <div className="min-w-0">
            <p className="font-semibold text-slate-800">
              {isPrivateVideo
                ? "Private Video Selected"
                : "External Video URL Selected"}
            </p>

            <p className="mt-1 break-all text-xs text-slate-500">
              {videoPath}
            </p>
          </div>
        </div>
      )}

      {uploading && (
        <div
          className="h-2 overflow-hidden rounded-full bg-blue-100"
          role="status"
          aria-label="Uploading video"
        >
          <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
        </div>
      )}

      {success && (
        <p className="flex items-start gap-2 text-sm text-green-700">
          <CheckCircle2 size={18} className="shrink-0" />
          {success}
        </p>
      )}

      {error && (
        <p className="flex items-start gap-2 text-sm text-red-700">
          <XCircle size={18} className="shrink-0" />
          {error}
        </p>
      )}

      <p className="text-xs leading-5 text-slate-500">
        Select one video source for each lesson. Save the
        lesson after selecting or uploading a video.
      </p>
    </div>
  );
}
