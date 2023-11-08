import React, { memo, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import { HiLocationMarker } from "react-icons/hi";
import { apiGetMapGoogle } from "../services";

const Marker = ({ icon }) => <div>{icon}</div>;

const Map = ({ address }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    address
      ? apiGetMapGoogle(address)
          .then((response) => {
            const results = response.data.results;
            if (results.length > 0) {
              const { lat, lng } = results[0].geometry.location;
              setLocation({ lat, lng });
            }
          })
          .catch((error) => {
            console.error("Lỗi khi gọi Geocoding API:", error);
          })
      : navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) =>
            setLocation({ lat: latitude, lng: longitude })
        );
  }, [address]);

  return (
    <div className="h-[400px] w-full relative">
      {address && (
        <div className="absolute top-[8px] left-[8px] z-50 max-w-[200px] bg-white shadow-md p-4 text-xs">
          {address}
        </div>
      )}
      {location && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
          defaultCenter={location}
          defaultZoom={15}
          center={location}
        >
          {/* Hiển thị marker tại vị trí đã chọn */}
          <Marker
            lat={location?.lat}
            lng={location?.lng}
            icon={<HiLocationMarker color="red" size="24" />}
          />
        </GoogleMapReact>
      )}
    </div>
  );
};

export default memo(Map);
