using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class InitialMigrationA5 : Migration
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
                name: "Formats",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formats", x => x.Id);
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
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
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
                    EntryTime = table.Column<DateTime>(nullable: false),
                    ExitTime = table.Column<DateTime>(nullable: false),
                    ImageId = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    RoleId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
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
                name: "InstallationUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    InstallationId = table.Column<Guid>(nullable: false)
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
                name: "Maps",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ImageId = table.Column<string>(nullable: true),
                    FloorId = table.Column<Guid>(nullable: false),
                    AreaRef = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Maps_Floors_FloorId",
                        column: x => x.FloorId,
                        principalTable: "Floors",
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
                    FloorId = table.Column<Guid>(nullable: false),
                    MapId = table.Column<Guid>(nullable: true)
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
                    table.ForeignKey(
                        name: "FK_Areas_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GenericElements",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    ElementTypeId = table.Column<Guid>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    AreaId = table.Column<Guid>(nullable: true),
                    GenericElementId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericElements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericElements_Areas_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericElements_GenericElements_GenericElementId",
                        column: x => x.GenericElementId,
                        principalTable: "GenericElements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    OpenedBy = table.Column<string>(nullable: true),
                    ClosingDescription = table.Column<string>(nullable: true),
                    ClosingDate = table.Column<DateTime>(nullable: false),
                    ClosedBy = table.Column<string>(nullable: true),
                    Duration = table.Column<TimeSpan>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    SupplierId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Correctives", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Correctives_GenericElements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "GenericElements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Correctives_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                        name: "FK_ElementImages_GenericElements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "GenericElements",
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
                        name: "FK_ElementObservations_GenericElements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "GenericElements",
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
                name: "GenericTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Duration = table.Column<TimeSpan>(nullable: false),
                    Period = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    PriorityId = table.Column<Guid>(nullable: false),
                    FormatId = table.Column<Guid>(nullable: false),
                    CategoryId = table.Column<Guid>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: true),
                    SupplierId = table.Column<Guid>(nullable: true),
                    UserId = table.Column<Guid>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericTasks_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericTasks_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericTasks_GenericElements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "GenericElements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericTasks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Areas_FloorId",
                table: "Areas",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_Areas_MapId",
                table: "Areas",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_Buildings_InstallationId",
                table: "Buildings",
                column: "InstallationId");

            migrationBuilder.CreateIndex(
                name: "IX_Correctives_ElementId",
                table: "Correctives",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_Correctives_UserId",
                table: "Correctives",
                column: "UserId");

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
                name: "IX_Floors_BuildingId",
                table: "Floors",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElements_AreaId",
                table: "GenericElements",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElements_GenericElementId",
                table: "GenericElements",
                column: "GenericElementId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_CategoryId",
                table: "GenericTasks",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_PriorityId",
                table: "GenericTasks",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_ElementId",
                table: "GenericTasks",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_UserId",
                table: "GenericTasks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspections_InstallationId",
                table: "Inspections",
                column: "InstallationId");

            migrationBuilder.CreateIndex(
                name: "IX_InstallationUsers_InstallationId",
                table: "InstallationUsers",
                column: "InstallationId");

            migrationBuilder.CreateIndex(
                name: "IX_InstallationUsers_UserId",
                table: "InstallationUsers",
                column: "UserId");

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

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Correctives");

            migrationBuilder.DropTable(
                name: "ElementImages");

            migrationBuilder.DropTable(
                name: "ElementObservations");

            migrationBuilder.DropTable(
                name: "ElementTypes");

            migrationBuilder.DropTable(
                name: "Formats");

            migrationBuilder.DropTable(
                name: "GenericTasks");

            migrationBuilder.DropTable(
                name: "Inspections");

            migrationBuilder.DropTable(
                name: "InstallationUsers");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "UserCategories");

            migrationBuilder.DropTable(
                name: "Observations");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "GenericElements");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Areas");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Maps");

            migrationBuilder.DropTable(
                name: "Floors");

            migrationBuilder.DropTable(
                name: "Buildings");

            migrationBuilder.DropTable(
                name: "Installations");
        }
    }
}
