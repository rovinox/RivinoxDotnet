using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class readd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0ca68e52-f65c-4acf-9821-be2d77bb65d7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ff1c65e9-825f-45ca-a2f7-d693a7b5e5e0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "899fbdde-9a55-4f55-a2f2-425ebed472fe", null, "Admin", "ADMIN" },
                    { "cac4105c-b084-47e2-8f50-8762b27dda33", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_PaymentId",
                table: "Notifications",
                column: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "PaymentId",
                table: "Notifications",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "PaymentId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_PaymentId",
                table: "Notifications");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "899fbdde-9a55-4f55-a2f2-425ebed472fe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cac4105c-b084-47e2-8f50-8762b27dda33");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0ca68e52-f65c-4acf-9821-be2d77bb65d7", null, "Admin", "ADMIN" },
                    { "ff1c65e9-825f-45ca-a2f7-d693a7b5e5e0", null, "User", "USER" }
                });
        }
    }
}
