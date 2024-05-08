using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class AddedCommenys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "59f69e7e-ee8b-439d-b6fa-dab25d38b2ed");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f3da54b7-996c-45a9-9502-4712c59c781b");

            migrationBuilder.AddColumn<string>(
                name: "IsGraded",
                table: "HomeWorks",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "HomeWorks",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "HomeWorks",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "518b7ae9-e9bf-47cf-94e8-79416f510565", null, "Admin", "ADMIN" },
                    { "7ec56353-bf12-417a-949d-41203189b0b8", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "518b7ae9-e9bf-47cf-94e8-79416f510565");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7ec56353-bf12-417a-949d-41203189b0b8");

            migrationBuilder.DropColumn(
                name: "IsGraded",
                table: "HomeWorks");

            migrationBuilder.DropColumn(
                name: "Link",
                table: "HomeWorks");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "HomeWorks");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "59f69e7e-ee8b-439d-b6fa-dab25d38b2ed", null, "User", "USER" },
                    { "f3da54b7-996c-45a9-9502-4712c59c781b", null, "Admin", "ADMIN" }
                });
        }
    }
}
