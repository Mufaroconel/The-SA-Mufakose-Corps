import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { brigadeMembersData } from '../../../data/brigadeMembers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const newMember = req.body;
    // Generate a unique ID for the new member
    newMember.id = `${newMember.brigadeId}-${Date.now()}`;

    // Add to the data array
    brigadeMembersData.push(newMember);

    // Write the updated data back to the file
    const filePath = path.join(process.cwd(), 'src/data/brigadeMembers.ts');
    const fileContent = `
export interface BrigadeMember {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
  contact?: string;
}

export const brigadeMembersData: BrigadeMember[] = ${JSON.stringify(brigadeMembersData, null, 2)};
`;

    fs.writeFileSync(filePath, fileContent);

    res.status(200).json({ message: 'Member added successfully', member: newMember });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ message: 'Error adding member' });
  }
} 