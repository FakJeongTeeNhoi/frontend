// components/Map.tsx
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const [mapCenter, setMapCenter] = useState(center);

  useEffect(() => {
    setMapCenter({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={10}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
