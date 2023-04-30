using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShareEaseAPI.Migrations
{
    /// <inheritdoc />
    public partial class MobileFieldAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "mobile",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "mobile",
                table: "Users");
        }
    }
}
