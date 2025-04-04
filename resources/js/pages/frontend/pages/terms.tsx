import React from "react"
import { Head } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import FrontendLayout from "@/layouts/FrontendLayout"

interface Props {
  title: string
  description: string
}

const Terms: React.FC<Props> = ({ title, description }) => {
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
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using 84Gate Marketplace, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service. If you do not
                agree with any part of these terms, you must not use our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Account Creation</p>
                <p className="text-muted-foreground">
                  To use certain features of our marketplace, you must create an account. 
                  You agree to provide accurate and complete information during registration 
                  and to keep your account information updated.
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Account Security</p>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the security of your account credentials 
                  and for all activities that occur under your account. Notify us immediately 
                  of any unauthorized use.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketplace Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">Product Listings</p>
                  <p className="text-muted-foreground">Products must be accurately described and comply with all applicable laws</p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Prohibited Items</p>
                  <p className="text-muted-foreground">Certain items are prohibited from being listed on our marketplace</p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Transaction Rules</p>
                  <p className="text-muted-foreground">All transactions must be completed through our platform</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Conduct</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Treat other users with respect and professionalism</li>
                <li>Do not engage in fraudulent activities</li>
                <li>Do not attempt to circumvent our platform fees</li>
                <li>Report any violations of these terms</li>
                <li>Follow all marketplace guidelines and policies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All content on 84Gate Marketplace, including but not limited to text, graphics, 
                logos, and software, is our property or the property of our licensors and is 
                protected by copyright and other intellectual property laws.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </FrontendLayout>
  )
}

export default Terms
