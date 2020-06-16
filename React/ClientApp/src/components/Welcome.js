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

export class Welcome extends Component {
    static displayName = Welcome.name;
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
        };

    }

    render() {
        const { navigate,} = this.state;
        if (this.state.loggedIn == false) {
            return <Redirect to="/" />
        }
        if (navigate) {
            return <Redirect to="/" />
        }
            return (
                <div className="row" className="mb-2 pageheading">

                    <div className="mt-5">
                        <h1 className="heading">Welcom To TatvaSoft</h1>
                        <h2 className="sub-heading">Sculpt Your Thoughts... </h2>
                    </div>
                    <div className="about">
                        <h3>
                            TatvaSoft is a CMMI Level 3 and Microsoft Gold Certified Software Development Company,
                            with the offices in US, Canada, UK, Australia, and Development Centre in India.
                            TatvaSoft has a rich and varied experience of 16+ years in the IT industry.
                            It offers custom software development and consulting services on diverse technology platforms,
                            like Microsoft .NET, SharePoint, BizTalk, Java, PHP, Open Source, Big Data, BI, and Mobile.
                            TatvaSoft serves clientele across multiple industries globally with a workforce of 650+
                            IT professionals. For more details about TatvaSoft, please visit www.tatvasoft.com.
  </h3>
                        <h3>
                            <b>Mission</b>: To provide pioneering IT solutions to our clients and helping them to convert
    challenges into outstanding business results
  </h3>
                    </div>

                </div>
            );
    }
}
