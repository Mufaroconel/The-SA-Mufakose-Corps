// Initial admin user
const ADMIN_USER = {
  username: 'admin',
  // This is a hashed version of 'admin123' - in production, use proper password hashing
  password: '$2a$10$xLxAz0kB1JDa.Qh0xKqNz.VXH5oQzPtA3Ok9H.dQKjIqthZ3JjhGe',
  role: 'admin'
};

interface User {
  username: string;
  password: string;
  role: string;
}

// Store initial user in localStorage if not exists
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([ADMIN_USER]));
}

export const validateUser = async (username: string, password: string) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.username === username);
    
    if (!user) {
      return null;
    }

    // For demo purposes, using simple password comparison
    // In production, use proper password hashing
    if (password === 'admin123' && username === 'admin') {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
};

export const createUser = async (username: string, password: string, role: string = 'admin') => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some((u: User) => u.username === username)) {
      throw new Error('User already exists');
    }

    const newUser = {
      username,
      password, // In production, hash the password
      role
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Create user error:', error);
    return false;
  }
}; 