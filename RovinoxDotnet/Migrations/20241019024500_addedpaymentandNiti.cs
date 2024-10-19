using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class addedpaymentandNiti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8a20e1b3-8a31-45a0-b092-f996a7a74343");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cbcc90f3-f654-40c9-9036-7c022ba43a1a");

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    ApproverId = table.Column<string>(type: "text", nullable: false),
                    CashReceiverId = table.Column<string>(type: "text", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false),
                    TransactionId = table.Column<string>(type: "text", nullable: true),
                    PaymentType = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    ProcessDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => new { x.ApproverId, x.CashReceiverId });
                    table.ForeignKey(
                        name: "FK_Payment_AspNetUsers_ApproverId",
                        column: x => x.ApproverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Payment_AspNetUsers_CashReceiverId",
                        column: x => x.CashReceiverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Payment_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    SenderId = table.Column<string>(type: "text", nullable: false),
                    ReceiverId = table.Column<string>(type: "text", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Seen = table.Column<bool>(type: "boolean", nullable: false),
                    Enabled = table.Column<bool>(type: "boolean", nullable: false),
                    Completed = table.Column<bool>(type: "boolean", nullable: false),
                    CompletedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PaymentId = table.Column<int>(type: "integer", nullable: false),
                    PaymentApproverId = table.Column<string>(type: "text", nullable: false),
                    PaymentCashReceiverId = table.Column<string>(type: "text", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => new { x.ReceiverId, x.SenderId });
                    table.ForeignKey(
                        name: "FK_Notification_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notification_AspNetUsers_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notification_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notification_Payment_PaymentApproverId_PaymentCashReceiverId",
                        columns: x => new { x.PaymentApproverId, x.PaymentCashReceiverId },
                        principalTable: "Payment",
                        principalColumns: new[] { "ApproverId", "CashReceiverId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0533e32a-bfea-46c1-819c-4a3233c84677", null, "Admin", "ADMIN" },
                    { "9f068a59-8fd1-4a2d-a794-525598d666f5", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notification_AppUserId",
                table: "Notification",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_PaymentApproverId_PaymentCashReceiverId",
                table: "Notification",
                columns: new[] { "PaymentApproverId", "PaymentCashReceiverId" });

            migrationBuilder.CreateIndex(
                name: "IX_Notification_SenderId",
                table: "Notification",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_CashReceiverId",
                table: "Payment",
                column: "CashReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_UserId",
                table: "Payment",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0533e32a-bfea-46c1-819c-4a3233c84677");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9f068a59-8fd1-4a2d-a794-525598d666f5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8a20e1b3-8a31-45a0-b092-f996a7a74343", null, "User", "USER" },
                    { "cbcc90f3-f654-40c9-9036-7c022ba43a1a", null, "Admin", "ADMIN" }
                });
        }
    }
}
