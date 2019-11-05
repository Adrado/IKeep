using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class UpdateGenericElement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Areas_Maps_MapId",
                table: "Areas");

            migrationBuilder.DropIndex(
                name: "IX_Areas_MapId",
                table: "Areas");

            migrationBuilder.DropColumn(
                name: "AreaRef",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Areas");

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

            migrationBuilder.CreateIndex(
                name: "IX_GenericElements_ElementTypeId",
                table: "GenericElements",
                column: "ElementTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_GenericElements_ElementTypes_ElementTypeId",
                table: "GenericElements",
                column: "ElementTypeId",
                principalTable: "ElementTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Maps_Areas_AreaId",
                table: "Maps",
                column: "AreaId",
                principalTable: "Areas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GenericElements_ElementTypes_ElementTypeId",
                table: "GenericElements");

            migrationBuilder.DropForeignKey(
                name: "FK_Maps_Areas_AreaId",
                table: "Maps");

            migrationBuilder.DropIndex(
                name: "IX_Maps_AreaId",
                table: "Maps");

            migrationBuilder.DropIndex(
                name: "IX_GenericElements_ElementTypeId",
                table: "GenericElements");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "Maps");

            migrationBuilder.AddColumn<string>(
                name: "AreaRef",
                table: "Maps",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Areas",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Areas_MapId",
                table: "Areas",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_Areas_Maps_MapId",
                table: "Areas",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
