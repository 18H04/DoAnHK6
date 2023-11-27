using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class init_02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PromotionDetail_Phones_PhoneId",
                table: "PromotionDetail");

            migrationBuilder.DropIndex(
                name: "IX_PromotionDetail_PhoneId",
                table: "PromotionDetail");

            migrationBuilder.DropColumn(
                name: "PhoneId",
                table: "PromotionDetail");

            migrationBuilder.RenameColumn(
                name: "UnitPrice",
                table: "PromotionDetail",
                newName: "PhoneModelId");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "PromotionDetail",
                newName: "DiscountAmount");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Promotion",
                newName: "DiscountAmount");

            migrationBuilder.AddColumn<double>(
                name: "DiscountPercentage",
                table: "PromotionDetail",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DiscountPercentage",
                table: "Promotion",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Promotion",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Promotion",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_PromotionDetail_PhoneModelId",
                table: "PromotionDetail",
                column: "PhoneModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_PromotionDetail_PhoneModels_PhoneModelId",
                table: "PromotionDetail",
                column: "PhoneModelId",
                principalTable: "PhoneModels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PromotionDetail_PhoneModels_PhoneModelId",
                table: "PromotionDetail");

            migrationBuilder.DropIndex(
                name: "IX_PromotionDetail_PhoneModelId",
                table: "PromotionDetail");

            migrationBuilder.DropColumn(
                name: "DiscountPercentage",
                table: "PromotionDetail");

            migrationBuilder.DropColumn(
                name: "DiscountPercentage",
                table: "Promotion");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Promotion");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Promotion");

            migrationBuilder.RenameColumn(
                name: "PhoneModelId",
                table: "PromotionDetail",
                newName: "UnitPrice");

            migrationBuilder.RenameColumn(
                name: "DiscountAmount",
                table: "PromotionDetail",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "DiscountAmount",
                table: "Promotion",
                newName: "Price");

            migrationBuilder.AddColumn<int>(
                name: "PhoneId",
                table: "PromotionDetail",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PromotionDetail_PhoneId",
                table: "PromotionDetail",
                column: "PhoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_PromotionDetail_Phones_PhoneId",
                table: "PromotionDetail",
                column: "PhoneId",
                principalTable: "Phones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
