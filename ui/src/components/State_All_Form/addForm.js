import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {addstatedata} from '../../store/action/stateAction';
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
    state_name:""
  })

  const handleSubmit = async () =>{
    //console.log(props.students);
     console.log(obj);
     await props.addstatedata(obj);
     props.history.replace("/state");
     //console.log("Called")
  }

  const HandleChange = (e,name) =>{
     let olddata = {...obj};
     olddata[name] = e.target.value;
     console.log(olddata);
     setMyObj(olddata);
  }

  const backHandler = () => {
    props.history.replace("/state")
  }

  return (
    <>
    <Card>
      <Card.Header className={"Header"}>
          <div className={"Title"}>
              State List
          </div>
          <div className="input-group" style={{ maxWidth: "50px" }}>
              <Button variant="secondary" onClick={() => backHandler()} >Back</Button>
                 
              </div>
        </Card.Header>
        <Card.Body>
        <Card.Title>Add State</Card.Title>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter State Name</Form.Label>
                    <Form.Control type="text" name="state_name" onChange={(e)=>{HandleChange(e,"state_name")}} placeholder="Enter state name ..." style={{maxWidth : "300px"}}/>
                </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Form>
        </Card.Body>
    </Card>
    <ControlledCarousel />
    </>
  );
}

const mapDispatchToProps = dispatch =>{
  return{
    addstatedata: (postdata) => dispatch(addstatedata(postdata))
  }
}
export default connect(null,mapDispatchToProps)(AddForm);
