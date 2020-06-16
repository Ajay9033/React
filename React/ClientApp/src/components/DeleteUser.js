import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import './CommonCSS.css';

export class DeleteUser extends Component {
    constructor() {
        super();
        let token = localStorage.getItem('token')

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            Id: '',
            loggedIn
        }

        //this.DeleteUser = this.DeleteUser.bind(this);
    }


    //componentDidMount() {
    //    let value = queryString.parse(this.props.location.search);
    //    let Id = value.id;
    //    console.log(Id);
    //    //this.setState({Id : id})
    //    fetch(`http://localhost:59545/api/UserProfile/GetUser/?Id=${Id}`).
    //        then(res => res.json())
    //        .then(
    //            result => {
    //                this.setState({
    //                    User: result.data,
    //                });
    //            }
    //        );
    //}
    DeleteUser(event) {
        let value = queryString.parse(this.props.location.search);
        let Id = value.id;
        let url ='http://localhost:59545/api/UserProfile'
        fetch(url + '/' + Id, {
            method: 'Delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((Response) => Response.json())
            .then((Result) => {
                    alert('User Deleted Successfully !!');
                    this.props.history.push("/Home");
                })
    }

    render() {
        if (this.state.loggedIn == false) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h4 className="mb-5">  Are You Sure You want to Delete this Record ? </h4>
                <Button onClick={this.DeleteUser}
                    color="danger" block >Delete</Button>
                <p className="signup mt-4"> Back to List <Link to="/Home" className="forgotlink">Click Here</Link></p>
            </div>
        );
    }
}
