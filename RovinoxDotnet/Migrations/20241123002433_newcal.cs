using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class newcal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "012d5053-7259-490d-b82e-5f1e580f231c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "adf963c1-9ef9-4dd9-bc25-76f82bb7f65e");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "Payments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDate",
                table: "Payments",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "57127897-a0f4-4cab-959b-be57f6748353", null, "User", "USER" },
                    { "9ec8d5e9-5bbe-423f-bbe2-ff025a073bf6", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57127897-a0f4-4cab-959b-be57f6748353");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ec8d5e9-5bbe-423f-bbe2-ff025a073bf6");

            migrationBuilder.DropColumn(
                name: "Completed",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "Payments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "012d5053-7259-490d-b82e-5f1e580f231c", null, "User", "USER" },
                    { "adf963c1-9ef9-4dd9-bc25-76f82bb7f65e", null, "Admin", "ADMIN" }
                });
        }
    }
}
