import { TextField } from "@material-ui/core";
import { Component } from "react";
import "./login.scss"
import axios from "axios"
import { withRouter } from "react-router-dom";


class Login extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            email:"",
            password:"",
            login:1,
            first_name:"",
            last_name:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.submission = this.submission.bind(this)
    }
    
    handleChange = (e) => {
        let i = {}
        i[e.target.id] = e.target.value
        this.setState(i)
    
    };
    register = ()=>{
        if( !this.state.login){
            return (<><TextField id="re_password" label="re_password" variant="outlined"  onChange = {this.handleChange} style = {{width:400}} required/>
            <TextField id="first_name" label="first_name" variant="outlined"  onChange = {this.handleChange} style = {{width:400}} required/>
        
            <TextField id="last_name" label="last_name" variant="outlined"  onChange = {this.handleChange} style = {{width:400}} required/>
            </>
        
        
            )}
        else{
            return <></>
        }
        }
    handleClick(){
        this.setState({login:!this.state.login})
    }
    submission(){
        if (this.state.login){
            let body = {email:this.state.email,
                        password:this.state.password}
            axios.post("/auth/jwt/create/",body).then ((response)=>{
           
                  
                        localStorage.setItem("jwt",response.data.access)
                        this.props.history.push("/")
                   
            }).catch(err =>{console.log(err)})
        }
        else{
            let body = {email:this.state.email,
                        password:this.state.password,
                        re_password:this.state.re_password,
                        first_name:this.state.first_name,
                    last_name:this.state.last_name}
        axios.post("/auth/users/",body).then ((response)=>{
                this.props.history.push("/")
                console.log("your account has been created, check your email to activate")}).catch(err=>{
                    console.log(err.status)
                })
        }
    }
    render(){
        return(
            
        <div className="logincontainer">
            <div className="loginc">
            <h1>{this.state.login ? "login":"sign up"}</h1>
            <TextField id="email" label="email" variant="outlined"  onChange = {this.handleChange} style = {{width:400}} required/>
            <TextField id ="password" label = "password" variant="outlined" onChange = {this.handleChange} style = {{width:400}} required></TextField>
            {this.register()}
            <button className="llogin" onClick={this.submission} > login</button>
            <button className="register" onClick={this.handleClick}>Don't have an account? create a new account right now!</button>
            </div>
        </div>)
        
    }
}
export default withRouter(Login)