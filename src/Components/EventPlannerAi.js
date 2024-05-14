import React, { useState } from "react";

const EventPlannerAi = () => {
  const [budget, setBudget] = useState("");
  const [timeToStay, setTimeToStay] = useState("");

  const [generatedAnswer, setGeneratedAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any actions you want with the inputs
    console.log("Budget:", budget);
    console.log("Time to Stay:", timeToStay);
    // Here you can generate the AI answer based on the inputs
    const aiAnswer = generateAIAnswer(budget, timeToStay);
    setGeneratedAnswer(aiAnswer);
  };

  // Function to generate AI answer
  const generateAIAnswer = (budget, timeToStay) => {
    // You can implement your AI logic here
    // For now, let's just return a dummy answer
    return `AI Generated Answer: You have a budget of ${budget} and plan to stay for ${timeToStay}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 border rounded-xl">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Event Planner AI
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="budget" className="sr-only">
                Your Budget:
              </label>
              <input
                id="budget"
                name="budget"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="timeToStay" className="sr-only">
                Time to Stay:
              </label>
              <input
                id="timeToStay"
                name="timeToStay"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Time to Stay"
                value={timeToStay}
                onChange={(e) => setTimeToStay(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/check */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 13.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L9 10.586l6.293-6.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Submit
            </button>
          </div>
        </form>
        {generatedAnswer && (
          <div className="bg-white rounded-md p-4 shadow-md">
            <p className="text-gray-800">{generatedAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPlannerAi;
