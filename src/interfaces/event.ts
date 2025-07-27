export type Event = {
  slug: string;
  language: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  type: 'conference' | 'workshop' | 'meetup' | 'webinar' | 'other';
  coverImage: string;
  registrationUrl?: string;
  isUpcoming: boolean;
  attendees?: number;
  tags?: string;
  content?: string;
}; 