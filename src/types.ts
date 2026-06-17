export interface VideoData {
  id: string;
  title: string;
  cover: string;
  images?: string[];
  play: string;
  hdplay?: string;
  music: string;
  play_count: number;
  digg_count: number;
  comment_count: number;
  share_count: number;
  author: {
    nickname: string;
    unique_id: string;
    avatar: string;
  };
  music_info: {
    title: string;
    author: string;
    cover: string;
  };
}

export interface HistoryItem {
  id: string; // The video ID
  title: string;
  cover: string;
  author: string;
  sourceUrl: string;
  timestamp: number;
  data: VideoData; // Stored so it doesn't need re-fetching
}
