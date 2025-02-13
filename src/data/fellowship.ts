export interface FellowshipEvent {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  organizer: string;
}

export interface Fellowship {
  id: string;
  name: string;
  description: string;
  image: string;
  leader: string;
  meetingTime: string;
  members: number;
  events: FellowshipEvent[];
}

const fellowshipData: Fellowship[] = [
  {
    id: "mens-fellowship",
    name: "Men's Fellowship",
    description:
      "A brotherhood of faith, supporting each other in spiritual growth and Christian service.",
    image:
      "https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?auto=format&fit=crop&w=1600&q=80",
    leader: "Brother James Anderson",
    meetingTime: "Every 2nd Saturday, 8:00 AM",
    members: 45,
    events: [
      {
        id: "event-1",
        title: "Men's Prayer Breakfast",
        content:
          "Join us for our monthly prayer breakfast where we share in fellowship, study the Word, and strengthen our faith together.",
        date: "2024-04-13",
        organizer: "James Anderson",
        image:
          "https://images.unsplash.com/photo-1591543620767-582b2e76369e?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  },
  {
    id: "womens-fellowship",
    name: "Women's Fellowship",
    description:
      "Empowering women through faith, fellowship, and service to make a difference in our community.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    leader: "Sister Mary Thompson",
    meetingTime: "Every 2nd Sunday, 2:00 PM",
    members: 60,
    events: [
      {
        id: "event-1",
        title: "Women's Bible Study",
        content:
          "Weekly Bible study focusing on women of faith in Scripture and their relevance to our modern lives.",
        date: "2024-04-14",
        organizer: "Mary Thompson",
      },
    ],
  },
  {
    id: "youth-fellowship",
    name: "Youth Fellowship",
    description:
      "A dynamic community of young believers growing together in faith, friendship, and purpose.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=80",
    leader: "Pastor Michael Roberts",
    meetingTime: "Every Friday, 6:00 PM",
    members: 75,
    events: [
      {
        id: "event-1",
        title: "Youth Night",
        content:
          "An evening of worship, games, and meaningful discussions about faith and life.",
        date: "2024-04-05",
        organizer: "Michael Roberts",
        image:
          "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  },
];

export default fellowshipData;
