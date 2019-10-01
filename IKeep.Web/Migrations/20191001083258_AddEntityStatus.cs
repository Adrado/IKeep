using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class AddEntityStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "UserCategories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Tasks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Tasks",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Tasks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Suppliers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Roles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Reports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Priorities",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Observations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Maps",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "InstallationUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Installations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Inspections",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "GemericElements",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Formats",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Floors",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "ElementTypes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "ElementObservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Correctives",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Categories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Buildings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntityStatus",
                table: "Areas",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "UserCategories");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Priorities");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Observations");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "InstallationUsers");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Installations");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Inspections");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "GemericElements");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Formats");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Floors");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "ElementTypes");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "ElementObservations");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Correctives");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Buildings");

            migrationBuilder.DropColumn(
                name: "EntityStatus",
                table: "Areas");
        }
    }
}
