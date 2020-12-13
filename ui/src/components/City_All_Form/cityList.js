import React,{useState,useEffect} from 'react';
import {Button,Card,Table,Modal,Form, CardGroup,Row,Col }from 'react-bootstrap';
import {fetchcitiesdata,deletecitiesdata,updatecitiesdata,singlecitiesDataFetch} from '../../store/action/cityAction';
import {fetchstatedata} from '../../store/action/stateAction';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { BiPlusMedical,BiSearch } from 'react-icons/bi';
import { FiAlignJustify } from "react-icons/fi";
import '../state.css';


const CityList = (props) => {
  const [obj,setMyObj1]= useState({
    _id:"",
    city_name:"",
    state_id:""
  })
  
  const [ids,setIds] = useState("");
  const [show, setShow] = useState(false);
  const [ushow, usetShow] = useState(false);
  
   useEffect(()=>{    
    props.fetchcitiesdata();
    props.fetchstatedata();
  },[props.fetchcitiesdata,props.fetchstatedata])
  
  const deleteHandler = async (id) =>{
    await props.deletecitiesdata(id);
    setShow(false);
  }

const SingleSubmit = async () =>{
  await props.updatecitiesdata(obj._id,obj);
  usetShow(false);
  obj._id=props.singlecities._id;
  obj.city_name="";
}


const handleClose = () => setShow(false);
const handleShow = (id) => {setShow(true);
  setIds(id);
}

const SingleClose = () => { 
  obj.city_name="";
  usetShow(false) 
};

if(props.singlecities.city_name && !obj.city_name){
  setMyObj1(props.singlecities)
}
const handleUpdate = async (_id) => {
  await props.singlecitiesDataFetch(_id); 
  usetShow(true);
}

  const renderTableData = () => {
    return props.cities.map((citieslist, index) => {
        // console.log(citieslist);
       const { _id, city_name,state_id } = citieslist
       return (
          <tr key={_id}>
             <td>{index+1}</td>
             <td>{city_name}</td>
             <td>{state_id.state_name}</td>
             <td><Button onClick={() => handleUpdate(_id)}>UPDATE</Button></td>
             <td><Button variant="danger" onClick={() => handleShow(_id)}>Delete</Button></td>
          </tr>
       )
    })
 }
 const HandleChange = (e,name) =>{
  let olddata = {...obj};
  olddata[name] = e.target.value;
  setMyObj1(olddata);
}
const optionTemplate = () => {
  // console.log(props.states);
  return props.states.map((stateslist) => {
  const { _id, state_name } = stateslist;
  if(!obj.state_id){
    obj.state_id=_id;
    setMyObj1(obj);
}
  return (
      <option value={_id} key={_id}>{state_name}</option>
   )
  })

}
  return (
    <>
            <Card style={{  }}>
                <Card.Header className={"Header"}>
                <div className={"Title"}>
                    State List
                </div>
                <div className="input-group" style={{ maxWidth: "400px" }}>
                        <input type="text" className="form-control" placeholder="State Name" />
                        <div className="input-group-append" id="button-addon4">
                            <Button variant="outline-success" ><BiSearch/></Button>
                            <Button variant="outline-secondary"><FiAlignJustify/></Button>
                            <Button as={Link} to="/city/cityAdd" variant="outline-primary"><BiPlusMedical/></Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>City Name</th>
                                <th>State Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableData()}
                        </tbody>
                    </Table>               
                </Card.Body>
            </Card>

            {/* Update Record */}
          <Modal  show={ushow} onHide={SingleClose}>
          <Card bg="Light" text='dark' >
              <Modal.Header closeButton style={{ backgroundColor: "#344c63",color: "white"}}>
                  <Card.Title>Update City</Card.Title>                
              </Modal.Header>

              <Modal.Body>                
                <Card.Body>
                        <Card.Text>
                        <Form>
                          <Form.Group>
                              <Form.Label style={{marginBottom:"1.5rem",fontFamily: "emoji"}}>Enter City Name:-</Form.Label>
                              <Form.Control type="hidden" name="_id" value={obj._id} onChange={(e) => HandleChange(e,"_id")} />
                              <Form.Control type="text" style={{backgroundColor: "#e2e2e2",color: "#463334"}} name="city_name"  value={obj.city_name} onChange={(e) => HandleChange(e,"city_name")}  placeholder="Enter city name ..." />
                          </Form.Group>
                          <Form.Group as={Row} controlId="formPlaintextPassword">
                              <Form.Label style={{marginBottom:"1.5rem",fontFamily: "emoji"}}>
                                  Select State :-
                              </Form.Label>
                              
                                  <Form.Control as="select" name="state_id" value={obj.state_id} onChange={(e) => {HandleChange(e,"state_id")}} >
                                      {optionTemplate()}
                                  </Form.Control>
                              
                          </Form.Group>
                      </Form>
                        </Card.Text>
                </Card.Body>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" onClick={()=>SingleSubmit()}>update</Button>
              </Modal.Footer>
            </Card>
            </Modal>
        
            {/* Delete Record  */}
            <Modal  show={show} onHide={handleClose} style={{paddingTop:"156px"}}>
                <Card bg="Light" text='dark' >
                    <Modal.Header closeButton style={{ backgroundColor: "#344c63",color: "white"}}>
                          <Card.Title><b>Are you sure!</b></Card.Title>
                    </Modal.Header>
                    <Card.Body>
                    <Card.Text>
                        Do you want to delete this city?
                    </Card.Text>
                    </Card.Body>
                    <Modal.Footer>
                      <Button variant="danger"  onClick={() => deleteHandler(ids)}>Delete</Button>
                      <Button variant="secondary"  onClick={handleClose} style={{    marginLeft: "17px"}}>Cancel</Button>
                    </Modal.Footer>        
                </Card>
            </Modal>
    </>
  );
}

const mapStateToProps =  (state) => ({
  err:state.cityReducer.error,
  cities:state.cityReducer.cities,
  states:state.stateReducer.states,
  singlecities:state.cityReducer.singlecities
})

const mapDispatchToProps = dispatch =>{
  return{
    fetchstatedata:()=>dispatch(fetchstatedata()),
    fetchcitiesdata:()=>dispatch(fetchcitiesdata()),
    deletecitiesdata:(_id)=>dispatch(deletecitiesdata(_id)),
    updatecitiesdata:(postdata,put) => dispatch(updatecitiesdata(postdata,put)),
    singlecitiesDataFetch:(id)=>dispatch(singlecitiesDataFetch(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CityList);
