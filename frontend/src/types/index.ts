export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  avatar?: string;
  occupation?: string;
  bio?: string;
  role: 'resident' | 'secretary';
  communityId?: string;
  communityName?: string;
  joinedAt: string;
  stats: {
    itemsShared: number;
    itemsBorrowed: number;
    servicesOffered: number;
    helpRequests: number;
  };
}

export interface Community {
  id: string;
  name: string;
  type: 'apartment' | 'society' | 'gated' | 'colony' | 'hostel';
  city: string;
  state: string;
  code: string;
  membersCount: number;
  secretaryId: string;
  verified: boolean;
  description?: string;
}

export type ResourceCategory = 'tools' | 'electronics' | 'books' | 'sports' | 'kitchen' | 'furniture' | 'vehicles' | 'other';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  available: boolean;
  deposit?: number;
  ownerId: string;
  ownerName: string;
  communityId: string;
  image?: string;
  createdAt: string;
}

export type ServiceCategory = 'tutoring' | 'repairs' | 'fitness' | 'cleaning' | 'cooking' | 'tech' | 'beauty' | 'other';

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  price: number;
  priceUnit: 'hour' | 'session' | 'day' | 'fixed';
  available: boolean;
  rating: number;
  reviewCount: number;
  providerId: string;
  providerName: string;
  communityId: string;
  image?: string;
  createdAt: string;
}

export type HelpPriority = 'low' | 'medium' | 'high' | 'urgent';
export type HelpStatus = 'open' | 'in_progress' | 'resolved';

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  priority: HelpPriority;
  status: HelpStatus;
  requesterId: string;
  requesterName: string;
  volunteerId?: string;
  communityId: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  priority: 'normal' | 'important' | 'emergency';
  authorId: string;
  authorName: string;
  communityId: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  rsvpCount: number;
  communityId: string;
  createdAt: string;
}

export type NotificationType = 'announcement' | 'borrow_request' | 'borrow_approval' | 'service_booking' | 'help_request' | 'event' | 'member_approved' | 'emergency';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
