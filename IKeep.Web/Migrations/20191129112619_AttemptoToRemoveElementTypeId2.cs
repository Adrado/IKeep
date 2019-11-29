using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class AttemptoToRemoveElementTypeId2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Elements_ElementTypes_ElementTypeId",
                table: "Elements");

            migrationBuilder.DropIndex(
                name: "IX_Elements_ElementTypeId",
                table: "Elements");

            migrationBuilder.DropColumn(
                name: "ElementTypeId",
                table: "Elements");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ElementTypeId",
                table: "Elements",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Elements_ElementTypeId",
                table: "Elements",
                column: "ElementTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Elements_ElementTypes_ElementTypeId",
                table: "Elements",
                column: "ElementTypeId",
                principalTable: "ElementTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
