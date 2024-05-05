using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class seedRoleAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6a121ed1-9e41-428b-99fc-9f32b4c2414b", null, "Admin", "ADMIN" },
                    { "e1fb97b8-e3b5-4af3-996d-c01f68a9b13d", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a121ed1-9e41-428b-99fc-9f32b4c2414b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e1fb97b8-e3b5-4af3-996d-c01f68a9b13d");
        }
    }
}
