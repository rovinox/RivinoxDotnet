using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class voteTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43beeb17-43a5-4541-84cb-b6f3c18e16a1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4629ee30-9b38-4991-b8b6-cfe23a8a9147");

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Score = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CurriculumId = table.Column<int>(type: "integer", nullable: false),
                    PostedById = table.Column<string>(type: "text", nullable: false),
                    Enabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_AspNetUsers_PostedById",
                        column: x => x.PostedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Posts_Curriculums_CurriculumId",
                        column: x => x.CurriculumId,
                        principalTable: "Curriculums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Repliers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Score = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    CreatedById = table.Column<string>(type: "text", nullable: false),
                    ReplyingToId = table.Column<string>(type: "text", nullable: false),
                    Enabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Repliers", x => x.Id);
                    table.ForeignKey(
                        name: "CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "ReplyingToId",
                        column: x => x.ReplyingToId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PostUpvoted = table.Column<int[]>(type: "integer[]", nullable: false),
                    PostDownvoted = table.Column<int[]>(type: "integer[]", nullable: false),
                    ReplayUpvoted = table.Column<int[]>(type: "integer[]", nullable: false),
                    ReplayDownvoted = table.Column<int[]>(type: "integer[]", nullable: false),
                    CurriculumId = table.Column<int>(type: "integer", nullable: false),
                    VotedById = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Votes_AspNetUsers_VotedById",
                        column: x => x.VotedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Votes_Curriculums_CurriculumId",
                        column: x => x.CurriculumId,
                        principalTable: "Curriculums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CurriculumId",
                table: "Posts",
                column: "CurriculumId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_PostedById",
                table: "Posts",
                column: "PostedById");

            migrationBuilder.CreateIndex(
                name: "IX_Repliers_CreatedById",
                table: "Repliers",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Repliers_ReplyingToId",
                table: "Repliers",
                column: "ReplyingToId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_CurriculumId",
                table: "Votes",
                column: "CurriculumId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_VotedById",
                table: "Votes",
                column: "VotedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostReplier");

            migrationBuilder.DropTable(
                name: "Votes");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Repliers");

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
                    { "43beeb17-43a5-4541-84cb-b6f3c18e16a1", null, "Admin", "ADMIN" },
                    { "4629ee30-9b38-4991-b8b6-cfe23a8a9147", null, "User", "USER" }
                });
        }
    }
}
