using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class pastrelagain3r4r : Migration
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
                    { "5a0429e9-3353-4fd5-98d6-8a0f9c76d073", null, "User", "USER" },
                    { "d800fbc9-2b54-4d57-a8ea-6c51d35b407f", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Repliers_PostId",
                table: "Repliers",
                column: "PostId");
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
                keyValue: "5a0429e9-3353-4fd5-98d6-8a0f9c76d073");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d800fbc9-2b54-4d57-a8ea-6c51d35b407f");

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
    }
}
