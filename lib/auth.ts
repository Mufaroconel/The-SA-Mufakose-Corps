import { verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import path from 'path';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateUser = (username: string, password: string) => {
  const usersPath = path.join(process.cwd(), 'data', 'users.json');
  const users = JSON.parse(readFileSync(usersPath, 'utf-8'));
  
  const user = users.find(
    (u: any) => u.username === username && u.password === password
  );
  
  if (user) {
    // Create JWT token
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);
    return { token, user };
  }
  
  return null;
};

export const verifyAuth = (token: string) => {
  try {
    return verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}; 