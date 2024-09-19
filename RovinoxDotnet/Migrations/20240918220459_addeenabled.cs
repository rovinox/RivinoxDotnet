using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class addeenabled : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2dc62e58-7748-44f4-8a2d-94664aa7b01c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9272c104-ef4b-43f7-9c68-626ed3d30abf");

            migrationBuilder.AddColumn<bool>(
                name: "Enabled",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8a20e1b3-8a31-45a0-b092-f996a7a74343", null, "User", "USER" },
                    { "cbcc90f3-f654-40c9-9036-7c022ba43a1a", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8a20e1b3-8a31-45a0-b092-f996a7a74343");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cbcc90f3-f654-40c9-9036-7c022ba43a1a");

            migrationBuilder.DropColumn(
                name: "Enabled",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2dc62e58-7748-44f4-8a2d-94664aa7b01c", null, "Admin", "ADMIN" },
                    { "9272c104-ef4b-43f7-9c68-626ed3d30abf", null, "User", "USER" }
                });
        }
    }
}
