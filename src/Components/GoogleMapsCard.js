import React, { useState, useCallback, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Skeleton } from "@mui/material";

const GoogleMapsCard = ({ events, eventId }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [eventLocation, setEventLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const geocodeAddress = useCallback(async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setEventLocation(location);
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          data.status
        );
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  }, []);

  useEffect(() => {
    if (events[eventId - 1] && events[eventId - 1].address) {
      geocodeAddress(events[eventId - 1].address);
    }
  }, [events, eventId, geocodeAddress]);

  const gotLocation = useCallback((position) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }, []);

  const errorLocation = useCallback((error) => {
    console.log("Error getting location:", error);
  }, []);

  const handleGetLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(gotLocation, errorLocation, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [gotLocation, errorLocation]);

  useEffect(() => {
    if (userLocation && eventLocation) {
      // Calculate distance between two points using Haversine formula
      const R = 6371; // Radius of the Earth in kilometers
      const lat1 = userLocation.lat;
      const lon1 = userLocation.lng;
      const lat2 = eventLocation.lat;
      const lon2 = eventLocation.lng;

      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      // Set distance state
      setDistance(distance);

      // Calculate bounds to fit both markers
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
      bounds.extend(new window.google.maps.LatLng(eventLocation.lat, eventLocation.lng));

      // Set zoom level
      const mapWidth = 150; // Adjust as needed for map size
      const mapHeight = 200; // Adjust as needed for map size
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const zoomLevel = getZoomLevel(ne.lat(), sw.lat(), ne.lng(), sw.lng(), mapWidth, mapHeight);
      setZoom(zoomLevel);
    }
  }, [userLocation, eventLocation]);

  const getZoomLevel = (lat1, lat2, lng1, lng2, mapWidth, mapHeight) => {
    const GLOBE_WIDTH = 256; // a constant in Google's map projection
    const angle = lng2 - lng1;
    const zoomX = Math.floor(Math.log2((GLOBE_WIDTH * 360) / angle / mapWidth));
    const zoomY = Math.floor(Math.log2((GLOBE_WIDTH * 180) / (lat1 - lat2) / mapHeight));
    return Math.min(zoomX, zoomY);
  };

  if (!isLoaded || !eventLocation) {
    return (
      <div className="py-2 px">
        <div className="w-full relative p-2 sm:my-6 sm:px-16">
          <Skeleton variant="rectangular" width="100%" height={600} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 px">
      <div className="w-full relative p-2 sm:my-6 sm:px-16">
        <h1 className="text-xl">LOCATION</h1>
        <div className="flex justify-between">
          <button
            className="secondary-button h-10 mx-auto sm:mx-0 my-4 bg-slate-300 text-gray-900 hover:bg-gray-500"
            onClick={handleGetLocation}
          >
            Get your Location
          </button>
          <div>
            {distance && (
              <p className="h-10 mx-auto sm:mx-0 my-4  text-gray-900 hover:bg-gray-500">
                Distance between you and the event: {distance.toFixed(2)} km
              </p>
            )}
          </div>
        </div>

        <div id="map">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: 600,
            }}
            center={eventLocation}
            zoom={zoom}
            options={{
              zoomControl: false,
              fullscreenControl: false,
            }}
          >
            {userLocation && (
              <Marker
                position={userLocation}
                onClick={() => setInfoWindowOpen(true)}
              >
                {infoWindowOpen && (
                  <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                    <div>Your Location</div>
                  </InfoWindow>
                )}
              </Marker>
            )}
            {eventLocation && (
              <Marker
                position={eventLocation}
                onMouseOver={() => setInfoWindowOpen(true)}
              >
                {infoWindowOpen && (
                  <InfoWindow onMouseOver={() => setInfoWindowOpen(false)}>
                    <div>Event Location</div>
                  </InfoWindow>
                )}
              </Marker>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsCard;
