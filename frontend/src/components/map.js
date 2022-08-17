import { useState, useEffect  } from "react";
import ReactMapGL, {Marker,Popup}from "react-map-gl"
import axios from "axios"
import "./map.scss"
import { format } from "date-fns";
import {DateRange} from "react-date-range"
import { CalendarToday } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
export default function Maps ()
{let history = useHistory();

  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 43.0722,
    longitude: -89.4008,
    zoom: 12,
  });
  const [price,setPrice] = useState(0);
  const [address,setAddress] = useState("");
  const [dis,setDis] = useState("")
  const [image,setImage] = useState(null)
  const [operateDate,setOperateDate]  = useState(false)
  const[title,setTitle] = useState("")
  const [items,setItems] = useState([])
  const[update,setUpdate ] = useState(true)
  useEffect(() => {

    if (update){
      axios.get("/order/getallpost/").then(res=>{
      setItems(res.data)
 
    })
    setUpdate(false)}
  });
  const handleMarkerClick = (id, lat, long) => {
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };


  const handleSubmit = async () => {
    let jwt = localStorage.getItem("jwt")
    let form = new FormData
    
    let headers = { "Content-Type": "multipart/form-data"}
    if (typeof(jwt)!=undefined){
      axios.defaults.headers.common['Authorization'] = "JWT "+localStorage.getItem("jwt")
      headers["Authorization"] = "JWT "+jwt
    }
    else{
      history.push("/login")
    }
    form.append("latitude",newPlace.lat)
    form.append("langitude",newPlace.long)
    form.append("price",price)
    form.append("address",address)
    form.append("image",image)
    form.append("discription",dis)
    form.append("title",title)
    form.append("startDate",dates.startDate.toISOString().split('T')[0])
    form.append("endDate",dates.endDate.toISOString().split('T')[0]) 
    let data = {

      latitude:newPlace.lat,
      langitude:newPlace.long,
      price:price,
      address:address,
      image:image,
      discription:dis,
      title:title,
      startDate:dates.startDate.toISOString().split('T')[0],
      endDate:dates.endDate.toISOString().split('T')[0]
    }
    setNewPlace(null);
    setUpdate(true)
      const res = await axios.post("/order/createpost/", form ,headers).then((res)=>{
      setItems(items.push(...data))
      window.location.reload()}
      ).catch (err=> {
      if (err.response.status ===401){
        history.push("/login")
      }
    })



  };
  
  const [dates, setDates] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }
  )
  
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
          <ReactMapGL 
              width="100%"
              height="100%"
              transitionDuration="200"
              mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
              onDblClick={handleAddClick}
              {...viewport}
                  onViewportChange = {(e)=>setViewport(e)}
                  mapboxApiAccessToken ={process.env.REACT_APP_MAPBOX}    >
              {newPlace?
                 <Popup
                 latitude={newPlace.lat}
                 longitude={newPlace.long}
                 closeButton={true}
                 closeOnClick={false}
                 onClose={() => setNewPlace(null)}
               >
                 <div style = {{width:200,padding:10,display:"flex",flexDirection:"column",gap:5}}>      
                     <label>Title</label>
                     <textarea name="" id="" cols="15" rows="1" className="textareatitle" onChange={e=>setTitle(e.target.value)}></textarea>
                     <label>Discription</label>
                     <textarea name="" id="" cols="15" rows="1" className="textareatitle" onChange={e=>setDis(e.target.value)}></textarea>
                     <label>Address</label>
                     <textarea name="" id="" cols="15" rows="5" className="textarea" onChange={e=>setAddress(e.target.value)}></textarea>
                     <label>Price</label>
                     <div className="wrappedprice">
                      $
                     <input  inputMode="numeric" name="" id="" className="inputprice" type = "number" onChange={e=>setPrice(e.target.value)}></input>
                    Per month
                     </div>
                    <label >
                      Date
                     </label>
                <div className="wrappedcalendar">
                     <CalendarToday></CalendarToday>
                    <span onClick={() =>setOperateDate(!operateDate)} className="headerSearchText">{`${format(dates.startDate, "MM/dd/yyyy")} to ${format(
                            dates.endDate,
                            "MM/dd/yyyy"
                          )}`}</span>
                </div>
                <div className="boxx" >
                      {operateDate? <DateRange
                    editableDateInputs={true}
                    onChange={e =>setDates(e.selection)}
                    moveRangeOnFirstSelection={false}
                    ranges={[dates]}
                    className="date"
                    minDate={new Date()}

                  />:<></>}
                  </div>
           
                  
                      <label>Upload Image</label>
                      <input type="file" className="upload" accept="image/*" required onChange={e=>{setImage(e.target.files[0])
                    }}/>
                     <button  className="searchlease1" onClick={handleSubmit}>
                       Post
                     </button>
                 
                 </div>
               </Popup>
               :<></>
              }
              {
                items.map(item=>{return(
                  <Popup className="popup"
                  latitude={item.latitude}
                  longitude={item.langitude}
                  closeButton={true}
                  closeOnClick={false}>
                   <div className="card">
                     <img className="cardimage" src={item.image} />
                     <div className="cardtext">
                       <h5>{item.title}</h5>
                       <div className="cardprice">
                           $<span>{item.price}</span>
                       </div>
                     </div>
                     <div className="cardtext">
                       <h6 style = {{fontSize:10,fontWeight:400}}>{item.startDate}-{item.endDate}</h6>
                       <div className="cardprice">
                         <span style = {{fontSize:12}}>per month</span>
                       </div>
                     </div> 
                
                   </div>
                 </Popup>)
                })
              }
            
            </ReactMapGL>
          </div>)
}

