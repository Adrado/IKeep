using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class RelationsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Users_UserId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Observations_GemericElements_GenericElementId",
                table: "Observations");

            migrationBuilder.DropIndex(
                name: "IX_Observations_GenericElementId",
                table: "Observations");

            migrationBuilder.DropIndex(
                name: "IX_Categories_UserId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "SupplierName",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "GenericElementId",
                table: "Observations");

            migrationBuilder.DropColumn(
                name: "SupplierName",
                table: "Correctives");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Correctives");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Categories");

            migrationBuilder.AddColumn<Guid>(
                name: "SupplierId",
                table: "Tasks",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SupplierId",
                table: "Correctives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "Correctives");

            migrationBuilder.AddColumn<string>(
                name: "SupplierName",
                table: "Tasks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Tasks",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "GenericElementId",
                table: "Observations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SupplierName",
                table: "Correctives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Correctives",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Categories",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Observations_GenericElementId",
                table: "Observations",
                column: "GenericElementId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_UserId",
                table: "Categories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Users_UserId",
                table: "Categories",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Observations_GemericElements_GenericElementId",
                table: "Observations",
                column: "GenericElementId",
                principalTable: "GemericElements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
