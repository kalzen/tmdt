<!-- Footer area start here -->
<footer class="footer-area">
    <div class="footer__shape-left">
        <img src="{{ asset('assets/images/shape/footer-shape-left.png') }}" alt="shape">
    </div>
    <div class="container">
        <div class="footer__wrp pt-130 pb-130">
            <div class="footer__left">
                <a href="{{ route('home') }}" class="logo">
                    <img src="{{ $getConfig('site_logo_light_logo', asset('assets/images/logo/logo-light.png')) }}" alt="{{ $getConfig('site_name', 'Kalzen') }}">
                </a>
                <p class="mt-30">{{ $getConfig('footer_description', 'Chúng tôi là tổ chức chuyên nghiệp cung cấp dịch vụ tư vấn chuyên môn.') }}</p>
            </div>
            <div class="footer__right">
                <div class="footer__item-wrp">
                    <div class="footer__item">
                        <h4 class="title">{{ $getConfig('footer_services_title', 'Dịch vụ') }}</h4>
                        <ul>
                            <li><a href="#0">{{ $getConfig('footer_service_1', 'Thiết kế UI') }}</a></li>
                            <li><a href="#0">{{ $getConfig('footer_service_2', 'Thiết kế web') }}</a></li>
                            <li><a href="#0">{{ $getConfig('footer_service_3', 'Xây dựng thương hiệu') }}</a></li>
                            <li><a href="#0">{{ $getConfig('footer_service_4', 'Phát triển website') }}</a></li>
                        </ul>
                    </div>
                    <div class="footer__item">
                        <h4 class="title">{{ $getConfig('site_name', 'Kalzen') }}</h4>
                        <ul>
                            <li><a href="{{ route('home') }}">{{ $getConfig('menu_home', 'Trang chủ') }}</a></li>
                            <li><a href="{{ $getConfig('menu_about_link', '#0') }}">{{ $getConfig('menu_about', 'Về chúng tôi') }}</a></li>
                            <li><a href="{{ $getConfig('menu_services_link', '#0') }}">{{ $getConfig('menu_services', 'Dịch vụ') }}</a></li>
                            <li><a href="{{ $getConfig('careers_page_link', '#0') }}">{{ $getConfig('careers_page_title', 'Tuyển dụng') }}</a></li>
                            <li><a href="{{ route('contact.index') }}">{{ $getConfig('menu_contact', 'Liên hệ') }}</a></li>
                        </ul>
                    </div>
                    <div class="footer__item-last">
                        <h4 class="title">{{ $getConfig('newsletter_title', 'Đăng ký nhận thông tin') }}</h4>
                        <p>{{ $getConfig('newsletter_text', 'Hãy liên hệ với chúng tôi để nhận tư vấn miễn phí') }}</p>
                        <div class="mailUs mt-30">
                            <span><i class="fa-light fa-envelope"></i></span>
                            <input type="email" placeholder="{{ $getConfig('newsletter_placeholder', 'Enter your email') }}">
                            <button><i class="fa-sharp fa-solid fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>

                <div class="footer__item-wrp mt-80">
                    <div class="footer__item">
                        <h4 class="title">{{ $getConfig('office_1_title', 'Hải Phòng') }}</h4>
                        <ul>
                            <li><a href="#0">{{ $getConfig('office_1_address', '123 Lạch Tray, Ngô Quyền, Hải Phòng') }}</a></li>
                            <li><a href="#0">{{ $getConfig('office_1_phone', '0901 363 392') }}
                                    <span class="__cf_email__">{{ $getConfig('office_1_email', 'contact@example.com') }}</span></a></li>
                        </ul>
                    </div>
                    
                    <div class="footer__item">
                        <h4 class="title">{{ $getConfig('office_2_title', 'Hà Nội') }}</h4>
                        <ul>
                            <li><a href="#0">{{ $getConfig('office_2_address', '123 Kim ngưu, Hà Nội') }}</a></li>
                            <li><a href="#0">{{ $getConfig('office_2_phone', '0936 618 992') }}
                                    <span class="__cf_email__">{{ $getConfig('office_2_email', 'contact@example.com') }}</span></a></li>
                        </ul>
                    </div>
                    
                    <div class="footer__item-last">
                        <h4 class="title">{{ $getConfig('follow_us_title', 'Theo dõi chúng tôi') }}</h4>
                        <div class="socials">
                            @if($getConfig('social_facebook'))
                                <a href="{{ $getConfig('social_facebook') }}"><i class="fa-brands fa-facebook-f"></i></a>
                            @endif
                            @if($getConfig('social_twitter'))
                                <a href="{{ $getConfig('social_twitter') }}"><i class="fa fa-x"></i></a>
                            @endif
                            @if($getConfig('social_instagram'))
                                <a href="{{ $getConfig('social_instagram') }}"><i class="fa-brands fa-instagram"></i></a>
                            @endif
                            @if($getConfig('social_linkedin'))
                                <a href="{{ $getConfig('social_linkedin') }}"><i class="fa-brands fa-linkedin-in"></i></a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer__copyright">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between gap-1 gap-sm-4">
                <p>&copy; {{ date('Y') }} <a href="{{ route('home') }}">{{ $getConfig('site_name', 'Kalzen') }}</a> {{ $getConfig('copyright_text', 'Agency') }}</p>
                <a href="{{ $getConfig('policy_link', '#0') }}" class="policy">{{ $getConfig('policy_text', 'Chính sách hoạt động') }}</a>
            </div>
        </div>
    </div>
    <div class="footer__rectangle">
        <div class="item wow"></div>
        <div class="item-dark wow"></div>
    </div>
</footer>
<!-- Footer area end here -->

<!-- Back to top area start here -->
<div class="scroll-up">
    <svg class="scroll-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
</div>
<!-- Back to top area end here -->

<!-- Jquery 3.7.0 Min Js -->
<script data-cfasync="false" src="{{ asset('cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js') }}"></script>
<script src="{{ asset('assets/js/jquery-3.7.1.min.js') }}"></script>
<!-- Bootstrap min Js -->
<script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
<!-- Mean menu Js -->
<script src="{{ asset('assets/js/meanmenu.js') }}"></script>
<!-- Swiper bundle min Js -->
<script src="{{ asset('assets/js/swiper-bundle.min.js') }}"></script>
<!-- Counterup min Js -->
<script src="{{ asset('assets/js/jquery.counterup.min.js') }}"></script>
<!-- Wow min Js -->
<script src="{{ asset('assets/js/wow.min.js') }}"></script>
<!-- Magnific popup min Js -->
<script src="{{ asset('assets/js/magnific-popup.min.js') }}"></script>
<!-- Nice select min Js -->
<script src="{{ asset('assets/js/nice-select.min.js') }}"></script>
<!-- Isotope pkgd min Js -->
<script src="{{ asset('assets/js/isotope.pkgd.min.js') }}"></script>
<!-- Parallax Js -->
<script src="{{ asset('assets/js/parallax.js') }}"></script>
<!-- Splitting Js -->
<script src="{{ asset('assets/js/splitting.js') }}"></script>
<!-- Waypoints Js -->
<script src="{{ asset('assets/js/jquery.waypoints.js') }}"></script>
<!-- Gsap -->
<script src="{{ asset('assets/js/gsap/gsap.min.js') }}"></script>
<script src="{{ asset('assets/js/gsap/ScrollTrigger.min.js') }}"></script>
<script src="{{ asset('assets/js/gsap/ScrollSmoother.min.js') }}"></script>
<!-- Script Js -->
<script src="{{ asset('assets/js/script.js') }}"></script>