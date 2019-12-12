using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class ChangeTaskToChore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ElementGenericTasks");

            migrationBuilder.DropTable(
                name: "GenericElementGenericTasks");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "GenericTasks");

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
                    PriorityId = table.Column<Guid>(nullable: false),
                    SupplierId = table.Column<Guid>(nullable: true),
                    FormatId = table.Column<Guid>(nullable: false),
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
                        name: "FK_GenericChores_Formats_FormatId",
                        column: x => x.FormatId,
                        principalTable: "Formats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericChores_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
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
                name: "Chores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    GenericTaskId = table.Column<Guid>(nullable: true),
                    GenericChoreId = table.Column<Guid>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    CategoryId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chores_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "ElementGenericChores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    GenericTaskId = table.Column<Guid>(nullable: false),
                    GenericChoreId = table.Column<Guid>(nullable: true),
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
                        onDelete: ReferentialAction.Restrict);
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

            migrationBuilder.CreateIndex(
                name: "IX_Chores_CategoryId",
                table: "Chores",
                column: "CategoryId");

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
                name: "IX_ElementGenericChores_ElementId",
                table: "ElementGenericChores",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementGenericChores_GenericChoreId",
                table: "ElementGenericChores",
                column: "GenericChoreId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChores_CategoryId",
                table: "GenericChores",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChores_FormatId",
                table: "GenericChores",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChores_PriorityId",
                table: "GenericChores",
                column: "PriorityId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chores");

            migrationBuilder.DropTable(
                name: "ElementGenericChores");

            migrationBuilder.DropTable(
                name: "GenericElementGenericChores");

            migrationBuilder.DropTable(
                name: "GenericChores");

            migrationBuilder.CreateTable(
                name: "GenericTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CategoryId = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Duration = table.Column<TimeSpan>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    FormatId = table.Column<Guid>(nullable: false),
                    Period = table.Column<int>(nullable: false),
                    PriorityId = table.Column<Guid>(nullable: false),
                    Ref = table.Column<string>(nullable: true),
                    SupplierId = table.Column<Guid>(nullable: true)
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
                        name: "FK_GenericTasks_Formats_FormatId",
                        column: x => x.FormatId,
                        principalTable: "Formats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericTasks_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericTasks_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ElementGenericTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    GenericTaskId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementGenericTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElementGenericTasks_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ElementGenericTasks_GenericTasks_GenericTaskId",
                        column: x => x.GenericTaskId,
                        principalTable: "GenericTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GenericElementGenericTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    GenericElementId = table.Column<Guid>(nullable: false),
                    GenericTaskId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericElementGenericTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericElementGenericTasks_GenericElements_GenericElementId",
                        column: x => x.GenericElementId,
                        principalTable: "GenericElements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericElementGenericTasks_GenericTasks_GenericTaskId",
                        column: x => x.GenericTaskId,
                        principalTable: "GenericTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CategoryId = table.Column<Guid>(nullable: true),
                    ElementId = table.Column<Guid>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    GenericTaskId = table.Column<Guid>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tasks_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_GenericTasks_GenericTaskId",
                        column: x => x.GenericTaskId,
                        principalTable: "GenericTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tasks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ElementGenericTasks_ElementId",
                table: "ElementGenericTasks",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementGenericTasks_GenericTaskId",
                table: "ElementGenericTasks",
                column: "GenericTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElementGenericTasks_GenericElementId",
                table: "GenericElementGenericTasks",
                column: "GenericElementId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElementGenericTasks_GenericTaskId",
                table: "GenericElementGenericTasks",
                column: "GenericTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_CategoryId",
                table: "GenericTasks",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_FormatId",
                table: "GenericTasks",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_PriorityId",
                table: "GenericTasks",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_SupplierId",
                table: "GenericTasks",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CategoryId",
                table: "Tasks",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ElementId",
                table: "Tasks",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_GenericTaskId",
                table: "Tasks",
                column: "GenericTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_UserId",
                table: "Tasks",
                column: "UserId");
        }
    }
}
