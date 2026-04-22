import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Modal, Offcanvas, ListGroup, Alert } from "react-bootstrap";
import { FaBasketballBall, FaDumbbell } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoFitness } from "react-icons/io5";
import { FaBars } from 'react-icons/fa';
import { Carousel } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaHeartbeat, FaUsers, FaRunning } from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Get the authentication status
const isAuthenticated = !!localStorage.getItem("token"); // Check if a token exists


const Home = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalClose = () => setModalShow(null);

  const [open, setOpen] = useState(false);

  const [error, setError] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication status

  var navigate = useNavigate();

  useEffect(() => {
    // Dynamically check the token when the component mounts
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set authentication state based on token
  }, []); // Empty array makes this effect run only once when the component mounts

  // Function for sign-in button
  const handleSignInClick = () => {
    
    if (isAuthenticated) {
      setError("You are already signed in!");
    } else {
      navigate("/login");
    }
  };

   

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1674059549221-e2943b475f62?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'blur(2px)',
        zIndex: -1,
      }}></div>

      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '20px 0', textAlign: 'center', color: 'white' }}>
        <h1 className="display-4 font-weight-bold" style={{
          background: 'linear-gradient(45deg, #ff6b6b, #f9a602, #ffd700)',
          backgroundClip: 'text',
          textFillColor: 'transparent'
        }}>
          <Col md={1}>
            <Button onClick={handleShow} variant="secondary">
              <FaBars />
            </Button>
          </Col>
          FitnessApp
        </h1>
        <p className="lead">Your journey to a healthier lifestyle starts here.</p>

        {/* Sign In Button - Positioned to the top right */}
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '20px',
          zIndex: 1000,
        }}>
          <Button variant="secondary" onClick={handleSignInClick}>Sign In <i class="bi bi-person-up fs-5"></i></Button>
          {error && <Alert className="mb-3" variant="info">{error}</Alert>}
        </div>
      </div>

      <Container className="text-center mt-3" style={{ position: 'relative' }}>
        <Row className="mt-5 d-flex justify-content-center">
          <Col md={8}>
            <Row>
              {[{
                title: "Workout Plans",
                icon: <FaDumbbell size={60} className="text-primary mb-3" />,
                text: "Find the best exercises tailored to your goals.",
                variant: "primary",
                modalText: "Explore customized workout plans designed for all fitness levels."
              }, {
                title: "Track Progress",
                icon: <FiUser size={60} className="text-success mb-3" />,
                text: "Monitor your fitness journey with ease.",
                variant: "success",
                modalText: "Track your workouts, measure progress, and stay motivated."
              }, {
                title: "Nutrition Tips",
                icon: <IoFitness size={60} className="text-danger mb-3" />,
                text: "Get the best diet plans for your workouts.",
                variant: "danger",
                modalText: "Discover nutritional strategies that complement your fitness journey."
              }].map((item, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="shadow-lg border-0 rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <Card.Body className="p-4 text-center">
                      {item.icon}
                      <Card.Title className="h4 font-weight-bold text-white">{item.title}</Card.Title>
                      <Card.Text className="text-white">{item.text}</Card.Text>
                      <Button variant={item.variant} className="btn-lg shadow-sm hover-scale" onClick={() => setModalShow(index)}>
                        Learn More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <div className="hero-section mb-5 mt-5" style={{
          filter: 'blur(0.5px)',
          padding: '100px 0',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(136, 106, 106, 0.6), rgba(65, 58, 46, 0.6))', // Added transparency with alpha value 0.6
          borderRadius: '30px',  // Curved edges
          overflow: 'hidden'  // Ensure content doesn't overflow the rounded corners
        }}>
          <h1 className="display-4 text-white font-weight-bold">Reach Your Fitness Goals with Ease</h1>
          <p className="lead text-white mb-4">Track, plan, and achieve your fitness journey like never before.</p>
          <Button variant="light" size="lg" className="btn-lg shadow-lg" onClick={() => navigate("/register")}>Start Your Journey Now</Button>
        </div>

        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url('https://www.24hourfitness.com/24life/recover/2017/media_15ebf180367da7392a23b3743d1a23be16b4dad2a.jpeg?width=1200&format=pjpg&optimize=medium')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'blur(2px)',
            zIndex: -1,
          }}></div>


          <div className="my-5 mt-5">
            <h3 className="text-center mb-4 text-white">Daily Fitness Tutorials</h3>

            <div className="video-slider-container">
              <div className="video-slider">
                {/* YouTube Videos */}
                {[
                  "https://www.youtube.com/watch?v=P4L6pN1SfUQ&pp=ygUIZml0bmVzcyA%3D",
                  "https://www.youtube.com/embed/zUDfwrm1DV8",
                  "https://www.youtube.com/shorts/YEyFdtni3uU",
                  "https://www.youtube.com/embed/wd25wFy75lo",
                  "https://www.youtube.com/embed/OmXAk6IvT9E",
                  "https://www.youtube.com/shorts/-KKfHX56OTY",
                ].map((video, index) => (
                  <div key={index} className="video-block">
                    <iframe width="350" height="300" src={video} allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url('https://plus.unsplash.com/premium_photo-1664109999778-84bdb22b883a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              filter: 'blur(2px)',
              zIndex: -1,
            }}></div>

            {/* Clubs Section */}
            <div className="clubs-section text-center py-5" style={{ backgroundColor: '#222', color: 'white', borderRadius: '200px', padding: '50px 20px', background: 'linear-gradient(135deg, rgba(136, 106, 106, 0.6), rgba(65, 58, 46, 0.6))' }}>
              <h2 className="mb-4">Join Our Clubs</h2>
              <Container>
                <Row className="justify-content-center">
                  {[
                    {
                      icon: <FaBasketballBall size={50} className="text-warning" />,
                      title: "Sports Club",
                      text: "Join our dynamic sports community with exclusive training, expert coaching, and competitive events to fuel your passion."
                    },
                    { icon: <FaUsers size={50} className="text-primary" />, title: "Social Club", text: "Connect with like-minded fitness enthusiasts, share progress, and stay inspired." },
                    { icon: <FaRunning size={50} className="text-success" />, title: "Running Club", text: "Push your limits, track your runs, and participate in group challenges." }
                  ].map((club, index) => (
                    <Col md={4} key={index} className="mb-4 d-flex justify-content-center">
                      <div className="bubble shadow-lg p-4 text-center" style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '30px',
                        maxWidth: '320px',
                        padding: '20px',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'linear-gradient(135deg, rgba(94, 14, 14, 0.6), rgba(65, 58, 46, 0.6))'
                      }}>
                        {club.icon}
                        <h4 className="mt-3">{club.title}</h4>
                        <p className="mt-2">{club.text}</p>
                      </div>
                    </Col>
                  ))}
                </Row>

                <Button
                  variant="dark"
                  onClick={() => setOpen(!open)}
                  aria-controls="club-info"
                  aria-expanded={open}
                >
                  More
                </Button>

                <Collapse in={open} >
                  <div id="club-info" className="mt-3 p-3 text-black" style={{ backgroundColor: "rgba(255, 255, 255, 0.93)", borderRadius: "10px" }}>
                    <p>
                      You have the flexibility to switch your club at any time by visiting your profile settings. Once there, navigate to the "Club Membership" section where you will find a list of available clubs you can join. Each club option will have a brief description, so you can choose the one that best aligns with your fitness goals and interests. Simply select a new club from the list, review the details, and confirm your selection. After confirming, your profile will be updated with your new club affiliation, and you can start enjoying the benefits and activities of your new club immediately.
                    </p>

                  </div>
                </Collapse>
              </Container>
            </div>

          </div>

          {/* Social media footer */}
          <div className="social-footer text-center mt-5" style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '20px 0',
            position: 'relative',
            width: '100%',
            bottom: 0,
            borderRadius: '50px'
          }}>
            <h5 className="mb-2">Follow Us on Social Media</h5>
            <div className="social-icons mb-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                <FaFacebook size={30} className="text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                <FaTwitter size={30} className="text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                <FaInstagram size={30} className="text-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                <FaYoutube size={30} className="text-white" />
              </a>
            </div>
            <p>&copy; 2025 FitnessApp. All Rights Reserved.</p>
          </div>


        </div>







      </Container>

      <Offcanvas show={show} onHide={handleClose} placement="start" style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1664885647771-7fa7b5ad3b01?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
        <Offcanvas.Header closeButton>
          <i class="bi bi-person-circle fs-1"></i>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup.Item className="mt-5 mb-5"><Button variant="secondary" onClick={() => navigate("/profile")}>User Profile</Button></ListGroup.Item>
          <ListGroup.Item className="mb-5"><Button variant="secondary" onClick={() => navigate("/exerciselibrary")}>Exercise Library</Button></ListGroup.Item>
          <ListGroup.Item className="mb-5"><Button variant="secondary" onClick={() => navigate("/workoutplanner")}>Workout Planner</Button></ListGroup.Item>
          <ListGroup.Item><Button variant="secondary" onClick={() => navigate("/dashboard")}>Dashboard</Button></ListGroup.Item>
        </Offcanvas.Body>
      </Offcanvas>

      {[
        {
          title: "Workout Plans",
          text: "Explore customized workout plans designed for all fitness levels. Find structured routines based on your fitness level and goals, from beginner-friendly workouts to advanced strength training regimens.",
          images: [
            "https://images.unsplash.com/photo-1616279967983-ec413476e824?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ]
        },
        {
          title: "Track Progress",
          text: "Monitor your workouts and stay on track with your fitness goals. Keep a log of your progress, set achievable targets, and analyze workout data to maximize performance.",
          images: [
            "https://images.unsplash.com/photo-1722925541321-f52d45b29c17?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg",
            "https://images.pexels.com/photos/3768891/pexels-photo-3768891.jpeg"
          ]
        },
        {
          title: "Nutrition Tips",
          text: "Discover nutritional strategies that complement your fitness journey. Get expert guidance on meal planning, macronutrient balance, and food choices to fuel your workouts efficiently.",
          images: [
            "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1153&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1571780723643-4bfd5aa05ae3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ]
        }
      ].map((item, index) => (
        <Modal
          show={modalShow === index}
          onHide={handleModalClose}
          key={index}
        //fullscreen
        >
          <Modal.Header closeButton>
            <Modal.Title>{item.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center">
            <Card style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", width: "80%", border: "none" }} className="shadow-lg">
              <Carousel>
                {item.images.map((img, imgIndex) => (
                  <Carousel.Item key={imgIndex}>
                    <img src={img} className="d-block w-100" style={{ maxHeight: "300px", objectFit: "cover" }} alt={`Slide ${imgIndex + 1}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body className="text-center">
                <Card.Text>{item.text}</Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ))}


    </div>
  );
};

export default Home;
