using IKeep.Lib.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class IKeepContext : DbContext
    {
        public IKeepContext(DbContextOptions<IKeepContext> options)
            : base (options)
        {
           // Configuration.ProxyCreationEnabled = true;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GenericElement>()
             .HasMany(p => p.Elements)
             .WithOne(t => t.GenericElement)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Element>()
            .HasOne(b => b.GenericElement)
            .WithMany(a => a.Elements)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GenericChore>()
             .HasMany(p => p.Chores)
             .WithOne(t => t.GenericChore)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Chore>()
            .HasOne(b => b.GenericChore)
            .WithMany(a => a.Chores)
            .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<Area> Areas { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Corrective> Correctives { get; set; }
        public DbSet<ElementType> ElementTypes { get; set; }
        public DbSet<Floor> Floors { get; set; }
        public DbSet<FormatLabel> FormatLabels { get; set; }
        public DbSet<FormatValue> FormatValues { get; set; }
        public DbSet<Element> Elements { get; set; }
        public DbSet<GenericElement> GenericElements { get; set; }
        public DbSet<Inspection> Inspections { get; set; }
        public DbSet<Installation> Installations { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Observation> Observations { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Chore> Chores { get; set; }
        public DbSet<GenericChore> GenericChores { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ElementObservation> ElementObservations { get; set; }
        public DbSet<InstallationUser> InstallationUsers { get; set; }
        public DbSet<UserCategory> UserCategories { get; set; }
        public DbSet<ElementImage> ElementImages { get; set; }
        public DbSet<GenericElementGenericChore> GenericElementGenericChores { get; set; }
        public DbSet<ElementGenericChore> ElementGenericChores { get; set; }
        public DbSet<GenericChoreFormatLabel> GenericChoreFormatLabels { get; set; }

    }
}
