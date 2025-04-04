import React from "react"
import { Head } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import FrontendLayout from "@/layouts/FrontendLayout"

interface Props {
  title: string
  description: string
}

const Shipping: React.FC<Props> = ({ title, description }) => {
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
              <CardTitle>Shipping Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Standard Shipping (3-7 business days)</p>
                <p className="text-muted-foreground">
                  Default shipping method for most orders. Tracking information provided.
                  Free shipping on orders over $50.
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Express Shipping (1-2 business days)</p>
                <p className="text-muted-foreground">
                  Available for urgent deliveries. Additional fees apply.
                  Order before 2 PM for same-day processing.
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">International Shipping (7-21 business days)</p>
                <p className="text-muted-foreground">
                  Available to select countries. Customs fees and duties may apply.
                  Tracking provided for most destinations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">Order Processing</p>
                  <p className="text-muted-foreground">
                    Orders are processed within 24-48 hours of payment confirmation.
                    You'll receive a confirmation email with tracking information.
                  </p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Delivery Times</p>
                  <p className="text-muted-foreground">
                    Delivery times start from when your order ships, not from the order date.
                    Weekends and holidays may affect delivery times.
                  </p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Address Accuracy</p>
                  <p className="text-muted-foreground">
                    Please ensure your shipping address is correct. Additional charges may
                    apply for redirected packages due to incorrect addresses.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tracking Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Track your order through your account dashboard</li>
                <li>Tracking information sent via email when order ships</li>
                <li>Contact customer service if tracking shows no updates for 48 hours</li>
                <li>Sign up for SMS updates for real-time delivery status</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Situations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Missing Packages</p>
                <p className="text-muted-foreground">
                  Contact us within 48 hours if your package shows as delivered but hasn't arrived.
                  We'll work with the carrier to locate your package.
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Damaged Packages</p>
                <p className="text-muted-foreground">
                  Take photos of any damaged packages before opening. Contact customer service
                  immediately to report damage and receive further instructions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FrontendLayout>
  )
}

export default Shipping
