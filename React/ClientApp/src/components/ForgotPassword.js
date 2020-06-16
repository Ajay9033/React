import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Alert,Row
} from 'reactstrap';

export class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            EmailError: ''
        }

        this.Email = this.Email.bind(this);
        this.forgot = this.forgot.bind(this);
    }

    Email(event) {
        this.setState({ Email: event.target.value })
    }
    validate = () => {
        let EmailError = "";

        if (!this.state.Email) {
            EmailError = "Please Enter Email Id";
        }

        if (EmailError) {
            this.setState({ EmailError });
            return false;
        }
        return true;
    };

    forgot(event) {
        //debugger;
        const isValid = this.validate()
        if (isValid) {
            fetch('http://localhost:59545/api/User/ForgotPassword', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: this.state.Email,
                })
            }).then((Response) => Response.json())
                .then((result) => {
                    console.log(result);
                    if (!result) {
                        alert('Please Enter Valid Email');
                        this.props.history.push("/ForgotPassword");
                    }
                    else {             
                        alert('Password is Sent to Your Email Id');
                        this.props.history.push("/");
                    }
                })
        }
    }

    render() {
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
                                                    Forgot Password
                             </div>
                                            </div>
                                            <p>Email :</p>
                                            <InputGroup className="mb-3">
                                                <Input type="email"
                                                    onChange={this.Email}
                                                    placeholder="Enter Email" autoComplete='true' />
                                            </InputGroup>
                                            <p style={{ color: "red" }}>{this.state.EmailError}</p>
                                            <Button onClick={this.forgot}
                                                color="success" block>Send Email</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
