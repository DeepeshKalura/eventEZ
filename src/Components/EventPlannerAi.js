import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EventPlannerAi = ({ props }) => {
  const [budget, setBudget] = useState("");
  const [timeToStay, setTimeToStay] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState("");
  const { eventId } = useParams();
  console.log(eventId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGeneratedAnswer("");

    useEffect(() => {
      const fetchData = async () => {
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
      fetchData();
    }, [budget, timeToStay]);
  };

  return (
    <>
      <div className="relative mx-auto my-[-1.5rem] border border-black max-w-4xl ">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{
            backgroundImage: `url(${require(`../data${
              props[eventId - 1].image
            }`)})`,
          }}
        ></div>
        <div className="flex justify-center relative z-10 bg-white mx-16 mt-3 mb-6 rounded-xl">
          <div className="w-1/2 bg-white my-4 ml-4 rounded-l-xl">
            <div className=""></div>
            {/* Your content here */}
          </div>
          <div className="w-1/2 h-16 sm:h-56 md:h-64 flex justify-center relative m-1">
            <img
              src={require(`../data${props[eventId - 1].image}`)}
              alt="Event Image"
              className="object-contain max-w-full max-h-full rounded-xl"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-96">
          <div className="w-full h-5"></div>
          <h1>how are you all</h1>
        </div>
        {generatedAnswer && (
          <div className="bg-white rounded-md p-4 shadow-md">
            <p className="text-gray-800">{generatedAnswer}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EventPlannerAi;
