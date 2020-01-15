using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class RetirementDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "RetirementDate",
                table: "Elements",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RetirementDate",
                table: "Elements");
        }
    }
}
