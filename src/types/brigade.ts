// src/types/brigade.ts
export interface BrigadeMember {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  avatar?: string;
  instruments?: string[];
  bio?: string;
}

export interface Brigade {
  id: string;
  name: string;
  description: string;
  image: string;
  leader: string;
  meetingTime: string;
  members: BrigadeMember[]; // Updated to hold actual member objects instead of just a count
  posts: Post[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image?: string;
}
