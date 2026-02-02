import React, { useState } from 'react';
import PostCard from './components/Post/PostCard.tsx';
import { Post } from './types/index.ts';
import { Plus, Search, Bell, User } from 'lucide-react';
import { addMinutes, addHours, addDays } from 'date-fns';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    username: 'Alex_M',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
    content: '感情を吐き出したい。でもこの瞬間の気持ちも大切にしたい。 #reflection',
    category: 'DETOX',
    createdAt: new Date(),
    expiresAt: addMinutes(new Date(), 12),
  },
  {
    id: '2',
    username: 'Sarah_J',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    content: '今日の夕日は最高でした！🌇 今だけの共有。',
    category: 'SHARE',
    createdAt: new Date(),
    expiresAt: addHours(new Date(), 23),
  },
  {
    id: '3',
    username: 'Dev_Node',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
    content: 'DenoかNode.jsか。皆さんはどちらが好きですか？',
    category: 'DISCUSS',
    createdAt: new Date(),
    expiresAt: addDays(new Date(), 2),
  }
];

function App() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handleExpire = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-20 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 py-4 flex justify-between items-center border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Lifespan Feed
        </h1>
        <div className="flex items-center gap-5 text-slate-400">
          <Search size={22} className="hover:text-white cursor-pointer transition-colors" />
          <Bell size={22} className="hover:text-white cursor-pointer transition-colors" />
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
            <User size={18} />
          </div>
        </div>
      </header>

      {/* Timeline */}
      <main className="max-w-xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onExpire={handleExpire} />
          ))}
          {posts.length === 0 && (
            <div className="text-center py-20 text-slate-500 animate-pulse">
              すべての投稿が寿命を迎えました。
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group z-50">
        <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Navigation (Mobile Style) */}
      <nav className="fixed bottom-0 w-full glass-morphism border-t border-white/5 py-3 px-8 flex justify-between items-center z-40 lg:hidden">
         <div className="flex flex-col items-center gap-1 text-indigo-400">
            <Search size={20} />
         </div>
         <div className="text-slate-500"><Bell size={20} /></div>
         <div className="text-slate-500"><User size={20} /></div>
      </nav>
    </div>
  );
}

export default App;
