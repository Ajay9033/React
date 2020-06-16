import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

export class MyProfile extends Component {
    static displayName = MyProfile.name;
    constructor(props) {
        super(props)
        let token = localStorage.getItem('token')
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            navigate: false,
            UserProfile: []
        };

    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        fetch('http://localhost:59545/api/UserProfile/User', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        }).then(res => res.json())
            .then(
                result => {
                    this.setState({
                        UserProfile: result
                    });
                }
            );
    }



    render() {
        const { navigate } = this.state;
        if (this.state.loggedIn == false) {
            return <Redirect to="/" />
        }
        if (navigate) {
            return <Redirect to="/" />
        }
        return (
            <div className="mb-2 pageheading">
                <h3>User Profile :</h3>
                <div className="card mt-5" >
                    <ul className="list-group">
                        <li className="list-group-item"><strong>UserName : </strong>{this.state.UserProfile.userName}</li>
                        <li className="list-group-item"><strong>Email : </strong>{this.state.UserProfile.email}</li>
                    </ul>
                </div>
            </div >
        );
    }
}
