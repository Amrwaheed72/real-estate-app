import { create } from 'zustand';
import { openAuthSessionAsync } from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { account, avatars, config } from '@/lib/appwrite';
import { OAuthProvider } from 'react-native-appwrite';
import 'react-native-url-polyfill/auto';

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}
interface Props {
  user: User | null;
  isLoggedIn: boolean;
  isLoggingOut: boolean;
  loading: boolean;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useAuth = create<Props>((set, get) => ({
  user: null,
  loading: true,
  isLoggedIn: false,
  isLoggingOut: false,
  login: async () => {
    set({ loading: true });
    try {
      const redirectUri = Linking.createURL('/');
      const res = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
      if (!res) throw new Error('failed to login');
      const browserResult = await openAuthSessionAsync(res.toString(), redirectUri);
      if (browserResult.type !== 'success') throw new Error('failed to login');
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get('secret')?.toString();
      const userId = url.searchParams.get('userId')?.toString();
      if (!secret || !userId) throw new Error('failed to login');
      const session = await account.createSession(userId, secret);
      if (!session) throw new Error('failed to create a session');
      await get().getUser();
      return true;
    } catch (error) {
      console.error(error);
      set({ isLoggedIn: false });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await account.deleteSession('current');
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ isLoggingOut: false });
    }
  },

  getUser: async () => {
    try {
      set({ loading: true });
      const res = await account.get();
      const avatarUrl = `${config.endpoint}/avatars/initials?name=${encodeURIComponent(res.name)}&project=${config.projectId}`;
      set({
        isLoggedIn: true,
        user: {
          ...res,
          avatar: avatarUrl,
        },
      });
      // console.log(avatars.getInitials(res.name).href);
    } catch (error) {
      set({ user: null });
      console.log('error getting the user information');
    } finally {
      set({ loading: false });
    }
  },
}));
