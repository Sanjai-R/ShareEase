using Microsoft.EntityFrameworkCore;
using ShareEaseAPI.Models;

namespace ShareEaseAPI.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }

    }
}
