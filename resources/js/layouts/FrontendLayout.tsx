import React from "react"
import { MainNav } from "@/components/ui/main-nav"

interface Props {
  children: React.ReactNode
}

export default function FrontendLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <MainNav />
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <div className="space-y-2">
                <a href="/about" className="block text-sm text-muted-foreground hover:text-primary">About</a>
                <a href="/careers" className="block text-sm text-muted-foreground hover:text-primary">Careers</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="/lien-he" className="block text-sm text-muted-foreground hover:text-primary">Contact Us</a>
                <a href="/faq" className="block text-sm text-muted-foreground hover:text-primary">FAQs</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="/privacy" className="block text-sm text-muted-foreground hover:text-primary">Privacy Policy</a>
                <a href="/terms" className="block text-sm text-muted-foreground hover:text-primary">Terms of Service</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Orders</h3>
              <div className="space-y-2">
                <a href="/shipping" className="block text-sm text-muted-foreground hover:text-primary">Shipping Info</a>
                <a href="/returns" className="block text-sm text-muted-foreground hover:text-primary">Returns</a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} TMDT Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
