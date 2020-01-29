﻿// <auto-generated />
using System;
using IKeep.Lib.DA.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IKeep.Web.Migrations
{
    [DbContext(typeof(IKeepContext))]
    partial class IKeepContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("IKeep.Lib.Models.Area", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("FloorId");

                    b.Property<Guid?>("MapId");

                    b.Property<string>("Name");

                    b.Property<string>("Ref");

                    b.HasKey("Id");

                    b.HasIndex("FloorId");

                    b.HasIndex("MapId");

                    b.ToTable("Areas");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Building", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("InstallationId");

                    b.Property<string>("Name");

                    b.Property<string>("Ref");

                    b.HasKey("Id");

                    b.HasIndex("InstallationId");

                    b.ToTable("Buildings");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Chore", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ElementId");

                    b.Property<DateTime>("EndDate");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("GenericChoreId");

                    b.Property<DateTime>("StartDate");

                    b.Property<int>("Status");

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ElementId");

                    b.HasIndex("GenericChoreId");

                    b.HasIndex("UserId");

                    b.ToTable("Chores");
                });

            modelBuilder.Entity("IKeep.Lib.Models.ChoreType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ChoreTypes");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Corrective", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("ClosedUserId");

                    b.Property<string>("ClosedUserName");

                    b.Property<DateTime>("ClosingDate");

                    b.Property<string>("ClosingDescription");

                    b.Property<TimeSpan>("Duration");

                    b.Property<Guid>("ElementId");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("OpenedUserId");

                    b.Property<string>("OpenedUserName");

                    b.Property<DateTime>("OpeningDate");

                    b.Property<string>("OpeningDescription");

                    b.Property<int>("Status");

                    b.Property<Guid?>("SupplierId");

                    b.HasKey("Id");

                    b.HasIndex("ElementId");

                    b.HasIndex("SupplierId");

                    b.ToTable("Correctives");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Element", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AreaId");

                    b.Property<string>("Brand");

                    b.Property<string>("Description");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid?>("GenericElementId");

                    b.Property<string>("Model");

                    b.Property<string>("Ref");

                    b.Property<DateTime?>("RetirementDate");

                    b.Property<string>("SafetyAndHealth");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.HasIndex("GenericElementId");

                    b.ToTable("Elements");
                });

            modelBuilder.Entity("IKeep.Lib.Models.ElementGenericChore", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ElementId");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("GenericChoreId");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("ElementId");

                    b.HasIndex("GenericChoreId");

                    b.ToTable("ElementGenericChores");
                });

            modelBuilder.Entity("IKeep.Lib.Models.ElementImage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<int>("Downloads");

                    b.Property<Guid>("ElementId");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Extension");

                    b.Property<string>("HashData");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("ElementId");

                    b.ToTable("ElementImages");
                });

            modelBuilder.Entity("IKeep.Lib.Models.ElementObservation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ElementId");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("ObservationId");

                    b.HasKey("Id");

                    b.HasIndex("ElementId");

                    b.HasIndex("ObservationId");

                    b.ToTable("ElementObservations");
                });

            modelBuilder.Entity("IKeep.Lib.Models.ElementType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.Property<string>("Ref");

                    b.HasKey("Id");

                    b.ToTable("ElementTypes");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Floor", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("BuildingId");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.Property<string>("Ref");

                    b.HasKey("Id");

                    b.HasIndex("BuildingId");

                    b.ToTable("Floors");
                });

            modelBuilder.Entity("IKeep.Lib.Models.FormatLabel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Extension");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("FormatLabels");
                });

            modelBuilder.Entity("IKeep.Lib.Models.FormatValue", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ChoreId");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("FormatLabelId");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.HasIndex("ChoreId");

                    b.HasIndex("FormatLabelId");

                    b.ToTable("FormatValues");
                });

            modelBuilder.Entity("IKeep.Lib.Models.GenericChore", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CategoryId");

                    b.Property<Guid>("ChoreTypeId");

                    b.Property<string>("Description");

                    b.Property<TimeSpan>("Duration");

                    b.Property<int>("EntityStatus");

                    b.Property<int>("Period");

                    b.Property<int>("Priority");

                    b.Property<string>("Ref");

                    b.Property<Guid?>("SupplierId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ChoreTypeId");

                    b.HasIndex("SupplierId");

                    b.ToTable("GenericChores");
                });

            modelBuilder.Entity("IKeep.Lib.Models.GenericChoreFormatLabel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("FormatLabelId");

                    b.Property<Guid>("GenericChoreId");

                    b.HasKey("Id");

                    b.HasIndex("FormatLabelId");

                    b.HasIndex("GenericChoreId");

                    b.ToTable("GenericChoreFormatLabels");
                });

            modelBuilder.Entity("IKeep.Lib.Models.GenericElement", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ElementTypeId");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("ElementTypeId");

                    b.ToTable("GenericElements");
                });

            modelBuilder.Entity("IKeep.Lib.Models.GenericElementGenericChore", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("GenericChoreId");

                    b.Property<Guid>("GenericElementId");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("GenericChoreId");

                    b.HasIndex("GenericElementId");

                    b.ToTable("GenericElementGenericChores");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Inspection", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("InstallationId");

                    b.Property<string>("Result");

                    b.HasKey("Id");

                    b.HasIndex("InstallationId");

                    b.ToTable("Inspections");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Installation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("CIF");

                    b.Property<int>("CP");

                    b.Property<string>("City");

                    b.Property<string>("Email");

                    b.Property<int>("EntityStatus");

                    b.Property<int>("Fax");

                    b.Property<string>("Name");

                    b.Property<int>("Phone");

                    b.Property<int>("Phone2");

                    b.Property<string>("Ref");

                    b.HasKey("Id");

                    b.ToTable("Installations");
                });

            modelBuilder.Entity("IKeep.Lib.Models.InstallationUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("InstallationId");

                    b.Property<Guid?>("RoleId");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("InstallationId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("InstallationUsers");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Map", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<int>("Downloads");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Extension");

                    b.Property<Guid>("FloorId");

                    b.Property<string>("HashData");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("FloorId");

                    b.ToTable("Maps");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Observation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("EntityStatus");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("Observations");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Report", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<int>("Downloads");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Extension");

                    b.Property<string>("HashData");

                    b.Property<Guid>("InstallationId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("InstallationId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Supplier", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("Email");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.Property<string>("PhoneNumber");

                    b.HasKey("Id");

                    b.ToTable("Suppliers");
                });

            modelBuilder.Entity("IKeep.Lib.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTime>("Birthdate");

                    b.Property<string>("Birthplace");

                    b.Property<string>("City");

                    b.Property<string>("DNI");

                    b.Property<string>("Email");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("FirstSurname");

                    b.Property<string>("ImageId");

                    b.Property<string>("LoginName");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<int>("Phone");

                    b.Property<int>("Phone2");

                    b.Property<string>("SecondSurname");

                    b.Property<string>("Token");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("IKeep.Lib.Models.UserCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CategoryId");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("UserCategories");
                });

            modelBuilder.Entity("IKeep.Lib.Models.UserImage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<int>("Downloads");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Extension");

                    b.Property<string>("HashData");

                    b.Property<string>("Name");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserImages");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Area", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Floor", "Floor")
                        .WithMany("Areas")
                        .HasForeignKey("FloorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.Map", "Map")
                        .WithMany()
                        .HasForeignKey("MapId");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Building", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Installation", "Installation")
                        .WithMany("Buildings")
                        .HasForeignKey("InstallationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.Chore", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Element", "Element")
                        .WithMany("Chores")
                        .HasForeignKey("ElementId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.GenericChore", "GenericChore")
                        .WithMany("Chores")
                        .HasForeignKey("GenericChoreId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("IKeep.Lib.Models.User", "User")
                        .WithMany("Chores")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Corrective", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Element", "Element")
                        .WithMany("Correctives")
                        .HasForeignKey("ElementId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.Supplier", "Supplier")
                        .WithMany()
                        .HasForeignKey("SupplierId");
                });

            modelBuilder.Entity("IKeep.Lib.Models.Element", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Area", "Area")
                        .WithMany("Elements")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.GenericElement", "GenericElement")
                        .WithMany("Elements")
                        .HasForeignKey("GenericElementId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("IKeep.Lib.Models.ElementGenericChore", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Element", "Element")
                        .WithMany("ElementGenericChores")
                        .HasForeignKey("ElementId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.GenericChore", "GenericChore")
                        .WithMany("ElementGenericChores")
                        .HasForeignKey("GenericChoreId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.ElementImage", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Element", "Element")
                        .WithMany("ElementImages")
                        .HasForeignKey("ElementId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.ElementObservation", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Element", "Element")
                        .WithMany("ElementObservations")
                        .HasForeignKey("ElementId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.Observation", "Observation")
                        .WithMany("ElementObservations")
                        .HasForeignKey("ObservationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.Floor", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Building", "Building")
                        .WithMany("Floors")
                        .HasForeignKey("BuildingId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.FormatValue", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Chore", "Chore")
                        .WithMany("FormatValues")
                        .HasForeignKey("ChoreId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.FormatLabel", "FormatLabel")
                        .WithMany("FormatValues")
                        .HasForeignKey("FormatLabelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.GenericChore", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Category", "Category")
                        .WithMany("GenericChores")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.ChoreType", "ChoreType")
                        .WithMany("GenericChores")
                        .HasForeignKey("ChoreTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.Supplier", "Supplier")
                        .WithMany()
                        .HasForeignKey("SupplierId");
                });

            modelBuilder.Entity("IKeep.Lib.Models.GenericChoreFormatLabel", b =>
                {
                    b.HasOne("IKeep.Lib.Models.FormatLabel", "FormatLabel")
                        .WithMany("GenericChoreFormatLabels")
                        .HasForeignKey("FormatLabelId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.GenericChore", "GenericChore")
                        .WithMany("GenericChoreFormatLabels")
                        .HasForeignKey("GenericChoreId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.GenericElement", b =>
                {
                    b.HasOne("IKeep.Lib.Models.ElementType", "ElementType")
                        .WithMany("GenericElements")
                        .HasForeignKey("ElementTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.GenericElementGenericChore", b =>
                {
                    b.HasOne("IKeep.Lib.Models.GenericChore", "GenericChore")
                        .WithMany("GenericElementGenericChores")
                        .HasForeignKey("GenericChoreId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.GenericElement", "GenericElement")
                        .WithMany("GenericElementGenericChores")
                        .HasForeignKey("GenericElementId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.Inspection", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Installation", "Installation")
                        .WithMany("Inspections")
                        .HasForeignKey("InstallationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.InstallationUser", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Installation", "Installation")
                        .WithMany("InstallationUsers")
                        .HasForeignKey("InstallationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.Role", "Role")
                        .WithMany("InstallationUsers")
                        .HasForeignKey("RoleId");

                    b.HasOne("IKeep.Lib.Models.User", "User")
                        .WithMany("InstallationUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.Map", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Floor", "Floor")
                        .WithMany("Maps")
                        .HasForeignKey("FloorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.Report", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Installation", "Installation")
                        .WithMany("Reports")
                        .HasForeignKey("InstallationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.UserCategory", b =>
                {
                    b.HasOne("IKeep.Lib.Models.Category", "Category")
                        .WithMany("UserCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IKeep.Lib.Models.User", "User")
                        .WithMany("UserCategories")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IKeep.Lib.Models.UserImage", b =>
                {
                    b.HasOne("IKeep.Lib.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
