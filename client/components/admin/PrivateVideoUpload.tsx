
"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import {
  CheckCircle2,
  Film,
  Loader2,
  Upload,
  XCircle,
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

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

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
      setError(
        "Maximum video size is 100 MB."
      );
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

      const blob = await upload(
        pathname,
        file,
        {
          access: "private",
          handleUploadUrl: "/api/videos/upload",
          clientPayload: JSON.stringify({
            courseId,
          }),
        }
      );

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
      console.error("Private video upload failed:", uploadError);

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

  const isPrivateVideo =
    videoPath.startsWith(`videos/${courseId}/`);

  const isLegacyVideo =
    Boolean(videoPath) && !isPrivateVideo;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <input
        type="hidden"
        name="videoUrl"
        value={videoPath}
      />

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          <Film size={22} />
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            Private Video Hosting
          </h3>

          <p className="text-sm text-slate-500">
            Upload videos securely to your private Blob Store.
          </p>
        </div>
      </div>

      {videoPath ? (
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <CheckCircle2
            className="mt-0.5 shrink-0 text-green-600"
            size={20}
          />

          <div className="min-w-0 flex-1">
            <p className="break-all text-sm font-semibold text-slate-800">
              {isPrivateVideo
                ? "Private video is attached"
                : "Existing video URL is retained"}
            </p>

            <p className="mt-1 break-all text-xs text-slate-500">
              {isPrivateVideo
                ? videoPath
                : "This is an older URL. Upload a new video to move this lesson to Private Hosting."}
            </p>
          </div>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
          No video selected yet.
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
            {videoPath
              ? "Upload / Replace Video"
              : "Choose Video and Upload"}
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
        Allowed formats: MP4, WebM, OGG. Maximum size: 100 MB.
        Uploading a replacement changes the video attached to
        this form only after the upload succeeds.
      </p>

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
          <CheckCircle2
            size={18}
            className="shrink-0"
          />
          {success}
        </p>
      )}

      {error && (
        <p className="flex items-start gap-2 text-sm text-red-700">
          <XCircle
            size={18}
            className="shrink-0"
          />
          {error}
        </p>
      )}

      {isLegacyVideo && (
        <p className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
          This existing URL is not a Private Blob pathname.
          Upload a new video before expecting secure streaming
          to work for this lesson.
        </p>
      )}
    </div>
  );
}
