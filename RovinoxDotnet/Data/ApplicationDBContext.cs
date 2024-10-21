using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Batch> Batches { get; set; }
        public DbSet<Curriculum> Curriculums { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<HomeWork> HomeWorks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> roles = [
                new() {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new() {
                    Name = "User",
                    NormalizedName = "USER"
                },
            ];

            builder.Entity<IdentityRole>().HasData(roles);
            
            builder.Entity<Notification>().HasKey(x => new {x.ReceiverId, x.SenderId});
            builder.Entity<Notification>().HasOne(e=>e.Sender).WithMany(z=> z.Sender).HasForeignKey(x=>x.SenderId).OnDelete(DeleteBehavior.ClientSetNull);
            builder.Entity<Notification>().HasOne(e=>e.Receiver).WithMany(z=> z.Receiver).HasForeignKey(x=>x.ReceiverId).OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<Payment>().HasKey(x => new {x.ApproverId, x.CashReceiverId});
            builder.Entity<Payment>().HasOne(e=>e.Approver).WithMany(z=> z.Approver).HasForeignKey(x=>x.ApproverId).OnDelete(DeleteBehavior.ClientSetNull);
            builder.Entity<Payment>().HasOne(e=>e.CashReceiver).WithMany(z=> z.CashReceiver).HasForeignKey(x=>x.CashReceiverId).OnDelete(DeleteBehavior.ClientSetNull);

        }

    }
}