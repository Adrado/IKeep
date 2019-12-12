using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class SomeProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ElementGenericChores_GenericChores_GenericChoreId",
                table: "ElementGenericChores");

            migrationBuilder.DropColumn(
                name: "GenericTaskId",
                table: "ElementGenericChores");

            migrationBuilder.AlterColumn<Guid>(
                name: "GenericChoreId",
                table: "ElementGenericChores",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ElementGenericChores_GenericChores_GenericChoreId",
                table: "ElementGenericChores",
                column: "GenericChoreId",
                principalTable: "GenericChores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ElementGenericChores_GenericChores_GenericChoreId",
                table: "ElementGenericChores");

            migrationBuilder.AlterColumn<Guid>(
                name: "GenericChoreId",
                table: "ElementGenericChores",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "GenericTaskId",
                table: "ElementGenericChores",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_ElementGenericChores_GenericChores_GenericChoreId",
                table: "ElementGenericChores",
                column: "GenericChoreId",
                principalTable: "GenericChores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
