import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure you have axios imported
import EventCoverCard from "./EventCoverCard";

const EventPlannerAi = ({ props }) => {
  const [budget, setBudget] = useState("");
  const [timeToStay, setTimeToStay] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  console.log(eventId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratedAnswer("");
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/predict", {
        budget,
        timeToStay,
      });
      setGeneratedAnswer(response.data.prediction);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EventCoverCard events={props} eventId={eventId} />
      <div>
        <div className="w-full h-96 mx-16 my-6">
          <div className="h-52"></div>
          <div id="generate-plan">
            hello, how are you all people
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your budget"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={timeToStay}
                onChange={(e) => setTimeToStay(e.target.value)}
                placeholder="Enter time to stay"
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Generate Plan
              </button>

              {generatedAnswer && (
                <div className="bg-white rounded-md p-4 shadow-md">
                  <p className="text-gray-800">{generatedAnswer}</p>
                </div>
              )}
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPlannerAi;
