import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './CommonCSS.css';

export class Register extends Component {
    constructor() {
        super();
        this.state = {
            UserName: '',
            Email: '',
            Password: '',
            NameError: '',
            PassError: '',
            EmailError: ''
        }

        this.Email = this.Email.bind(this);
        this.Password = this.Password.bind(this);
        this.UserName = this.UserName.bind(this);
        this.register = this.register.bind(this);
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
    register(event) {
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
                    alert('Successfully Registered !!');
                    this.props.history.push("/");
                })
        }
    }

    render() {
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
                                                Sign Up
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
                                        <Button onClick={this.register}
                                            color="success" block>Create Account</Button>
                                    </Form>

                                </CardBody>
                            </Card>
                            <p className="signup"> Already Have an Account ? <Link to="/" className="forgotlink">Sign In</Link></p>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}
