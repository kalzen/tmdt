import React from "react"
import { Head, Link } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FrontendLayout from "@/layouts/FrontendLayout"

interface Category {
  id: number
  name: string
  slug: string
  description: string
  image: string
  children: {
    id: number
    name: string
    slug: string
  }[]
}

interface Props {
  title: string
  description: string
  categories: Category[]
} 

export default function Categories({ title, description, categories }: Props) {
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
                
                <CardHeader>
                  <Link href={`/category/${category.slug}`} className="hover:underline">
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                  </Link>
                  {category.description && (
                    <p className="text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </CardHeader>
                
                {category.children.length > 0 && (
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {category.children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/category/${child.slug}`}
                          className="inline-flex items-center px-3 py-1 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </FrontendLayout>
  )
}
