using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeSystem.Models
{
    public class Department{
        [Key]
        public int DepartmentId { get; set; }
        
        [StringLength(30)]
        public string DepartmentName { get; set; }

        public virtual List<Employee> employees { get; set; }
    }
}