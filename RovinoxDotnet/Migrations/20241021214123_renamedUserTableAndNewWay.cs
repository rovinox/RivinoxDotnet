using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class renamedUserTableAndNewWay : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b1fe233-3523-47ea-a52b-de3151cf9fa6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "690803ff-e1d0-49d6-a96c-55318feb514a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "20371e75-3551-49e9-a281-a1f2aca3aa90", null, "Admin", "ADMIN" },
                    { "a872eff1-2f5e-4e9c-a13d-fdde1bb347d3", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20371e75-3551-49e9-a281-a1f2aca3aa90");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a872eff1-2f5e-4e9c-a13d-fdde1bb347d3");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b1fe233-3523-47ea-a52b-de3151cf9fa6", null, "Admin", "ADMIN" },
                    { "690803ff-e1d0-49d6-a96c-55318feb514a", null, "User", "USER" }
                });
        }
    }
}
