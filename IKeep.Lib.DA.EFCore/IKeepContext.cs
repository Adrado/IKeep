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
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        public DbSet<Area> Areas { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Corrective> Correctives { get; set; }
        public DbSet<ElementType> ElementTypes { get; set; }
        public DbSet<Floor> Floors { get; set; }
        public DbSet<Format> Formats { get; set; }
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
        public DbSet<Task> Tasks { get; set; }
        public DbSet<GenericTask> GenericTasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ElementObservation> ElementObservations { get; set; }
        public DbSet<InstallationUser> InstallationUsers { get; set; }
        public DbSet<UserCategory> UserCategories { get; set; }
        public DbSet<ElementImage> ElementImages { get; set; }
    }
}
