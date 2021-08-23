using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeSystem.Migrations
{
    public partial class modifyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DepartmenteName",
                table: "Department",
                newName: "DepartmentName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DepartmentName",
                table: "Department",
                newName: "DepartmenteName");
        }
    }
}
