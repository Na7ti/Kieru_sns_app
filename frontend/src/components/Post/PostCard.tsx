import React from "react";

const PostCard: React.FC = () => {
  return (
    <div className="post-card">
      {/* カウントダウン表示を含むカード */}
      <p>投稿内容</p>
      <span>残り時間: --:--:--</span>
    </div>
  );
};

export default PostCard;
