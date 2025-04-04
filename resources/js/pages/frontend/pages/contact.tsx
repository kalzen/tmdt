import React from "react"
import { Head } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/ui/contact-form"
import { GoogleMapComponent } from "@/components/ui/google-map"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import FrontendLayout from "@/layouts/FrontendLayout"

interface ContactInfo {
  address: string
  phone: string
  email: string
  hours: string
  map: {
    lat: number
    lng: number
    zoom: number
  }
  googleMapsApiKey: string
}

interface Props {
  title: string
  description: string
  contactInfo: ContactInfo
}

export default function Contact({ title, description, contactInfo }: Props) {
  const infoItems = [
    {
      icon: MapPin,
      title: "Address",
      content: contactInfo.address,
    },
    {
      icon: Phone,
      title: "Phone",
      content: contactInfo.phone,
    },
    {
      icon: Mail,
      title: "Email",
      content: contactInfo.email,
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: contactInfo.hours,
    },
  ]

  return (
    <FrontendLayout>
      <Head title={title} />
      
      {/* Banner Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-6xl mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {infoItems.map((item) => (
                    <div key={item.title} className="flex items-start">
                      <div className="p-2 bg-primary/10 rounded-lg mr-4">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Google Map */}
            <GoogleMapComponent
              apiKey={contactInfo.googleMapsApiKey}
              center={{
                lat: contactInfo.map.lat,
                lng: contactInfo.map.lng,
              }}
              zoom={contactInfo.map.zoom}
            />
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </FrontendLayout>
  )
}
