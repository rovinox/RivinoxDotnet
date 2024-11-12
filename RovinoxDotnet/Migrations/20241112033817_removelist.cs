using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class removelist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Notifications_CommentId",
                table: "Comments");

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
                table: "Comments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "012d5053-7259-490d-b82e-5f1e580f231c", null, "User", "USER" },
                    { "adf963c1-9ef9-4dd9-bc25-76f82bb7f65e", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CommentId",
                table: "Notifications",
                column: "CommentId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Comments_CommentId",
                table: "Notifications",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Comments_CommentId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_CommentId",
                table: "Notifications");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "012d5053-7259-490d-b82e-5f1e580f231c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "adf963c1-9ef9-4dd9-bc25-76f82bb7f65e");

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
        }
    }
}
