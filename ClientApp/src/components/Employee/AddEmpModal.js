import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('api/department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('api/employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeName:event.target.EmployeeName.value,
                DepartmentId:event.target.Department.value,
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
            Add Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="EmployeeName">
                    <Form.Label>EmployeeName</Form.Label>
                    <Form.Control type="text" name="EmployeeName" required 
                    placeholder="EmployeeName"/>
                </Form.Group>

                <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select">
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
                    />       
                </Form.Group>

                <Form.Group>
                    <Button variant="primary" type="submit">
                        Add Employee
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