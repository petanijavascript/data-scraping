import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type GrowthData = {
  month: string;
  followers: number;
};

export type Profile = {
  id: string;
  platform: 'instagram' | 'tiktok';
  username: string;
  avatar: ImagePlaceholder;
  verified: boolean;
  followers: number;
  engagementRate: number;
  avgViews: number;
  growthHistory: GrowthData[];
  brandCollaborations: string[];
  description: string;
  keywords: string[];
};

const findImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    // Fallback for safety, though it shouldn't be hit with correct data
    return {
      id: 'fallback',
      description: 'fallback',
      imageUrl: 'https://picsum.photos/seed/fallback/100/100',
      imageHint: 'person',
    };
  }
  return image;
};

export const profiles: Profile[] = [
  {
    id: '1',
    platform: 'instagram',
    username: 'lifestyle_luxe',
    avatar: findImage('profile-1'),
    verified: true,
    followers: 1250000,
    engagementRate: 3.5,
    avgViews: 85000,
    growthHistory: [
      { month: 'Jan', followers: 950000 },
      { month: 'Feb', followers: 1000000 },
      { month: 'Mar', followers: 1100000 },
      { month: 'Apr', followers: 1150000 },
      { month: 'May', followers: 1200000 },
      { month: 'Jun', followers: 1250000 },
    ],
    brandCollaborations: ['FashionNova', 'Dior', 'Revolve'],
    description:
      'Curating a life of style and adventure. Based in NYC. Lover of all things beautiful, from fashion to travel destinations.',
    keywords: ['fashion', 'travel', 'luxury', 'nyc', 'lifestyle'],
  },
  {
    id: '2',
    platform: 'tiktok',
    username: 'techtitan',
    avatar: findImage('profile-2'),
    verified: false,
    followers: 850000,
    engagementRate: 12.2,
    avgViews: 1500000,
    growthHistory: [
      { month: 'Jan', followers: 500000 },
      { month: 'Feb', followers: 600000 },
      { month: 'Mar', followers: 680000 },
      { month: 'Apr', followers: 750000 },
      { month: 'May', followers: 800000 },
      { month: 'Jun', followers: 850000 },
    ],
    brandCollaborations: ['Apple', 'Samsung', 'dbrand'],
    description:
      'Unboxing the future, one gadget at a time. Honest reviews and tech tips you can actually use. Join the tech revolution!',
    keywords: ['tech', 'gadgets', 'reviews', 'unboxing', 'smartphones'],
  },
  {
    id: '3',
    platform: 'instagram',
    username: 'glam_by_grace',
    avatar: findImage('profile-3'),
    verified: true,
    followers: 2300000,
    engagementRate: 5.1,
    avgViews: 250000,
    growthHistory: [
      { month: 'Jan', followers: 1800000 },
      { month: 'Feb', followers: 1900000 },
      { month: 'Mar', followers: 2000000 },
      { month: 'Apr', followers: 2100000 },
      { month: 'May', followers: 2200000 },
      { month: 'Jun', followers: 2300000 },
    ],
    brandCollaborations: ['Sephora', 'Fenty Beauty', 'Huda Beauty'],
    description:
      'Makeup artist and beauty enthusiast. Creating looks from everyday glam to avant-garde. Beauty is an art form.',
    keywords: ['beauty', 'makeup', 'tutorial', 'skincare', 'MUA'],
  },
  {
    id: '4',
    platform: 'tiktok',
    username: 'kitchen_king',
    avatar: findImage('profile-4'),
    verified: false,
    followers: 540000,
    engagementRate: 15.8,
    avgViews: 2200000,
    growthHistory: [
      { month: 'Jan', followers: 400000 },
      { month: 'Feb', followers: 420000 },
      { month: 'Mar', followers: 450000 },
      { month: 'Apr', followers: 480000 },
      { month: 'May', followers: 510000 },
      { month: 'Jun', followers: 540000 },
    ],
    brandCollaborations: ['HelloFresh', 'Our Place', 'HexClad'],
    description:
      "Simple recipes, big flavors. Follow for daily cooking inspiration that won't break the bank or take all day. 30-minute meals are my specialty.",
    keywords: ['cooking', 'food', 'recipes', 'chef', 'easy meals'],
  },
];

export const stats = {
  totalProfiles: profiles.length,
  avgEngagement: (
    profiles.reduce((acc, p) => acc + p.engagementRate, 0) / profiles.length
  ).toFixed(1),
  totalFollowers: profiles.reduce((acc, p) => acc + p.followers, 0),
};
