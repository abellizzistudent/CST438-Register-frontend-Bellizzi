import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';


class AddStudent extends Component {
      constructor(props) {
      super(props);
      this.state = {open: false, name:"", email:"", message:"" };
    };
    
    handleClickOpen = () => {
      this.setState( {open:true} );
    };


    handleClose = () => {
      this.setState( {open:false, name:"", email:"", message:""} );
    };


    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }


    handleAdd = () => {
		const token = Cookies.get('XSRF-TOKEN');
               let   rc = 0;
		fetch(`${SERVER_URL}/student`,
		//fetch(`http://localhost:8080/student`,		
		  {  
			  method: 'POST', 
                        headers: { 'Content-Type': 'application/json',
                                   'X-XSRF-TOKEN': token  }, 
                 body: JSON.stringify(
                    {studentName: this.state.name, studentEmail:this.state.email})
		  } )
		.then((response) => { 
                   rc = response.status;
                   return response.json(); 
               })
               .then((response) => {
                 if (response.id) {
                    this.setState({id: response.id, message: "Student id="+response.id});
                 } else {
                    this.setState({message: "Add failed. Email already exists. rc="+rc});
                 }
                })    
		 .catch(err => {
			this.setState({message: "Add failed. "+err});
		  }
		 )
	       }


    render()  { 
      return (
        <div>
          <Button id = "AddStudent1" variant="outlined" color="primary" style={{margin: 10}}
                  onClick={this.handleClickOpen}>
            Add Student
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <h3 id="message"> {this.state.message} </h3>
              <TextField autoFocus fullWidth label="Name" name="name" 
                       onChange={this.handleChange}  />
              <br/><br/>
              <TextField fullWidth label="Email" name="email" onChange={this.handleChange}/>	
            </DialogContent>
            <DialogActions>
              <Button id ="Close" Button color="secondary" onClick={this.handleClose}>Close</Button>
              <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
        </div>
      ); 
    }
}
export default AddStudent;
