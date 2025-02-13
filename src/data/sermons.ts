export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  tags: string[];
}

export interface LiveStreamData {
  isLive: boolean;
  title: string;
  streamUrl: string;
  viewers: number;
  startTime: string;
  thumbnailUrl: string;
}

export const sermonData: Sermon[] = [
  {
    id: "sermon-1",
    title: "Walking in Faith",
    preacher: "Rev. John Smith",
    date: "2024-03-24",
    description:
      "Exploring the journey of faith through the lens of Abraham's story and its relevance in our modern lives.",
    videoUrl: "https://www.youtube.com/embed/ok4HvCINRDE",
    audioUrl: "https://example.com/audio1.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=80",
    duration: "45:32",
    views: 1234,
    tags: ["Faith", "Old Testament", "Guidance"],
  },
  {
    id: "sermon-2",
    title: "The Power of Prayer",
    preacher: "Pastor Sarah Johnson",
    date: "2024-03-17",
    description:
      "Understanding the transformative power of prayer in our daily walk with God.",
    videoUrl: "https://www.youtube.com/embed/2sw4BdG7Npg",
    audioUrl: "https://example.com/audio2.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544764200-d834fd210a23?auto=format&fit=crop&w=1600&q=80",
    duration: "38:15",
    views: 856,
    tags: ["Prayer", "Spiritual Growth"],
  },
  {
    id: "sermon-3",
    title: "Living with Purpose",
    preacher: "Rev. Michael Brown",
    date: "2024-03-10",
    description:
      "Discovering God's purpose for your life and walking in His divine plan.",
    videoUrl: "https://www.youtube.com/embed/ax_Mesv9O9g",
    audioUrl: "https://example.com/audio3.mp3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1600&q=80",
    duration: "42:18",
    views: 967,
    tags: ["Purpose", "Vision", "Calling"],
  },
];

export const liveStreamData: LiveStreamData = {
  isLive: true,
  title: "Sunday Service",
  streamUrl: "https://www.youtube.com/embed/5Nr_NzC686I",
  viewers: 245,
  startTime: "2024-03-31T09:00:00Z",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80",
};
