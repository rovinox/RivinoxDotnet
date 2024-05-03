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
    }
}