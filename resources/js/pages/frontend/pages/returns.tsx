import React from "react"
import { Head } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import FrontendLayout from "@/layouts/FrontendLayout"

interface Props {
  title: string
  description: string
}

const Returns: React.FC<Props> = ({ title, description }) => {
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
              <CardTitle>Return Policy Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">30-Day Return Window</p>
                <p className="text-muted-foreground">
                  Most items can be returned within 30 days of delivery. The item must be 
                  unused, in its original packaging, and in the same condition you received it.
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Exceptions</p>
                <p className="text-muted-foreground">
                  Some items cannot be returned due to hygiene reasons or special handling 
                  requirements. Check the product page for specific return eligibility.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Return Process</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">1. Initiate Return</p>
                  <p className="text-muted-foreground">
                    Log into your account, go to your orders, and select "Return Item." 
                    Follow the prompts to complete the return request form.
                  </p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">2. Return Approval</p>
                  <p className="text-muted-foreground">
                    We'll review your return request within 24-48 hours. Once approved, 
                    you'll receive a return shipping label via email.
                  </p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">3. Package & Ship</p>
                  <p className="text-muted-foreground">
                    Pack the item securely in its original packaging. Attach the provided 
                    shipping label and drop off at the specified carrier location.
                  </p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">4. Refund Processing</p>
                  <p className="text-muted-foreground">
                    Once we receive and inspect the return, we'll process your refund within 
                    3-5 business days. You'll receive an email confirmation.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Refund Methods</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Original payment method (default)</li>
                  <li>Store credit (optional, +10% bonus value)</li>
                  <li>Bank transfer (for special cases)</li>
                </ul>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Processing Times</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Credit/Debit Cards: 3-5 business days</li>
                  <li>Store Credit: Immediate upon approval</li>
                  <li>Bank Transfers: 5-7 business days</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Situations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">Damaged Items</p>
                  <p className="text-muted-foreground">
                    If you receive a damaged item, contact us within 48 hours of delivery. 
                    Include photos of the damage with your return request.
                  </p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Wrong Items</p>
                  <p className="text-muted-foreground">
                    If you receive the wrong item, we'll send you a return label at no cost 
                    and expedite the correct item to you.
                  </p>
                </li>
                <Separator className="my-2" />
                <li>
                  <p className="font-semibold">Sale Items</p>
                  <p className="text-muted-foreground">
                    Sale items can be returned within 14 days of delivery. Final sale items 
                    cannot be returned unless defective.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </FrontendLayout>
  )
}

export default Returns
