using Microsoft.EntityFrameworkCore;
using ShareEaseAPI.Models;

namespace ShareEaseAPI.Data
{

    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }

        public DbSet<ResourceModel> Resource { get; set; }

        public DbSet<CategoryModel> Category { get; set; }
        public DbSet<RequestModel> Request { get; set; }
        public DbSet<SubscriptionModel> Subscription { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RequestModel>()
                .HasOne(r => r.Owner)
                .WithMany(u => u.OwnerRequests)
                .HasForeignKey(r => r.OwnerId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<RequestModel>()
                .HasOne(r => r.Borrower)
                .WithMany(u => u.BorrowerRequests)
                .HasForeignKey(r => r.BorrowerId)
                .OnDelete(DeleteBehavior.NoAction);


            base.OnModelCreating(modelBuilder);
        }
    }

}
