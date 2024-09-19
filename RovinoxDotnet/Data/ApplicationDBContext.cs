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

        }

    }
}