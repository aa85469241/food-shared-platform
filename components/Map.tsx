
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import { useEffect } from "react"

function MapInitialize() {
    const map = useMap();

    useEffect(() => {
        map.invalidateSize();
    })

    return null;
}

type MapProps = {
    position?: number[]
    content?: string
}

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
})

const Map = ({ position, content }: MapProps) => {

    return (
        <MapContainer
            center={position as L.LatLngExpression || [23.973875, 120.982025]}
            zoom={8}
            scrollWheelZoom={false}
            dragging={false}
            className="h-56 md:h-64"
        >
            <MapInitialize />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && <Marker position={position as L.LatLngExpression}>
                <Popup className="pointer-events-auto">
                    <p className="text-sm font-bold">{content}</p>
                </Popup>
            </Marker>}
        </MapContainer>
    )
}

export default Map;