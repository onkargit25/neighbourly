import React, { createContext, useContext, useState } from 'react';
import type { User } from '@/types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isSecretary: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsSecretary: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isSecretary: false,
  login: async () => {},
  loginAsSecretary: () => {},
  logout: () => {},
});

const demoUser: User = {
  id: 'demo-user-1',
  name: 'Community Resident',
  email: 'resident@greenvalley.in',
  mobile: '',
  occupation: 'Software Engineer',
  bio: 'Resident at Green Valley Residency. Love connecting with neighbours.',
  role: 'resident',
  communityId: 'c1',
  communityName: 'Green Valley Residency',
  joinedAt: '2024-01-10T10:00:00Z',
  stats: {
    itemsShared: 5,
    itemsBorrowed: 3,
    servicesOffered: 1,
    helpRequests: 2,
  },
};

const demoSecretary: User = {
  id: 'demo-sec-1',
  name: 'Community Secretary',
  email: 'secretary@greenvalley.in',
  occupation: 'Retired Professional',
  bio: 'Serving the Green Valley Residency community since 2020.',
  role: 'secretary',
  communityId: 'c1',
  communityName: 'Green Valley Residency',
  joinedAt: '2020-06-01T10:00:00Z',
  stats: {
    itemsShared: 2,
    itemsBorrowed: 1,
    servicesOffered: 0,
    helpRequests: 0,
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

const login = async (_email: string, _password: string) => {
  await new Promise((r) => setTimeout(r, 800));

  const community = JSON.parse(
    localStorage.getItem("community") || "{}"
  );

  setUser({
    ...demoUser,
    communityName:
      community.name || demoUser.communityName,
  });
};

const loginAsSecretary = () => {
  const community = JSON.parse(
    localStorage.getItem("community") || "{}"
  );

  setUser({
    ...demoSecretary,
    communityName:
      community.name || demoSecretary.communityName,
  });
};

  const logout = () => {
  setUser(null);

  localStorage.removeItem("community");
};

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isSecretary: user?.role === 'secretary',
        login,
        loginAsSecretary,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
