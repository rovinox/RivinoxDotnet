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
            builder.Entity<Payment>(entity =>
      {
    entity.HasOne(d => d.Approver)
        .WithMany(p => p.Approvers)
        .HasForeignKey(d => d.ApproverId)
        .OnDelete(DeleteBehavior.SetNull)
        .HasConstraintName("ApproverId");

    entity.HasOne(d => d.CashReceiver)
        .WithMany(p => p.CashReceivers)
        .HasForeignKey(d => d.CashReceiverId)
        .OnDelete(DeleteBehavior.SetNull)
        .HasConstraintName("CashReceiverId");

    entity.HasOne(d => d.User)
       .WithMany(p => p.Users)
       .HasForeignKey(d => d.UserId)
       .OnDelete(DeleteBehavior.SetNull)
       .HasConstraintName("UserId");
});

    builder.Entity<Notification>(entity =>
    {
    entity.HasOne(d => d.Receiver)
        .WithMany(p => p.Receivers)
        .HasForeignKey(d => d.ReceiverId)
        .OnDelete(DeleteBehavior.SetNull)
        .HasConstraintName("ReceiverId");

    entity.HasOne(d => d.Sender)
        .WithMany(p => p.Senders)
        .HasForeignKey(d => d.SenderId)
        .OnDelete(DeleteBehavior.SetNull)
        .HasConstraintName("SenderId");

    entity.HasOne(d => d.Payment)
        .WithMany(p => p.Notification)
        .HasForeignKey(d => d.PaymentId)
        .OnDelete(DeleteBehavior.SetNull)
        .HasConstraintName("PaymentId");

});

        }

    }
}