using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RovinoxDotnet.Models;

namespace RovinoxDotnet.Data
{
    public class ApplicationDBContext : IdentityDbContext
    {
        public ApplicationDBContext(DbContextOptions options) :base(options)
        {
            
        }
        public DbSet<Batch>  Batches { get; set; }
        public DbSet<Curriculum>  Curriculums { get; set; }
        // protected override void OnModelCreating(ModelBuilder builder){
            //builder.Entity<Curriculum>(x => x.HasKey(p => p.BatchId));

            // builder.Entity<Curriculum>().HasOne(b => b.Batch);

            // builder.Entity<Curriculum>(entity=>{
            //      entity.HasKey(a=>a.Id);
            //     entity.HasOne( c => c.BatchId);
            // });
        // }
    }
}