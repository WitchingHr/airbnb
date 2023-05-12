'use client';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// leaflet css
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; // delete iconUrl from Default
// set icons for leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

// props
interface MapProps {
  center?: [number, number]; // center of map
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={center as L.LatLngExpression || [26.93, -80.09]} // default to florida
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className='h-[35vh] rounded-lg'
    >
      {/* map tiles */}
      <TileLayer
        attribution='
          &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* map marker */}
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  )
};

export default Map;
