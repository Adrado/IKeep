using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class InitialMigrationIKA9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChoreTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChoreTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ElementTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FormatLabels",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Extension = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormatLabels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Installations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CIF = table.Column<string>(nullable: true),
                    CP = table.Column<int>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Phone = table.Column<int>(nullable: false),
                    Phone2 = table.Column<int>(nullable: false),
                    Fax = table.Column<int>(nullable: false),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Installations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Observations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Observations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    LoginName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    FirstSurname = table.Column<string>(nullable: true),
                    SecondSurname = table.Column<string>(nullable: true),
                    DNI = table.Column<string>(nullable: true),
                    Phone = table.Column<int>(nullable: false),
                    Phone2 = table.Column<int>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Birthplace = table.Column<string>(nullable: true),
                    Birthdate = table.Column<DateTime>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ImageId = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GenericElements",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ElementTypeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericElements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericElements_ElementTypes_ElementTypeId",
                        column: x => x.ElementTypeId,
                        principalTable: "ElementTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Buildings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    InstallationId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buildings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Buildings_Installations_InstallationId",
                        column: x => x.InstallationId,
                        principalTable: "Installations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inspections",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Result = table.Column<string>(nullable: true),
                    InstallationId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inspections_Installations_InstallationId",
                        column: x => x.InstallationId,
                        principalTable: "Installations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    PDF = table.Column<string>(nullable: true),
                    InstallationId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reports_Installations_InstallationId",
                        column: x => x.InstallationId,
                        principalTable: "Installations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GenericChores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Duration = table.Column<TimeSpan>(nullable: false),
                    Period = table.Column<int>(nullable: false),
                    Priority = table.Column<int>(nullable: false),
                    ChoreTypeId = table.Column<Guid>(nullable: false),
                    SupplierId = table.Column<Guid>(nullable: true),
                    CategoryId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericChores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericChores_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericChores_ChoreTypes_ChoreTypeId",
                        column: x => x.ChoreTypeId,
                        principalTable: "ChoreTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericChores_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InstallationUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    InstallationId = table.Column<Guid>(nullable: false),
                    RoleId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstallationUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstallationUsers_Installations_InstallationId",
                        column: x => x.InstallationId,
                        principalTable: "Installations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InstallationUsers_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InstallationUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    CategoryId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCategories_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Floors",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    BuildingId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Floors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Floors_Buildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GenericChoreFormatLabels",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    GenericChoreId = table.Column<Guid>(nullable: false),
                    FormatLabelId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericChoreFormatLabels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericChoreFormatLabels_FormatLabels_FormatLabelId",
                        column: x => x.FormatLabelId,
                        principalTable: "FormatLabels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericChoreFormatLabels_GenericChores_GenericChoreId",
                        column: x => x.GenericChoreId,
                        principalTable: "GenericChores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GenericElementGenericChores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    GenericElementId = table.Column<Guid>(nullable: false),
                    GenericChoreId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericElementGenericChores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericElementGenericChores_GenericChores_GenericChoreId",
                        column: x => x.GenericChoreId,
                        principalTable: "GenericChores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericElementGenericChores_GenericElements_GenericElementId",
                        column: x => x.GenericElementId,
                        principalTable: "GenericElements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Areas",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    FloorId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Areas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Areas_Floors_FloorId",
                        column: x => x.FloorId,
                        principalTable: "Floors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Elements",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    RetirementDate = table.Column<DateTime>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Brand = table.Column<string>(nullable: true),
                    Model = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    SafetyAndHealth = table.Column<string>(nullable: true),
                    AreaId = table.Column<Guid>(nullable: false),
                    GenericElementId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Elements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Elements_Areas_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Elements_GenericElements_GenericElementId",
                        column: x => x.GenericElementId,
                        principalTable: "GenericElements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Maps",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ImageId = table.Column<string>(nullable: true),
                    FloorId = table.Column<Guid>(nullable: false),
                    AreaId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Maps_Areas_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Maps_Floors_FloorId",
                        column: x => x.FloorId,
                        principalTable: "Floors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Chores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    GenericChoreId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chores_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Chores_GenericChores_GenericChoreId",
                        column: x => x.GenericChoreId,
                        principalTable: "GenericChores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Chores_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Correctives",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    OpeningDescription = table.Column<string>(nullable: true),
                    OpeningDate = table.Column<DateTime>(nullable: false),
                    OpenedUserName = table.Column<string>(nullable: true),
                    OpenedUserId = table.Column<Guid>(nullable: false),
                    ClosingDescription = table.Column<string>(nullable: true),
                    ClosingDate = table.Column<DateTime>(nullable: false),
                    ClosedUserName = table.Column<string>(nullable: true),
                    ClosedUserId = table.Column<Guid>(nullable: true),
                    Duration = table.Column<TimeSpan>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    SupplierId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Correctives", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Correctives_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Correctives_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ElementGenericChores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    GenericChoreId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementGenericChores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElementGenericChores_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ElementGenericChores_GenericChores_GenericChoreId",
                        column: x => x.GenericChoreId,
                        principalTable: "GenericChores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ElementImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Image = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElementImages_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ElementObservations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    ObservationId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementObservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElementObservations_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ElementObservations_Observations_ObservationId",
                        column: x => x.ObservationId,
                        principalTable: "Observations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormatValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    FormatLabelId = table.Column<Guid>(nullable: false),
                    ChoreId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormatValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormatValues_Chores_ChoreId",
                        column: x => x.ChoreId,
                        principalTable: "Chores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormatValues_FormatLabels_FormatLabelId",
                        column: x => x.FormatLabelId,
                        principalTable: "FormatLabels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Areas_FloorId",
                table: "Areas",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_Buildings_InstallationId",
                table: "Buildings",
                column: "InstallationId");

            migrationBuilder.CreateIndex(
                name: "IX_Chores_ElementId",
                table: "Chores",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_Chores_GenericChoreId",
                table: "Chores",
                column: "GenericChoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Chores_UserId",
                table: "Chores",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Correctives_ElementId",
                table: "Correctives",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_Correctives_SupplierId",
                table: "Correctives",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementGenericChores_ElementId",
                table: "ElementGenericChores",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementGenericChores_GenericChoreId",
                table: "ElementGenericChores",
                column: "GenericChoreId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementImages_ElementId",
                table: "ElementImages",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementObservations_ElementId",
                table: "ElementObservations",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementObservations_ObservationId",
                table: "ElementObservations",
                column: "ObservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Elements_AreaId",
                table: "Elements",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_Elements_GenericElementId",
                table: "Elements",
                column: "GenericElementId");

            migrationBuilder.CreateIndex(
                name: "IX_Floors_BuildingId",
                table: "Floors",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_FormatValues_ChoreId",
                table: "FormatValues",
                column: "ChoreId");

            migrationBuilder.CreateIndex(
                name: "IX_FormatValues_FormatLabelId",
                table: "FormatValues",
                column: "FormatLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChoreFormatLabels_FormatLabelId",
                table: "GenericChoreFormatLabels",
                column: "FormatLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChoreFormatLabels_GenericChoreId",
                table: "GenericChoreFormatLabels",
                column: "GenericChoreId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChores_CategoryId",
                table: "GenericChores",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChores_ChoreTypeId",
                table: "GenericChores",
                column: "ChoreTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChores_SupplierId",
                table: "GenericChores",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElementGenericChores_GenericChoreId",
                table: "GenericElementGenericChores",
                column: "GenericChoreId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElementGenericChores_GenericElementId",
                table: "GenericElementGenericChores",
                column: "GenericElementId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElements_ElementTypeId",
                table: "GenericElements",
                column: "ElementTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspections_InstallationId",
                table: "Inspections",
                column: "InstallationId");

            migrationBuilder.CreateIndex(
                name: "IX_InstallationUsers_InstallationId",
                table: "InstallationUsers",
                column: "InstallationId");

            migrationBuilder.CreateIndex(
                name: "IX_InstallationUsers_RoleId",
                table: "InstallationUsers",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_InstallationUsers_UserId",
                table: "InstallationUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Maps_AreaId",
                table: "Maps",
                column: "AreaId",
                unique: true,
                filter: "[AreaId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Maps_FloorId",
                table: "Maps",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_InstallationId",
                table: "Reports",
                column: "InstallationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCategories_CategoryId",
                table: "UserCategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCategories_UserId",
                table: "UserCategories",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Correctives");

            migrationBuilder.DropTable(
                name: "ElementGenericChores");

            migrationBuilder.DropTable(
                name: "ElementImages");

            migrationBuilder.DropTable(
                name: "ElementObservations");

            migrationBuilder.DropTable(
                name: "FormatValues");

            migrationBuilder.DropTable(
                name: "GenericChoreFormatLabels");

            migrationBuilder.DropTable(
                name: "GenericElementGenericChores");

            migrationBuilder.DropTable(
                name: "Inspections");

            migrationBuilder.DropTable(
                name: "InstallationUsers");

            migrationBuilder.DropTable(
                name: "Maps");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "UserCategories");

            migrationBuilder.DropTable(
                name: "Observations");

            migrationBuilder.DropTable(
                name: "Chores");

            migrationBuilder.DropTable(
                name: "FormatLabels");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Elements");

            migrationBuilder.DropTable(
                name: "GenericChores");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Areas");

            migrationBuilder.DropTable(
                name: "GenericElements");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "ChoreTypes");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Floors");

            migrationBuilder.DropTable(
                name: "ElementTypes");

            migrationBuilder.DropTable(
                name: "Buildings");

            migrationBuilder.DropTable(
                name: "Installations");
        }
    }
}
