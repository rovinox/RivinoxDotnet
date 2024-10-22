using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class redoforankey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "PaymentId",
                table: "Notifications");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "85e1b3c1-633f-43a7-863f-a41031e600f1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7342691-1329-45c6-b107-4a0d59f7b291");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentId",
                table: "Notifications",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "363c9697-ccb1-46fa-b5bc-410d60da0b33", null, "Admin", "ADMIN" },
                    { "9f8f6c13-1935-4916-a1ea-343c14f2e805", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Payments_PaymentId",
                table: "Notifications",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Payments_PaymentId",
                table: "Notifications");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "363c9697-ccb1-46fa-b5bc-410d60da0b33");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f8f6c13-1935-4916-a1ea-343c14f2e805");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentId",
                table: "Notifications",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "85e1b3c1-633f-43a7-863f-a41031e600f1", null, "Admin", "ADMIN" },
                    { "a7342691-1329-45c6-b107-4a0d59f7b291", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "PaymentId",
                table: "Notifications",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
