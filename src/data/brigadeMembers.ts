export interface BrigadeMember {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
  contact?: string;
}

export interface BrigadeStructure {
  brigadeId: string;
  brigadeName: string;
  leader: string;
  members: BrigadeMember[];
}

export const brigadeMembersData: BrigadeStructure[] = [
  {
    brigadeId: "snr-songsters",
    brigadeName: "Senior Songsters",
    leader: "Sonster Leader",
    members: [
      {
        id: "ss-001",
        name: "John Doe",
        role: "Lead Singer",
        joinDate: "2020-01-15",
        status: "active"
      },
      {
        id: "ss-002",
        name: "Jane Smith",
        role: "Vocalist",
        joinDate: "2021-03-20",
        status: "active"
      }
    ]
  },
  {
    brigadeId: "mirriams",
    brigadeName: "Mirriams",
    leader: "Sarah Smith",
    members: [
      {
        id: "mir-001",
        name: "Grace Moyo",
        role: "Worship Leader",
        joinDate: "2021-06-10",
        status: "active"
      },
      {
        id: "mir-002",
        name: "Faith Ndlovu",
        role: "Member",
        joinDate: "2022-01-05",
        status: "active"
      }
    ]
  },
  {
    brigadeId: "hosho",
    brigadeName: "Hosho",
    leader: "David Moyo",
    members: [
      {
        id: "hos-001",
        name: "Tendai Mutasa",
        role: "Lead Player",
        joinDate: "2021-09-15",
        status: "active"
      },
      {
        id: "hos-002",
        name: "Blessing Chiwara",
        role: "Member",
        joinDate: "2022-03-20",
        status: "active"
      }
    ]
  },
  {
    brigadeId: "bandsmen",
    brigadeName: "Band",
    leader: "Peter Johnson",
    members: [
      {
        id: "band-001",
        name: "Michael Brown",
        role: "Cornet Player",
        joinDate: "2020-01-15",
        status: "active"
      },
      {
        id: "band-002",
        name: "Thomas Clark",
        role: "Trombone Player",
        joinDate: "2020-02-20",
        status: "active"
      }
    ]
  },
  {
    brigadeId: "youth-singers",
    brigadeName: "Youth Singers",
    leader: "Mary Williams",
    members: [
      {
        id: "ys-001",
        name: "Sarah Williams",
        role: "Lead Singer",
        joinDate: "2023-01-20",
        status: "active"
      },
      {
        id: "ys-002",
        name: "David Ncube",
        role: "Member",
        joinDate: "2023-02-15",
        status: "active"
      }
    ]
  },
  {
    brigadeId: "youth-timbelist",
    brigadeName: "Youth Timbelist",
    leader: "James Wilson",
    members: [
      {
        id: "yt-001",
        name: "Rachel Moyo",
        role: "Lead Timbelist",
        joinDate: "2022-09-01",
        status: "active"
      },
      {
        id: "yt-002",
        name: "Joy Sibanda",
        role: "Member",
        joinDate: "2023-01-10",
        status: "active"
      }
    ]
  },
  {
    brigadeId: "junior-soldiers",
    brigadeName: "Junior Soldiers",
    leader: "Emma Brown",
    members: [
      {
        id: "js-001",
        name: "Timothy Brown",
        role: "Member",
        joinDate: "2023-03-15",
        status: "active"
      },
      {
        id: "js-002",
        name: "Mary Dube",
        role: "Member",
        joinDate: "2023-04-20",
        status: "active"
      }
    ]
  }
];

// Helper functions
export const getBrigadeMembers = (brigadeId: string): BrigadeStructure | undefined => {
  return brigadeMembersData.find(brigade => brigade.brigadeId === brigadeId);
};

export const getTotalMemberCount = (brigadeId: string): number => {
  const brigade = getBrigadeMembers(brigadeId);
  if (!brigade) return 0;
  return brigade.members.filter(member => member.status === 'active').length;
};

export const getActiveMembers = (brigadeId: string): BrigadeMember[] => {
  const brigade = getBrigadeMembers(brigadeId);
  if (!brigade) return [];
  return brigade.members.filter(member => member.status === 'active');
};
