import React, { useState } from "react";
import BannerImage from "../Assets/home-banner-background.png";

const Event = ({ props }) => {
  const [expandedMap, setExpandedMap] = useState({});

  const toggleExpanded = (eventId) => {
    setExpandedMap((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const collapseAll = () => {
    setExpandedMap({});
  };

  console.log(props);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6`}>
      {props.map((event) => (
        <div
          key={event.id}
          className="max-w-sm border border-gray-200 rounded-lg  shadow relative transition duration-300 ease-in-out transform hover:scale-105"
        >
          <a href="#">
            <img
              className="rounded-t-lg"
              src={require(`../data${event.image}`)}
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {event.name}
              </h5>
            </a>
            <p className="mb-6 font-normal text-gray-700">
              {expandedMap[event.id]
                ? event.description
                : event.description.length > 100
                ? event.description.substring(0, 100) + "..."
                : event.description}

              <div className="flex flex-wrap justify-between items-center">
                <span className="text-gray-800">
                  Start Date: {event.timeline.start}
                </span>
                <span className="text-gray-800">
                  End Date: {event.timeline.end}
                </span>
              </div>
            </p>

            <div className="absolute bottom-1 ">
              {!expandedMap[event.id] ? (
                <a
                  href="#"
                  onClick={() => toggleExpanded(event.id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              ) : (
                <a
                  href="#"
                  onClick={() => toggleExpanded(event.id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Read less
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Event;
