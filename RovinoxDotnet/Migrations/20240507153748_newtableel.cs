using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class newtableel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserEnrollment");

            migrationBuilder.DropTable(
                name: "BatchEnrollment");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6231511f-bdd0-4ac2-afc9-ca84a93ba0e8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cbc52aef-cc16-4356-b280-8ea04e0dc76f");

            migrationBuilder.AddColumn<string>(
                name: "UsersId",
                table: "Enrollments",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "15247ae3-cc2e-46d2-89fd-7b860bcd5c95", null, "Admin", "ADMIN" },
                    { "68434c9e-cdf6-4845-b536-4bc270745321", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_BatchId",
                table: "Enrollments",
                column: "BatchId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Batches_BatchId",
                table: "Enrollments",
                column: "BatchId",
                principalTable: "Batches",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_AspNetUsers_UsersId",
                table: "Enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Batches_BatchId",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_BatchId",
                table: "Enrollments");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_UsersId",
                table: "Enrollments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "15247ae3-cc2e-46d2-89fd-7b860bcd5c95");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "68434c9e-cdf6-4845-b536-4bc270745321");

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "Enrollments");

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

            migrationBuilder.CreateTable(
                name: "BatchEnrollment",
                columns: table => new
                {
                    BatchesId = table.Column<int>(type: "integer", nullable: false),
                    EnrollmentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchEnrollment", x => new { x.BatchesId, x.EnrollmentId });
                    table.ForeignKey(
                        name: "FK_BatchEnrollment_Batches_BatchesId",
                        column: x => x.BatchesId,
                        principalTable: "Batches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BatchEnrollment_Enrollments_EnrollmentId",
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

            migrationBuilder.CreateIndex(
                name: "IX_BatchEnrollment_EnrollmentId",
                table: "BatchEnrollment",
                column: "EnrollmentId");
        }
    }
}
