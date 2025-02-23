import { validateUser } from '../utils/auth';

export const handleLogin = async (username: string, password: string) => {
  try {
    const user = await validateUser(username, password);
    
    if (user) {
      // Create a simple token
      const token = btoa(JSON.stringify({ 
        username: user.username, 
        role: user.role, 
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }));
      
      return { 
        success: true, 
        token,
        user
      };
    }
    
    return { 
      success: false, 
      error: 'Invalid credentials' 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Authentication failed' 
    };
  }
}; 