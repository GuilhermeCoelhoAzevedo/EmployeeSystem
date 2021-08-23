using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeSystem.Models
{
    public class Employee{
        [Key]
        public int EmployeeId { get; set; }
        [StringLength(100)]
        public string EmployeeName { get; set; }
        public int? DepartmentId { get; set; } //FK
        public virtual Department Department { get; set; } // Reference navigation
        public DateTime DateOfJoining { get; set; }
        public String PhotoFileName {get; set; }
        
    }
}