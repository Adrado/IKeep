using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class AddUserImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "ElementImages");

            migrationBuilder.AddColumn<string>(
                name: "HashData",
                table: "Reports",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HashData",
                table: "Maps",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "ElementImages",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Downloads",
                table: "ElementImages",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "ElementImages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HashData",
                table: "ElementImages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ElementImages",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Downloads = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Extension = table.Column<string>(nullable: true),
                    HashData = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserImages_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserImages_UserId",
                table: "UserImages",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserImages");

            migrationBuilder.DropColumn(
                name: "HashData",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "HashData",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "ElementImages");

            migrationBuilder.DropColumn(
                name: "Downloads",
                table: "ElementImages");

            migrationBuilder.DropColumn(
                name: "Extension",
                table: "ElementImages");

            migrationBuilder.DropColumn(
                name: "HashData",
                table: "ElementImages");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ElementImages");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "ElementImages",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Downloads = table.Column<int>(nullable: false),
                    ElementId = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Extension = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Elements_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_ElementId",
                table: "Images",
                column: "ElementId");
        }
    }
}
