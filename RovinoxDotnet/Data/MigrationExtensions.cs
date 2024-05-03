using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RovinoxDotnet.Data
{
    public static class MigrationExtensions
    {
         public static void ApplyMigrations(this IApplicationBuilder app){
            using IServiceScope scope = app.ApplicationServices.CreateScope();   
            using ApplicationDBContext dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
            dbContext.Database.Migrate();
         }
    }
}