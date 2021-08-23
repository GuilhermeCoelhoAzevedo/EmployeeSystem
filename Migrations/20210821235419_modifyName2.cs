using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeSystem.Migrations
{
    public partial class modifyName2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Deparment",
                table: "Employee",
                newName: "Department");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Department",
                table: "Employee",
                newName: "Deparment");
        }
    }
}
