export type LifespanCategory = 'DETOX' | 'SHARE' | 'DISCUSS';

export interface Post {
  id: number;
  content: string;
  lifespanCategory: LifespanCategory;
  createdAt: string | Date;
  expiresAt: string | Date;
  remainingMinutes: number;
  username: string; // MVPでは固定名
  avatarUrl?: string;
}
