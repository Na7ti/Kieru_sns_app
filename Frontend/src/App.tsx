import React, { useState } from 'react';
import PostCard from './components/Post/PostCard';
import { usePosts, Post } from './hooks/usePosts';
import { Plus, Search, Bell, User, X } from 'lucide-react';

function App() {
  const { posts, isLoading, createPost, isCreating } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'DETOX' | 'SHARE' | 'DISCUSS'>('SHARE');
  const [lifespan, setLifespan] = useState(60); // デフォルト60分

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createPost({
      content,
      lifespanCategory: category,
      lifespanMinutes: lifespan
    }, {
      onSuccess: () => {
        setContent('');
        setIsModalOpen(false);
      }
    });
  };

  const categories = [
    { id: 'DETOX', label: 'デトックス', times: [15, 30, 60] },
    { id: 'SHARE', label: '日常シェア', times: [1440] },
    { id: 'DISCUSS', label: '議論・FB', times: [2880, 4320] },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-20 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 py-4 flex justify-between items-center border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Kieru
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
        {isLoading ? (
          <div className="text-center py-20 text-slate-500 animate-pulse">読み込み中...</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post: Post) => (
              <PostCard 
                key={post.id} 
                post={{
                    ...post,
                    username: 'User_' + post.id // MVP用
                }} 
              />
            ))}
            {posts.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                まだ投稿がありません。
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group z-50"
      >
        <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg glass-morphism rounded-3xl p-6 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">新しい投稿</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="今、何を考えていますか？"
                className="w-full h-32 bg-slate-900/50 rounded-2xl p-4 text-slate-100 border border-white/5 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all resize-none"
                maxLength={280}
              />

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3">寿命カテゴリー</label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id as any);
                        setLifespan(cat.times[0]);
                      }}
                      className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all ${
                        category === cat.id 
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' 
                          : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3">保持期間</label>
                <div className="flex gap-2 flex-wrap">
                  {categories.find(c => c.id === category)?.times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setLifespan(time)}
                      className={`py-1.5 px-4 rounded-full text-xs font-medium border transition-all ${
                        lifespan === time 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                          : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-white/20'
                      }`}
                    >
                      {time < 60 ? `${time}分` : time < 1440 ? `${time/60}時間` : `${time/1440}日`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!content.trim() || isCreating}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              >
                {isCreating ? '投稿中...' : '投稿する'}
              </button>
            </form>
          </div>
        </div>
      )}

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
