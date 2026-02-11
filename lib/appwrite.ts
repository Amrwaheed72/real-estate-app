import { Account, Avatars, Client, Databases } from 'react-native-appwrite';
export const config = {
  platform: 'amr.statelify',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_TABLE_ID!,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_TABLE_ID!,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_TABLE_ID!,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_TABLE_ID!,
};
export const client = new Client();
client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!);

export const avatars = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
