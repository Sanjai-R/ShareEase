using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShareEaseAPI.Migrations
{
    /// <inheritdoc />
    public partial class RequestModelsfieldrenamed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "resId",
                table: "Request",
                newName: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "Request",
                newName: "resId");
        }
    }
}
