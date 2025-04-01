<!-- Blog area start here -->
        <section class="blog-area pt-130 pb-130">
            <div class="container">
                <div class="section-header text-center mb-50">
                    <h2 class="wow splt-txt" data-splitting>Tin tức mới nhất</h2>
                </div>
                <div class="row g-5">
                    @forelse($latestPosts as $index => $post)
                    <div class="col-lg-4 wow fadeInLeft" data-wow-delay="{{ $index * 200 }}ms" data-wow-duration="1500ms">
                        <div class="blog__item">
                            <div class="blog__image">
                                @if($post->hasMedia('thumbnail'))
                                <img src="{{ $post->getFirstMediaUrl('thumbnail') }}" alt="{{ $post->title }}">
                                <img src="{{ $post->getFirstMediaUrl('thumbnail') }}" alt="{{ $post->title }}">
                                @else
                                <img src="assets/images/blog/blog-image1.jpg" alt="{{ $post->title }}">
                                <img src="assets/images/blog/blog-image1.jpg" alt="{{ $post->title }}">
                                @endif
                            </div>
                            <div class="blog__content">
                                <ul>
                                    @if($post->category)
                                    <li>{{ $post->category->name }}</li>
                                    @endif
                                    <li class="date">{{ $post->created_at->format('M d, Y') }}</li>
                                </ul>
                                <h4><a href="{{ route('post.show', $post->slug) }}">{{ $post->title }}</a></h4>
                            </div>
                        </div>
                    </div>
                    @empty
                    <div class="col-12 text-center">
                        <p>Không có bài viết nào.</p>
                    </div>
                    @endforelse
                </div>
            </div>
        </section>
        <!-- Blog area end here -->