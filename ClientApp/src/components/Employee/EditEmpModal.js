import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    photofilename = "anonymous.png";
    
    componentDidMount(){
        fetch('api/department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('api/employee'+event.target.EmployeeId.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:event.target.EmployeeId.value,
                EmployeeName:event.target.EmployeeName.value,
                Department:event.target.Department.value,
                DateOfJoining:event.target.DateOfJoining.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="EmployeeId">
                    <Form.Label>EmployeeId</Form.Label>
                    <Form.Control type="text" name="EmployeeId" required 
                    placeholder="EmployeeId"
                    disabled
                    defaultValue={this.props.empid}/>
                </Form.Group>

                <Form.Group controlId="EmployeeName">
                    <Form.Label>EmployeeName</Form.Label>
                    <Form.Control type="text" name="EmployeeName" required 
                    defaultValue={this.props.empname}
                    placeholder="EmployeeName"/>
                </Form.Group>

                <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select" defaultValue={this.props.depmt}>
                    {this.state.deps.map(dep=>
                        <option value={dep.departmentId} key={dep.departmentId}>{dep.departmentName}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="DateOfJoining">
                    <Form.Label>DateOfJoining</Form.Label>
                    <Form.Control 
                    type="date"
                    name="DateOfJoining"
                    required
                    placeholder="DateOfJoining"
                    defaultValue={this.props.doj}
                    />
                    
                    
                </Form.Group>

                <Form.Group>
                    <Button variant="primary" type="submit">
                        Update Employee
                    </Button>
                </Form.Group>
            </Form>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}