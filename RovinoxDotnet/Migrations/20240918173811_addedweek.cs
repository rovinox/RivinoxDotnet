using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class addedweek : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6afbd10f-cd4e-41b2-b5cd-1e8eb2143c32");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8768517-99a0-4cbd-8a6a-bde2385cf142");

            migrationBuilder.AddColumn<string[]>(
                name: "DaysOfTheWeek",
                table: "Batches",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EndTime",
                table: "Batches",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StartTime",
                table: "Batches",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2dc62e58-7748-44f4-8a2d-94664aa7b01c", null, "Admin", "ADMIN" },
                    { "9272c104-ef4b-43f7-9c68-626ed3d30abf", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2dc62e58-7748-44f4-8a2d-94664aa7b01c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9272c104-ef4b-43f7-9c68-626ed3d30abf");

            migrationBuilder.DropColumn(
                name: "DaysOfTheWeek",
                table: "Batches");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Batches");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Batches");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6afbd10f-cd4e-41b2-b5cd-1e8eb2143c32", null, "Admin", "ADMIN" },
                    { "c8768517-99a0-4cbd-8a6a-bde2385cf142", null, "User", "USER" }
                });
        }
    }
}
