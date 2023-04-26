import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, account:{
            accountStatus: 0
        }};
    };

    // Static method to increment id for every new student...or at least attempted lol
    // static getNextId = (function() {
    //     var id = 0;
    //     return function() {
    //         return id++
    //     };
    // })();
    
    // Handles opening 'Create Account' modal
    handleClickOpen = () => {
        this.setState( {open:true} );
    };

    // Handles closing 'Create Account' modal
    handleClose = () => {
        this.setState( {open:false} );
    };

    // When name field is filled in 'Create Account' modal, this sets the value in account state
    handleName = (event) => {
        this.setState({account:{accountName: event.target.value}});
    }

    // When email field is filled in 'Create Account' modal, this sets the value in account state
    handleEmail = (event) => {
        this.setState({account:{accountEmail: event.target.value}});
    }

    // When Add button is clicked, the id is set and the account is added to props
    handleAdd = () => {
        /* // Only uncomment this if static is working
        this.setState({account:{accountId: this.getNextId()}});
        */
        this.props.currAccount(this.state.account);
        this.handleClose();
    }

    // Webpage information
    render()  { 
      return (
          <div>
            <Button id="addAccountBtn" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Account
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Account</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                  <TextField autoFocus fullWidth label="Account Name" name="accountName" onChange={this.handleName}  /> 
                  <TextField autoFocus fullWidth label="Account Email" name="accountEmail" onChange={this.handleEmail}  /> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
              </Dialog>      
          </div>
      ); 
    }
}

// required property:  addCourse is a function to call to perform the Add action
AddAccount.propTypes = {
    AddAccount : PropTypes.func.isRequired
}

export default AddAccount;
