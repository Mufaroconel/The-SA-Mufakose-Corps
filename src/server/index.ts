import express, { Request, Response } from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

interface BrigadeMember {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
  contact?: string;
}

// Add member endpoint
app.post('/api/members/add', async (req: Request, res: Response) => {
  try {
    const newMember = req.body;
    newMember.id = `${newMember.brigadeId}-${Date.now()}`;

    const filePath = join(__dirname, '../../src/data/brigadeMembers.ts');
    const currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    currentData.brigadeMembersData.push(newMember);

    const fileContent = `
export interface BrigadeMember {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
  contact?: string;
}

export const brigadeMembersData: BrigadeMember[] = ${JSON.stringify(currentData.brigadeMembersData, null, 2)};
`;

    fs.writeFileSync(filePath, fileContent);
    res.status(200).json({ message: 'Member added successfully', member: newMember });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ message: 'Error adding member' });
  }
});


app.post('/api/members/:id/update', (req: Request<{ id: string }>, res: Response): void => {
    (async () => {
      try {
        const { id } = req.params;
        const updatedMember: BrigadeMember = req.body;
        // ... your logic

        const filePath = join(__dirname, '../../src/data/brigadeMembers.ts');
        const currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        const memberIndex = currentData.brigadeMembersData.findIndex((m: BrigadeMember) => m.id === id);
        if (memberIndex === -1) {
          return res.status(404).json({ message: 'Member not found' });
        }
    
        currentData.brigadeMembersData[memberIndex] = { ...updatedMember, id };
    
        const fileContent = `
    export interface BrigadeMember {
      id: string;
      name: string;
      role: string;
      joinDate: string;
      status: 'active' | 'inactive';
      contact?: string;
    }
    
    export const brigadeMembersData: BrigadeMember[] = ${JSON.stringify(currentData.brigadeMembersData, null, 2)};
    `;
    
        fs.writeFileSync(filePath, fileContent);
        res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
      } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({ message: 'Error updating member' });
      }
    })();
  });
  
// Update member endpoint
// app.post('/api/members/:id/update', async (req: Request<{ id: string }>, res: Response) => {
//   try {
//     const { id } = req.params;
//     const updatedMember: BrigadeMember = req.body;

//     const filePath = join(__dirname, '../../src/data/brigadeMembers.ts');
//     const currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
//     const memberIndex = currentData.brigadeMembersData.findIndex((m: BrigadeMember) => m.id === id);
//     if (memberIndex === -1) {
//       return res.status(404).json({ message: 'Member not found' });
//     }

//     currentData.brigadeMembersData[memberIndex] = { ...updatedMember, id };

//     const fileContent = `
// export interface BrigadeMember {
//   id: string;
//   name: string;
//   role: string;
//   joinDate: string;
//   status: 'active' | 'inactive';
//   contact?: string;
// }

// export const brigadeMembersData: BrigadeMember[] = ${JSON.stringify(currentData.brigadeMembersData, null, 2)};
// `;

//     fs.writeFileSync(filePath, fileContent);
//     res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
//   } catch (error) {
//     console.error('Error updating member:', error);
//     res.status(500).json({ message: 'Error updating member' });
//   }
// });

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 