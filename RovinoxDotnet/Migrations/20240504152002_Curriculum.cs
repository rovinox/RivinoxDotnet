using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RovinoxDotnet.Migrations
{
    /// <inheritdoc />
    public partial class Curriculum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_batches",
                table: "batches");

            migrationBuilder.RenameTable(
                name: "batches",
                newName: "Batches");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Batches",
                table: "Batches",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Curriculums",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    BatchId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curriculums", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Curriculums_Batches_BatchId",
                        column: x => x.BatchId,
                        principalTable: "Batches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Curriculums_BatchId",
                table: "Curriculums",
                column: "BatchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Curriculums");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Batches",
                table: "Batches");

            migrationBuilder.RenameTable(
                name: "Batches",
                newName: "batches");

            migrationBuilder.AddPrimaryKey(
                name: "PK_batches",
                table: "batches",
                column: "Id");
        }
    }
}
