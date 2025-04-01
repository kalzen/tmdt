@extends('layout.app')

@section('title', $post->title)
@section('meta_description', $post->description)

@section('content')
<!-- Breadcrumb area start here -->
<section class="breadcrumb-area" data-background="assets/images/banner/banner-inner.jpg">
            <div class="container">
                <div class="breadcrumb__wrp">
                    <div class="breadcrumb__item">
                        <h1 class="title">Chi tiết tin tức</h1>
                        <ul>
                            <li><a href="{{ route('home') }}">Home</a></li>
                            <li><i class="fa-light fa-angle-right"></i></li>
                            <li>Chi tiết tin tức</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb area end here -->

        <!--Chi tiết tin tức Start-->
        <section class="blog-details pt-120 pb-120">
            <div class="container-lg">
                <div class="funfact__wrp">
                    <div class="row">
                        <div class="col-xl-8 col-lg-7">
                            <div class="blog-details__left">
                                <div class="blog-details__img">
                                    @if($post->hasMedia('featured_image'))
                                        <img src="{{ $post->getFirstMediaUrl('featured_image', 'medium') }}" alt="{{ $post->title }}">
                                    @else
                                        <img src="assets/images/resource/news-details.jpg" alt="{{ $post->title }}">
                                    @endif
                                    <div class="blog-details__date">
                                        <span class="day">{{ $post->published_at ? $post->published_at->format('d') : $post->created_at->format('d') }}</span>
                                        <span class="month">{{ $post->published_at ? $post->published_at->format('M') : $post->created_at->format('M') }}</span>
                                    </div>
                                </div>
                                <div class="blog-details__content">
                                    <ul class="list-unstyled blog-details__meta">
                                        <li>
                                            <a href="#"><i class="fas fa-user-circle"></i> {{ $post->user ? $post->user->name : 'Admin' }}</a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="fas fa-eye"></i> {{ $post->views }} lượt xem</a>
                                        </li>
                                    </ul>
                                    <h3 class="blog-details__title">{{ $post->title }}</h3>
                                    <div class="blog-details__text-2">
                                        {!! $post->content !!}
                                    </div>
                                </div>
                                <div class="blog-details__bottom">
                                    <p class="blog-details__tags"> 
                                        <span>Tags</span> 
                                        @forelse($post->categories as $category)
                                            <a href="#">{{ $category->name }}</a> 
                                        @empty
                                            <a href="#">Business</a> 
                                            <a href="#">Agency</a>
                                        @endforelse
                                    </p>
                                    <div class="blog-details__social-list"> 
                                        <a href="https://twitter.com/intent/tweet?url={{ urlencode(route('post.show', $post->slug)) }}&text={{ urlencode($post->title) }}" target="_blank"><i class="fab fa-twitter"></i></a> 
                                        <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(route('post.show', $post->slug)) }}" target="_blank"><i class="fab fa-facebook"></i></a> 
                                        <a href="https://pinterest.com/pin/create/button/?url={{ urlencode(route('post.show', $post->slug)) }}&media={{ urlencode($post->getFeaturedImageUrlAttribute()) }}&description={{ urlencode($post->title) }}" target="_blank"><i class="fab fa-pinterest-p"></i></a> 
                                        <a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a> 
                                    </div>
                                </div>
                                
                                <!-- Keep existing nav-links, comment sections as they are -->
                                <div class="nav-links">
                                    <div class="prev">
                                        <a href="news-details.html" rel="prev">Bring to the table win-win survival strategies</a>
                                    </div>
                                    <div class="next">
                                        <a href="news-details.html" rel="next">How to lead a healthy &amp; well-balanced life</a>
                                    </div>
                                </div>
                                <div class="comment-one">
                                    <h3 class="comment-one__title">2 Comments</h3>
                                    <div class="comment-one__single">
                                        <div class="comment-one__image"> <img src="assets/images/resource/testi-2.jpg" alt=""> </div>
                                        <div class="comment-one__content">
                                            <h3>Kevin Martin</h3>
                                            <p>Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellus nulla, sollicitudin at euismod. </p>
                                            <a href="news-details.html" class="theme-btn btn-one comment-one__btn">Reply</a>
                                        </div>
                                    </div>
                                    <div class="comment-one__single">
                                        <div class="comment-one__image"> <img src="assets/images/resource/testi-1.jpg" alt=""> </div>
                                        <div class="comment-one__content">
                                            <h3>Sarah Albert</h3>
                                            <p>Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellus nulla, sollicitudin at euismod.</p>
                                            <a href="news-details.html" class="theme-btn btn-one comment-one__btn">Reply</a>
                                        </div>
                                    </div>
                                    <div class="comment-form">
                                        <h3 class="comment-form__title mb-30">Leave a Comment</h3>
                                        <form id="contact_form" name="contact_form" class=""
                                            action="https://html.kodesolution.com/2024/stratify-html/includes/sendmail.php" method="post">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="mb-3">
                                                        <input name="form_name" class="form-control" type="text" placeholder="Enter Name">
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="mb-3">
                                                        <input name="form_email" class="form-control required email" type="email" placeholder="Enter Email">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <textarea name="form_message" class="form-control required" rows="5" placeholder="Enter Message"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <input name="form_botcheck" class="form-control" type="hidden" value="" />
                                                <button type="submit" class="btn-one" data-loading-text="Please wait...">Submit Comment</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-5">
                            <div class="sidebar">
                                <div class="sidebar__single sidebar__search">
                                    <form action="#" class="sidebar__search-form">
                                        <input type="search" placeholder="Search here">
                                        <button type="submit"><i class="far fa-search"></i></button>
                                    </form>
                                </div>
                                <div class="sidebar__single sidebar__post">
                                    <h3 class="sidebar__title">Latest Posts</h3>
                                    <ul class="sidebar__post-list list-unstyled">
                                        @forelse($relatedPosts as $relatedPost)
                                        <li>
                                            <div class="sidebar__post-image"> 
                                                @if($relatedPost->hasMedia('featured_image'))
                                                    <img src="{{ $relatedPost->getFirstMediaUrl('featured_image', 'thumb') }}" alt="{{ $relatedPost->title }}"> 
                                                @else
                                                    <img src="assets/images/blog/blog-image1.jpg" alt="{{ $relatedPost->title }}"> 
                                                @endif
                                            </div>
                                            <div class="sidebar__post-content">
                                                <h3> 
                                                    <span class="sidebar__post-content-meta">
                                                        <i class="fas fa-user-circle"></i>{{ $relatedPost->user ? $relatedPost->user->name : 'Admin' }}
                                                    </span> 
                                                    <a href="{{ route('post.show', $relatedPost->slug) }}">{{ $relatedPost->title }}</a> 
                                                </h3>
                                            </div>
                                        </li>
                                        @empty
                                        <!-- Show existing sample content if no related posts -->
                                        <li>
                                            <div class="sidebar__post-image"> <img src="assets/images/blog/blog-image1.jpg" alt=""> </div>
                                            <div class="sidebar__post-content">
                                                <h3> <span class="sidebar__post-content-meta"><i class="fas fa-user-circle"></i>Admin</span> <a href="news-details.html">Top crypto exchange influencers</a> </h3>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar__post-image"> <img src="assets/images/blog/blog-image2.jpg" alt=""> </div>
                                            <div class="sidebar__post-content">
                                                <h3> <span class="sidebar__post-content-meta"><i class="fas fa-user-circle"></i>Admin</span> <a href="news-details.html">Necessity may give us best virtual court</a> </h3>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar__post-image"> <img  src="assets/images/blog/blog-image3.jpg" alt=""> </div>
                                            <div class="sidebar__post-content">
                                                <h3> <span class="sidebar__post-content-meta"><i class="fas fa-user-circle"></i>Admin</span> <a href="news-details.html">You should know about business plan</a> </h3>
                                            </div>
                                        </li>
                                        @endforelse
                                    </ul>
                                </div>
                                
                                <!-- Categories section using actual post categories -->
                                <div class="sidebar__single sidebar__category">
                                    <h3 class="sidebar__title">Categories</h3>
                                    <ul class="sidebar__category-list list-unstyled">
                                        @if(isset($post->categories) && $post->categories->count() > 0)
                                            @foreach($post->categories as $category)
                                                <li><a href="#">{{ $category->name }}<span class="icon-right-arrow"></span></a></li>
                                            @endforeach
                                        @else
                                            <!-- Keep existing sample categories -->
                                            <li><a href="news-details.html">Blueprint Design<span class="icon-right-arrow"></span></a></li>
                                            <li class="active"><a href="news-details.html">Transforming Design<span class="icon-right-arrow"></span></a></li>
                                            <li><a href="news-details.html">Landscape Design<span class="icon-right-arrow"></span></a></li>
                                            <li><a href="news-details.html">Urban Design<span class="icon-right-arrow"></span></a></li>
                                            <li><a href="news-details.html">industrial design<span class="icon-right-arrow"></span></a></li>
                                        @endif
                                    </ul>
                                </div>
                                
                                <!-- Keep remaining sidebar sections as they are -->
                                <div class="sidebar__single sidebar__tags">
                                    <h3 class="sidebar__title">Tags</h3>
                                    <div class="sidebar__tags-list"> <a href="#">All Project</a> <a
                                            href="#">Consultancy</a> <a href="#">Experience</a> <a href="#">Interior</a>
                                        <a href="#">Design</a>
                                    </div>
                                </div>
                                <div class="sidebar__single sidebar__comments">
                                    <h3 class="sidebar__title">Recent Comments</h3>
                                    <ul class="sidebar__comments-list list-unstyled">
                                        <li>
                                            <div class="sidebar__comments-icon"> <i class="fas fa-comments"></i> </div>
                                            <div class="sidebar__comments-text-box">
                                                <p>A wordpress commenter on <br />launch new mobile app</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar__comments-icon"> <i class="fas fa-comments"></i> </div>
                                            <div class="sidebar__comments-text-box">
                                                <p> <span>John Doe</span> on template:</p>
                                                <h5>comments</h5>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar__comments-icon"> <i class="fas fa-comments"></i> </div>
                                            <div class="sidebar__comments-text-box">
                                                <p>A wordpress commenter on <br /> launch new mobile app</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="sidebar__comments-icon"> <i class="fas fa-comments"></i> </div>
                                            <div class="sidebar__comments-text-box">
                                                <p> <span>John Doe</span> on template:</p>
                                                <h5>comments</h5>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--Chi tiết tin tức End-->
@endsection
