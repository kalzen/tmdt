<!-- Banner area start here -->
<section class="banner-area">
    <div class="banner__wrp">
        <div class="banner__image">
            <div class="swiper banner__slider">
                <div class="swiper-wrapper">
                    @if(isset($homeSlider) && $homeSlider->activeItems->count() > 0)
                        @foreach($homeSlider->activeItems as $sliderItem)
                        <div class="swiper-slide">
                            <div class="parallax-bg">
                                <img src="{{ $sliderItem->getImageUrlAttribute() }}" alt="{{ $sliderItem->title }}" data-swiper-parallax="300">
                            </div>
                        </div>
                        @endforeach
                    @else
                        <!-- Default slides if no slider items are found -->
                        <div class="swiper-slide">
                            <div class="parallax-bg">
                                <img src="assets/images/banner/banner-image1.jpg" alt="image" data-swiper-parallax="300">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="parallax-bg">
                                <img src="assets/images/banner/banner-image2.jpg" alt="image" data-swiper-parallax="300">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="parallax-bg">
                                <img src="assets/images/banner/banner-image3.jpg" alt="image" data-swiper-parallax="300">
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
        <div class="banner__content">
            <h1 class="title">{{ $getConfig('banner_title', 'Giải pháp tư vấn tâm lý toàn diện') }}</h1>
            <p class="text">{{ $getConfig('banner_text', 'Chúng tôi cung cấp dịch vụ tư vấn tâm lý chuyên nghiệp, giúp bạn và doanh nghiệp phát triển bền vững, cân bằng và thành công.') }}</p>
            <div data-animation="fadeInDown" data-duration="2s" data-delay="2s">
                <a href="#feature" class="arry-btn animation__arryUpDown"><i class="fa-light fa-arrow-right-long"></i></a>
            </div>
        </div>
        
        <div class="banner__dot">
        @if(isset($homeSlider) && $homeSlider->activeItems->count() > 0)
            @foreach($homeSlider->activeItems as $sliderItem)
            <span class="dot-content">
                <span>{{ $loop->iteration }}</span>
                <span>{{ $sliderItem->title }}</span>
            </span>
            @endforeach
            @else
            <span class="dot-content">
                <span>01</span>
                <span>{{ $getConfig('dot_content_1', 'Tư vấn cá nhân') }}</span>
            </span>
            <span class="dot-content">
                <span>02</span>
                <span>{{ $getConfig('dot_content_2', 'Tư vấn doanh nghiệp') }}</span>
            </span>
            <span class="dot-content">
                <span>03</span>
                <span>{{ $getConfig('dot_content_3', 'Đào tạo kỹ năng') }}</span>
            </span>
        @endif
        </div>
    </div>
</section>
<!-- Banner area end here -->