"use client"

import React from "react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"

export function AuthHeader() {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-muted-foreground hover:text-primary"
      >
        <Link href="/login" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Link>
      </Button>
      <Button
        variant="default"
        size="sm"
        asChild
      >
        <Link href="/register" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Sign Up</span>
        </Link>
      </Button>
    </div>
  )
}
