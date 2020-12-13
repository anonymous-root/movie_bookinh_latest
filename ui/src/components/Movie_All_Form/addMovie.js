import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addstatedata } from '../../store/action/stateAction';
import { addmoviedata } from "../../store/action/movieAction";
import { connect } from 'react-redux';
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

const addMovie = (props) => {
  const [obj, setMyObj] = useState({
    moviename: "",
    releasedate: "",
    movie_status: "",
    movie_category: "",
    director_name: "",
    Actors_name: "",
    movie_description: "",
    movie_type: "",
    movie_logo: "",
    booking_status: ""
  })

  const handleSubmit = async () => {
    //console.log(props.students);
    console.log(obj);
    const formdata = new FormData();
    formdata.append("moviename",obj.moviename);
    formdata.append("releasedate",obj.releasedate);
    formdata.append("movie_status",obj.movie_status);
    formdata.append("movie_category",obj.movie_category);
    formdata.append("director_name",obj.director_name);
    formdata.append("Actors_name",obj.Actors_name);
    formdata.append("movie_description",obj.movie_description);
    formdata.append("movie_type",obj.movie_type);
    formdata.append("movie_logo",obj.movie_logo);
    formdata.append("booking_status",obj.booking_status);
  
    await props.addmoviedata(formdata);
    props.history.replace("/movie");
    //console.log("Called")
  }

  //   const onFileChange = (e,name,images) =>{
  //     const imageFile = e.target.files[0];  
  //     if(imageFile)
  //     {
  //       let olddata = {...obj};
  //      olddata[name] = e.target.value;
  //      if(name == "movie_logo")
  //      {
  //       console.log(olddata);
  //       setMyObj(olddata);
  //      }


  //     }
  //     // let errors = this.state.errors;
  //     // if(imageFile)
  //     // {
  //     //     if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
  //     //         errors.image = 'image Should be jpg,jpeg or png';
  //     //         this.setState({valid1:true});
  //     //     }
  //     //     else
  //     //     {
  //     //         errors.image = '';
  //     //         this.setState({valid1:false});
  //     //     }
  //     // }
  //     // this.setState(
  //     // { image: e.target.files[0] }
  //     // )
  // }

  const HandleChange = (e, name) => {
    let olddata = { ...obj };
    console.log(name);
    if (name == "movie_logo") {
      console.log(name);
      const { target: { files } } = e
      olddata[name] = files.length === 1 ? files[0] : files
      olddata[name] = e.target.files[0];
    }
    else
    {
      olddata[name] = e.target.value;
    }
    console.log(olddata);
    setMyObj(olddata);
  }

  const backHandler = () => {
    props.history.replace("/movie")
  }

  return (
    <>
      <Card>
        <Card.Header className={"Header"}>
          <div className={"Title"}>
            Movie List
          </div>
          <div className="input-group" style={{ maxWidth: "50px" }}>
            <Button variant="secondary" onClick={() => backHandler()} >Back</Button>

          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>Add Movie</Card.Title>
          <Form encType="multipart/form-data">
            <Form.Group controlId="formBasicEmail">
              {/* <Form.Label>Enter State Name</Form.Label> */}
              <Form.Control type="text" name="moviename" onChange={(e) => { HandleChange(e, "moviename") }} placeholder="Enter moviename ..." style={{ maxWidth: "300px" }} />
              <Form.Control type="text" name="releasedate" onChange={(e) => { HandleChange(e, "releasedate") }} placeholder="Enter releasedate  ..." style={{ maxWidth: "300px" }} />
              <Form.Control type="text" name="movie_category" onChange={(e) => { HandleChange(e, "movie_category") }} placeholder="Enter movie_category ..." style={{ maxWidth: "300px" }} />
              <Form.Control type="text" name="director_name" onChange={(e) => { HandleChange(e, "director_name") }} placeholder="Enter director_name ..." style={{ maxWidth: "300px" }} />
              <Form.Control type="text" name="Actors_name" onChange={(e) => { HandleChange(e, "Actors_name") }} placeholder="Enter Actors ..." style={{ maxWidth: "300px" }} />
              <Form.Control type="text" name="movie_description" onChange={(e) => { HandleChange(e, "movie_description") }} placeholder="Enter movie_description ..." style={{ maxWidth: "300px" }} />
              <Form.Control type="text" name="movie_type" onChange={(e) => { HandleChange(e, "movie_type") }} placeholder="Enter movie_type..." style={{ maxWidth: "300px" }} />
              <Form.Control type="file" name="movie_logo" onChange={(e)=>{HandleChange(e,"movie_logo")}} placeholder="Enter movie_logo ..." style={{maxWidth : "300px"}}/>
              {/* <Form.Control type="file" name="movie_logo" onChange={(e) =>
                this.setState({ smm: e.target.files[0] })
              } placeholder="Enter movie_logo ..." style={{ maxWidth: "300px" }} /> */}
              <Form.Control type="text" name="booking_status" onChange={(e) => { HandleChange(e, "booking_status") }} placeholder="Enter booking_status ..." style={{ maxWidth: "300px" }} />
              <Form.Control type="text" name="movie_status" onChange={(e) => { HandleChange(e, "movie_status") }} placeholder="Enter movie_status ..." style={{ maxWidth: "300px" }} />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
      <ControlledCarousel />
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addmoviedata: (postdata) => dispatch(addmoviedata(postdata))
  }
}
export default connect(null, mapDispatchToProps)(addMovie);
