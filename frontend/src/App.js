import React from "react";

import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./components/login";
import Activation from "./components/activation";
import Home from "./components/home";
import Maps from "./components/map";
import Account from "./components/account";



function App() {
     return (
   
        <BrowserRouter>
   
            <Switch>
                <Route exact path="/"
                     render= {(props)=>{
                     return <Home></Home>}}></Route>
                <Route path = "/login"
                     children = {<Login></Login>}></Route>
                <Route exact path='/activate/:uid/:token' render={(props) => {
                        return <Activation {...props} />;
                     }} />
                 <Route path = "/map"
                   render = {(props)=>{
                    return <Maps></Maps>
                   }}></Route>
                <Route path = "/account"
                   render = {(props)=>{
                    return (<Account></Account>)
                   }}></Route>
               
               
                </Switch>
            </BrowserRouter>
    
    )
}
    





export default App