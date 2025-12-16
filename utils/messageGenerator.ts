import { BASE_URL } from '../constants';

export const generateMessage = (templateContent: string, guestName: string, slug: string): string => {
  const fullLink = `${BASE_URL}/${slug}?tamu=${encodeURIComponent(guestName)}`;
  
  let message = templateContent.replace(/{{nama_tamu}}/g, guestName);
  message = message.replace(/{{link_undangan}}/g, fullLink);
  
  return message;
};
