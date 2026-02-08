namespace Kieru.Api.Models
{
    public class CreatePostRequest
    {
        public string Content { get; set; } = string.Empty;
        public string LifespanCategory { get; set; } = string.Empty;
        public int LifespanMinutes { get; set; } // カテゴリー内の詳細な時間
    }

    public class PostResponse
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public string LifespanCategory { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
        public double RemainingMinutes { get; set; }
    }
}
