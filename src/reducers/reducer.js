import {init} from '../utils/init'

const reducer=(state=init,action)=>{
     switch(action.type){
         case 'LOGIN':
              state={
                  ...state,
                  isLoggedIn:true
              }
             break;
         case 'LOGOUT':
            state={
                ...state,
                isLoggedIn:false
            }
             break;
     }
     return state;
}

export default reducer

