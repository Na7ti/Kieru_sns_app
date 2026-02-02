import React, { useState, useEffect } from 'react';
import { Clock, Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Post } from '../../types/index.ts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PostCardProps {
  post: Post;
  onExpire?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const remaining = post.expiresAt.getTime() - now.getTime();
      
      if (remaining <= 0) {
        setTimeLeft(0);
        onExpire?.(post.id);
      } else {
        setTimeLeft(remaining);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [post, onExpire]);

  const formatTimeLeft = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}時間`;
    if (minutes > 0) return `${minutes}分`;
    return `${seconds}秒`;
  };

  const getBadgeColor = () => {
    const minutes = timeLeft / (1000 * 60);
    if (minutes < 15) return 'bg-rose-500/20 text-rose-400 border-rose-500/30'; // 緊急
    if (minutes < 60) return 'bg-amber-500/20 text-amber-400 border-amber-500/30'; // 注意
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'; // 余裕
  };

  return (
    <div className="glass-morphism rounded-2xl p-4 mb-4 transition-all hover:border-white/20 group animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
             <img src={post.avatarUrl} alt={post.username} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">{post.username}</h3>
            <p className="text-xs text-slate-500">{formatDistanceToNow(post.createdAt, { addSuffix: true, locale: ja })}</p>
          </div>
        </div>
        
        <div className={cn(
          "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
          getBadgeColor()
        )}>
          <Clock size={12} />
          <span>残り {formatTimeLeft(timeLeft)}</span>
        </div>
      </div>

      <div className="text-slate-200 mb-4 whitespace-pre-wrap leading-relaxed">
        {post.content}
      </div>

      <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-white/5">
        <button className="flex items-center gap-2 hover:text-rose-400 transition-colors">
          <Heart size={18} />
          <span className="text-xs">24</span>
        </button>
        {post.category === 'DISCUSS' && (
          <button className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
            <MessageCircle size={18} />
            <span className="text-xs">コメント</span>
          </button>
        )}
        <button className="hover:text-slate-300 transition-colors">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
