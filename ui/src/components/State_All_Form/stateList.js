import React,{useState,useEffect} from 'react';
import {Button,Card,Table,Modal,Form, Spinner }from 'react-bootstrap';
import {fetchstatedata,deletestatedata,updatestatedata,singlestateDataFetch} from '../../store/action/stateAction';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { BiPlusMedical,BiSearch } from 'react-icons/bi';
import { FiAlignJustify } from "react-icons/fi";
import '../state.css';


const StateList = (props) => {
  // console.log(props.singlestate);
  const [obj,setMyObj1]= useState({
    _id:"",
    state_name:"",
  })
  
  const [ids,setIds] = useState("");
  
  useEffect(()=>{    
    props.fetchstatedata();
  },[props.fetchstatedata])
  
const deleteHandler = async (id) =>{
  await props.deletestatedata(id);
  setShow(false);
}

const SingleSubmit = async () =>{
  await props.updatestatedata(obj._id,obj);
  // setMyObj1(props.singlestate);
  console.log(obj);
  //  console.log(obj._id);
  usetShow(false);
  // obj._id=props.singlestate._id;
  obj.state_name="";
  props.singlestate.state_name="";
  //  props.history.replace(`/state`);
}

const [show, setShow] = useState(false);
const [ushow, usetShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = (id) => {setShow(true);
  setIds(id);
}

const SingleClose = () => { 
  obj.state_name="";
  usetShow(false) 
};

if(props.singlestate.state_name && !obj.state_name){
  setMyObj1(props.singlestate)
  console.log(obj);
}
const handleUpdate = async (_id) => {
  await props.singlestateDataFetch(_id); 
  usetShow(true);
}

  const renderTableData = () => {
    return props.states.map((stateslist, index) => {
        
       const { _id, state_name } = stateslist
       return (
          <tr key={_id}>
             <td>{index+1}</td>
             <td>{state_name}</td>
             <td><Button onClick={() => handleUpdate(_id)} >UPDATE</Button></td>
             <td><Button variant="danger" onClick={() => handleShow(_id)} >Delete</Button></td>
          </tr>
       )
    })
 }
 const HandleChange = (e,name) =>{
  let olddata = {...obj};
  olddata[name] = e.target.value;
  setMyObj1(olddata);
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
                            <Button as={Link} to="/state/stateAdd" variant="outline-primary"><BiPlusMedical/></Button>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>State Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {(props.Loading) ? <Spinner animation="border" role="status">
                              <span className="sr-only">Loading...</span>
                            </Spinner> : renderTableData()}
                            
                        </tbody>
                    </Table>               
                </Card.Body>
            </Card>

          {/* Update Record */}
          <Modal  show={ushow} onHide={SingleClose}>
          <Card bg="Light" text='dark' >
              <Modal.Header closeButton style={{ backgroundColor: "#344c63",color: "white"}}>
                
                  <Card.Title>Update State</Card.Title>
                
              </Modal.Header>

              <Modal.Body>
                
                <Card.Body>
                        <Card.Text>
                        <Form>
                          <Form.Group>
                              <Form.Label style={{marginBottom:"1.5rem",fontFamily: "emoji"}}>Enter State Name:-</Form.Label>
                              <Form.Control type="hidden" name="_id" value={obj._id} onChange={(e) => HandleChange(e,"_id")} placeholder="Enter state name ..." />
                              <Form.Control type="text" style={{backgroundColor: "#e2e2e2",color: "#463334"}} name="state_name"  value={obj.state_name} onChange={(e) => HandleChange(e,"state_name")}  placeholder="Enter state name ..." />
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
                    {/* <Card.Body > */}
                        <Card.Title><b>Are you sure!</b></Card.Title>
                    {/* </Card.Body> */}
                  </Modal.Header>
                      <Card.Body>
                        <Card.Text>
                            Do you want to delete this state?
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
  err:state.stateReducer.error,
  Loading:state.stateReducer.loading,
  states:state.stateReducer.states,
  singlestate:state.stateReducer.singlestate,
})

const mapDispatchToProps = dispatch =>{
  return{
    fetchstatedata:()=>dispatch(fetchstatedata()),
    deletestatedata:(_id)=>dispatch(deletestatedata(_id)),
    updatestatedata:(postdata,put) => dispatch(updatestatedata(postdata,put)),
    singlestateDataFetch:(id)=>dispatch(singlestateDataFetch(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(StateList);
