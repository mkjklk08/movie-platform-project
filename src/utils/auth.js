const STORAGE_KEY = 'moviePlatformUsers';

const getUsersFromStorage = () => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsersToStorage = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const initializeAdmin = () => {
  const users = getUsersFromStorage();
  const adminExists = users.some(user => user.email === 'mkjklk970901@gmail.com');
  
  if (!adminExists) {
    const adminUser = {
      id: 1,
      email: 'mkjklk970901@gmail.com',
      name: 'Makhabbat',
      surname: 'Amirbek',
      password: '011409jk',
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    users.push(adminUser);
    saveUsersToStorage(users);
  }
};

initializeAdmin();

export const registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, name, surname, password } = userData;
      
      if (!email || !name || !surname || !password) {
        reject('Please fill in all fields');
        return;
      }
      
      const users = getUsersFromStorage();
      
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        reject('User with this email already exists');
        return;
      }
      
      const role = email === 'mkjklk970901@gmail.com' ? 'admin' : 'user';
      
      const newUser = {
        id: Date.now(),
        email,
        name,
        surname,
        fullName: `${name} ${surname}`,
        password, 
        role,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      saveUsersToStorage(users);
      
      const token = `${role}-token-${Date.now()}`;
      
      resolve({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          surname: newUser.surname,
          fullName: newUser.fullName
        },
        token,
        role
      });
    }, 1000);
  });
};

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject('Please enter email and password');
        return;
      }
      
      const users = getUsersFromStorage();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        reject('Invalid email or password');
        return;
      }
      
      const role = email === 'mkjklk970901@gmail.com' ? 'admin' : 'user';
      
      const token = `${role}-token-${Date.now()}`;
      
      resolve({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          fullName: `${user.name} ${user.surname}`
        },
        token,
        role
      });
    }, 1000);
  });
};

export const getCurrentUser = () => {
  const saved = localStorage.getItem('moviePlatformUser');
  if (!saved) return null;
  
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};