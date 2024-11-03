using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class pastrelagain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b34e5e26-33ec-4436-a8c0-5264bf267b64");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ed545374-943a-487a-b121-97eeeb477fa6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c483f425-e553-4256-999b-200027c0565b", null, "User", "USER" },
                    { "e81a9a96-602e-4954-b0ba-e8767d017294", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c483f425-e553-4256-999b-200027c0565b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e81a9a96-602e-4954-b0ba-e8767d017294");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b34e5e26-33ec-4436-a8c0-5264bf267b64", null, "Admin", "ADMIN" },
                    { "ed545374-943a-487a-b121-97eeeb477fa6", null, "User", "USER" }
                });
        }
    }
}
