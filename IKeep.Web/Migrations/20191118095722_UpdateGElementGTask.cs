﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IKeep.Web.Migrations
{
    public partial class UpdateGElementGTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GenericElementGenericTask");

            migrationBuilder.CreateTable(
                name: "GenericElementGenericTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    GenericElementId = table.Column<Guid>(nullable: false),
                    GenericTaskId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericElementGenericTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericElementGenericTasks_GenericElements_GenericElementId",
                        column: x => x.GenericElementId,
                        principalTable: "GenericElements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericElementGenericTasks_GenericTasks_GenericTaskId",
                        column: x => x.GenericTaskId,
                        principalTable: "GenericTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GenericElementGenericTasks_GenericElementId",
                table: "GenericElementGenericTasks",
                column: "GenericElementId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElementGenericTasks_GenericTaskId",
                table: "GenericElementGenericTasks",
                column: "GenericTaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GenericElementGenericTasks");

            migrationBuilder.CreateTable(
                name: "GenericElementGenericTask",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityStatus = table.Column<int>(nullable: false),
                    GenericElementId = table.Column<Guid>(nullable: false),
                    GenericTaskId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericElementGenericTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GenericElementGenericTask_GenericElements_GenericElementId",
                        column: x => x.GenericElementId,
                        principalTable: "GenericElements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenericElementGenericTask_GenericTasks_GenericTaskId",
                        column: x => x.GenericTaskId,
                        principalTable: "GenericTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GenericElementGenericTask_GenericElementId",
                table: "GenericElementGenericTask",
                column: "GenericElementId");

            migrationBuilder.CreateIndex(
                name: "IX_GenericElementGenericTask_GenericTaskId",
                table: "GenericElementGenericTask",
                column: "GenericTaskId");
        }
    }
}