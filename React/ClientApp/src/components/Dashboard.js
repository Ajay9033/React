import React, { Component } from 'react';
import {
    Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

export class DashBoard extends Component {
    static displayName = DashBoard.name;
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
            UserName: '',
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
        const { navigate } = this.state;
        if (this.state.loggedIn == false) {
            return <Redirect to="/" />
        }
        if (navigate) {
            return <Redirect to="/" />
        }
        const columns = [
            {
                name: "id",
                label: "Id",
                options: {
                    filter: true,
                    sort: true,
                 
                }
            },
            {
                name: "userName",
                label: "UserName",
                options: {
                    filter: true,
                    sort: true,
                    
                }
            },
            {
                name: "password",
                label: "Password",
                options: {
                    filter: true,
                    sort: true,
                
                }
            },
            {
                name: "email",
                label: "Email",
                options: {
                    filter: true,
                    sort: true,
        
                }
            },
            {
                name: "Delete",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <button onClick={() => {
                                const { data } = this.state;
                                data.shift();
                                this.setState({ data });
                            }}>
                                Delete
                            </button>
                        );
                    }
                }
            },
            {
                name: "Edit",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <button onClick={() =>  window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)}>
                                Edit
                            </button>
                        );
                    }
                }
            }
        ];
        const options = {
            selectableRows: false,
            responsive: "scroll"
        };

        return (
            <div className="row" className="mb-2 pageheading">
                <div className="container">
                    <MUIDataTable
                        title={"Employee List"}
                        data={this.state.Users}
                        columns={columns}
                        options={options}
                    />
                </div>
                <div className="col-sm-12 ">
                    <h2> Welcome</h2>

                </div>
                <Button onClick={this.logout}
                    color="success" block>Logout</Button>
            </div>
        );
    }
}
