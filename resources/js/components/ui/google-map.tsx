"use client"

import React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { Card } from "@/components/ui/card"

interface MapProps {
  apiKey: string
  center: {
    lat: number
    lng: number
  }
  zoom: number
}

const containerStyle = {
  width: "100%",
  height: "400px"
}

export function GoogleMapComponent({ apiKey, center, zoom }: MapProps) {
  return (
    <Card className="overflow-hidden">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </Card>
  )
}
