import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './CommonCSS.css';

export class AddUser extends Component {
    constructor() {
        super();
        let token = localStorage.getItem('token')
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            UserName: '',
            Email: '',
            Password: '',
            NameError: '',
            PassError: '',
            EmailError: '',
            loggedIn
        }

        this.Email = this.Email.bind(this);
        this.Password = this.Password.bind(this);
        this.UserName = this.UserName.bind(this);
        this.AddUser = this.AddUser.bind(this);
    }
    Email(event) {
        this.setState({ Email: event.target.value })
    }

    Password(event) {
        this.setState({ Password: event.target.value })
    }

    UserName(event) {
        this.setState({ UserName: event.target.value })
    }

    validate = () => {
        let NameError = "";
        let PassError = "";
        let EmailError = "";
        if (!this.state.UserName) {
            NameError = "username is required";
        }
        if (!this.state.Email) {
            EmailError = "email is required";
        }

        if (!this.state.Email.includes("@")) {
            EmailError = "invalid email";
        }

        if (!this.state.Password) {
            PassError = "password is required";
        }
        if (NameError || PassError || EmailError) {
            this.setState({ NameError, PassError, EmailError });
            return false;
        }
        return true;
    };
    AddUser(event) {
        const isValid = this.validate()
        if (isValid) {
            fetch('http://localhost:59545/api/User/Register', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: this.state.UserName,
                    Password: this.state.Password,
                    Email: this.state.Email,
                })
            }).then((Response) => Response.json())
                .then((Result) => {
                    console.log(Result);
                    alert('User Added Successfully !!');
                    this.props.history.push("/Home");
                })
        }
    }

    render() {
        if (this.state.loggedIn == false) {
            return <Redirect to="/" />
        }
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form>
                                        <div className="row" className="mb-2 pageheading">
                                            <div className="col-sm-12 btn btn-primary">
                                                Add User
                        </div>
                                        </div>
                                        <InputGroup className="mb-3">
                                            <Input type="text" required
                                                onChange={this.UserName} placeholder="Enter Employee Name" />
                                        </InputGroup>
                                        <p style={{ color: "red" }}>{this.state.NameError}</p>
                                        <InputGroup className="mb-3">
                                            <Input type="text" required
                                                onChange={this.Email} placeholder="Enter Email" />
                                        </InputGroup>
                                        <p style={{ color: "red" }}>{this.state.EmailError}</p>
                                        <InputGroup className="mb-3">
                                            <Input type="password" required
                                                onChange={this.Password} placeholder="Enter Password" />
                                        </InputGroup>
                                        <p style={{ color: "red" }}>{this.state.PassError}</p>
                                        <Button onClick={this.AddUser}
                                            color="success" block>Add User</Button>
                                    </Form>

                                </CardBody>
                            </Card>
                            <p className="signup"> Back to List <Link to="/Home" className="forgotlink">Click Here</Link></p>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}
