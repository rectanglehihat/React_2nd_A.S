import React from "react";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";
import {history} from "../redux/configureStore"

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Header from "../components/Header";
import {Button, Grid} from "../elements";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail"

import  {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";
import { apiKey } from "../shared/firebase";
import Permit from "./Permit";



function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  React.useEffect(() => {
    
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
            <Route path="/" exact component={PostList}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/write" exact component={PostWrite}/>
            <Route path="/post/:id" exact component={PostDetail}/>
        </ConnectedRouter>
      </Grid>
        <Button is_float text="+"></Button>
    </React.Fragment>
  );
}

export default App;
