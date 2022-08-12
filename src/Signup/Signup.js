import React    from "react";
import { TextBox } from "../reusableComponents/TextBox";
import {Radio} from '../reusableComponents/Radio'
import {Checkbox} from '../reusableComponents/Checkbox'
import {Select} from '../reusableComponents/Select'
import {TextArea} from '../reusableComponents/TextArea'
import ServerCall from '../ServerCall'
import template from "./Signup.jsx";
import {store} from '../appStore/store'
const inputControls=[
  {
      lbl:'User ID',
      type:'text',
      errorMsg:'Please Enter Uid',
      isShowError:false,
      value:'',
      name:'uid',
      isDisabled:false
  },
  {
    lbl:'Password',
    type:'password',
    errorMsg:'Please Enter Password',
    isShowError:false,
    value:'',
    name:'pwd'
  },
  {
    lbl:'Gender',
    type:'radio',
    errorMsg:'Please Select Gender',
    isShowError:false,
    value:'',
    name:'gen',
    options:['Male','FeMale'],
    values:['M','F']
  },
  {
    lbl:'Hobbies',
    type:'checkbox',
    errorMsg:'Please Select Hobbies',
    isShowError:false,
    value:'',
    name:'hobbies',
    values:['Cric','Hoc','Fb'],
    options:['Cricket','Hockey','FootBall'],
  },
  {
    lbl:'Country',
    type:'select',
    errorMsg:'Please Select Country',
    isShowError:false,
    value:'',
    name:'country',
    options:['India','Pak','China'],
    values:['Ind','Pak','Chi']
  },
  {
    lbl:'Address',
    type:'textarea',
    errorMsg:'Please Enter Address',
    isShowError:false,
    value:'',
    name:'address'
},
]
class Signup extends React.Component {
  state={
    template:''
  }
  constructor(){
    super();
    this.data={}
  }
  componentDidMount(){
    const {name}=this.props
      if(name=='Profile'){
          ServerCall.fnGet('std/get-std?uid='+sessionStorage.user)
          .then((res)=>{
            let result=res.data;
            if(result.length > 0){
              let userObj=result[0]
              this.data=userObj
              delete this.data._id;
              inputControls.forEach((obj)=>{
                  let key=obj.name;
                  if(key=='uid'){
                    obj.isDisabled=true
                  }
                  obj.value=userObj[key]
              })
              this.fnPrepareTemplate()
            }else{
              alert('not user found')
            }
          })
          .catch(()=>{
            alert('something went wrong')
          })
      }else{
        this.fnPrepareTemplate()
      }
      
  }
  fnChange=(eve)=>{
    const {value,name,checked,type,id}=eve.target
    const inputObj=inputControls.find((obj)=>{
      return obj.name == name
    })
    
    if(type=='checkbox'){
        let _currVal=inputObj.value;
        if(checked){
            if(_currVal== ''){
              _currVal=[id]
            }else{
              _currVal=_currVal.split(',')
              _currVal.push(id)
            }
        }else{
          _currVal=_currVal.split(',');
          let _index=_currVal.indexOf(id)
          _currVal.splice(_index,1)
        }
        let _val=_currVal.join()
        inputObj.value=_val
        this.data[name]=_val
        inputObj.isShowError=_val== '' ? true : false;
    }else{
      inputObj.value=value;
      inputObj.isShowError=value== '' ? true : false;
      this.data[name]=value
    }
    this.fnPrepareTemplate()
  }
  fnCheckValidations=()=>{
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
    return isValid;
  }
  fnRegister=()=>{
    let isValid=this.fnCheckValidations()
    if(!isValid)return;
    
    let dataObj={
      data:this.data
    }
    ServerCall.fnPost('std/reg-std',dataObj)
    .then((res)=>{
     const {acknowledged,insertedId} = res.data
     if(acknowledged && insertedId){
       alert('success')
       inputControls.forEach((obj)=>{
            obj.value=''
       })
       this.fnPrepareTemplate()
     }else{
       alert('fail')
     }
    })  
    .catch((res)=>{
       alert('something went wrong')
    })
  }

  fnPrepareTemplate=()=>{
   let inputControlsArr= inputControls.map((obj,index)=>{
        const attr={key:index,obj:obj,fnChange:this.fnChange}
        switch(obj.type){
          case 'text':
          case 'password':
            return <TextBox {...attr} />
          case 'radio':
            return <Radio {...attr} />
          case 'checkbox':
            return <Checkbox {...attr} />
          case 'select':
            return <Select {...attr} />
          case 'textarea':
            return <TextArea {...attr} />
        }
      
    })
    this.setState({
      template:inputControlsArr
    })
  }

  fnUpdate=()=>{
    let isValid=this.fnCheckValidations()
    if(!isValid)return;
    ServerCall.fnPut('std/update-std/'+sessionStorage.user,{data:this.data})
    .then((res)=>{
      const {acknowledged,modifiedCount}=res.data
      if(acknowledged && modifiedCount > 0){
        alert('success')
      }else{
        alert('not udated, try again')
      }
    })
    .catch((res)=>{
      alert('Something went wrong')
    })
  }

  fnTerminate=async ()=>{
    let isOk=window.confirm('R U Sure...')
    if(isOk){
     const res= await ServerCall.fnDelete('std/delete-std?uid='+sessionStorage.user)
     if(res.status == 200){
      const {acknowledged,deletedCount}=res.data
      if(acknowledged && deletedCount > 0){
        alert('success')
        sessionStorage.clear()
        store.dispatch({
          type:'LOGOUT'
        })
      }else{
        alert('fail')
      }
    }
  else{
    alert('something went wrong')
  }
  }
}

  componentWillUnmount(){
    inputControls.forEach((obj)=>{
      obj.value=''
      obj.isShowError=false
    })
  }

  render() {
    return template.call(this);
  }
}

export default Signup;
