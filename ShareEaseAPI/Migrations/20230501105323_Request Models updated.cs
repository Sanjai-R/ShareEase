using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShareEaseAPI.Migrations
{
    /// <inheritdoc />
    public partial class RequestModelsupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResourceId",
                table: "Request",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Request_ResourceId",
                table: "Request",
                column: "ResourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Request_Resource_ResourceId",
                table: "Request",
                column: "ResourceId",
                principalTable: "Resource",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Request_Resource_ResourceId",
                table: "Request");

            migrationBuilder.DropIndex(
                name: "IX_Request_ResourceId",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "ResourceId",
                table: "Request");
        }
    }
}
