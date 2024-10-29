using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class newrel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                keyValue: "334eef34-aaad-4dba-b46c-291965ebc91d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ef3208d6-45ea-4a16-874a-9eb73c995e70");

            migrationBuilder.CreateTable(
                name: "NotificationPayment",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "integer", nullable: false),
                    PaymentsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationPayment", x => new { x.PaymentId, x.PaymentsId });
                    table.ForeignKey(
                        name: "FK_NotificationPayment_Notifications_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "Notifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NotificationPayment_Payments_PaymentsId",
                        column: x => x.PaymentsId,
                        principalTable: "Payments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49d18342-306c-4e8f-b94a-0568bdedbd4d", null, "User", "USER" },
                    { "bb861a1e-be42-4e9b-a0a2-d5ac788fdfb1", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_NotificationPayment_PaymentsId",
                table: "NotificationPayment",
                column: "PaymentsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotificationPayment");

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
                    { "334eef34-aaad-4dba-b46c-291965ebc91d", null, "Admin", "ADMIN" },
                    { "ef3208d6-45ea-4a16-874a-9eb73c995e70", null, "User", "USER" }
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
    }
}
