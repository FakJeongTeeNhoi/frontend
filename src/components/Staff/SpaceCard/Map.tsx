import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapProps {
  latitude: number;
  longitude: number;
  width: number;
  height: number;
}

const center = {
  lat: 0,
  lng: 0,
};

const Map: React.FC<MapProps> = ({ latitude, longitude, width, height }) => {
  const [mapCenter, setMapCenter] = useState(center);
  const mapContainerStyle = {
    width: `${width}%`,
    height: `${height}px`,
  };

  useEffect(() => {
    setMapCenter({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={20}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
