using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class FixCorrectivesUserRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Correctives_Users_UserId",
                table: "Correctives");

            migrationBuilder.DropIndex(
                name: "IX_Correctives_UserId",
                table: "Correctives");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Correctives",
                newName: "ClosedUserId");

            migrationBuilder.RenameColumn(
                name: "OpenedBy",
                table: "Correctives",
                newName: "OpenedUserName");

            migrationBuilder.RenameColumn(
                name: "ClosedBy",
                table: "Correctives",
                newName: "ClosedUserName");

            migrationBuilder.AddColumn<Guid>(
                name: "OpenedUserId",
                table: "Correctives",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "GenericChoreId",
                table: "Chores",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OpenedUserId",
                table: "Correctives");

            migrationBuilder.RenameColumn(
                name: "OpenedUserName",
                table: "Correctives",
                newName: "OpenedBy");

            migrationBuilder.RenameColumn(
                name: "ClosedUserName",
                table: "Correctives",
                newName: "ClosedBy");

            migrationBuilder.RenameColumn(
                name: "ClosedUserId",
                table: "Correctives",
                newName: "UserId");

            migrationBuilder.AlterColumn<Guid>(
                name: "GenericChoreId",
                table: "Chores",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateIndex(
                name: "IX_Correctives_UserId",
                table: "Correctives",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Correctives_Users_UserId",
                table: "Correctives",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
