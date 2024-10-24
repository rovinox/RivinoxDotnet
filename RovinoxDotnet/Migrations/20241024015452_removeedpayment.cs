using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class removeedpayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Payments_PaymentId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_PaymentId",
                table: "Notifications");

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
                    { "0ca68e52-f65c-4acf-9821-be2d77bb65d7", null, "Admin", "ADMIN" },
                    { "ff1c65e9-825f-45ca-a2f7-d693a7b5e5e0", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "193e3252-da84-45aa-89d0-6c0e68b1c613", null, "Admin", "ADMIN" },
                    { "3f2aa010-ef1f-47e9-8882-2192be123a44", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_PaymentId",
                table: "Notifications",
                column: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Payments_PaymentId",
                table: "Notifications",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id");
        }
    }
}
