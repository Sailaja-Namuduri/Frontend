import "./Signup.css";
import React from "react";
import {Link} from 'react-router-dom'
function template() {
  const {template} =this.state
  const {name} =this.props
  return (
    <div className="login container-fluid">
      <h2 className="text-center mt-4 mb-5">{name}</h2>
      
      {template}
    
      <div className="row mb-3">
            <div className="offset-sm-5 col-sm-7 text-start">
              {
                name=='Profile' ?
                <>
                <button onClick={this.fnUpdate} className="btn btn-primary">Update Profile</button>
                <button onClick={this.fnTerminate} className="btn btn-primary ms-4">Terminate Account</button>
                
                </>
                :
                <>
                <button onClick={this.fnRegister} className="btn btn-primary">SignUp</button>
                <Link to='/login'>To Go to Login</Link>
                </>
              }
              
            </div>
           
      </div>


    </div>
  );
};

export default template;
