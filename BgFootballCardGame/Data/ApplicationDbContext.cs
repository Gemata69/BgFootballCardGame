using BgFootballCardGame.Models;
using Microsoft.EntityFrameworkCore;

namespace BgFootballCardGame.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Card> Cards { get; set; }
    }
}