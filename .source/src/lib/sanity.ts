import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '7fr2ai3t',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false, // Set to false to ensure fresh data always
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
