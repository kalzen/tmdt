import React from "react"
import { Head } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import FrontendLayout from "@/layouts/FrontendLayout"

interface Props {
  title: string
  description: string
}

const About: React.FC<Props> = ({ title, description }) => {
  return (
    <FrontendLayout>
      <Head title={title} />
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <div className="mt-16 grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                84Gate Marketplace was founded with a vision to create a seamless online shopping experience 
                that connects quality sellers with discerning buyers. Our platform serves as a bridge 
                between traditional retail and the digital future of commerce.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We strive to provide a reliable, secure, and user-friendly marketplace where:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Sellers can showcase their products to a wider audience</li>
                <li>Buyers can find quality products at competitive prices</li>
                <li>Transactions are safe and transparent</li>
                <li>Customer satisfaction is our top priority</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">Trust</p>
                  <p className="text-muted-foreground">Building and maintaining trust with our users is paramount</p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Quality</p>
                  <p className="text-muted-foreground">We maintain high standards for all products and services</p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Innovation</p>
                  <p className="text-muted-foreground">Constantly improving our platform and user experience</p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Community</p>
                  <p className="text-muted-foreground">Supporting both buyers and sellers in our marketplace</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </FrontendLayout>
  )
}

export default About
