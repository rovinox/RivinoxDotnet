using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class Scuma : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a9fc6af3-d8e8-41ef-a95d-900d80b95ed6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f37c8a29-9e07-4471-ab3a-f1761ea10710");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6afbd10f-cd4e-41b2-b5cd-1e8eb2143c32", null, "Admin", "ADMIN" },
                    { "c8768517-99a0-4cbd-8a6a-bde2385cf142", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6afbd10f-cd4e-41b2-b5cd-1e8eb2143c32");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8768517-99a0-4cbd-8a6a-bde2385cf142");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a9fc6af3-d8e8-41ef-a95d-900d80b95ed6", null, "Admin", "ADMIN" },
                    { "f37c8a29-9e07-4471-ab3a-f1761ea10710", null, "User", "USER" }
                });
        }
    }
}
