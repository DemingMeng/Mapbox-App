import { Component } from "react";
import Navbar from "./navbar.js";
import "./home.scss"
import image from "./madison-1809576.jpg"
import {DateRange} from "react-date-range"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Search} from "@material-ui/icons";
import { CalendarToday } from "@material-ui/icons";

import { withRouter } from "react-router-dom";

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            minprice:500,
            maxprice:1000,
            key : "",
            date:
                {
                    startDate:new Date(),
                    endDate: new Date(),
                    key :"selection"
                },
            operatedate:false,
            operatebed:false
            
        }
        this.handlechange = this.handlechange.bind(this)
        this.handledatechange = this.handledatechange.bind(this)
        this.handlebedclick = this.handlebedclick.bind(this)
        this.handledateclick = this.handledateclick.bind(this)
        this.handleredirect = this.handleredirect.bind(this)
    }
    handlechange (e){
        let i = {}
        i[e.target.id] =e.target.value;
        this.setState({i})

    }

  

    handledatechange (e){
        this.setState({
          date: e.selection
    })
    }
    handledateclick(){
        this.setState({operatedate:!this.state.operatedate})
    }
    handlebedclick(){
        this.setState({operatebed:!this.state.operatebed})
    }
    handleredirect(){
        this.props.history.push("/map")

    }
    handlesubmit(){
        this.props.history.push("/search/"+this.state.key+"/"+this.state.date.startDate+"/"
        +"/" +this.state.date.endDate+"/"+this.state.minprice+"/"+this.state.maxprice)     
    }
    
    render(){
        return <div>
            <Navbar style = {{zIndex:2}}></Navbar>
            <div className="imagewrapper">
                <img className="background"
                src = {image}
                alt = "">
                    
                </img>
                <div className="searchbar">
                      <div className="h1">
                        Looking for a short lease? We can help you.
                      </div>
                      <div className="inputfield">
                            <Search style = {{color:"#0000a0"}}></Search>
                            <input type="text" className="input"  onChange = {this.handlechange}  required id = "key" placeholder="Where you want to live?"/>
                            </div>  
                        <div className="pricewrapper">
                       <div className="pricefield">
                        <input type="text" className="price" id = "min_price" required placeholder="min_price"/>
                        $
                       </div>
                       <div className="pricefield">
                        <input type="text" className="price" id = "min_price" required placeholder="max_price"/>
                        $
                       </div>
                            </div>
                    <div className="pricewrapper">
                       <div className="pricefield1"  onClick={this.handledateclick}>
                        <CalendarToday  onClick={this.handledateclick}></CalendarToday ><span  onClick={this.handledateclick} > date to date</span>
                        {this.state.operatedate? <DateRange
                    editableDateInputs={true}
                    onChange={this.handledatechange}
                    moveRangeOnFirstSelection={false}
                    ranges={[this.state.date]}
                    className="date"
                    minDate={new Date()}
                    />:<></>}
                       </div>
            
                            </div>
                       <button className="searchlease" onClick={this.handleredirect}>
                        Search Lease
                       </button>
                       <button className="explore" onClick={this.handleredirect}>
                        Explore all leases on map
                       </button>
                      
                    </div>
                
            </div>
        </div>
    }
}
export default withRouter(Home)