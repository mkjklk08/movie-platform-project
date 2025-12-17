export const getCurrentUser = () => {
  const saved = localStorage.getItem('moviePlatformUser')
  if (!saved) return null
  
  try {
    const userData = JSON.parse(saved)
    
    if (userData.user?.email === 'mkjklk970901@gmail.com') {
      return { ...userData, role: 'admin' }
    }
    
    if (userData.user?.email?.toLowerCase().includes('admin')) {
      return { ...userData, role: 'admin' }
    }
    
    return { ...userData, role: 'user' }
  } catch {
    return null
  }
}

export const isAdmin = () => {
  const user = getCurrentUser()
  return user?.role === 'admin'
}

export const isMainAdmin = () => {
  const user = getCurrentUser()
  return user?.user?.email === 'mkjklk970901@gmail.com'
}

export const getDemoUsers = () => {
  return [
    {
      email: 'mkjklk970901@gmail.com',
      password: '011409jk',
      name: 'Main Administrator',
      role: 'admin'
    },
    {
      email: 'admin@demo.com',
      password: 'demo123',
      name: 'Demo Administrator',
      role: 'admin'
    },
    {
      email: 'user@demo.com',
      password: 'demo123',
      name: 'Demo User',
      role: 'user'
    },
    {
      email: 'john@gmail.com',
      password: 'demo123',
      name: 'John Doe',
      role: 'user'
    },
    {
      email: 'alice@gmail.com',
      password: 'demo123',
      name: 'Alice Smith',
      role: 'user'
    }
  ]
}

export const getUserInfo = (email) => {
  const demoUsers = getDemoUsers()
  return demoUsers.find(user => user.email === email) || {
    name: email.split('@')[0],
    role: email.toLowerCase().includes('admin') ? 'admin' : 'user'
  }
}