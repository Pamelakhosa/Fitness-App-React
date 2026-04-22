import React, { useState } from "react";
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Placeholder images for each category
const imageUrls = {
  "Upper Body": "https://www.elmens.com/wp-content/uploads/2019/08/Gym-anabolic-steroids-1068x712.jpg",
  "Lower Body": "https://www.freebeatfit.com/cdn/shop/articles/blog-Lower-Body-Workouts-at-Home.jpg?v=1708598506",
  "Core": "https://images.ctfassets.net/6ilvqec50fal/5wieyCZ94q6Sgexl48QVWz/774cbb8ce5ee568bdb34e93a5a9b2709/birddog_deepcore.jpg",
  "Cardio": "https://media.istockphoto.com/id/1289416200/photo/athletic-woman-doing-the-full-body-cardio-workout.jpg?s=612x612&w=0&k=20&c=IKxEnR8Jb_iJ8wv91C1NkrmMq_OfFxWII1aJFVZJTRo=",
  "Full Body": "https://img.freepik.com/free-photo/group-people-exercising-together-outdoors_23-2151061444.jpg",
  "Strength": "https://www.mensjournal.com/.image/t_share/MjA5MjQxNTc0MDkyMDU2NDIw/bird-dog-row.jpg",
  "Flexibility": "https://powerblock.com/cdn/shop/articles/dumbell-exercises-for-mobility.jpg?v=1739906973",
  "Balance": "https://www.shutterstock.com/image-photo/group-people-doing-mermaid-pilates-600nw-1444721012.jpg",
  "Endurance": "https://www.shutterstock.com/image-photo/coach-helping-fit-strong-sportswoman-260nw-2477861637.jpg",
  "Plyometrics": "https://betterme.world/articles/wp-content/uploads/2022/11/shutterstock_1776578111-scaled.jpg",
  "Mobility": "https://www.themanual.com/wp-content/uploads/sites/9/2024/05/man-doing-Glute-bridge.jpg?resize=800%2C418&p=1",
  "Agility": "https://www.mensjournal.com/.image/t_share/MTk2MTM2OTYwNDcwODg1ODkz/agility-lateral-shuffle.jpg",
  "Rehabilitation": "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2463330.jpeg",
  "Power": "https://cdn.mos.cms.futurecdn.net/N7cKZJUp4C3kdvwvKoPXSR-1200-80.jpg",
  "Recovery": "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2017/07/1109-man-stretching-legs.jpg?quality=86&strip=all"
};

// Updated exercise data with images
const exerciseData = {
    "Upper Body": [
      {
        name: "Push-up",
        description: "A basic push-up that targets the chest, shoulders, and triceps.",
        sets: 3,
        reps: 15,
        image: imageUrls["Upper Body"],
        muscleGroup: "Chest, Shoulders, Triceps",
        equipment: "None",
        difficulty: "Intermediate",
        benefits: "Improves upper body strength, endurance, and muscle tone.",
        instructions: "Start in a plank position with your hands slightly wider than shoulder-width. Lower your body until your chest nearly touches the floor, then push yourself back up to the starting position.",
        variations: [
          "Knee Push-ups (Beginner)",
          "Incline Push-ups (Intermediate)",
          "Diamond Push-ups (Advanced)"
        ],
        precautions: "Do not let your back sag. Keep your body in a straight line throughout the movement."
      },
    ],
    "Lower Body": [
      {
        name: "Squat",
        description: "A basic squat that works the legs and glutes.",
        sets: 3,
        reps: 12,
        image: imageUrls["Lower Body"],
        muscleGroup: "Quadriceps, Glutes, Hamstrings",
        equipment: "None",
        difficulty: "Beginner",
        benefits: "Improves lower body strength, balance, and flexibility.",
        instructions: "Stand with feet shoulder-width apart, lower your body by bending your knees and pushing your hips back, then return to standing.",
        variations: [
          "Bodyweight Squat",
          "Jump Squat (Advanced)",
          "Goblet Squat (Intermediate)"
        ],
        precautions: "Ensure your knees don’t go past your toes, and keep your chest up."
      },
    ],
    "Core": [
      {
        name: "Plank",
        description: "Hold a plank position to strengthen your core, shoulders, and back.",
        sets: 3,
        reps: "30s",
        image: imageUrls["Core"],
        muscleGroup: "Core, Shoulders, Back",
        equipment: "None",
        difficulty: "Beginner",
        benefits: "Improves core stability, posture, and strengthens back muscles.",
        instructions: "Hold a straight line from head to heels, with your forearms on the floor. Keep your core tight.",
        variations: [
          "Side Plank (Intermediate)",
          "Plank with Arm Lift (Advanced)"
        ],
        precautions: "Do not let your hips sag or your lower back arch."
      },
    ],
    "Cardio": [
      {
        name: "Jump Rope",
        description: "A cardio exercise that helps improve cardiovascular health.",
        sets: 3,
        reps: "60s",
        image: imageUrls["Cardio"],
        muscleGroup: "Full Body",
        equipment: "Jump Rope",
        difficulty: "Intermediate",
        benefits: "Improves cardiovascular health, coordination, and endurance.",
        instructions: "Jump with both feet together over the rope. Keep your hands relaxed and rotate the rope with your wrists.",
        variations: [
          "Single Foot Jump (Beginner)",
          "Double Under (Advanced)"
        ],
        precautions: "Avoid jumping too high. Maintain a steady pace to prevent fatigue."
      },
    ],
    "Full Body": [
      {
        name: "Burpees",
        description: "A high-intensity full-body exercise.",
        sets: 3,
        reps: 12,
        image: imageUrls["Full Body"],
        muscleGroup: "Full Body",
        equipment: "None",
        difficulty: "Advanced",
        benefits: "Improves cardiovascular endurance, full-body strength, and coordination.",
        instructions: "Start in a standing position, squat down, kick your legs back, perform a push-up, then jump back up into a standing position.",
        variations: [
          "Half Burpees (Intermediate)",
          "Burpee with Jump (Advanced)"
        ],
        precautions: "Do not overexert yourself. Maintain control throughout the movement."
      },
    ],
    "Strength": [
      {
        name: "Deadlift",
        description: "A weightlifting exercise that primarily targets the back and legs.",
        sets: 3,
        reps: 10,
        image: imageUrls["Strength"],
        muscleGroup: "Hamstrings, Glutes, Lower Back",
        equipment: "Barbell, Weights",
        difficulty: "Advanced",
        benefits: "Strengthens the posterior chain, improves posture, and builds muscle mass.",
        instructions: "Stand with feet hip-width apart, grip the barbell, and lift it by extending your hips and knees. Keep your back flat and chest up.",
        variations: [
          "Sumo Deadlift (Intermediate)",
          "Romanian Deadlift (Advanced)"
        ],
        precautions: "Keep your back straight throughout the lift to avoid injury."
      },
    ],
    "Flexibility": [
      {
        name: "Yoga Stretch",
        description: "A basic stretch to improve flexibility and mobility.",
        sets: 3,
        reps: "60s",
        image: imageUrls["Flexibility"],
        muscleGroup: "Full Body",
        equipment: "None",
        difficulty: "Beginner",
        benefits: "Increases flexibility, reduces stress, and enhances mobility.",
        instructions: "Hold each stretch for 30-60 seconds, focusing on deep breathing and relaxation.",
        variations: [
          "Forward Fold (Beginner)",
          "Downward Dog (Intermediate)"
        ],
        precautions: "Do not force any stretch. Listen to your body to avoid overstretching."
      },
    ],
    "Balance": [
      {
        name: "Single Leg Stand",
        description: "Balance on one leg to improve stability and coordination.",
        sets: 3,
        reps: "30s",
        image: imageUrls["Balance"],
        muscleGroup: "Legs, Core",
        equipment: "None",
        difficulty: "Beginner",
        benefits: "Improves balance, stability, and core strength.",
        instructions: "Stand on one leg, keeping your body tall and core engaged. Hold for the specified time, then switch legs.",
        variations: [
          "Single Leg Stand with Eyes Closed (Intermediate)",
          "Single Leg Stand with Dumbbell (Advanced)"
        ],
        precautions: "Ensure you are in a stable environment to prevent falls."
      },
    ],
    "Endurance": [
      {
        name: "Running",
        description: "A steady-paced cardio exercise that improves endurance.",
        sets: 3,
        reps: "5 min",
        image: imageUrls["Endurance"],
        muscleGroup: "Full Body",
        equipment: "None",
        difficulty: "Intermediate",
        benefits: "Improves cardiovascular endurance, stamina, and mental toughness.",
        instructions: "Maintain a steady pace, focusing on controlled breathing and posture.",
        variations: [
          "Interval Running (Advanced)",
          "Jogging (Beginner)"
        ],
        precautions: "Stay hydrated and avoid overexertion."
      },
    ],
    "Plyometrics": [
      {
        name: "Box Jumps",
        description: "A plyometric exercise that targets the legs and glutes.",
        sets: 3,
        reps: 10,
        image: imageUrls["Plyometrics"],
        muscleGroup: "Quadriceps, Glutes, Calves",
        equipment: "Box or Platform",
        difficulty: "Advanced",
        benefits: "Improves explosive strength, agility, and power.",
        instructions: "Stand in front of the box, squat down, and jump onto the box, landing softly. Step back down and repeat.",
        variations: [
          "Tuck Jump (Advanced)",
          "Step-ups (Beginner)"
        ],
        precautions: "Ensure the box is stable and avoid landing with your knees locked."
      },
    ],
    "Mobility": [
      {
        name: "Hip Circles",
        description: "A mobility exercise to improve flexibility and range of motion in the hips.",
        sets: 3,
        reps: 10,
        image: imageUrls["Mobility"],
        muscleGroup: "Hip Flexors, Glutes",
        equipment: "None",
        difficulty: "Beginner",
        benefits: "Improves hip mobility and prevents stiffness.",
        instructions: "Stand with feet hip-width apart, place hands on hips, and make large circles with your hips.",
        variations: [
          "Standing Hip Flexor Stretch (Intermediate)"
        ],
        precautions: "Avoid jerky movements and perform the exercise in a controlled manner."
      },
    ],
    "Agility": [
      {
        name: "Ladder Drills",
        description: "A quick footwork drill to improve agility and coordination.",
        sets: 3,
        reps: "30s",
        image: imageUrls["Agility"],
        muscleGroup: "Full Body",
        equipment: "Agility Ladder",
        difficulty: "Intermediate",
        benefits: "Improves foot speed, coordination, and agility.",
        instructions: "Step quickly in and out of the squares of the agility ladder. Focus on light, quick movements.",
        variations: [
          "Two-in Two-out Drill (Beginner)",
          "Lateral Quick Step (Advanced)"
        ],
        precautions: "Focus on precision and speed. Avoid rushing through the drills."
      },
    ],
    "Rehabilitation": [
      {
        name: "Resistance Band Stretch",
        description: "A rehabilitation exercise to stretch and strengthen muscles using a resistance band.",
        sets: 3,
        reps: "30s",
        image: imageUrls["Rehabilitation"],
        muscleGroup: "Full Body",
        equipment: "Resistance Band",
        difficulty: "Beginner",
        benefits: "Increases flexibility and helps with rehabilitation after injuries.",
        instructions: "Hold the resistance band with both hands, and stretch it by pulling it apart or overhead.",
        variations: [
          "Lateral Band Walk (Intermediate)"
        ],
        precautions: "Ensure the band is securely anchored and avoid overstretching."
      },
    ],
    "Power": [
      {
        name: "Power Clean",
        description: "An Olympic weightlifting movement for explosive strength.",
        sets: 3,
        reps: 8,
        image: imageUrls["Power"],
        muscleGroup: "Full Body",
        equipment: "Barbell",
        difficulty: "Advanced",
        benefits: "Improves explosive power, speed, and strength.",
        instructions: "Lift the barbell from the ground to your shoulders in one fluid motion, using your hips to generate power.",
        variations: [
          "Power Snatch (Advanced)",
          "Clean and Jerk (Expert)"
        ],
        precautions: "Ensure proper form to avoid injury, especially in the lower back and shoulders."
      },
    ],
    "Recovery": [
      {
        name: "Foam Rolling",
        description: "A self-myofascial release technique used for muscle recovery.",
        sets: 3,
        reps: "60s",
        image: imageUrls["Recovery"],
        muscleGroup: "Full Body",
        equipment: "Foam Roller",
        difficulty: "Beginner",
        benefits: "Reduces muscle soreness, improves flexibility, and speeds up recovery.",
        instructions: "Place the foam roller under a muscle group and slowly roll back and forth.",
        variations: [
          "Deep Tissue Foam Rolling (Advanced)"
        ],
        precautions: "Avoid rolling directly on joints or bones, and avoid excessive pressure on sensitive areas."
      },
    ],
  };
  

const ExerciseLibrary = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = Object.keys(exerciseData).filter(category =>
    category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4" style={{
      backgroundImage: `url(https://t4.ftcdn.net/jpg/02/57/65/13/360_F_257651358_mgb0VrHgGqNSKNjiJSltEsaHhY35RtT4.jpg)`, 
      backgroundSize: 'contain', 
      backgroundPosition: 'center', 
      backgroundAttachment: 'fixed', // Keeps the image fixed
      filter: 'blur(0px)', 
      height: '100vh', 
      position: 'relative'
    }}>
      <Button variant="light" className="mb-5" onClick={() => navigate("/")}>Back</Button>
      <Form.Control
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <Row className="g-4" style={{ position: 'relative', zIndex: 2 }}>
        {filteredCategories.map((category) => (
          <Col key={category} xs={12} md={4}>
            <Card 
              style={{
                width: '100%', 
                cursor: 'pointer', 
                padding: '15px', 
                opacity: 1, 
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: 'none',
              }} 
              onClick={() => setSelectedCategory(category)}
            >
              <Card.Img 
                variant="top" 
                src={imageUrls[category]} 
                alt={category} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body className="text-center">
                <Card.Title>{category}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={selectedCategory !== null} onHide={() => setSelectedCategory(null)} fullscreen>
  <Modal.Header closeButton>
    <Modal.Title>{selectedCategory}</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ maxHeight: '800px', overflowY: 'auto' }}>
    {selectedCategory && exerciseData[selectedCategory].map((exercise, index) => (
      <div key={index} className="mb-3 border p-2 rounded">
        <img src={exercise.image} alt={exercise.name} className="w-100 mb-5" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        <h5>{exercise.name}</h5>
        <p><strong>Description:</strong> {exercise.description}</p>
        <p><strong>Sets:</strong> {exercise.sets}, <strong>Reps:</strong> {exercise.reps}</p>
        <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
        <p><strong>Equipment Needed:</strong> {exercise.equipment}</p>
        <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
        <p><strong>Benefits:</strong> {exercise.benefits}</p>
        <p><strong>Instructions:</strong> {exercise.instructions}</p>
        <p><strong>Variations:</strong></p>
        <ul>
          {exercise.variations.map((variation, index) => (
            <li key={index}>{variation}</li>
          ))}
        </ul>
        <p><strong>Precautions:</strong> {exercise.precautions}</p>
      </div>
    ))}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setSelectedCategory(null)}>Close</Button>
  </Modal.Footer>
</Modal>

    </div>
        
  );
};

export default ExerciseLibrary;
