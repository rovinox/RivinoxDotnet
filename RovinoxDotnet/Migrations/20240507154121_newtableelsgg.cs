using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class newtableelsgg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "15247ae3-cc2e-46d2-89fd-7b860bcd5c95");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "68434c9e-cdf6-4845-b536-4bc270745321");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ea2c450-7359-42f1-aae6-5d9844749413", null, "Admin", "ADMIN" },
                    { "c8b51c49-aadd-44a9-afad-c112a23b86c7", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ea2c450-7359-42f1-aae6-5d9844749413");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8b51c49-aadd-44a9-afad-c112a23b86c7");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "15247ae3-cc2e-46d2-89fd-7b860bcd5c95", null, "Admin", "ADMIN" },
                    { "68434c9e-cdf6-4845-b536-4bc270745321", null, "User", "USER" }
                });
        }
    }
}
