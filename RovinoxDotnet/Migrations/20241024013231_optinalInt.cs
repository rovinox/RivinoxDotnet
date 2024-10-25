using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class optinalInt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "363c9697-ccb1-46fa-b5bc-410d60da0b33");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f8f6c13-1935-4916-a1ea-343c14f2e805");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "193e3252-da84-45aa-89d0-6c0e68b1c613", null, "Admin", "ADMIN" },
                    { "3f2aa010-ef1f-47e9-8882-2192be123a44", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "193e3252-da84-45aa-89d0-6c0e68b1c613");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3f2aa010-ef1f-47e9-8882-2192be123a44");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "363c9697-ccb1-46fa-b5bc-410d60da0b33", null, "Admin", "ADMIN" },
                    { "9f8f6c13-1935-4916-a1ea-343c14f2e805", null, "User", "USER" }
                });
        }
    }
}
