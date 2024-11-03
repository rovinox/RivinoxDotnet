using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class pastrelagain3r : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Repliers_PostId",
                table: "Repliers");

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
                    { "311d927f-fd01-4033-838b-02e4c0e9665f", null, "User", "USER" },
                    { "89e3bbc0-f513-4c31-9fa7-7735bec2efd1", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Repliers_PostId",
                table: "Repliers",
                column: "PostId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Repliers_PostId",
                table: "Repliers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "311d927f-fd01-4033-838b-02e4c0e9665f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "89e3bbc0-f513-4c31-9fa7-7735bec2efd1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c483f425-e553-4256-999b-200027c0565b", null, "User", "USER" },
                    { "e81a9a96-602e-4954-b0ba-e8767d017294", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Repliers_PostId",
                table: "Repliers",
                column: "PostId");
        }
    }
}
