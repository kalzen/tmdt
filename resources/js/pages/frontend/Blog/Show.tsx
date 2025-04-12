import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  slug: string;
  published_at: string;
  views: number;
  categories: Array<{
    id: number;
    title: string;
    slug: string;
  }>;
  user: {
    name: string;
    email: string;
  };
  featured_image_url: string;
}

interface Props {
  post: Post;
  relatedPosts: Post[];
  popularPosts: Post[];
}

export default function BlogShow({ post, relatedPosts, popularPosts }: Props) {
  return (
    <FrontendLayout>
      <Head title={post.title} />

      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={post.featured_image_url}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 text-white text-center">
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
                    <Link href={route('frontend.blog.index')} className="text-gray-200 hover:text-white">
                      Blog
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2.5">/</span>
                    <span className="text-white line-clamp-1">{post.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 text-gray-200">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{post.user.name}</span>
              </div>
              <span>•</span>
              <time dateTime={post.published_at}>
                {format(new Date(post.published_at), 'MMMM d, yyyy')}
              </time>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5"
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
                <span>{post.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>

            {/* Article Content */}
            <Card className="mb-12">
              <CardContent className="p-6 prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </CardContent>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Card key={related.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <a href={`/blog/${related.slug}`}>
                        <img
                          src={related.featured_image_url}
                          alt={related.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <CardContent className="p-4">
                          <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary">
                            {related.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {related.description}
                          </p>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Popular Posts</h2>
                <div className="space-y-6">
                  {popularPosts.map((popular) => (
                    <a
                      key={popular.id}
                      href={`/blog/${popular.slug}`}
                      className="flex gap-4 group"
                    >
                      <img
                        src={popular.featured_image_url}
                        alt={popular.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold line-clamp-2 group-hover:text-primary">
                          {popular.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                          <time dateTime={popular.published_at}>
                            {format(new Date(popular.published_at), 'MMM d, yyyy')}
                          </time>
                          <span>•</span>
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
                            <span>{popular.views}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </FrontendLayout>
  );
}
