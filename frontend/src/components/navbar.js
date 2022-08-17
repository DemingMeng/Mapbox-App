import { Component } from "react";
import { withRouter } from "react-router-dom";
import "./navbar.scss"

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            jwt:""
        }
        this.handleclick = this.handleclick.bind(this)
        this.handleredirect = this.handleredirect.bind(this)
        this.handleaccount = this.handleaccount.bind(this)
    }
    handleclick(){
        if (this.state.jwt===""){
        this.props.history.push("/login")}
        else{
            this.setState({jwt:""})
            localStorage.removeItem("jwt")
        }
    }
    handleaccount(){
        this.props.history.push("/account")
    }
    componentDidMount(){
        if(localStorage.getItem("jwt")!==undefined){
            this.setState({jwt:localStorage.getItem("jwt")})
        }
    }
    handleredirect(){
        this.props.history.push("/map")
    }
    login(){
        if (this.state.jwt===""){
            return <button className="loginbutton" onClick={this.handleclick}>
                Sign up
            </button>
        }
        else{
            return <div className="navbar2">
                <button className="loginbutton"  onClick={this.handleclick}>Log out</button>  
                <button className="loginbutton" onClick={this.handleaccount}>My account</button>
                <button className="post " onClick={this.handleredirect}>Post</button>
            </div>
        }
    }
    render(){
        return <div className="navbar">
            <div className="navbar1">
                
                    <div className="logo">
                        MadisonAllLeases
                    </div>
        
                <div className="navbar2">
                    {this.login()}
                </div>
            </div>
        </div>

    }

}
export default withRouter(Navbar)