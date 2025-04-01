<!-- Preloader area start -->
<div id="preloader">
    <div class="animation-preloader">
        <div class="spinner"></div>
        <div class="txt-loading">
            @php
                $siteName = $getConfig('site_name', 'KALZEN');
                $siteNameChars = str_split(strtoupper($siteName));
            @endphp
            
            @foreach($siteNameChars as $char)
                <span data-text-preloader="{{ $char }}" class="letters-loading">
                    {{ $char }}
                </span>
            @endforeach
        </div>
        <p class="text-center">{{ $getConfig('loading_text', 'Đang tải...') }}</p>
    </div>
    <div class="loader">
        <div class="row">
            <div class="col-3 loader-section section-left">
                <div class="bg"></div>
            </div>
            <div class="col-3 loader-section section-left">
                <div class="bg"></div>
            </div>
            <div class="col-3 loader-section section-right">
                <div class="bg"></div>
            </div>
            <div class="col-3 loader-section section-right">
                <div class="bg"></div>
            </div>
        </div>
    </div>
</div>
<!-- Preloader area end -->

<!-- Top header area start here -->
<div class="header-top-area d-none d-lg-block">
    <div class="container">
        <div class="header-top__wrp">
            <ul class="header-top__links">
                <li><i class="fa-light fa-location-dot"></i> <a href="#0">{{ $getConfig('contact_address', '123 Đường Nguyễn Du, Quận 1, TP.HCM') }}</a></li>
                <li><i class="fa-light fa-envelope-open-text"></i> <a href="mailto:{{ $getConfig('contact_email', 'contact@example.com') }}">{{ $getConfig('contact_email', 'contact@example.com') }}</a></li>
            </ul>    
            <div class="header-top__socials">
                @if($getConfig('social_twitter'))
                    <a href="{{ $getConfig('social_twitter') }}">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4023 1.40625H13.4707L8.95313 6.56836L14.2676 13.5938H10.1074L6.84668 9.33398L3.12012 13.5938H1.04883L5.87988 8.07129L0.785156 1.40625H5.05078L7.99512 5.2998L11.4023 1.40625ZM10.6758 12.3574H11.8213L4.42676 2.57812H3.19629L10.6758 12.3574Z" fill="white" />
                        </svg>
                    </a>
                @endif
                @if($getConfig('social_facebook'))
                    <a href="{{ $getConfig('social_facebook') }}">
                        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1349_8256)">
                                <path d="M5.66164 15V8.1583H7.9572L8.3016 5.49117H5.66164V3.7886C5.66164 3.01665 5.87513 2.49057 6.98336 2.49057L8.39452 2.48999V0.104422C8.15048 0.072709 7.31278 0 6.33778 0C4.30183 0 2.90798 1.24272 2.90798 3.52445V5.49117H0.605469V8.1583H2.90798V15H5.66164Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1349_8256">
                                    <rect width="9" height="15" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                @endif
                <a href="#">
                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4991 13.4999V9.10492C12.4991 6.94492 12.0341 5.29492 9.51414 5.29492C8.29914 5.29492 7.48914 5.95492 7.15914 6.58492H7.12914V5.48992H4.74414V13.4999H7.23414V9.52492C7.23414 8.47492 7.42914 7.46992 8.71914 7.46992C9.99414 7.46992 10.0091 8.65492 10.0091 9.58492V13.4849H12.4991V13.4999Z" fill="white" />
                        <path d="M0.695312 5.49023H3.18531V13.5002H0.695312V5.49023Z" fill="white" />
                        <path d="M1.94 1.5C1.145 1.5 0.5 2.145 0.5 2.94C0.5 3.735 1.145 4.395 1.94 4.395C2.735 4.395 3.38 3.735 3.38 2.94C3.38 2.145 2.735 1.5 1.94 1.5Z" fill="white" />
                    </svg>
                </a>
                <a class="pe-0" href="#">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1349_8259)">
                            <path d="M11.2497 0H3.74991C1.68764 0 0 1.68764 0 3.74991V11.2501C0 13.3118 1.68764 15 3.74991 15H11.2497C13.312 15 14.9996 13.3118 14.9996 11.2501V3.74991C14.9996 1.68764 13.312 0 11.2497 0ZM13.7496 11.2501C13.7496 12.6282 12.6286 13.75 11.2497 13.75H3.74991C2.37163 13.75 1.25003 12.6282 1.25003 11.2501V3.74991C1.25003 2.37145 2.37163 1.25003 3.74991 1.25003H11.2497C12.6286 1.25003 13.7496 2.37145 13.7496 3.74991V11.2501Z" fill="white" />
                            <path d="M11.5625 4.37495C12.0802 4.37495 12.5 3.95523 12.5 3.43748C12.5 2.91972 12.0802 2.5 11.5625 2.5C11.0447 2.5 10.625 2.91972 10.625 3.43748C10.625 3.95523 11.0447 4.37495 11.5625 4.37495Z" fill="white" />
                            <path d="M7.49991 3.75C5.42845 3.75 3.75 5.42863 3.75 7.49991C3.75 9.57041 5.42845 11.2502 7.49991 11.2502C9.57078 11.2502 11.2498 9.57041 11.2498 7.49991C11.2498 5.42863 9.57078 3.75 7.49991 3.75ZM7.49991 10.0002C6.11936 10.0002 5.00003 8.88082 5.00003 7.49991C5.00003 6.119 6.11936 5.00003 7.49991 5.00003C8.88045 5.00003 9.99979 6.119 9.99979 7.49991C9.99979 8.88082 8.88045 10.0002 7.49991 10.0002Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1349_8259">
                                <rect width="15" height="15" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
<!-- Top header area end here -->

<!-- Header area start here -->
<header class="header-area header-blur">
    <div class="container">
        <div class="header__main">
            <a href="{{ route('home') }}" class="logo logo-main">
                <img src="{{ $getConfig('site_logo_logo', 'assets/images/logo/logo.png') }}" alt="{{ $getConfig('site_name', 'Kalzen') }}">
            </a>
            <a href="{{ route('home') }}" class="logo logo-light">
                <img src="{{ $getConfig('site_logo_light_logo', 'assets/images/logo/logo-light.png') }}" alt="{{ $getConfig('site_name', 'Kalzen') }}">
            </a>
            <div class="main-menu main-menu-light">
                <nav>
                    <ul>
                        <li>
                            <a href="{{ route('home') }}">{{ $getConfig('menu_home', 'Trang chủ') }}</a>
                        </li>
                        <li>
                            <a href="{{ $getConfig('menu_about_link', '#0') }}">{{ $getConfig('menu_about', 'Giới thiệu') }}</a>
                        </li>
                        <li>
                            <a href="{{ $getConfig('menu_services_link', '#0') }}">{{ $getConfig('menu_services', 'Dịch vụ') }}</a>
                        </li>
                        <li>
                            <a href="{{ $getConfig('menu_blog_link', '#0') }}">{{ $getConfig('menu_blog', 'Tin tức') }}</a>
                        </li>
                        <li>
                            <a href="{{route('contact.index')}}">Liên hệ</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="header__actions">
                <div class="header__action-btn">
                    <button class="search-btn" id="search_btn">
                        <i class="fa-light fa-magnifying-glass"></i>
                    </button>
                    <button class="theme-btn" id="theme_btn">
                        <i class="fa-light fa-moon"></i>
                    </button>
                    <a href="{{ $getConfig('appointment_url', 'contact.html') }}" class="btn">
                        <span class="btn__text">{{ $getConfig('appointment_text', 'Đặt lịch hẹn') }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
<!-- Header area end here -->

<!-- Sidebar area start here -->
<div class="sidebar-area offcanvas offcanvas-end" id="menubar">
    <div class="offcanvas-header">
        <a href="index.html" class="logo"> <img src="assets/images/logo/logo-light.png" alt="logo"></a>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"><i class="fa-regular fa-xmark"></i></button>
    </div>
    <div class="offcanvas-body sidebar__body">
        <div class="mobile-menu overflow-hidden"></div>
        <div class="d-none d-lg-block">
            <h5 class="text-white mb-20">Về chúng tôi</h5>
            <p class="sidebar__text">Chúng tôi là đội ngũ tư vấn tâm lý chuyên nghiệp, cung cấp dịch vụ tư vấn tâm lý chất lượng cao cho khách hàng.</p>
        </div>
        <div class="sidebar__contact-info mt-30">
            <h5 class="text-white mb-20">Thông tin liên hệ</h5>
            <ul>
                <li><i class="fa-solid fa-location-dot"></i> <a href="#0">123 Nguyễn Văn Cừ, P. 12, Q. Bình Thạnh, TP. HCM</a></li>
                <li class="py-2"><i class="fa-solid fa-phone-volume"></i> <a href="tel:+84123456789">0909090909</a></li>
                <li><i class="fa-solid fa-paper-plane"></i> <a href="mailto:info@kalzen.vn">info@kalzen.vn</a></li>
            </ul>
        </div>
        <div class="sidebar__btns my-4">
            <a href="#">Đăng ký</a>
            <a class="sign-in" href="#">Đăng nhập</a>
        </div>
        <div class="sidebar__socials">
            <ul>
                <li>
                    <a href="#0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.76562 0H8.20406C9.50719 0.0371875 10.8041 0.385625 11.9359 1.03531C13.3297 1.82094 14.4756 3.03625 15.1816 4.47188C15.6875 5.49438 15.9603 6.62656 16 7.76562V8.205C15.9647 9.38344 15.6775 10.5553 15.1419 11.6069C14.6209 12.6316 13.8803 13.5447 12.9794 14.2594C12.0306 15.0175 10.9072 15.5569 9.71937 15.8141C9.22219 15.9275 8.71313 15.9788 8.20438 16H7.795C6.40844 15.9609 5.03281 15.5628 3.84875 14.8387C2.44469 13.985 1.3125 12.6919 0.659063 11.1838C0.252187 10.255 0.0365625 9.2475 0 8.23531V7.79406C0.0359375 6.53 0.366875 5.27437 0.976875 4.16594C1.73094 2.78781 2.8975 1.64031 4.28937 0.911563C5.35844 0.34625 6.55844 0.041875 7.76562 0ZM3.40094 3.29594C4.59812 5.03813 5.79531 6.78 6.99188 8.52219C5.79563 9.91344 4.59812 11.3038 3.40219 12.6953C3.6325 12.6966 3.86313 12.695 4.09344 12.6962C4.13844 12.6884 4.20125 12.7166 4.23281 12.6722C5.27312 11.4641 6.3125 10.2553 7.35219 9.04656C8.18937 10.2625 9.02344 11.4809 9.86156 12.6962C10.7741 12.695 11.6866 12.6962 12.5988 12.6956C11.3594 10.8869 10.1119 9.08313 8.87594 7.27219C10.0203 5.94969 11.1578 4.62156 12.2987 3.29625C12.0281 3.29563 11.7578 3.29563 11.4872 3.29625C10.4987 4.44875 9.50437 5.59656 8.51844 6.75094C7.72031 5.60344 6.93437 4.44688 6.14062 3.29625C5.2275 3.29563 4.31437 3.29594 3.40094 3.29594Z"
                                fill="white" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#0">
                        <svg width="8" height="16" viewBox="0 0 8 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.10223 8.99555V16H1.97333V8.99555H0V6.09778H1.97333V3.89334C1.97333 1.38667 3.46666 0 5.76 0C6.85333 0 8 0.195557 8 0.195557V2.65778H6.73778C5.49334 2.65778 5.10223 3.43111 5.10223 4.22222V6.09778H7.88444L7.44 8.99555H5.10223Z"
                                fill="white" />
                        </svg>
                    </a>
                </li>

                <li>
                    <a href="#0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.58958 15.9911H0.222698V5.89045H3.58958V15.9911ZM3.92717 1.96389C3.92717 0.897859 3.08323 0.0361424 2.01719 0.000607979C0.933392 -0.0260429 0.0272588 0.826778 0.00060798 1.91058C-0.0260429 2.99438 0.826779 3.90051 1.91058 3.92716C3.01215 3.93605 3.9094 3.06546 3.92717 1.96389ZM15.9467 9.88807C15.9467 6.74327 13.9124 5.78383 12.1801 5.78383C10.963 5.7483 9.81701 6.34351 9.15074 7.35624V5.89932H5.89933V16H9.26622V10.7587C9.26622 10.7054 9.26622 10.6521 9.26622 10.5988C9.26622 10.5988 9.26622 10.5988 9.26622 10.5899C9.19515 9.51495 10.0124 8.58218 11.0874 8.51111C11.9668 8.51111 12.6331 9.07966 12.6331 10.6787V16H16L15.9556 9.89695L15.9467 9.88807Z"
                                fill="white" />
                        </svg>
                    </a>
                </li>

                <li>
                    <a href="#0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.9466 4.69593C15.8843 3.41522 15.5906 2.27682 14.6563 1.34297C13.7219 0.409114 12.5829 0.11562 11.3014 0.053363C9.97553 -0.0177877 6.01557 -0.0177877 4.69855 0.053363C3.41713 0.11562 2.28699 0.409114 1.34372 1.34297C0.400455 2.27682 0.115684 3.41522 0.0533926 4.69593C-0.0177975 6.02111 -0.0177975 9.97887 0.0533926 11.3041C0.115684 12.5848 0.409354 13.7232 1.34372 14.657C2.28699 15.5909 3.41713 15.8844 4.69855 15.9466C6.02447 16.0178 9.98443 16.0178 11.3014 15.9466C12.5829 15.8844 13.7219 15.5909 14.6563 14.657C15.5906 13.7232 15.8843 12.5848 15.9466 11.3041C16.0178 9.97887 16.0178 6.02112 15.9466 4.70483V4.69593ZM7.99111 12.2201C5.65963 12.2201 3.76419 10.3257 3.76419 7.99555C3.76419 5.66536 5.65963 3.77098 7.99111 3.77098C10.3226 3.77098 12.218 5.66536 12.218 7.99555C12.218 10.3257 10.3226 12.2201 7.99111 12.2201ZM12.9032 3.99332C12.4138 3.99332 12.0133 3.5931 12.0133 3.10394C12.0133 2.61478 12.4049 2.21456 12.9032 2.21456C13.3926 2.21456 13.7931 2.61478 13.7931 3.10394C13.7931 3.5931 13.3926 3.99332 12.9032 3.99332ZM10.8832 7.99555C10.8832 9.58754 9.58399 10.886 7.99111 10.886C6.39823 10.886 5.09901 9.58754 5.09901 7.99555C5.09901 6.40355 6.39823 5.10505 7.99111 5.10505C9.58399 5.10505 10.8832 6.40355 10.8832 7.99555Z"
                                fill="white" />
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
<!-- Sidebar area end here -->

<!-- Fullscreen search area start here -->
<div class="search-wrap">
    <div class="search-inner">
        <i class="fa-light fa-xmark search-close" id="search-close"></i>
        <div class="search-cell">
            <form method="get">
                <div class="search-field-holder">
                    <input type="search" class="main-search-input" placeholder="Tìm kiếm...">
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Fullscreen search area end here -->
