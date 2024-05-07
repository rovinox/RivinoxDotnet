using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class newtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_AspNetUsers_UsersId",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_UsersId",
                table: "Enrollments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b97bad1-0540-48d2-b4a8-b5998ed87c44");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "50136767-1398-479b-95d0-3f6c3ab81cba");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "Enrollments",
                newName: "LastName");

            migrationBuilder.AddColumn<int>(
                name: "BatchId",
                table: "Enrollments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Course",
                table: "Enrollments",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Enrollments",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppUserEnrollment",
                columns: table => new
                {
                    EnrollmentId = table.Column<int>(type: "integer", nullable: false),
                    UsersId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserEnrollment", x => new { x.EnrollmentId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_AppUserEnrollment_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserEnrollment_Enrollments_EnrollmentId",
                        column: x => x.EnrollmentId,
                        principalTable: "Enrollments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6231511f-bdd0-4ac2-afc9-ca84a93ba0e8", null, "Admin", "ADMIN" },
                    { "cbc52aef-cc16-4356-b280-8ea04e0dc76f", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserEnrollment_UsersId",
                table: "AppUserEnrollment",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserEnrollment");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6231511f-bdd0-4ac2-afc9-ca84a93ba0e8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cbc52aef-cc16-4356-b280-8ea04e0dc76f");

            migrationBuilder.DropColumn(
                name: "BatchId",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "Course",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Enrollments");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Enrollments",
                newName: "UsersId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1b97bad1-0540-48d2-b4a8-b5998ed87c44", null, "Admin", "ADMIN" },
                    { "50136767-1398-479b-95d0-3f6c3ab81cba", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_UsersId",
                table: "Enrollments",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_AspNetUsers_UsersId",
                table: "Enrollments",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
