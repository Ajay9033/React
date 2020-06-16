import React, { Component } from 'react';
import "datatables.net-dt/js/dataTables.dataTables"
import 'datatables.net-select';
import 'datatables.net-buttons';
import 'datatables.net-colreorder';
import 'datatables.net-responsive';
import 'datatables.net-bs';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.print';
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import './CommonCSS.css'
const $ = require('jquery')
$.DataTable = require('datatables.net')


export class Tbl extends Component {
    static displayName = Tbl.name;
    constructor() {
        super();
        this.state = {
            isOpen: false,

        }

    }
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
 
    componentDidMount() {

        console.log(this.el);
        this.$el = $(this.el);
       var oTable= this.$el.DataTable(
           {
               "dom": 'BRlfrtip',
               data: this.props.data,
                buttons: [
                    {
                        extend: 'csv',
                        text: 'Export to CSV'
                    }
               ],

                "bStateSave": true,
                "scrollY": 300,
               "scrollX": true,
               columnDefs: [
                   {
                       targets: 0,
                       checkboxes: {
                           selectRow: true
                       }
                   }
               ],

               select: {
                   style: 'multi'
               },
               order: [[1, 'asc']],
               responsive: true,
               colReorder: true,
               colResizable :true ,
                columns: [
                    {
                        data: null,
                        defaultContent: '',
                        "searchable": false,
                        "sortable": false,
                    },
                    {
                        data: "id",
                        title: "Id",
                    },
                    {
                        data: "userName",
                        title: "UserName"
                    },
                    {
                        data: "password",
                        title: "Password"
                    },
                    {
                        data: "email",
                        title: "Email",
                    },
                    {
                        "title": "Edit",
                        "data": "id",
                        "searchable": false,
                        "sortable": false,
                        "render": function (data, type, full, meta) {
                            return '<a href="EditUser?id=' + data + '"  class="editAsset">Edit</a>';
                        }
                    },  
                    {
                        "title": "Delete",
                        "data": "id",
                        "searchable": false,
                        "sortable": false,
                        "render": function (data, type, full, meta) {
                            return '<a href="DeleteUser?id=' + data + '"  class="editAsset">Delete</a>';
                        }
                    }
                ]
            }
        );
         $('.ShowHideColumn').prop('checked', true);
        $('.ShowHideColumn').on('click', function () {
            var tableColumn = oTable.column($(this).attr('data-columnindex'));
            tableColumn.visible(!tableColumn.visible());
        });

    }



    render() {

        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <div>
                <div className="container option">
                    <div className="row">
                        <div className="col-lg-4 col-sm-3 col-md-4">
                            <button className="btn btn-success Add" onClick={event => window.location.href = '/AddUser'}>Create New User</button>
                           
                    </div>
                        <div className="col-lg-4 col-sm-3 col-md-4">
                        <div className="dropdown" onClick={this.toggleOpen}>
                            <button
                                className="btn btn-success dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                            >
                                Show/Hide Column
                             </button>
                            <div className={menuClass} aria-labelledby="dropdownMenuButton">
                                <li><input type="checkbox" className="ShowHideColumn " data-columnindex="1" />Id</li>
                                <li><input type="checkbox" className="ShowHideColumn" data-columnindex="2" />UserName</li>
                                <li><input type="checkbox" className="ShowHideColumn" data-columnindex="3" />Password</li>
                                <li><input type="checkbox" className="ShowHideColumn" data-columnindex="4" />Email</li>
                                <li><input type="checkbox" className="ShowHideColumn" data-columnindex="5" />Edit</li>
                                <li><input type="checkbox" className="ShowHideColumn" data-columnindex="6" />Delete</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div>
                    <table className="display table-bordered" width="100%" ref={el => this.el = el} >
                    </table>
                </div>
            </div>
        );
    }
}
