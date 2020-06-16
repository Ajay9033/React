import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './CommonCSS.css';

export class Login extends Component {
    constructor() {
        super();
        const token = localStorage.getItem("token")
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            UserName: '',
            Password: '',
            NameError: '',
            PassError: '',
            store: null,
            loggedIn
        }

        this.Password = this.Password.bind(this);
        this.UserName = this.UserName.bind(this);
        this.login = this.login.bind(this);
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
        if (!this.state.UserName) {
            NameError = "username is required";
        }

        if (!this.state.Password) {
            PassError = "password is required";
        }
        if (NameError || PassError) {
            this.setState({ NameError, PassError });
            return false;
        }
        return true;
    };

    login(event) {
        //debugger;
        const isValid = this.validate()
        if (isValid) {
            fetch('http://localhost:59545/api/User/Login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: this.state.UserName,
                    Password: this.state.Password
                })
            }).then((Response) => Response.json())
                .then((result) => {
                    localStorage.setItem('token', result.token)
                    if (!result)
                        alert('Please Enter Correct Username and Password');
                    else
                        window.location.reload(true);
                        this.props.history.push("/welcome");
                   
                })
        }
        event.preventDefault();
    }


    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/welcome" />
        }
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <Form>
                                            <div className="row"
                                                className="mb-2 pageheading">
                                                <div className="col-sm-12 btn btn-primary">
                                                    Login
                                             </div>
                                            </div>
                                            <InputGroup className="mb-3">
                                                <Input type="text"
                                                    onChange={this.UserName}
                                                    placeholder="Enter UserName" />
                                            </InputGroup>
                                            <p style={{ color: "red" }}>{this.state.NameError}</p>
                                            <InputGroup className="mb-4">
                                                <Input type="password"
                                                    onChange={this.Password}
                                                    placeholder="Enter Password" />
                                            </InputGroup>
                                            <p style={{ color: "red" }}>{this.state.PassError}</p>
                                            <Button onClick={this.login}
                                                color="success" block>Login</Button>
                                        </Form>
                                        <Link to="/ForgotPassword" className="forgotlink">Forgot Password ?</Link>

                                    </CardBody>

                                </Card>

                            </CardGroup>
                            <p className="signup">Haven't Account ? Please <Link to="/Register" className="forgotlink">Sign Up</Link></p>
                        </Col>

                    </Row>
                </Container>
            </div>
        );
    }
}
