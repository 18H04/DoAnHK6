using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class UpdateCartModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ColorId",
                table: "Carts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StorageId",
                table: "Carts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Carts_ColorId",
                table: "Carts",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_StorageId",
                table: "Carts",
                column: "StorageId");
            migrationBuilder.AddForeignKey(
                name: "FK_Carts_Colors_ColorId",
                table: "Carts",
                column: "ColorId",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_Storage_StorageId",
                table: "Carts",
                column: "StorageId",
                principalTable: "Storage",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carts_Colors_ColorId",
                table: "Carts");

            migrationBuilder.DropForeignKey(
                name: "FK_Carts_Storage_StorageId",
                table: "Carts");

            migrationBuilder.DropIndex(
                name: "IX_Carts_ColorId",
                table: "Carts");

            migrationBuilder.DropIndex(
                name: "IX_Carts_StorageId",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "ColorId",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "StorageId",
                table: "Carts");
        }
    }
}
