import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser } from '../../../lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;
  const auth = authenticateUser(username, password);

  if (auth) {
    res.status(200).json({ token: auth.token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}