using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class AddElementGenericTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Categories_CategoryId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Formats_FormatId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Priorities_PriorityId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Suppliers_SupplierId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_FormatId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_PriorityId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_SupplierId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "FormatId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Period",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "PriorityId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Elements",
                newName: "SafetyAndHealth");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "Tasks",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "SupplierId",
                table: "GenericTasks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Elements",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Elements",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "Elements",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ref",
                table: "Elements",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ElementGenericTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
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

            migrationBuilder.CreateIndex(
                name: "IX_GenericTasks_SupplierId",
                table: "GenericTasks",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementGenericTasks_ElementId",
                table: "ElementGenericTasks",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementGenericTasks_GenericTaskId",
                table: "ElementGenericTasks",
                column: "GenericTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_GenericTasks_Suppliers_SupplierId",
                table: "GenericTasks",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Categories_CategoryId",
                table: "Tasks",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GenericTasks_Suppliers_SupplierId",
                table: "GenericTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Categories_CategoryId",
                table: "Tasks");

            migrationBuilder.DropTable(
                name: "ElementGenericTasks");

            migrationBuilder.DropIndex(
                name: "IX_GenericTasks_SupplierId",
                table: "GenericTasks");

            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "GenericTasks");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Elements");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Elements");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Elements");

            migrationBuilder.DropColumn(
                name: "Ref",
                table: "Elements");

            migrationBuilder.RenameColumn(
                name: "SafetyAndHealth",
                table: "Elements",
                newName: "Name");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "Tasks",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Tasks",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "Tasks",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<Guid>(
                name: "FormatId",
                table: "Tasks",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Period",
                table: "Tasks",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "PriorityId",
                table: "Tasks",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SupplierId",
                table: "Tasks",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_FormatId",
                table: "Tasks",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_PriorityId",
                table: "Tasks",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_SupplierId",
                table: "Tasks",
                column: "SupplierId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Categories_CategoryId",
                table: "Tasks",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Formats_FormatId",
                table: "Tasks",
                column: "FormatId",
                principalTable: "Formats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Priorities_PriorityId",
                table: "Tasks",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Suppliers_SupplierId",
                table: "Tasks",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
