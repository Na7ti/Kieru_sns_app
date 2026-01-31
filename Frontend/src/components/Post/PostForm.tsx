import React from 'react';

const PostForm: React.FC = () => {
    return (
        <form className="post-form">
            {/* 寿命選択付きの投稿フォーム */}
            <textarea placeholder="今何してる？"></textarea>
            <select>
                <option value="1">1時間</option>
                <option value="12">12時間</option>
                <option value="24">24時間</option>
            </select>
            <button type="submit">投稿</button>
        </form>
    );
};

export default PostForm;
