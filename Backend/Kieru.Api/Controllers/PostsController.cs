using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kieru.Infra;
using Kieru.Core.Entities;
using Kieru.Api.Models;

namespace Kieru.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostResponse>>> GetPosts()
        {
            var now = DateTime.UtcNow;
            var posts = await _context.Posts
                .Where(p => !p.IsDeleted && p.ExpiresAt > now)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new PostResponse
                {
                    Id = p.Id,
                    Content = p.Content,
                    LifespanCategory = p.LifespanCategory,
                    CreatedAt = p.CreatedAt,
                    ExpiresAt = p.ExpiresAt,
                    RemainingMinutes = (p.ExpiresAt - now).TotalMinutes
                })
                .ToListAsync();

            return Ok(posts);
        }

        [HttpPost]
        public async Task<ActionResult<PostResponse>> CreatePost(CreatePostRequest request)
        {
            var now = DateTime.UtcNow;
            var expiresAt = now.AddMinutes(request.LifespanMinutes);

            var post = new Post
            {
                UserId = 1, // MVP用固定ID
                Content = request.Content,
                LifespanCategory = request.LifespanCategory,
                CreatedAt = now,
                ExpiresAt = expiresAt,
                IsDeleted = false
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPosts), new { id = post.Id }, new PostResponse
            {
                Id = post.Id,
                Content = post.Content,
                LifespanCategory = post.LifespanCategory,
                CreatedAt = post.CreatedAt,
                ExpiresAt = post.ExpiresAt,
                RemainingMinutes = (post.ExpiresAt - now).TotalMinutes
            });
        }
    }
}
