import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component {
  static displayName = Employee.name;
  
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow:false, editModalShow:false, loading: true };
  }
  
  componentDidMount() {
    this.populateEmployeeData();
  }

  componentDidUpdate(){
    this.populateEmployeeData();
  }

  deleteEmp(empid){
    if(window.confirm('Are you sure?')){
        fetch('api/employee/'+empid,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
    }
  }

  render() {
    const {emps, empid,empname,depmt,photofilename,doj}=this.state;

    let addModalClose=()=>this.setState({AddModalShow : false});
    let editModalClose=()=>this.setState({editModalShow:false});

    return (
      <div >
      <Table className="mt-4" striped bordered hover size="sm">
          <thead>
              <tr>
                  <th>EmployeeId</th>
                  <th>EmployeeName</th>
                  <th>Department</th>
                  <th>DOJ</th>
                  <th>Options</th>
              </tr>
          </thead>
          <tbody>
              {emps.map(emp=>
                  <tr key={emp.employeeId}>
                      <td>{emp.employeeId}</td>
                      <td>{emp.employeeName}</td>
                      <td>{emp.departmentId}</td>
                      <td>{emp.dateOfJoining}</td>
                      <td>
<ButtonToolbar>
<Button className="mr-2" variant="info"
onClick={()=>this.setState({editModalShow:true,
empid:emp.employeeId,empname:emp.employeeName,depmt:emp.department,
photofilename:emp.photoFileName,doj:emp.dateOfJoining})}>
  Edit
</Button>

<Button className="mr-2" variant="danger"
onClick={()=>this.deleteEmp(emp.employeeId)}>
  Delete
</Button>

<EditEmpModal show={this.state.editModalShow}
onHide={editModalClose}
empid={empid}
empname={empname}
depmt={depmt}
photofilename={photofilename}
doj={doj}
/>
</ButtonToolbar>

                      </td>

                  </tr>)}
          </tbody>

      </Table>

      <ButtonToolbar>
          <Button variant='primary'
          onClick={()=>this.setState({addModalShow:true})}>
          Add Employee</Button>

          <AddEmpModal show={this.state.addModalShow}
          onHide={addModalClose}/>
      </ButtonToolbar>
  </div>
    );
  }

  async populateEmployeeData() {
    const response = await fetch('api/Employee');
    const data = await response.json();
    this.setState({ emps: data, loading: false });
  }
}