import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure you have axios imported
import EventCoverCard from "./EventCoverCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import GoogleMapsCard from "./GoogleMapsCard";

const EventPlannerAi = ({ props }) => {
  const [budget, setBudget] = useState("");
  const [timeToStay, setTimeToStay] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  console.log(eventId);
  props[eventId - 1].event_type.map((type) => console.log(type));

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
        <div className="w-full p-2 sm:my-6 sm:px-16">
          <div className=" flex flex-col gap-2 border-sp  p-2">
            <h1 className="text-xl">ABOUT THE EVENT</h1>
            <div className="flex justify-between">
              <div className="text-xs text-gray-900">
                {props[eventId - 1].name}
              </div>
              <div className="text-xs text-gray-600">
                {props[eventId - 1].address}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs text-gray-600 flex flex-between">
                {props[eventId - 1].host}
              </div>
              <a href="#map" className="text-xs text-gray-900">
                View on Map <LocationOnIcon />
              </a>
            </div>
            <div className="flex justify-between ">
              <a
                href={props[eventId - 1].website}
                target="_blank"
                className="text-xs text-gray-900 hover:text-gray-600 text-extrabold"
              >
                <LinkIcon /> {props[eventId - 1].website}
              </a>
            </div>
            <div className="text-[0.65rem] text-gray-900">
              {props[eventId - 1].description}
            </div>
          </div>
          <div className="p-2 mt-2">
            <h1 className="text-lg">Event Details</h1>
            <div className="grid grid-cols-3 mt-2 gap-8">
              <div className="col-1">
                <div className="">
                  <h3 className="text-sm flex py-4">Event Type</h3>
                  {props[eventId - 1].event_type.map((type) => (
                    <div className="flex flex-cols mb-4  ">
                      <div className="text-[0.5rem] backdrop-blur-md bg-slate-300 rounded-md p-1">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-1">
                <div className="">
                  <h3 className="text-sm py-4">Audience</h3>
                  {props[eventId - 1].audience.map((type) => (
                    <div className="flex flex-cols mb-4  ">
                      <div className="text-[0.5rem] backdrop-blur-md bg-slate-300 rounded-md p-1">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-1">
                <div className="">
                  <h3 className="text-sm py-4">Topic</h3>
                  {props[eventId - 1].topic.map((type) => (
                    <div className="flex flex-cols mb-4">
                      <div className="text-[0.5rem] backdrop-blur-md bg-slate-300 rounded-md p-1">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div id="generate-plan">
            <div className=" block sm:flex justify-between  mt-2 p-2 gap-2 ">
              <div className="flex flex-col border border-gray-300 shadow-md rounded-lg p-2">
                <h2 className="text-xl my-6">GENERATE PLAN</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <label className="whitespace-nowrap text-gray-600">
                      Budget[$]:
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="Enter your budget"
                      className="flex-grow border p-1 rounded-lg "
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="whitespace-nowrap text-gray-600">
                      Stay Time :
                    </label>
                    <input
                      type="text"
                      value={timeToStay}
                      onChange={(e) => setTimeToStay(e.target.value)}
                      placeholder="Enter time to stay in days"
                      className="flex-grow border p-1 rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="secondary-button h-10 mx-auto sm:mx-0 bg-slate-300 text-gray-900 hover:bg-gray-500"
                  >
                    Generate Plan
                  </button>
                </form>
              </div>
              <div className="border border-gray-300 w-full shadow-md rounded-lg">
                {!loading && !generatedAnswer && !error && (
                  <div>
                    <h2 className="text-sm flex justify-center items-center align-middle p-2">
                      Your Generated Plan will be visible here
                    </h2>
                  </div>
                )}
                {loading && <p className="text-center mt-4 ">Loading...</p>}
                {error && (
                  <p className="text-red-500 text-center mt-4">{error}</p>
                )}
                {generatedAnswer && (
                  <div className="bg-gray-50 rounded-md p-4 shadow-md mt-4 text-sm">
                    <p className="text-gray-800">{generatedAnswer}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
      <GoogleMapsCard events={props} eventId={eventId} />
     
    </>
  );
};

export default EventPlannerAi;
