import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Post {
  id: number;
  title: string;
  description: string;
  slug: string;
  published_at: string;
  views: number;
  categories: Array<{
    id: number;
    title: string;
    slug: string;
  }>;
  featured_image_url: string;
  user: {
    name: string;
    email: string;
  };
}

interface Category {
  id: number;
  title: string;
  posts_count: number;
}

interface Props {
  posts: {
    data: Post[];
    links: { url: string | null; label: string }[];
  };
  categories: Category[];
  latestPosts: Post[];
}

export default function BlogIndex({ posts, categories, latestPosts }: Props) {
  return (
    <FrontendLayout>
      <Head title="Blog" />

      {/* Hero Banner */}
      <div className="relative h-[400px] w-full flex items-center">
        <img
          src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Blog Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto px-4 relative text-white text-center">
          <nav className="mb-4 flex justify-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href={route('home')} className="text-gray-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2.5">/</span>
                  <span className="text-white">Blog</span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Discover the latest news, insights, and stories about our community and marketplace.
          </p>
        </div>
      </div>

      {/* Latest Posts */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <a href={`/blog/${post.slug}`}>
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <Badge key={category.id} variant="outline">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time dateTime={post.published_at}>
                        {format(new Date(post.published_at), 'MMM d, yyyy')}
                      </time>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* All Posts */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with categories */}
          <aside className="md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="flex items-center justify-between group hover:bg-gray-100 p-2 rounded-lg transition-colors"
                    >
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {category.title}
                      </span>
                      <Badge variant="secondary">{category.posts_count}</Badge>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main content - Blog posts grid */}
          <main className="md:w-3/4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.data.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href={`/blog/${post.slug}`}>
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.map((category) => (
                          <Badge key={category.id} variant="outline">
                            {category.title}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary">
                        {post.title}
                      </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <time dateTime={post.published_at}>
                        {format(new Date(post.published_at), 'MMM d, yyyy')}
                      </time>
                      <span>•</span>
                      <span>{post.user.name}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex justify-start">
                        <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                          View Full Article
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </CardContent>
                  </a>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {posts.links && posts.links.length > 3 && (
              <div className="flex justify-center gap-2 mt-8">
                {posts.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url || '#'}
                    className={`px-4 py-2 rounded ${
                      !link.url
                        ? 'text-gray-400 cursor-not-allowed'
                        : link.label.includes('Previous') || link.label.includes('Next')
                        ? 'text-primary hover:bg-primary/10'
                        : 'hover:bg-primary/10'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </FrontendLayout>
  );
}
