using Microsoft.EntityFrameworkCore;

namespace LifespanFeed.Infra
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
