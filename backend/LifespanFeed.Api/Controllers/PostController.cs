using Microsoft.AspNetCore.Mvc;

namespace LifespanFeed.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        // 投稿・寿命設定の受付
        [HttpPost]
        public IActionResult CreatePost()
        {
            return Ok();
        }
    }
}
