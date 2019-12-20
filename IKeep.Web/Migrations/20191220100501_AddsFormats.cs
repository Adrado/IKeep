using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class AddsFormats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GenericChores_Formats_FormatId",
                table: "GenericChores");

            migrationBuilder.DropTable(
                name: "Formats");

            migrationBuilder.DropIndex(
                name: "IX_GenericChores_FormatId",
                table: "GenericChores");

            migrationBuilder.DropColumn(
                name: "FormatId",
                table: "GenericChores");

            migrationBuilder.CreateTable(
                name: "FormatLabels",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Extension = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormatLabels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FormatValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    FormatLabelId = table.Column<Guid>(nullable: false),
                    ChoreId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormatValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormatValues_Chores_ChoreId",
                        column: x => x.ChoreId,
                        principalTable: "Chores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormatValues_FormatLabels_FormatLabelId",
                        column: x => x.FormatLabelId,
                        principalTable: "FormatLabels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GenericChoreFormatLabels",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    GenericChoreId = table.Column<Guid>(nullable: false),
                    FormatLabelId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericChoreFormatLabels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericChoreFormatLabels_FormatLabels_FormatLabelId",
                        column: x => x.FormatLabelId,
                        principalTable: "FormatLabels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericChoreFormatLabels_GenericChores_GenericChoreId",
                        column: x => x.GenericChoreId,
                        principalTable: "GenericChores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormatValues_ChoreId",
                table: "FormatValues",
                column: "ChoreId");

            migrationBuilder.CreateIndex(
                name: "IX_FormatValues_FormatLabelId",
                table: "FormatValues",
                column: "FormatLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChoreFormatLabels_FormatLabelId",
                table: "GenericChoreFormatLabels",
                column: "FormatLabelId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericChoreFormatLabels_GenericChoreId",
                table: "GenericChoreFormatLabels",
                column: "GenericChoreId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormatValues");

            migrationBuilder.DropTable(
                name: "GenericChoreFormatLabels");

            migrationBuilder.DropTable(
                name: "FormatLabels");

            migrationBuilder.AddColumn<Guid>(
                name: "FormatId",
                table: "GenericChores",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Formats",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formats", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GenericChores_FormatId",
                table: "GenericChores",
                column: "FormatId");

            migrationBuilder.AddForeignKey(
                name: "FK_GenericChores_Formats_FormatId",
                table: "GenericChores",
                column: "FormatId",
                principalTable: "Formats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
