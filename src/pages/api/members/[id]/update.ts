import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { brigadeMembersData } from '../../../../data/brigadeMembers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const updatedMember = req.body;

    // Find and update the member
    const memberIndex = brigadeMembersData.findIndex(member => member.id === id);
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found' });
    }

    brigadeMembersData[memberIndex] = { ...updatedMember, id: id as string };

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

    res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ message: 'Error updating member' });
  }
} 