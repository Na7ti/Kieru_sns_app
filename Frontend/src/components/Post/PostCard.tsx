import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Post } from '../../types/index';
import Countdown from '../Common/Countdown';

interface PostCardProps {
  post: Post;
  onExpire?: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onExpire }) => {
  return (
    <div className="glass-morphism rounded-2xl p-4 mb-4 transition-all hover:border-white/20 group animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden flex items-center justify-center">
             <img src={post.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`} alt={post.username} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">{post.username}</h3>
            <p className="text-xs text-slate-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ja })}
            </p>
          </div>
        </div>
        
        <Countdown expiresAt={post.expiresAt} onExpire={() => onExpire?.(post.id)} />
      </div>

      <div className="text-slate-200 mb-4 whitespace-pre-wrap leading-relaxed">
        {post.content}
      </div>

      <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-white/5">
        <button className="flex items-center gap-2 hover:text-rose-400 transition-colors">
          <Heart size={18} />
          <span className="text-xs">0</span>
        </button>
        {post.lifespanCategory === 'DISCUSS' && (
          <button className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
            <MessageCircle size={18} />
            <span className="text-xs">議論中</span>
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
