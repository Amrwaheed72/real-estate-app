import { Query } from 'react-native-appwrite';
import { databases } from '../lib/appwrite';
import { config } from '../lib/appwrite';
import { PropertiesCollection } from '@/types/apiTypes';

const {
  databaseId,
  agentsCollectionId,
  reviewsCollectionId,
  galleriesCollectionId,
  propertiesCollectionId,
} = config;
export const getLatestProperties = async (): Promise<PropertiesCollection[]> => {
  try {
    const response = await databases.listDocuments(databaseId, propertiesCollectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(5),
    ]);
    return response.documents as unknown as PropertiesCollection[];
  } catch (error) {
    throw error;
  }
};

export const getProperties = async (
  filter: string,
  query: string,
  limit?: number
): Promise<PropertiesCollection[]> => {
  try {
    const buildQuery = [Query.orderDesc('$createdAt')];
    if (filter && filter !== 'All') {
      buildQuery.push(Query.equal('type', filter));
    }
    if (query) {
      buildQuery.push(
        Query.or([
          Query.search('name', query),
          Query.search('address', query),
          Query.search('type', query),
        ])
      );
    }
    if (limit) {
      buildQuery.push(Query.limit(limit));
    }
    const response = await databases.listDocuments(databaseId, propertiesCollectionId, buildQuery);
    return response.documents as unknown as PropertiesCollection[];
  } catch (error) {
    throw error;
  }
};
