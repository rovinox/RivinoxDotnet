using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class pastrel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostReplier");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "99304bf7-2c00-4a22-bb89-2da6c8fd4612");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a64f5318-7b3e-4c08-a29b-131fe9bb8e71");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b34e5e26-33ec-4436-a8c0-5264bf267b64", null, "Admin", "ADMIN" },
                    { "ed545374-943a-487a-b121-97eeeb477fa6", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Repliers_PostId",
                table: "Repliers",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Repliers_Posts_PostId",
                table: "Repliers",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Repliers_Posts_PostId",
                table: "Repliers");

            migrationBuilder.DropIndex(
                name: "IX_Repliers_PostId",
                table: "Repliers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b34e5e26-33ec-4436-a8c0-5264bf267b64");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ed545374-943a-487a-b121-97eeeb477fa6");

            migrationBuilder.CreateTable(
                name: "PostReplier",
                columns: table => new
                {
                    PostsId = table.Column<int>(type: "integer", nullable: false),
                    RepliersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostReplier", x => new { x.PostsId, x.RepliersId });
                    table.ForeignKey(
                        name: "FK_PostReplier_Posts_PostsId",
                        column: x => x.PostsId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostReplier_Repliers_RepliersId",
                        column: x => x.RepliersId,
                        principalTable: "Repliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "99304bf7-2c00-4a22-bb89-2da6c8fd4612", null, "Admin", "ADMIN" },
                    { "a64f5318-7b3e-4c08-a29b-131fe9bb8e71", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostReplier_RepliersId",
                table: "PostReplier",
                column: "RepliersId");
        }
    }
}
