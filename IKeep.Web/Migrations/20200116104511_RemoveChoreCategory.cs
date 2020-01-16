using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class RemoveChoreCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chores_Categories_CategoryId",
                table: "Chores");

            migrationBuilder.DropIndex(
                name: "IX_Chores_CategoryId",
                table: "Chores");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Chores");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Chores",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Chores_CategoryId",
                table: "Chores",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chores_Categories_CategoryId",
                table: "Chores",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
