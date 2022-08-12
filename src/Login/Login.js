import React    from "react";
import { TextBox } from "../reusableComponents/TextBox.js";
import template from "./Login.jsx";
import {store} from '../appStore/store';
import ServerCall from "../ServerCall.js";
const inputControls=[
  {
      lbl:'User ID',
      type:'text',
      errorMsg:'Please Enter Uid',
      isShowError:false,
      value:'',
      name:'uid'
  },
  {
    lbl:'Password',
    type:'password',
    errorMsg:'Please Enter Password',
    isShowError:false,
    value:'',
    name:'pwd'
  }
 
]
class Login extends React.Component {
  state={
    template:''
  }
  constructor(){
    super();
    this.data={}
  }
  componentDidMount(){
      this.fnPrepareTemplate()
  }
  fnChange=(eve)=>{
    const {value,name}=eve.target
    const inputObj=inputControls.find((obj)=>{
      return obj.name == name
    })
    inputObj.value=value;
    inputObj.isShowError=value== '' ? true : false;
    this.data[name]=value
    this.fnPrepareTemplate()
  }
  fnLogin=()=>{
    let isValid=true;
    inputControls.forEach((obj)=>{
       if(obj.value==''){
         isValid=false;
         obj.isShowError=true
       }else{
         obj.isShowError=false
       }
    })
    this.fnPrepareTemplate()

    if(!isValid)return;
    
    ServerCall.fnPost('std/login',{data:this.data})
    .then((res)=>{
       let result=res.data
       if(result.length > 0){
        sessionStorage.isLoggedIn=true
        sessionStorage.user=result[0].uid
        store.dispatch({
          type:'LOGIN'
        })
       }else{
        alert('Please check ented uid or pwd')
      }
    })
    .catch((res)=>{
      alert('something went wrong')
    })

   
    
  }

  fnPrepareTemplate=()=>{
   let inputControlsArr= inputControls.map((obj,index)=>{
        return <TextBox key={index} obj={obj} fnChange={this.fnChange} />
    })
    this.setState({
      template:inputControlsArr
    })
  }

  render() {
    return template.call(this);
  }
}

export default Login;
