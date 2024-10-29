using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class newrelll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49d18342-306c-4e8f-b94a-0568bdedbd4d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bb861a1e-be42-4e9b-a0a2-d5ac788fdfb1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "06a39d9d-2949-435d-bf8e-5c47c1bb71a0", null, "Admin", "ADMIN" },
                    { "5fc0f6f4-6b6d-47e6-a503-0a3aa4687d61", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "06a39d9d-2949-435d-bf8e-5c47c1bb71a0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5fc0f6f4-6b6d-47e6-a503-0a3aa4687d61");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49d18342-306c-4e8f-b94a-0568bdedbd4d", null, "User", "USER" },
                    { "bb861a1e-be42-4e9b-a0a2-d5ac788fdfb1", null, "Admin", "ADMIN" }
                });
        }
    }
}
