"use client"

import React from "react"
import { Link } from "@inertiajs/react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { AuthHeader } from "@/components/ui/auth-header"
import { Layers } from "lucide-react"
import { cn } from "@/lib/utils"

const mainNav = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "All Categories",
    href: "/category/all",
    icon: Layers,
  },
  {
    title: "Products",
    href: "/products"
  },
  {
    title: "About",
    href: "/about"
  },
  {
    title: "Contact",
    href: "/lien-he"
  }
]

interface ListItemProps {
  className?: string
  title: string
  href: string
  children?: React.ReactNode
  icon?: React.ElementType
}

const NavLink = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, href, children, icon: Icon, ...props }, ref) => {
    return (
      <Link
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        {children && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        )}
      </Link>
    )
  }
)
NavLink.displayName = "NavLink"

export function MainNav() {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNav.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      href={item.href}
                      title={item.title}
                      icon={item.icon}
                    />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <AuthHeader />
        </div>
      </div>
    </div>
  )
}
