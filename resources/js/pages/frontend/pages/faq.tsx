import React from "react"
import { Head } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FrontendLayout from "@/layouts/FrontendLayout"

interface Props {
  title: string
  description: string
}

const Faq: React.FC<Props> = ({ title, description }) => {
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
              <CardTitle>General Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-84Gate">
                  <AccordionTrigger>What is 84Gate Marketplace?</AccordionTrigger>
                  <AccordionContent>
                    84Gate Marketplace is a platform that connects buyers with trusted sellers. 
                    We provide a secure environment for online shopping with a wide range of 
                    products and quality assurance measures.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-to-buy">
                  <AccordionTrigger>How do I make a purchase?</AccordionTrigger>
                  <AccordionContent>
                    Simply browse our categories or use the search function to find products. 
                    Click on a product to view details, add it to your cart, and proceed to 
                    checkout. You can pay using various secure payment methods.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping-time">
                  <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                  <AccordionContent>
                    Shipping times vary depending on your location and the seller's location. 
                    Typically, domestic orders arrive within 3-7 business days. International 
                    shipping may take 7-21 business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="create-account">
                  <AccordionTrigger>How do I create an account?</AccordionTrigger>
                  <AccordionContent>
                    Click the "Sign Up" button in the top right corner. Fill out the 
                    registration form with your details. Verify your email address, and 
                    your account will be ready to use.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="forgot-password">
                  <AccordionTrigger>What if I forget my password?</AccordionTrigger>
                  <AccordionContent>
                    Click the "Forgot Password" link on the login page. Enter your email 
                    address, and we'll send you instructions to reset your password. For 
                    security, the reset link expires after 24 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account-security">
                  <AccordionTrigger>How secure is my account?</AccordionTrigger>
                  <AccordionContent>
                    We use industry-standard encryption and security measures to protect 
                    your data. Enable two-factor authentication for additional security. 
                    Never share your password or account details with others.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders & Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="track-order">
                  <AccordionTrigger>How do I track my order?</AccordionTrigger>
                  <AccordionContent>
                    Log into your account and go to "My Orders." Click on the specific 
                    order to view its tracking information. You'll also receive tracking 
                    updates via email.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="return-policy">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    Most items can be returned within 30 days of delivery. The item must 
                    be unused and in its original packaging. Some products may have different 
                    return policies - check the product page for specific details.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="refund-time">
                  <AccordionTrigger>How long do refunds take?</AccordionTrigger>
                  <AccordionContent>
                    Once we receive and inspect the returned item, refunds are typically 
                    processed within 3-5 business days. The time it takes for the refund 
                    to appear in your account depends on your payment method and bank.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </FrontendLayout>
  )
}

export default Faq
