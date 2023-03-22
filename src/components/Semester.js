import React, { Component } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST} from '../constants.js'
import AddAccount from './AddAccount.js';
import 'react-toastify/dist/ReactToastify.css';

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: SEMESTER_LIST.length-1, account: {}};
    }
 
  onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }

 // Account creation / fetch
  createAccount = (account) => {
    const tok = Cookies.get('XSRF-TOKEN');

    fetch(`${SERVER_URL}/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'X-XSRF-TOKEN': tok  }, 
      body: JSON.stringify(account)
    }).then(res => {
      if (res.ok) {
        toast.success("Account successfully added", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.account = account;

      } else {
        toast.error("Error when adding", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error('Post http status =' + res.status);

      }
    }).catch(err => {
        toast.error("Error when adding", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);

    })
  }
  
  render() {    
      const icolumns = [{
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id === this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      }, { 
        field: 'name', 
        headerName: 'Semester', 
        width: 200 
      }];       
       
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - select a term
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
              <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>                
              <Button component={Link} 
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
              </Button>
              <ButtonGroup>
                  <AddAccount currAccount={this.createAccount}  />
				    </ButtonGroup>
              <ToastContainer autoClose={1500} />   
          </div>
      </div>
    )
  }
}
export default Semester;
