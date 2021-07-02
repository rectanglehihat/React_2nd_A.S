import React from "react";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import PostList from "../pages/PostList";
import LogIn from "../pages/LogIn";


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
          <Route path="/" exact component={PostList}/>
          <Route path="/login" exact component={LogIn}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
