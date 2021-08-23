import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';


export class Department extends Component {
  static displayName = Department.name;

  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow:false, editModalShow:false, loading: true };
  }
  
  componentDidMount() {
    this.populateDepartmentData();
  }

  componentDidUpdate(){
    this.populateDepartmentData();
  }

  deleteDep(depid){
    if(window.confirm('Are you sure?')){
        fetch('api/department/'+depid,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
    }
  }

  render() {
    const {deps, depid, depname} = this.state;

    let addModalClose=()=>this.setState({AddModalShow : false});
    let editModalClose=()=>this.setState({editModalShow:false});

    return (
      <div>
        <h1 id="tabelLabel" >Departments</h1>
        <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Department</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {deps.map(dept =>
              <tr key={dept.departmentId}>
                <td>{dept.departmentName}</td>
                <td>
                  <ButtonToolbar>
                    <Button className="mr-2" variant="info"
                    onClick={()=>this.setState({editModalShow:true,
                    depid:dept.departmentId,depname:dept.departmentName})}>
                      Edit
                    </Button>

                    <Button className="mr-2" variant="danger"
                    onClick={()=>this.deleteDep(dept.departmentId)}>
                      Delete
                    </Button>

                    <EditDepModal show={this.state.editModalShow}
                    onHide={editModalClose}
                    depid={depid}
                    depname={depname}/>
                  </ButtonToolbar>
                </td>
              </tr>
          )}
        </tbody>
        </table>

        <ButtonToolbar>
          <Button variant ='primary' onClick={()=>this.setState({addModalShow:true})}>
            Add Department
          </Button>

          <AddDepModal show={this.state.addModalShow} onHide={addModalClose}></AddDepModal>
        </ButtonToolbar>
      </div>
    );
  }

  async populateDepartmentData() {
    const response = await fetch('api/Department');
    const data = await response.json();
    this.setState({ deps: data, loading: false });
  }
}