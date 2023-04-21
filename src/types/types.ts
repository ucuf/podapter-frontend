export type EpisodeContentType =
  | "audio/mpeg"
  | "audio/ogg"
  | "audio/wav"
  | "audio/webm"
  | "audio/aac"
  | "audio/flac";

export interface Episode {
  id: number;
  title: string;
  url: string;
  contentType: EpisodeContentType;
  length: number;
  pubDate: string;
  description?: string;
  tags?: string[];
}
