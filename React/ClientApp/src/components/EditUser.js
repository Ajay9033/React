import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import './CommonCSS.css';

export class EditUser extends Component {
    constructor() {
        super();
        let token = localStorage.getItem('token')
      
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state  = {
            Id : '',
            userName: '',
            email: '',
            password: '',
            NameError: '',
            PassError: '',
            EmailError: '',
            User: {},
            loggedIn
        }
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.userName = this.userName.bind(this);
        this.EditUser = this.EditUser.bind(this);
    }
    email(event) {
        this.setState({ Email: event.target.value })
    }

    password(event) {
        this.setState({ Password: event.target.value })
    }

    userName(event) {
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
    componentDidMount() {
        let value = queryString.parse(this.props.location.search);
        let Id = value.id;
        console.log(Id);
        //this.setState({Id : id})
        fetch(`http://localhost:59545/api/UserProfile/GetUser/?Id=${Id}`).
            then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    this.setState({
                        User: result,
                    });
                }
            );
    }
    EditUser(event) {
        const isValid = this.validate()
        if (isValid) {
       
            fetch('http://localhost:59545/api/User/Register', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: this.state.userName,
                    password: this.state.password,
                    email: this.state.email,
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
        //console.log(this.state.User);
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
                                                Edit User
                        </div>
                                        </div>
                                        <InputGroup className="mb-3">
                                            <Input type="text" required
                                                onChange={this.userName} placeholder="Enter Employee Name" />
                                        </InputGroup>
                                        <p style={{ color: "red" }}>{this.state.NameError}</p>
                                        <InputGroup className="mb-3">
                                            <Input type="text" required
                                                onChange={this.email} placeholder="Enter Email" />
                                        </InputGroup>
                                        <p style={{ color: "red" }}>{this.state.EmailError}</p>
                                        <InputGroup className="mb-3">
                                            <Input type="password" required
                                                onChange={this.password} placeholder="Enter Password" />
                                        </InputGroup>
                                        <p style={{ color: "red" }}>{this.state.PassError}</p>
                                        <Button onClick={this.AddUser}
                                            color="success" block>Save</Button>
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
