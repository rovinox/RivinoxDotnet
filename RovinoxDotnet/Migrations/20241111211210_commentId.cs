using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class commentId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NotificationPayment_Notifications_PaymentId",
                table: "NotificationPayment");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "169814f5-c3f5-4a77-9257-1e78831e5f6c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eeb17b98-472d-4f38-a0ce-d3d12da60294");

            migrationBuilder.RenameColumn(
                name: "PaymentId",
                table: "NotificationPayment",
                newName: "Payments");

            migrationBuilder.AddColumn<int>(
                name: "CommentId",
                table: "Notifications",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CommentId",
                table: "Comments",
                type: "integer",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "515a8e87-fa23-43a7-a3a1-a63ce71c338d", null, "Admin", "ADMIN" },
                    { "794f33a1-ac1e-43b1-a616-f6d03a73dc65", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_CommentId",
                table: "Comments",
                column: "CommentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Notifications_CommentId",
                table: "Comments",
                column: "CommentId",
                principalTable: "Notifications",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationPayment_Notifications_Payments",
                table: "NotificationPayment",
                column: "Payments",
                principalTable: "Notifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Notifications_CommentId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_NotificationPayment_Notifications_Payments",
                table: "NotificationPayment");

            migrationBuilder.DropIndex(
                name: "IX_Comments_CommentId",
                table: "Comments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "515a8e87-fa23-43a7-a3a1-a63ce71c338d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "794f33a1-ac1e-43b1-a616-f6d03a73dc65");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "Payments",
                table: "NotificationPayment",
                newName: "PaymentId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "169814f5-c3f5-4a77-9257-1e78831e5f6c", null, "Admin", "ADMIN" },
                    { "eeb17b98-472d-4f38-a0ce-d3d12da60294", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationPayment_Notifications_PaymentId",
                table: "NotificationPayment",
                column: "PaymentId",
                principalTable: "Notifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
