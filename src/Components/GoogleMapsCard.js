import React from "react";
const GoogleMapsCard = ({ events, eventId }) => {
  return (
    <div className="py-2 px">
      <div className="w-full relative p-2 sm:my-6 sm:px-16 ">
        <address>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.892724568416!2d-121.72257832543255!3d37.67522841789019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fddfe2f11fa65%3A0x724a2c9343478c2e!2s2407%20Research%20Dr%2C%20Livermore%2C%20CA%2094550%2C%20USA!5e0!3m2!1sen!2sin!4v1715807464552!5m2!1sen!2sin"
            width="100%"
            height="600px"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </address>
      </div>
    </div>
  );
};

export default GoogleMapsCard;
