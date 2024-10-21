using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class addedAmountInPayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0533e32a-bfea-46c1-819c-4a3233c84677");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f068a59-8fd1-4a2d-a794-525598d666f5");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Payment",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "06960f6c-22be-4a1e-bcd8-d69827c45322", null, "Admin", "ADMIN" },
                    { "c9f6c93a-0af3-4eff-a32d-c02a1f5f85a6", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "06960f6c-22be-4a1e-bcd8-d69827c45322");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c9f6c93a-0af3-4eff-a32d-c02a1f5f85a6");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Payment");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0533e32a-bfea-46c1-819c-4a3233c84677", null, "Admin", "ADMIN" },
                    { "9f068a59-8fd1-4a2d-a794-525598d666f5", null, "User", "USER" }
                });
        }
    }
}
