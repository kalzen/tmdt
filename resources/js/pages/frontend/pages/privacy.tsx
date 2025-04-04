import React from "react"
import { Head } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import FrontendLayout from "@/layouts/FrontendLayout"

interface Props {
  title: string
  description: string
}

const Privacy: React.FC<Props> = ({ title, description }) => {
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
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Personal Information</p>
                <p className="text-muted-foreground">
                  When you create an account or make a purchase, we collect information such as your name, 
                  email address, shipping address, and payment details.
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Usage Data</p>
                <p className="text-muted-foreground">
                  We collect information about how you use our platform, including browsing history, 
                  search queries, and interaction with products.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Process your orders and provide customer support</li>
                <li>Improve our platform and user experience</li>
                <li>Send you important updates about our services</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your 
                personal information. This includes encryption, secure servers, and regular security audits. 
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee 
                absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">Access</p>
                  <p className="text-muted-foreground">You can request access to your personal data</p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Correction</p>
                  <p className="text-muted-foreground">You can request corrections to your personal data</p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Deletion</p>
                  <p className="text-muted-foreground">You can request deletion of your personal data</p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Data Portability</p>
                  <p className="text-muted-foreground">You can request a copy of your data in a structured format</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </FrontendLayout>
  )
}

export default Privacy
