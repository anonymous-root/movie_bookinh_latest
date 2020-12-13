import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {Row,Col,Modal,CardGroup} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {addcitiesdata} from '../../store/action/cityAction';
import {fetchstatedata} from '../../store/action/stateAction';
import {connect} from 'react-redux';
import Carousel from 'react-bootstrap/Carousel'
import Logo from '../../Movie_logo/logo1.png';
import Logo1 from '../../Movie_logo/logo1.jpg'

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Logo1}
            alt="First slide"
            height="300px"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Logo}
            alt="Second slide"
            height="300px"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Logo1}
            alt="Third slide"
            height="300px"
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
const AddForm = (props) => {
    const [obj,setMyObj]= useState({
      city_name:"",
      state_id:""
    })
    const [error,setError]=useState({
        city_nameError:"",
        isValid:false
    });
    
const [show, setShow] = useState(false);
const [ids,setIds] = useState("");

const handleClose = () => setShow(false);
const handleShow = (id) => {setShow(true);
  setIds(id);
}

const deleteHandler = async (id) =>{
    await props.deletestatedata(id);
    setShow(false);
  }
    useEffect(()=>{
        props.fetchstatedata();
      // console.log(props.states);
    },[props.fetchstatedata])
    
    const handleSubmit = async () =>{
      let errors = { ...error,isValid: true };
        if(obj.city_name == ""){
            errors.city_nameError="Please Required CityName !!";
            errors.isValid=true;
        }else{
            errors.isValid=false;
            errors.city_nameError="";
        }
        // console.log(errors.city_nameError)
        if(errors.isValid==false){
            await props.addcitiesdata(obj);
            props.history.replace("/city");
            obj.city_name="";
        }
        setError(errors);
    }
  
    const HandleChange = (e,name) =>{
       let olddata = {...obj};
       olddata[name] = e.target.value;
      //  console.log(olddata);
       setMyObj(olddata);
    }
  
    const backHandler = () => {
      props.history.replace("/city")
    }

    const optionTemplate = () => {
      return props.states.map((stateslist) => {
      const { _id, state_name } = stateslist;
      if(!obj.state_id){
        obj.state_id=_id;
        setMyObj(obj);
    }
      return (
          <option value={_id} key={_id}>{state_name}</option>
       )
      })
    
    }
    let errors = { ...error,isValid: true };
    // let errors = { ...error};
    // console.log(errors.city_nameError);
  return (
    <>
    <Card>
      <Card.Header className={"Header"}>
          <div className={"Title"}>
              City List
          </div>
          <div className="input-group" style={{ maxWidth: "50px" }}>
              <Button variant="secondary" onClick={() => backHandler()} >Back</Button>
                 
              </div>
        </Card.Header>
        <Card.Body>
        <Card.Title>Add City</Card.Title>
        <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Enter City Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control isInvalid={error.city_nameError} type="text" name="city_name" onChange={(e)=>{HandleChange(e,"city_name")}} placeholder="Enter city name ..." style={{maxWidth : "300px"}}/>
                    <Form.Control.Feedback type="invalid">
                    {error.city_nameError}
                        </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                    Select State :-
                </Form.Label>
                <Col sm="3">
                    <Form.Control as="select" name="state_id" onChange={(e) => {HandleChange(e,"state_id")}} >
                        {optionTemplate()}
                    </Form.Control>
                </Col>
            </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Form>
        </Card.Body>
    </Card>
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
    <ControlledCarousel />
    </>
  );
}
const mapStateToProps =  (state) => ({
    err:state.stateReducer.error,
    states:state.stateReducer.states,
  })

const mapDispatchToProps = dispatch =>{
  return{
    fetchstatedata:()=>dispatch(fetchstatedata()),
    addcitiesdata: (postdata) => dispatch(addcitiesdata(postdata))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddForm);
