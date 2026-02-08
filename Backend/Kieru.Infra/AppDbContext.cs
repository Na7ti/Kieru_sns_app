using Microsoft.EntityFrameworkCore;
using Kieru.Core.Entities;

namespace Kieru.Infra
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Content).IsRequired().HasMaxLength(280);
                entity.Property(e => e.LifespanCategory).IsRequired().HasMaxLength(20);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
                
                entity.HasIndex(e => e.ExpiresAt).HasDatabaseName("IX_Posts_ExpiresAt");
                entity.HasIndex(e => new { e.IsDeleted, e.ExpiresAt }).HasDatabaseName("IX_Posts_IsDeleted_ExpiresAt");
            });
        }
    }
}
