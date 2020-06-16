import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { Tbl } from './Tbl';
const $ = require('jquery')
$.DataTable = require('datatables.net')
//import { Tbl } from './Tbl'

export class Home extends Component {
    static displayName = Home.name;
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
            isLoaded: false,
            error: null,
            Users: []
        };

    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        fetch('http://localhost:59545/api/UserProfile', {
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
                        isLoaded: true,
                        Users: result
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            );

    }
    logout = () => {
        localStorage.removeItem('token');
        this.setState({ navigate: true });
    };


    render() {
        const { navigate, isLoaded, error, Users } = this.state;
        if (this.state.loggedIn == false) {
            return <Redirect to="/" />
        }
        if (navigate) {
            return <Redirect to="/" />
        }
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="row" className="mb-2 pageheading">
                    <div className="container">
                        <Tbl data={Users}></Tbl>
                    </div>
                    <Button onClick={this.logout}
                        color="success" block>Logout</Button>
                </div>
            );
        }
    }
}
