using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class AddsImageModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Maps_Areas_AreaId",
                table: "Maps");

            migrationBuilder.DropIndex(
                name: "IX_Maps_AreaId",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "Maps");

            migrationBuilder.RenameColumn(
                name: "PDF",
                table: "Reports",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Maps",
                newName: "Extension");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Reports",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Reports",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Downloads",
                table: "Reports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "Reports",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Maps",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Downloads",
                table: "Maps",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Areas",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Extension = table.Column<string>(nullable: true),
                    Downloads = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    ElementId = table.Column<Guid>(nullable: false)
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
                name: "IX_Areas_MapId",
                table: "Areas",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_ElementId",
                table: "Images",
                column: "ElementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Areas_Maps_MapId",
                table: "Areas",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Areas_Maps_MapId",
                table: "Areas");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Areas_MapId",
                table: "Areas");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Downloads",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Extension",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "Downloads",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Areas");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Reports",
                newName: "PDF");

            migrationBuilder.RenameColumn(
                name: "Extension",
                table: "Maps",
                newName: "ImageId");

            migrationBuilder.AddColumn<Guid>(
                name: "AreaId",
                table: "Maps",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Maps_AreaId",
                table: "Maps",
                column: "AreaId",
                unique: true,
                filter: "[AreaId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Maps_Areas_AreaId",
                table: "Maps",
                column: "AreaId",
                principalTable: "Areas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
