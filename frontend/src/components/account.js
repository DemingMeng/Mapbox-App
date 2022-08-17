import { Delete } from "@material-ui/icons"
import axios from "axios"
import { Component } from "react"
import { withRouter } from "react-router-dom"
import "./account.scss"

class Account extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            items :[]
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        axios.get("/order/getallpost/").then(res=>{
            this.setState({items:res.data})
        })

    }
    handleClick(e){
    
    let data = {
            id:e
        }
    let headers = { 
        Authorization:"JWT "+localStorage.getItem("jwt")
    }
    axios.post("/order/deletepost/",data,{headers :headers}).then(res=>{}).catch(
            (err)=>{
                if (err.response.status === 401){
                    this.props.history.push("/login")
                }
            })
        window.location.reload();
    }

    render(){
        return (
    <div className="d1">
        <div className="d2">
            {this.state.items.map((item)=>{
                return (
                    <div className="d3">
                        <img src={item.image} alt="1" className="4" style = {{width:300,height:300,
                       objectFit:"cover" }}/>
                            <div className="d4">
                                <div><h4>{item.title}</h4>
                                <h6 className="h6">${item.price}</h6>
                                <h6>{item.startDate+" to "+item.endDate}</h6>
                                </div>
                                <div className="d6">
                                    <button className="deletebutton" onClick={()=>{this.handleClick(item.id)}}>
                                        <Delete> Delete </Delete>
                                    </button>
                                </div>
                            </div>

                    </div>
                )
            })}
        </div>
    </div>)
    }
}
export default withRouter(Account)
