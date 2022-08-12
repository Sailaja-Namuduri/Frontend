import './App.css';
import Header from './Header/index';
import Footer from './Footer/index';
import {BeforeLogin} from './BeforeLogin';
import {AfterLogin} from './AfterLogin'
import {connect} from 'react-redux'
import { useEffect } from 'react';
import {store} from './appStore/store'
function App(props) {

  useEffect(()=>{
      let isLoggedIn= sessionStorage.isLoggedIn
      if(isLoggedIn=='true'){
        store.dispatch({
          type:'LOGIN'
        })
      }
  },[])
  return (
    <div className="App">
        <Header />
         {
           props.isLoggedIn ? <AfterLogin /> : <BeforeLogin />
         }
        <Footer />
    </div>
  );
}

App=connect(
  (state)=>{
    return {
       isLoggedIn:state.reducer.isLoggedIn
    }
  }
)(App)

export default App;
