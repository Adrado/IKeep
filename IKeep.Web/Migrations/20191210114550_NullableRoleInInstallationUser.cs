using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class NullableRoleInInstallationUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InstallationUsers_Roles_RoleId",
                table: "InstallationUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "RoleId",
                table: "InstallationUsers",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddForeignKey(
                name: "FK_InstallationUsers_Roles_RoleId",
                table: "InstallationUsers",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InstallationUsers_Roles_RoleId",
                table: "InstallationUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "RoleId",
                table: "InstallationUsers",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InstallationUsers_Roles_RoleId",
                table: "InstallationUsers",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
