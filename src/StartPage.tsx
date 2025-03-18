import { useNavigate } from "react-router-dom";
import * as Tone from "tone";
import "./styles.css";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    await Tone.start(); // Starta AudioContext
    console.log("AudioContext aktiverat! State:", Tone.context.state);
    navigate("/beatmaker"); // Skicka användaren till beat-sidan
  };

  return (
    <div className="start-container">
      <h1>Welcome to Beat Maker</h1>
      <button className="make-beats-btn" onClick={handleStart}>
        Make Beats
      </button>
    </div>
  );
};

export default StartPage;
