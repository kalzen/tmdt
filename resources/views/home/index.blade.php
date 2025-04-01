@extends('layout.app')

@section('content')
    @include('home.slider')
     <!-- Feature area start here -->
     <section id="feature" class="feature-area pb-130">
            <div class="feature__wrp">
                <div class="row g-0">
                    <div class="col-sm-6 col-lg-3">
                        <div class="feature__item">
                            <div class="bg-line">
                                <img src="assets/images/shape/feature-item-shape.png" alt="shape">
                            </div>
                            <div class="feature__icon">
                                <svg width="91" height="74" viewBox="0 0 91 74" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_131_10129)">
                                        <path
                                            d="M45.6823 74.0001C45.368 74.0001 45.0621 73.867 44.8388 73.6259L0.314609 25.0714C-0.0327193 24.6889 -0.0988771 24.1151 0.157484 23.6661L11.6772 3.04354C11.8839 2.67766 12.2644 2.44482 12.6778 2.44482H18.7313C19.368 2.44482 19.889 2.97702 19.889 3.63395C19.889 4.29087 19.368 4.82307 18.7313 4.82307H13.3477L2.58878 24.0819L45.6823 71.073L88.3954 24.1151L76.4126 4.83138H45.5004C44.8636 4.83138 44.3426 4.29919 44.3426 3.64226C44.3426 2.98533 44.8636 2.45314 45.5004 2.45314H77.0411C77.438 2.45314 77.8019 2.66103 78.0169 3.00197L90.8184 23.6245C91.0996 24.0819 91.05 24.6806 90.6861 25.0714L46.5258 73.6259C46.3025 73.867 45.9965 74.0001 45.6823 74.0001Z"
                                            fill="#121C27" />
                                        <path
                                            d="M65.0673 52.6874C64.7696 52.6874 64.4719 52.571 64.2486 52.3381L18.2773 4.47387C17.8307 4.0082 17.8307 3.25149 18.2855 2.79413C18.7404 2.33678 19.4681 2.33678 19.9229 2.80245L65.886 50.6667C66.3326 51.1324 66.3326 51.8891 65.8778 52.3464C65.6545 52.571 65.365 52.6874 65.0673 52.6874Z"
                                            fill="#121C27" />
                                        <path
                                            d="M37.0564 9.50465C34.5093 9.50465 32.4336 7.37587 32.4336 4.75647C32.4336 2.13708 34.5093 0.00830078 37.0564 0.00830078C39.6034 0.00830078 41.6791 2.13708 41.6791 4.75647C41.6874 7.37587 39.6117 9.50465 37.0564 9.50465ZM37.0564 2.37823C35.7828 2.37823 34.7408 3.44262 34.7408 4.75647C34.7408 6.07033 35.7746 7.13472 37.0564 7.13472C38.3299 7.13472 39.3719 6.07033 39.3719 4.75647C39.3719 3.44262 38.3382 2.37823 37.0564 2.37823Z"
                                            fill="#121C27" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_131_10129">
                                            <rect width="91" height="74" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="feature__content">
                                <h4><a class="hover-link" href="page-service-details.html">Tư vấn tâm lý cá nhân</a></h4>
                                <p>Chúng tôi cung cấp dịch vụ tư vấn tâm lý cá nhân chuyên sâu, giúp bạn giải quyết các vấn đề tâm lý và phát triển bản thân.</p>
                            </div>
                            <a href="page-service-details.html" class="arrow-btn"><i class="fa-light fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                        <div class="feature__item">
                            <div class="bg-line">
                                <img src="assets/images/shape/feature-item-shape.png" alt="shape">
                            </div>
                            <div class="feature__icon">
                                <svg width="91" height="74" viewBox="0 0 91 74" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_131_10154)">
                                        <path
                                            d="M35.9189 74C35.6425 74 35.3735 73.887 35.1793 73.6837L0.306297 37.7645C0.11206 37.5611 0 37.2824 0 37.0038C0 36.7176 0.11206 36.4464 0.306297 36.2431L35.1793 0.316336C35.5902 -0.105445 36.2476 -0.105445 36.6585 0.316336L71.5315 36.2431C71.9424 36.6648 71.9424 37.3427 71.5315 37.7645L36.6585 73.6912C36.4568 73.887 36.1953 74 35.9189 74ZM2.52508 37.0038L35.9189 71.4091L69.3127 37.0038L35.9189 2.59847L2.52508 37.0038Z"
                                            fill="#121C27" />
                                        <path
                                            d="M62.9324 65.911C62.6634 65.911 62.3945 65.8056 62.1928 65.5947L53.1234 56.2553C52.7125 55.8335 52.7125 55.1556 53.1234 54.7338C53.5343 54.312 54.1917 54.312 54.6026 54.7338L62.9324 63.3126L88.4745 36.9964L62.9324 10.6878L36.6506 37.7647C36.2397 38.1865 35.5823 38.1865 35.1714 37.7647C34.7606 37.3429 34.7606 36.665 35.1714 36.2432L62.1928 8.40569C62.6037 7.98391 63.2611 7.98391 63.672 8.40569L90.6933 36.2432C91.1042 36.665 91.1042 37.3429 90.6933 37.7647L63.672 65.5947C63.4703 65.8056 63.2013 65.911 62.9324 65.911Z"
                                            fill="#121C27" />
                                        <path
                                            d="M29.2034 48.2185C26.9025 48.2185 25.0273 46.2904 25.0273 43.9179C25.0273 41.5453 26.9025 39.6172 29.2034 39.6172C31.5044 39.6172 33.3795 41.5453 33.3795 43.9179C33.3795 46.2904 31.5119 48.2185 29.2034 48.2185ZM29.2034 41.7638C28.053 41.7638 27.1117 42.7278 27.1117 43.9179C27.1117 45.1079 28.0455 46.0719 29.2034 46.0719C30.3614 46.0719 31.2952 45.1079 31.2952 43.9179C31.2952 42.7278 30.3539 41.7638 29.2034 41.7638Z"
                                            fill="#121C27" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_131_10154">
                                            <rect width="91" height="74" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="feature__content">
                                <h4><a class="hover-link" href="page-service-details.html">Tư vấn tâm lý doanh nghiệp</a></h4>
                                <p>Giải pháp tư vấn tâm lý toàn diện cho doanh nghiệp, giúp xây dựng môi trường làm việc tích cực và hiệu quả.</p>
                            </div>
                            <a href="page-service-details.html" class="arrow-btn"><i class="fa-light fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                        <div class="feature__item">
                            <div class="bg-line">
                                <img src="assets/images/shape/feature-item-shape.png" alt="shape">
                            </div>
                            <div class="feature__icon">
                                <svg width="72" height="74" viewBox="0 0 72 74" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_131_10179)">
                                        <path
                                            d="M36.038 74.0001C35.827 74.0001 35.6222 73.9127 35.4733 73.7629L0.236625 37.5431C-0.0736666 37.2248 -0.0736666 36.7067 0.236625 36.3884L35.405 0.237275C35.7153 -0.0810448 36.218 -0.0810448 36.5283 0.237275L71.7712 36.4571C72.0815 36.7754 72.0815 37.2934 71.7712 37.6118L36.6028 73.7567C36.4476 73.9127 36.249 74.0001 36.038 74.0001ZM1.9184 36.9627L36.0318 72.0278L70.077 37.0375L35.9698 1.97243L1.9184 36.9627Z"
                                            fill="#121C27" />
                                        <path
                                            d="M35.3855 53.0217C35.1807 53.0217 34.9759 52.9406 34.8208 52.7846L22.7132 40.3389C22.4029 40.0206 22.4029 39.5025 22.7132 39.1842L31.6744 29.9716C31.9847 29.6533 32.4874 29.6533 32.7977 29.9716C33.1079 30.29 33.1079 30.808 32.7977 31.1263L24.4012 39.7647L35.3855 51.0494L60.1157 25.6338C60.426 25.3154 60.9287 25.3154 61.239 25.6338C61.5493 25.9521 61.5493 26.4701 61.239 26.7884L35.9502 52.7846C35.7951 52.9406 35.5903 53.0217 35.3855 53.0217Z"
                                            fill="#121C27" />
                                        <path
                                            d="M36.4857 28.9918C35.7906 28.9918 35.0894 28.7171 34.5557 28.1741C33.4945 27.0818 33.4945 25.3092 34.5557 24.217C35.6169 23.1247 37.3483 23.1309 38.4095 24.2232C38.9246 24.7537 39.21 25.4528 39.21 26.2018C39.21 26.9508 38.9308 27.6561 38.4157 28.1804C37.8758 28.7171 37.1807 28.9918 36.4857 28.9918ZM36.4795 25.0284C36.1878 25.0284 35.9023 25.1407 35.6789 25.3654C35.2383 25.8211 35.2383 26.5576 35.6851 27.0132C36.1257 27.4688 36.8456 27.4688 37.2862 27.0132C37.4972 26.7947 37.6151 26.5014 37.6151 26.1893C37.6151 25.8772 37.4972 25.5839 37.28 25.3654C37.0566 25.147 36.7649 25.0284 36.4795 25.0284Z"
                                            fill="#121C27" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_131_10179">
                                            <rect width="72" height="74" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="feature__content">
                                <h4><a class="hover-link" href="page-service-details.html">Đào tạo kỹ năng mềm</a></h4>
                                <p>Chương trình đào tạo kỹ năng mềm chuyên nghiệp, giúp phát triển năng lực cá nhân và đội nhóm.</p>
                            </div>
                            <a href="page-service-details.html" class="arrow-btn"><i class="fa-light fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                        <div class="feature__item">
                            <div class="bg-line">
                                <img src="assets/images/shape/feature-item-shape.png" alt="shape">
                            </div>
                            <div class="feature__icon">
                                <svg width="74" height="74" viewBox="0 0 74 74" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_131_10200)">
                                        <path
                                            d="M1.17264 70.7183C0.529012 70.7183 0 70.2025 0 69.5681V1.1498C0 0.701573 0.264506 0.29563 0.678899 0.101115C1.10211 -0.0849417 1.58704 -0.0172846 1.93971 0.278715L37.0044 29.5489L72.0603 0.278715C72.554 -0.135685 73.2946 -0.0764846 73.7179 0.405573C74.1411 0.88763 74.0794 1.61494 73.5856 2.02934L37.7627 31.9423C37.3218 32.3059 36.6782 32.3059 36.2373 31.9423L2.3541 3.64466V69.5681C2.3541 70.2025 1.82509 70.7183 1.17264 70.7183Z"
                                            fill="#121C27" />
                                        <path
                                            d="M72.8177 70.5411C72.1653 70.5411 71.6451 70.0252 71.6451 69.3909V17.3456L37.7618 45.6348C37.321 45.9984 36.6774 45.9984 36.2365 45.6348L7.92554 21.9971C7.4318 21.5827 7.37008 20.8553 7.79329 20.3733C8.2165 19.8912 8.95712 19.832 9.45086 20.2464L37.0036 43.2499L72.0683 13.9797C72.421 13.6837 72.9059 13.6245 73.3203 13.8105C73.7347 13.9966 73.9992 14.4025 73.9992 14.8592V69.3993C73.9992 70.0252 73.4702 70.5411 72.8177 70.5411Z"
                                            fill="#121C27" />
                                        <path
                                            d="M72.8179 70.5411H36.9949C36.3425 70.5411 35.8223 70.0252 35.8223 69.3909C35.8223 68.7566 36.3513 68.2407 36.9949 68.2407H72.8179C73.4703 68.2407 73.9905 68.7566 73.9905 69.3909C73.9905 70.0252 73.4703 70.5411 72.8179 70.5411Z"
                                            fill="#121C27" />
                                        <path
                                            d="M29.0783 74C26.4861 74 24.3789 71.9365 24.3789 69.3909C24.3789 66.8453 26.4861 64.7817 29.0783 64.7817C31.6705 64.7817 33.7777 66.8453 33.7777 69.3909C33.7777 71.9365 31.6705 74 29.0783 74ZM29.0783 67.0905C27.7822 67.0905 26.7242 68.1223 26.7242 69.3909C26.7242 70.6595 27.7822 71.6912 29.0783 71.6912C30.3744 71.6912 31.4324 70.6595 31.4324 69.3909C31.4324 68.1223 30.3744 67.0905 29.0783 67.0905Z"
                                            fill="#121C27" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_131_10200">
                                            <rect width="74" height="74" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="feature__content">
                                <h4><a class="hover-link" href="page-service-details.html">Tư vấn phát triển tổ chức</a></h4>
                                <p>Giải pháp tư vấn toàn diện giúp tổ chức phát triển bền vững, xây dựng văn hóa doanh nghiệp tích cực.</p>
                            </div>
                            <a href="page-service-details.html" class="arrow-btn"><i class="fa-light fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="feature__text wow fadeInUp mt-50" data-wow-delay="00ms" data-wow-duration="1500ms">
                    <span>Đăng ký tư vấn</span>
                    <p>Chọn từ danh sách các địa điểm tốt nhất. <a href="page-projects.html">Có dự án trong đầu?</a></p>
                </div>
            </div>
        </section>
        <!-- Feature area end here -->

        <!-- Consult area start here -->
        <section class="consult-area">
            <div class="row g-0">
                <div class="col-xl-6 order-2 order-xl-1">
                    <div class="consult-left">
                        <div class="section-header">
                            <h2 class="wow splt-txt" data-splitting>A thriving business with Genuine professional</h2>
                            <p class="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">Practicality might
                                seem like an obvious and fundamental requirement
                                for successful
                                leadership. After all, <span class="fw-600">without the
                                    necessary skills to strategically</span> plan and effectively manage the processes
                                that
                                transform ideas into tangible outcomes,
                                even the most visionary concepts can fail to materialize.</p>
                        </div>

                        <div class="consult__service mt-60">
                            <ul class="wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <li><i class="fa-light fa-plus"></i>Sáng tạo</li>
                                <li><i class="fa-light fa-plus"></i>Phân tích</li>
                                <li><i class="fa-light fa-plus"></i>Trải nghiệm người dùng</li>
                                <li><i class="fa-light fa-plus"></i>Quảng bá</li>
                            </ul>
                            <div class="consult-count wow fadeInRight" data-wow-delay="200ms"
                                data-wow-duration="1500ms">
                                <div class="head">
                                    <h2><span>15</span>+</h2>
                                    <h5>Năm <br /> Kinh nghiệm</h5>
                                </div>
                                <p class="mt-50">Chúng tôi luôn tin tưởng vào tiềm năng phát triển không giới hạn, không ngừng nỗ lực để đạt được những thành tựu mới.</p>
                            </div>
                        </div>

                        <div class="consult__experience mt-60 mb-60">
                            <h4 class="mb-20 wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">Thành công của chúng tôi</h4>
                            <p class="wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">Chúng tôi không ngừng phát triển, học hỏi và nâng cao năng lực. Việc hoàn thành hơn 200 dự án là minh chứng cho sự tiến bộ của chúng tôi.</p>

                            <div class="progress-area mt-30">
                                <div class="progress__title mb-1">
                                    <h6>Dự án hoàn thành</h6>
                                    <span><span class="progress-count">55</span>%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar wow slideInLeft" data-wow-duration=".55s"
                                        role="progressbar" style="width: 55%;" aria-valuenow="55" aria-valuemin="0"
                                        aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                            <div class="progress-area mt-20">
                                <div class="progress__title mb-1">
                                    <h6>Khách hàng hài lòng</h6>
                                    <span><span class="progress-count">93</span>%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar wow slideInLeft" data-wow-duration=".95s"
                                        role="progressbar" style="width: 93%;" aria-valuenow="95" aria-valuemin="0"
                                        aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                            <div class="progress-area mt-20">
                                <div class="progress__title mb-1">
                                    <h6>Tăng trưởng công ty</h6>
                                    <span><span class="progress-count">67</span>%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar wow slideInLeft" data-wow-duration=".60s"
                                        role="progressbar" style="width: 67%;" aria-valuenow="67" aria-valuemin="0"
                                        aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="consult__experience-bar">
                            <h4 class="mb-20 wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">Biểu đồ phát triển</h4>
                            <p class="wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">Chúng tôi luôn trong quá trình phát triển, học hỏi và nâng cao năng lực. Việc hoàn thành 200 dự án là một cột mốc quan trọng.</p>
                        </div>

                    </div>
                </div>
                <div class="col-xl-6 order-1 order-xl-2">
                    <div class="consult__image imageUpToDown wow">
                        <img src="assets/images/consult/consult-image.jpg" alt="image">
                        <div class="icon">
                            <img class="animation__sunMove" src="assets/images/icon/consult-icon.png" alt="icon">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Consult area end here -->

        <!-- Horizontal accordion area start here -->
        <section class="hzAccordion-area pt-130 pb-130">
            <div class="container">
                <div class="section-header mb-60">
                    <h2 class="wow splt-txt text-white" data-splitting>Dịch vụ của chúng tôi</h2>
                </div>
                <div class="hzAccordion__wrp">
                    <div class="hzAccordion__item active wow fadeInLeft" data-wow-delay="00ms"
                        data-wow-duration="1500ms">
                        <div class="head">
                            <h3 class="head-title"><span class="title">Tư vấn văn hóa tổ chức & phát triển lãnh đạo</span> <span class="number">01</span></h3>
                        </div>
                        <div class="content">
                            <div class="wrp">
                                <div class="content-wrp">
                                    <p class="text">Chúng tôi phát triển các chiến lược tùy chỉnh kết hợp các phương pháp đã được chứng minh mang lại kết quả xuất sắc.</p>
                                    <a class="arry-btn" href="page-service-details.html"><i class="fa-thin fa-arrow-up-right"></i></a>
                                </div>
                                <div class="shape">
                                    <img src="assets/images/shape/hz-accordion-shape.png" alt="shape">
                                </div>
                                <div class="image">
                                    <img src="assets/images/service/service-one-image1.jpg" alt="image">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hzAccordion__item wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div class="head">
                            <h3 class="head-title"><span class="title">Lập kế hoạch & phát triển chiến lược</span> <span class="number">02</span></h3>
                        </div>
                        <div class="content">
                            <div class="wrp">
                                <div class="content-wrp">
                                    <p class="text">We develop customized strategies that incorporate tactics proven to
                                        deliver
                                        outstanding results testing.</p>
                                    <a class="arry-btn" href="page-service-details.html"><i
                                            class="fa-thin fa-arrow-up-right"></i></a>
                                </div>
                                <div class="shape">
                                    <img src="assets/images/shape/hz-accordion-shape.png" alt="shape">
                                </div>
                                <div class="image">
                                    <img src="assets/images/service/service-one-image2.jpg" alt="image">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hzAccordion__item wow fadeInLeft" data-wow-delay="400ms" data-wow-duration="1500ms">
                        <div class="head">
                            <h3 class="head-title"><span class="title">Tối ưu hóa hiệu quả hoạt động</span> <span class="number">03</span></h3>
                        </div>
                        <div class="content">
                            <div class="wrp">
                                <div class="content-wrp">
                                    <p class="text">Chúng tôi phát triển các giải pháp tối ưu hóa quy trình hoạt động, giúp doanh nghiệp đạt được hiệu quả cao nhất trong công việc.</p>
                                    <a class="arry-btn" href="page-service-details.html"><i
                                            class="fa-thin fa-arrow-up-right"></i></a>
                                </div>
                                <div class="shape">
                                    <img src="assets/images/shape/hz-accordion-shape.png" alt="shape">
                                </div>
                                <div class="image">
                                    <img src="assets/images/service/service-one-image3.jpg" alt="image">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hzAccordion__item last-child wow fadeInLeft" data-wow-delay="600ms"
                        data-wow-duration="1500ms">
                        <div class="head">
                            <h3 class="head-title"><span class="title">Giải pháp tư vấn & dịch vụ tùy chỉnh</span> <span class="number">04</span></h3>
                        </div>
                        <div class="content">
                            <div class="wrp">
                                <div class="content-wrp">
                                    <p class="text">Chúng tôi cung cấp các giải pháp tư vấn được thiết kế riêng cho từng doanh nghiệp, đáp ứng nhu cầu cụ thể.</p>
                                    <a class="arry-btn" href="page-service-details.html"><i
                                            class="fa-thin fa-arrow-up-right"></i></a>
                                </div>
                                <div class="shape">
                                    <img src="assets/images/shape/hz-accordion-shape.png" alt="shape">
                                </div>
                                <div class="image">
                                    <img src="assets/images/service/service-one-image4.jpg" alt="image">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Horizontal accordion area end here -->

        <!-- Professional area start here -->
        <section class="professional-area pt-130 pb-130">
            <div class="container">
                <div class="row g-0">
                    <div class="col-xl-6">
                        <div class="professional__image imageLeftToRight wow">
                            <img src="assets/images/professional/professional-image.jpg" alt="image">
                            <div class="content">
                                <ul>
                                    <li class="icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.64714 6.41667C6.64714 4.01592 8.60055 2.0625 11.0013 2.0625C13.4021 2.0625 15.3555 4.01592 15.3555 6.41667C15.3555 8.81742 13.4021 10.7708 11.0013 10.7708C8.60055 10.7708 6.64714 8.81742 6.64714 6.41667ZM13.7513 12.1458H8.2513C5.34547 12.1458 2.98047 14.5108 2.98047 17.4167C2.98047 18.8073 4.11072 19.9375 5.5013 19.9375H16.5013C17.8919 19.9375 19.0221 18.8073 19.0221 17.4167C19.0221 14.5108 16.6571 12.1458 13.7513 12.1458Z"
                                                fill="#121C27" />
                                        </svg>
                                    </li>
                                    <li class="info">
                                        <h3><span class="count">20</span>k+</h3>
                                        <p>Khách hàng</p>
                                    </li>
                                </ul>
                                <ul class="last-item">
                                    <li class="icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M11.9799 1.5C7.57997 1.5 4.00781 5.07216 4.00781 9.47208C4.00781 13.872 7.57997 17.4442 11.9799 17.4442C16.3798 17.4442 19.952 13.872 19.952 9.47208C19.952 5.07216 16.3798 1.5 11.9799 1.5ZM11.9799 6.7692C11.7574 6.51816 11.5196 6.33192 11.2808 6.19776C10.3431 5.67096 9.33029 5.89152 8.69669 6.42264C7.76453 7.20408 7.59485 8.76168 8.52269 10.3243C9.07061 11.298 10.4391 12.2988 11.6005 12.9478C11.8364 13.0795 12.1234 13.0795 12.3593 12.9478C13.5248 12.2964 14.899 11.2908 15.4431 10.3138C16.3649 8.76168 16.1953 7.20408 15.2631 6.42264C14.6295 5.89152 13.6167 5.67096 12.679 6.19776C12.4402 6.33192 12.2025 6.51816 11.9799 6.76944V6.7692Z"
                                                fill="#121C27" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M17.0331 16.5996C15.608 17.6208 13.8624 18.222 11.9775 18.222C10.0925 18.222 8.347 17.6208 6.92188 16.5996V21.7219C6.92188 22.0145 7.08603 22.2823 7.34692 22.4151C7.60755 22.5478 7.92052 22.523 8.15716 22.351L11.9775 19.5727L15.7978 22.351C16.0344 22.523 16.3474 22.5478 16.6083 22.4151C16.8689 22.2823 17.0331 22.0145 17.0331 21.7219V16.5996Z"
                                                fill="#121C27" />
                                        </svg>
                                    </li>
                                    <li class="info">
                                        <h3><span class="count">100</span>+</h3>
                                        <p>Giấy chứng nhận</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="professional__content">
                            <div class="section-header">
                                <h2 class="wow splt-txt" data-splitting>Dịch vụ tư vấn tâm lý chuyên nghiệp và uy tín.</h2>
                            </div>
                            <div>
                                <ul class="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                                    <li><i class="fa-solid fa-check"></i> Xây dựng thương hiệu vững mạnh và bền vững</li>
                                    <li><i class="fa-solid fa-check"></i> Tối ưu hóa trải nghiệm tham vấn tâm lý</li>
                                    <li><i class="fa-solid fa-check"></i> Chiến lược tư vấn tâm lý hiệu quả đã được kiểm chứng</li>
                                </ul>
                                <a href="page-about.html" class="btn-one mt-50 wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms" data-splitting data-text="Khám Phá Thêm">Khám Phá Thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="professional__wrp">
                    <div class="row g-5 g-xl-4">
                        <div class="col-xl-4 wow fadeInLeft" data-wow-delay="00ms" data-wow-duration="1500ms">
                            <div class="professional__item">
                                <div class="icon">
                                    <svg width="87" height="87" viewBox="0 0 87 87" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_1349_9549)">
                                            <path
                                                d="M42.8093 0.499427C51.2595 0.43147 59.5393 2.87514 66.5984 7.52039C73.6576 12.1656 79.1777 18.8031 82.4585 26.5906C85.7394 34.3781 86.633 42.9647 85.026 51.2609C83.4191 59.5571 79.384 67.189 73.4327 73.1883C67.4814 79.1875 59.8821 83.2838 51.5991 84.9573C43.316 86.6308 34.7226 85.8061 26.9089 82.5879C19.0953 79.3697 12.4138 73.903 7.71203 66.8814C3.01027 59.8598 0.500215 51.5998 0.500338 43.1494C0.455426 31.8833 4.88766 21.0606 12.8221 13.0623C20.7565 5.06392 31.5432 0.544953 42.8093 0.499427Z"
                                                stroke="#121C27" />
                                            <path
                                                d="M42.3597 0.5C65.7537 0.5 83.8947 20.656 83.8947 36.366C83.8947 52.076 65.7547 63.166 42.3597 63.166C18.9647 63.166 2.67969 50.015 2.67969 34.305C2.67969 18.595 18.9657 0.5 42.3597 0.5Z"
                                                stroke="#121C27" />
                                            <path
                                                d="M84.8071 38.1698C86.1721 56.5438 70.6671 76.2497 48.7421 76.2497C26.8171 76.2497 13.7941 61.8307 14.5271 42.7687C15.2601 23.7067 35.8161 12.4688 49.7471 12.4688C63.6781 12.4688 83.4461 19.7957 84.8071 38.1698Z"
                                                stroke="#121C27" />
                                            <path
                                                d="M84.8449 42.3146C85.2531 65.705 65.4168 84.194 49.7092 84.4682C34.0016 84.7424 22.5967 66.7987 22.1884 43.4073C21.7801 20.0158 34.6449 3.50478 50.3525 3.2306C66.0601 2.95643 84.4366 18.9231 84.8449 42.3146Z"
                                                stroke="#121C27" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1349_9549">
                                                <rect width="86.079" height="86.301" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div class="content">
                                    <h4 class="title">Quy trình tư vấn chuyên nghiệp</h4>
                                    <p class="text">Chúng tôi tự hào mang đến các giải pháp tư vấn tâm lý tiên tiến, đáp ứng mọi thách thức trong tương lai</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div class="professional__item">
                                <div class="icon">
                                    <svg width="91" height="89" viewBox="0 0 91 89" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_1349_9544)">
                                            <path d="M16.457 0.967773H90.0315V72.5547H16.457V0.967773Z"
                                                stroke="#121C27" />
                                            <path d="M0.96875 14.5117H74.5432V88.0335H0.96875V14.5117Z"
                                                stroke="#121C27" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1349_9544">
                                                <rect width="91" height="89" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div class="content">
                                    <h4 class="title">Workflow Analysis</h4>
                                    <p class="text">We provide the best services, ensuring your outstanding growth of
                                        your business
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-xxl-3 wow fadeInLeft" data-wow-delay="400ms"
                            data-wow-duration="1500ms">
                            <div class="professional__item-last">
                                <div class="icon">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <rect width="48" height="48" fill="url(#pattern0_1349_9563)" />
                                        <defs>
                                            <pattern id="pattern0_1349_9563" patternContentUnits="objectBoundingBox"
                                                width="1" height="1">
                                                <use xlink:href="#image0_1349_9563" transform="scale(0.0208333)" />
                                            </pattern>
                                            <image id="image0_1349_9563" width="48" height="48"
                                                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAZ5QTFRFAAAAEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwnEhwntuqgxAAAAIp0Uk5TAEBwn8/f/++vkL9QECB/j2CAoMAwB0hzWRELbOnSARi28x4JvnWwL+EFdG4o2g+dhyX+HX695dDgG/hL4kmr+yJqePzDpPqOCLLNp8LxBMnTQX0XKgKexvfMRg1CldxO3uoV9vD5P+s1LMoWWClj7ctX1iM7qLgfuhS1i4qZJIWB9KlpXRM0YaVVp2qdaQAAAvZJREFUeJyVlktIVGEUgM9xnJwZZ6prTca4UBxKHAYiKMJFRqU9hbCyzRCBhPSQIqhNi4hAIqggSmpV1KIWEoQQVhAIEmlUWGhTWlETPnqQ2bzUGe/t/+/7vy/tbO5/Ht9/zn/Puf8Mwn8KWtlEIc/ZwhlBmAtAD8/ECDyrGwD05s0ZCzFtA/jzvFXZALO+pBVQnDcWrO2bU7bSAQun7MKpeP4aAZfLKZ6UNcsCc8UDeCf1gHM9krjTGrA4M3c8oDulAIEpq46bpHhCAUpS84kXU6C0mFe8mEIEfHQesKAol/EtKEg6ADgtAjSB1sqAK21/oIW/qI+cQPAkIUhmelw0cyk7xPeHeooEPjgWQvwBpZiQsrht3oKbZi/Okf3LcZToZfhZ9nBpSyAnEMCb9yTD8tblw4pr6aRVWTP00CvxQ5D7IhkqMa74rJpJBpAYA0mIfFRMKwbBgShKSn2IDqtfThW+Vd3+qQI23pWVR2NVXDNG+rW1f5rJwXvk4VuNA5q1rOSVpjBVBabpu6aGNVoVNN3vTzqNy8jVKqNAgPCSfj0A3kUJnRZwLeNQGObzcisJUIMv2bOtfQb2QoBg1QvWtq7HGYDaXsZUg93VcetoGdjIlkBasenduBNQ42NqqB1K1JNJf2QPwPanetPmLqgYhbpMtz2wvk9vqn8IDU8Ato6FOu2AcLTLDADs6OXMh5da35jW5a8YoiWJUhnB+5ojuAE7lJtv3wPN3pjt1NTdGI+MDv4EiNGfsdvqVenfe1cFYnizdIKtY78YW/0GtMu4BW+p7uYbh/sGwCQHsV0HQGtcbQb3HXZ1meKFQ1dBD8AxvC6vjox0nHj93BDfipeABeBkrzKELdeaKq4w4dE6vABGAAJHL0uLqobzsfKLOk/Z1walicxH2zSYHREXp9qgOdSjVHVgOZ5TYww3yZ7oyB36PH0W4My9ndnQt/dbsF/XPPNfh1g1L7QBHH9MP/RtoXCfYaCs7sNQK6Y6mrE9YeGzBBzlH8+r1jEuWQ3mAAAAAElFTkSuQmCC" />
                                        </defs>
                                    </svg>
                                </div>
                                <div class="content">
                                    <h3 class="title">We strongly help business growth</h3>
                                    <a class="item-btn video-popup"
                                        href="https://www.youtube.com/watch?v=UalTfOIDQ7M">COMPANY VALUES <svg width="8"
                                            height="11" viewBox="0 0 8 11" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 10.5V0L8 4.5L0 10.5Z" fill="#121C27" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Professional area end here -->

        <!-- Choose area start here -->
        <section class="choose-one-area bg-sub pt-130">
            <div class="row g-0">
                <div class="col-xl-7 order-2 order-xl-1">
                    <div class="choose-one__wrp">
                        <div class="section-header mb-50">
                            <h2 class="wow splt-txt" data-splitting>Financial Solutions for <br /> What Your Needs</h2>
                        </div>
                        <div class="choose__tab">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab"
                                        data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                        aria-selected="true">
                                        Why Need Consultation?
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab"
                                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                        aria-selected="false">
                                        Why Choose Us
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab"
                                        data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                                        aria-selected="false">
                                        How it Works
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div class="tab-content mt-50" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="choose-one__content">
                                    <p class="mb-50">With the rapid growth of e-commerce and the significant advantages
                                        it
                                        offers, everyone is
                                        eager to establish a sales
                                        channel online. However, not everyone knows the best Solution.</p>
                                    <div class="item">
                                        <div class="icon">
                                            <svg width="52" height="52" viewBox="0 0 52 52" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M25.6713 12.399H9.86984C9.43759 12.399 9.08984 12.0513 9.08984 11.619V7.82301C9.08984 6.62376 10.0648 5.64551 11.2673 5.64551H13.5651C13.9973 5.64551 14.3451 5.99326 14.3451 6.42551C14.3451 6.85776 13.9973 7.20551 13.5651 7.20551H11.2673C10.9261 7.20551 10.6498 7.48176 10.6498 7.82301V10.839H24.8913V7.82301C24.8913 7.48176 24.6151 7.20551 24.2738 7.20551H21.9761C21.5438 7.20551 21.1961 6.85776 21.1961 6.42551C21.1961 5.99326 21.5438 5.64551 21.9761 5.64551H24.2738C25.4731 5.64551 26.4513 6.62051 26.4513 7.82301V11.619C26.4513 12.048 26.1036 12.399 25.6713 12.399Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M33.7211 48.7309H1.81906C1.38681 48.7309 1.03906 48.3832 1.03906 47.9509V8.97043C1.03906 8.53818 1.38681 8.19043 1.81906 8.19043H9.86931C10.3016 8.19043 10.6493 8.53818 10.6493 8.97043C10.6493 9.40268 10.3016 9.75043 9.86931 9.75043H2.59906V47.1677H32.9411V42.1724C32.9411 41.7402 33.2888 41.3924 33.7211 41.3924C34.1533 41.3924 34.5011 41.7402 34.5011 42.1724V47.9477C34.5011 48.3799 34.1501 48.7309 33.7211 48.7309Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M33.7209 16.1139C33.2886 16.1139 32.9409 15.7662 32.9409 15.3339V9.75043H25.6706C25.2384 9.75043 24.8906 9.40268 24.8906 8.97043C24.8906 8.53818 25.2384 8.19043 25.6706 8.19043H33.7209C34.1531 8.19043 34.5009 8.53818 34.5009 8.97043V15.3339C34.5009 15.7662 34.1499 16.1139 33.7209 16.1139Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M21.9787 8.87253H13.5612C13.129 8.87253 12.7812 8.52478 12.7812 8.09253V4.69953C12.7812 3.90978 13.4215 3.26953 14.2112 3.26953H21.3287C22.1185 3.26953 22.7587 3.90978 22.7587 4.69953V8.09253C22.7587 8.52153 22.4077 8.87253 21.9787 8.87253ZM14.3412 7.31253H21.1987V4.82953H14.3412V7.31253Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M23.2126 19.9194H13.6706C13.2384 19.9194 12.8906 19.5716 12.8906 19.1394C12.8906 18.7071 13.2384 18.3594 13.6706 18.3594H23.2094C23.6416 18.3594 23.9894 18.7071 23.9894 19.1394C23.9894 19.5716 23.6416 19.9194 23.2126 19.9194Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M7.32525 20.6245C7.127 20.6245 6.9255 20.5497 6.77275 20.397L5.55725 19.1782C5.25175 18.8727 5.25175 18.3787 5.55725 18.0765C5.86275 17.771 6.35675 17.771 6.659 18.0765L7.32525 18.7427L9.59375 16.4742C9.89925 16.1687 10.3933 16.1687 10.6955 16.4742C11.001 16.7797 11.001 17.2737 10.6955 17.576L7.8745 20.397C7.725 20.5465 7.52675 20.6245 7.32525 20.6245Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M19.3256 27.4819H13.6706C13.2384 27.4819 12.8906 27.1341 12.8906 26.7019C12.8906 26.2696 13.2384 25.9219 13.6706 25.9219H19.3256C19.7579 25.9219 20.1056 26.2696 20.1056 26.7019C20.1056 27.1341 19.7579 27.4819 19.3256 27.4819Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M7.32525 28.187C7.11725 28.187 6.919 28.1057 6.77275 27.9595L5.55725 26.7407C5.25175 26.4352 5.25175 25.9412 5.55725 25.639C5.86275 25.3367 6.35675 25.3335 6.659 25.639L7.32525 26.3052L9.59375 24.0367C9.89925 23.7312 10.3933 23.7312 10.6955 24.0367C11.001 24.3422 11.001 24.8362 10.6955 25.1385L7.8745 27.9595C7.7315 28.1057 7.53325 28.187 7.32525 28.187Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M20.3461 35.0483H13.6706C13.2384 35.0483 12.8906 34.7005 12.8906 34.2683C12.8906 33.836 13.2384 33.4883 13.6706 33.4883H20.3461C20.7784 33.4883 21.1261 33.836 21.1261 34.2683C21.1261 34.7005 20.7784 35.0483 20.3461 35.0483Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M7.32459 35.7534C7.12634 35.7534 6.919 35.6786 6.77209 35.5259L5.55334 34.3071C5.24784 34.0016 5.24784 33.5076 5.55334 33.2054C5.85884 32.9031 6.35284 32.8999 6.65509 33.2054L7.32134 33.8716L9.58984 31.6031C9.89534 31.2976 10.3893 31.2976 10.6916 31.6031C10.9938 31.9086 10.9971 32.4026 10.6916 32.7049L7.87059 35.5259C7.72434 35.6754 7.52609 35.7534 7.32459 35.7534Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M22.6471 42.6108H13.6706C13.2384 42.6108 12.8906 42.263 12.8906 41.8308C12.8906 41.3985 13.2384 41.0508 13.6706 41.0508H22.6471C23.0794 41.0508 23.4271 41.3985 23.4271 41.8308C23.4271 42.263 23.0794 42.6108 22.6471 42.6108Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M7.32459 43.3159C7.11659 43.3159 6.91834 43.2347 6.77209 43.0884L5.55334 41.8697C5.24784 41.5642 5.24784 41.0701 5.55334 40.7679C5.85884 40.4624 6.35284 40.4624 6.65509 40.7679L7.32134 41.4341L9.58984 39.1656C9.89534 38.8601 10.3893 38.8601 10.6916 39.1656C10.9938 39.4711 10.9971 39.9651 10.6916 40.2674L7.87059 43.0884C7.73084 43.2347 7.53259 43.3159 7.32459 43.3159Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M32.6354 42.9983C30.7114 42.9983 28.8459 42.6213 27.0909 41.877C25.3944 41.1588 23.8701 40.1318 22.5636 38.8253C21.2571 37.5188 20.2301 35.9945 19.5119 34.298C18.7676 32.543 18.3906 30.6775 18.3906 28.7535C18.3906 26.8295 18.7676 24.964 19.5119 23.209C20.2301 21.5125 21.2571 19.9883 22.5636 18.6818C23.8701 17.3753 25.3944 16.3483 27.0909 15.63C28.8459 14.8858 30.7114 14.5088 32.6354 14.5088C34.5594 14.5088 36.4249 14.8858 38.1799 15.63C39.8764 16.3483 41.4006 17.3753 42.7071 18.6818C44.0136 19.9883 45.0406 21.5125 45.7589 23.209C46.5031 24.964 46.8801 26.8295 46.8801 28.7535C46.8801 30.6775 46.5031 32.543 45.7589 34.298C45.0406 35.9945 44.0136 37.5188 42.7071 38.8253C41.4006 40.1318 39.8764 41.1588 38.1799 41.877C36.4216 42.6213 34.5561 42.9983 32.6354 42.9983ZM32.6354 16.072C25.6414 16.072 19.9506 21.7628 19.9506 28.7568C19.9506 35.7508 25.6414 41.4383 32.6354 41.4383C39.6294 41.4383 45.3201 35.7475 45.3201 28.7535C45.3201 21.7628 39.6294 16.072 32.6354 16.072Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M32.6348 38.4737C30.0381 38.4737 27.5973 37.463 25.7611 35.6267C23.9248 33.7905 22.9141 31.3497 22.9141 28.753C22.9141 26.1562 23.9248 23.7155 25.7611 21.8792C27.5973 20.043 30.0381 19.0322 32.6348 19.0322C35.2316 19.0322 37.6723 20.043 39.5086 21.8792C41.3448 23.7155 42.3556 26.1562 42.3556 28.753C42.3556 31.3497 41.3448 33.7905 39.5086 35.6267C37.6723 37.463 35.2316 38.4737 32.6348 38.4737ZM32.6348 20.5955C30.4541 20.5955 28.4066 21.4437 26.8661 22.9842C25.3256 24.5247 24.4773 26.5755 24.4773 28.753C24.4773 30.9337 25.3256 32.9812 26.8661 34.5217C28.4066 36.0622 30.4573 36.9105 32.6348 36.9105C34.8156 36.9105 36.8631 36.0622 38.4036 34.5217C39.9441 32.9812 40.7923 30.9305 40.7923 28.753C40.7923 26.5722 39.9441 24.5247 38.4036 22.9842C36.8631 21.4437 34.8156 20.5955 32.6348 20.5955Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M32.6371 29.5361C32.4388 29.5361 32.2373 29.4613 32.0846 29.3086C31.7791 29.0031 31.7791 28.5091 32.0846 28.2068L44.7693 15.5221C45.0748 15.2166 45.5688 15.2166 45.8711 15.5221C46.1766 15.8276 46.1766 16.3216 45.8711 16.6238L33.1863 29.3086C33.0368 29.4581 32.8353 29.5361 32.6371 29.5361Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M45.3204 16.8517C45.1156 16.8517 44.9141 16.7705 44.7679 16.6242C44.6119 16.4682 44.5274 16.2505 44.5404 16.0262L44.6834 13.6082C44.6931 13.4165 44.7744 13.2377 44.9109 13.1012L47.3549 10.6605C47.5824 10.433 47.9301 10.368 48.2259 10.5012C48.5216 10.6345 48.7036 10.9367 48.6841 11.2585L48.5931 12.799L50.1336 12.708C50.4586 12.6885 50.7576 12.8705 50.8909 13.1662C51.0241 13.462 50.9591 13.8097 50.7316 14.0372L48.2876 16.4812C48.1511 16.6177 47.9724 16.6957 47.7806 16.7087L45.3626 16.8517C45.3529 16.8517 45.3366 16.8517 45.3204 16.8517ZM46.2271 13.9982L46.1524 15.243L47.3971 15.1682L48.1804 14.385L47.8131 14.4077C47.5889 14.4207 47.3744 14.3395 47.2151 14.1802C47.0591 14.0242 46.9746 13.8065 46.9876 13.5822L47.0104 13.215L46.2271 13.9982Z"
                                                    fill="#121C27" />
                                            </svg>
                                            <h4>Mission <br /> Statement</h4>
                                        </div>
                                        <p>We believe that the human essential to start any successful project and that
                                            this is
                                            where splendid re-generated
                                            company. Everyone is
                                            eager to establish a sales
                                            channel online.
                                        </p>
                                    </div>
                                    <div class="line"></div>
                                    <div class="item">
                                        <div class="icon">
                                            <svg width="51" height="51" viewBox="0 0 51 51" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.78906 36.125C8.62963 36.125 9.45133 35.8757 10.1502 35.4087C10.8491 34.9418 11.3939 34.278 11.7156 33.5014C12.0372 32.7248 12.1214 31.8703 11.9574 31.0459C11.7934 30.2214 11.3886 29.4642 10.7943 28.8698C10.1999 28.2754 9.44262 27.8707 8.6182 27.7067C7.79378 27.5427 6.93924 27.6268 6.16266 27.9485C5.38607 28.2702 4.72231 28.8149 4.25532 29.5138C3.78832 30.2127 3.53906 31.0344 3.53906 31.875C3.54029 33.0018 3.98846 34.0821 4.78522 34.8788C5.58198 35.6756 6.66227 36.1238 7.78906 36.125ZM7.78906 29.0417C8.34944 29.0417 8.89724 29.2078 9.36318 29.5192C9.82912 29.8305 10.1923 30.273 10.4067 30.7907C10.6212 31.3085 10.6773 31.8781 10.568 32.4278C10.4586 32.9774 10.1888 33.4822 9.79253 33.8785C9.39628 34.2747 8.89143 34.5446 8.34182 34.6539C7.79221 34.7632 7.22252 34.7071 6.70479 34.4927C6.18707 34.2782 5.74456 33.9151 5.43323 33.4491C5.1219 32.9832 4.95573 32.4354 4.95573 31.875C4.95648 31.1238 5.25523 30.4036 5.78642 29.8724C6.31761 29.3412 7.03785 29.0424 7.78906 29.0417Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M40.1654 7.99889C40.0322 7.86805 39.8527 7.79512 39.666 7.79597C39.4793 7.79681 39.3004 7.87137 39.1684 8.0034C39.0363 8.13544 38.9618 8.31428 38.9609 8.50101C38.9601 8.68774 39.033 8.86724 39.1639 9.00047L41.2889 11.1255C41.3761 11.2126 41.4845 11.2754 41.6034 11.3078C41.7223 11.3402 41.8476 11.341 41.967 11.3101C42.0863 11.2792 42.1955 11.2178 42.2838 11.1318C42.3721 11.0458 42.4364 10.9382 42.4704 10.8197C42.4842 10.7727 43.8379 6.14224 46.3565 4.88328C46.5241 4.79899 46.6514 4.65167 46.7105 4.47363C46.7696 4.29559 46.7557 4.10138 46.6718 3.93359C46.5879 3.76581 46.4409 3.63814 46.263 3.57861C46.0851 3.51908 45.8909 3.53254 45.7229 3.61603C43.4955 4.72972 42.1072 7.68966 41.4867 9.32005L40.1654 7.99889Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M41.7891 14.875C43.4793 14.8732 45.0997 14.2009 46.2948 13.0058C47.49 11.8106 48.1622 10.1902 48.1641 8.5C48.1634 7.96422 48.0967 7.43057 47.9655 6.91109C47.9199 6.72892 47.8037 6.57235 47.6426 6.47584C47.4814 6.37932 47.2886 6.35076 47.1064 6.39644C46.9242 6.44212 46.7677 6.5583 46.6711 6.71942C46.5746 6.88054 46.5461 7.0734 46.5918 7.25557C46.6942 7.66248 46.7465 8.0804 46.7474 8.5C46.7474 9.48067 46.4566 10.4393 45.9118 11.2547C45.3669 12.0701 44.5926 12.7056 43.6865 13.0809C42.7805 13.4562 41.7836 13.5544 40.8217 13.3631C39.8599 13.1717 38.9764 12.6995 38.283 12.0061C37.5896 11.3126 37.1173 10.4291 36.926 9.46732C36.7347 8.5055 36.8329 7.50854 37.2082 6.60253C37.5834 5.69651 38.219 4.92213 39.0344 4.3773C39.8498 3.83247 40.8084 3.54167 41.7891 3.54167C42.2087 3.54261 42.6266 3.59488 43.0335 3.69731C43.2157 3.74299 43.4085 3.71443 43.5696 3.61791C43.7308 3.5214 43.8469 3.36483 43.8926 3.18265C43.9383 3.00048 43.9097 2.80762 43.8132 2.6465C43.7167 2.48538 43.5601 2.36921 43.378 2.32352C42.8585 2.19238 42.3248 2.12571 41.7891 2.125C40.0983 2.125 38.4768 2.79665 37.2813 3.99219C36.0857 5.18774 35.4141 6.80924 35.4141 8.5C35.4141 10.1908 36.0857 11.8123 37.2813 13.0078C38.4768 14.2033 40.0983 14.875 41.7891 14.875Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M12.7483 29.7499C12.8951 29.75 13.0382 29.7043 13.1578 29.6191L33.6615 15.0681L33.3031 16.8608C33.2662 17.045 33.3041 17.2363 33.4082 17.3926C33.5124 17.5489 33.6744 17.6575 33.8586 17.6944C33.9045 17.7037 33.9514 17.7084 33.9983 17.7082C34.1619 17.7081 34.3204 17.6513 34.4469 17.5475C34.5734 17.4437 34.66 17.2993 34.6921 17.1389L35.4004 13.5972C35.4011 13.5938 35.3998 13.5905 35.4004 13.5871C35.4081 13.5266 35.408 13.4655 35.4001 13.405C35.4013 13.3736 35.4006 13.3421 35.3978 13.3107C35.3874 13.2804 35.375 13.2508 35.3607 13.2221C35.3435 13.1645 35.3191 13.1093 35.2879 13.0579L35.2835 13.048C35.2594 13.0214 35.2332 12.9967 35.2051 12.9743C35.1376 12.8848 35.04 12.8227 34.9304 12.7995C34.9028 12.7856 34.8742 12.7736 34.845 12.7637L31.3033 12.0554C31.1193 12.0191 30.9285 12.0573 30.7727 12.1615C30.6168 12.2657 30.5086 12.4274 30.4718 12.6112C30.435 12.7951 30.4726 12.986 30.5763 13.1422C30.6801 13.2983 30.8415 13.407 31.0252 13.4444L32.9571 13.8307L12.3374 28.4639C12.2148 28.551 12.1231 28.6747 12.0755 28.8173C12.0279 28.9599 12.0269 29.1139 12.0727 29.2571C12.1184 29.4003 12.2086 29.5253 12.33 29.6138C12.4515 29.7024 12.598 29.7501 12.7483 29.7499Z"
                                                    fill="#121C27" />
                                                <path
                                                    d="M47.457 47.4587H46.0404V17.0003C46.0404 16.9073 46.0221 16.8152 45.9866 16.7292C45.951 16.6432 45.8988 16.5651 45.833 16.4993C45.7672 16.4336 45.6891 16.3814 45.6032 16.3458C45.5172 16.3102 45.4251 16.2919 45.332 16.292H38.2487C38.1557 16.2919 38.0635 16.3102 37.9776 16.3458C37.8916 16.3814 37.8135 16.4336 37.7477 16.4993C37.6819 16.5651 37.6298 16.6432 37.5942 16.7292C37.5586 16.8152 37.5403 16.9073 37.5404 17.0003V47.4587H34.707V25.5003C34.7071 25.4073 34.6888 25.3152 34.6532 25.2292C34.6176 25.1432 34.5655 25.0651 34.4997 24.9993C34.4339 24.9336 34.3558 24.8814 34.2698 24.8458C34.1839 24.8102 34.0917 24.7919 33.9987 24.792H26.9154C26.8223 24.7919 26.7302 24.8102 26.6442 24.8458C26.5583 24.8814 26.4802 24.9336 26.4144 24.9993C26.3486 25.0651 26.2964 25.1432 26.2608 25.2292C26.2253 25.3152 26.207 25.4073 26.207 25.5003V47.4587H23.3737V34.0003C23.3738 33.9073 23.3555 33.8152 23.3199 33.7292C23.2843 33.6432 23.2321 33.5651 23.1664 33.4993C23.1006 33.4336 23.0225 33.3814 22.9365 33.3458C22.8505 33.3102 22.7584 33.2919 22.6654 33.292H15.582C15.489 33.2919 15.3969 33.3102 15.3109 33.3458C15.2249 33.3814 15.1468 33.4336 15.081 33.4993C15.0153 33.5651 14.9631 33.6432 14.9275 33.7292C14.8919 33.8152 14.8736 33.9073 14.8737 34.0003V47.4587H12.0404V38.2503C12.0404 38.1573 12.0221 38.0652 11.9866 37.9792C11.951 37.8932 11.8988 37.8151 11.833 37.7493C11.7672 37.6836 11.6891 37.6314 11.6032 37.5958C11.5172 37.5602 11.4251 37.5419 11.332 37.542H4.2487C4.15566 37.5419 4.06353 37.5602 3.97757 37.5958C3.8916 37.6314 3.8135 37.6836 3.74771 37.7493C3.68193 37.8151 3.62975 37.8932 3.59418 37.9792C3.5586 38.0652 3.54031 38.1573 3.54036 38.2503V47.4587C3.3525 47.4587 3.17234 47.5333 3.0395 47.6661C2.90666 47.799 2.83203 47.9791 2.83203 48.167C2.83203 48.3549 2.90666 48.535 3.0395 48.6679C3.17234 48.8007 3.3525 48.8753 3.54036 48.8753H47.457C47.6449 48.8753 47.8251 48.8007 47.9579 48.6679C48.0907 48.535 48.1654 48.3549 48.1654 48.167C48.1654 47.9791 48.0907 47.799 47.9579 47.6661C47.8251 47.5333 47.6449 47.4587 47.457 47.4587ZM38.957 17.7087H44.6237V47.4587H38.957V17.7087ZM27.6237 26.2087H33.2904V47.4587H27.6237V26.2087ZM16.2904 34.7087H21.957V47.4587H16.2904V34.7087ZM4.95703 38.9587H10.6237V47.4587H4.95703V38.9587Z"
                                                    fill="#121C27" />
                                            </svg>
                                            <h4>Our <br /> Commitment</h4>
                                        </div>
                                        <div>
                                            <p>We believe that people are essential to starting any successful project,
                                                and this
                                                is
                                                where a remarkable company is
                                                reborn.
                                            </p>
                                            <ul class="mt-25">
                                                <li>
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9" r="9" fill="#233032" fill-opacity="0.1" />
                                                        <path d="M5 7.49951L7.66667 9.99951L12 6" stroke="#121C27"
                                                            stroke-width="1.5" />
                                                        <line x1="5" y1="12.25" x2="12" y2="12.25" stroke="#121C27"
                                                            stroke-width="1.5" />
                                                    </svg>
                                                    Investment with loyalty
                                                </li>
                                                <li>
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9" r="9" fill="#233032" fill-opacity="0.1" />
                                                        <path d="M5 7.49951L7.66667 9.99951L12 6" stroke="#121C27"
                                                            stroke-width="1.5" />
                                                        <line x1="5" y1="12.25" x2="12" y2="12.25" stroke="#121C27"
                                                            stroke-width="1.5" />
                                                    </svg>
                                                    Visual project management
                                                </li>
                                                <li>
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9" r="9" fill="#233032" fill-opacity="0.1" />
                                                        <path d="M5 7.49951L7.66667 9.99951L12 6" stroke="#121C27"
                                                            stroke-width="1.5" />
                                                        <line x1="5" y1="12.25" x2="12" y2="12.25" stroke="#121C27"
                                                            stroke-width="1.5" />
                                                    </svg>
                                                    Technical Analysis
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="choose-twelve__content">
                                    <p>From advanced digital technologies to the forefront of sustainable solutions,
                                        we're
                                        always exploring new ways to deliver
                                        exceptional value for a diverse range of clients. By bringing together the right
                                        teams,
                                        we uncover the best paths
                                        forward, elevating your vision of success through our digital agency services.
                                    </p>
                                    <div class="list mt-30 mb-40">
                                        <ul>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9972 5.87913 15.1534 3.84594 13.6537 2.34626C12.1541 0.846583 10.1209 0.00282218 8 0ZM12.47 5.80333L7.47 10.8033C7.4086 10.8656 7.33543 10.9151 7.25474 10.9488C7.17406 10.9826 7.08747 11 7 11C6.91254 11 6.82595 10.9826 6.74526 10.9488C6.66458 10.9151 6.59141 10.8656 6.53 10.8033L4.19667 8.47C4.07202 8.34535 4.00199 8.17628 4.00199 8C4.00199 7.82371 4.07202 7.65465 4.19667 7.53C4.32132 7.40535 4.49039 7.33532 4.66667 7.33532C4.84295 7.33532 5.01202 7.40535 5.13667 7.53L7 9.39L11.53 4.86333C11.6547 4.73868 11.8237 4.66865 12 4.66865C12.1763 4.66865 12.3453 4.73868 12.47 4.86333C12.5947 4.98798 12.6647 5.15705 12.6647 5.33333C12.6647 5.50962 12.5947 5.67868 12.47 5.80333Z"
                                                        fill="#121C27" />
                                                    <path
                                                        d="M12.3273 5.98823L7.5926 10.6828C7.53446 10.7413 7.46517 10.7878 7.38876 10.8194C7.31236 10.8511 7.23036 10.8675 7.14754 10.8675C7.06472 10.8675 6.98272 10.8511 6.90632 10.8194C6.82991 10.7878 6.76062 10.7413 6.70248 10.6828L4.49295 8.49202C4.37491 8.37498 4.30859 8.21624 4.30859 8.05072C4.30859 7.88521 4.37491 7.72647 4.49295 7.60943C4.61098 7.49239 4.77108 7.42664 4.93801 7.42664C5.10494 7.42664 5.26503 7.49239 5.38307 7.60943L7.14754 9.35583L11.4372 5.10564C11.5552 4.9886 11.7153 4.92285 11.8823 4.92285C12.0492 4.92285 12.2093 4.9886 12.3273 5.10564C12.4454 5.22268 12.5117 5.38142 12.5117 5.54693C12.5117 5.71245 12.4454 5.87119 12.3273 5.98823Z"
                                                        fill="white" />
                                                </svg>
                                                Growth Method Analysis
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9972 5.87913 15.1534 3.84594 13.6537 2.34626C12.1541 0.846583 10.1209 0.00282218 8 0ZM12.47 5.80333L7.47 10.8033C7.4086 10.8656 7.33543 10.9151 7.25474 10.9488C7.17406 10.9826 7.08747 11 7 11C6.91254 11 6.82595 10.9826 6.74526 10.9488C6.66458 10.9151 6.59141 10.8656 6.53 10.8033L4.19667 8.47C4.07202 8.34535 4.00199 8.17628 4.00199 8C4.00199 7.82371 4.07202 7.65465 4.19667 7.53C4.32132 7.40535 4.49039 7.33532 4.66667 7.33532C4.84295 7.33532 5.01202 7.40535 5.13667 7.53L7 9.39L11.53 4.86333C11.6547 4.73868 11.8237 4.66865 12 4.66865C12.1763 4.66865 12.3453 4.73868 12.47 4.86333C12.5947 4.98798 12.6647 5.15705 12.6647 5.33333C12.6647 5.50962 12.5947 5.67868 12.47 5.80333Z"
                                                        fill="#121C27" />
                                                    <path
                                                        d="M12.3273 5.98823L7.5926 10.6828C7.53446 10.7413 7.46517 10.7878 7.38876 10.8194C7.31236 10.8511 7.23036 10.8675 7.14754 10.8675C7.06472 10.8675 6.98272 10.8511 6.90632 10.8194C6.82991 10.7878 6.76062 10.7413 6.70248 10.6828L4.49295 8.49202C4.37491 8.37498 4.30859 8.21624 4.30859 8.05072C4.30859 7.88521 4.37491 7.72647 4.49295 7.60943C4.61098 7.49239 4.77108 7.42664 4.93801 7.42664C5.10494 7.42664 5.26503 7.49239 5.38307 7.60943L7.14754 9.35583L11.4372 5.10564C11.5552 4.9886 11.7153 4.92285 11.8823 4.92285C12.0492 4.92285 12.2093 4.9886 12.3273 5.10564C12.4454 5.22268 12.5117 5.38142 12.5117 5.54693C12.5117 5.71245 12.4454 5.87119 12.3273 5.98823Z"
                                                        fill="white" />
                                                </svg>
                                                Project Management consultation
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9972 5.87913 15.1534 3.84594 13.6537 2.34626C12.1541 0.846583 10.1209 0.00282218 8 0ZM12.47 5.80333L7.47 10.8033C7.4086 10.8656 7.33543 10.9151 7.25474 10.9488C7.17406 10.9826 7.08747 11 7 11C6.91254 11 6.82595 10.9826 6.74526 10.9488C6.66458 10.9151 6.59141 10.8656 6.53 10.8033L4.19667 8.47C4.07202 8.34535 4.00199 8.17628 4.00199 8C4.00199 7.82371 4.07202 7.65465 4.19667 7.53C4.32132 7.40535 4.49039 7.33532 4.66667 7.33532C4.84295 7.33532 5.01202 7.40535 5.13667 7.53L7 9.39L11.53 4.86333C11.6547 4.73868 11.8237 4.66865 12 4.66865C12.1763 4.66865 12.3453 4.73868 12.47 4.86333C12.5947 4.98798 12.6647 5.15705 12.6647 5.33333C12.6647 5.50962 12.5947 5.67868 12.47 5.80333Z"
                                                        fill="#121C27" />
                                                    <path
                                                        d="M12.3273 5.98823L7.5926 10.6828C7.53446 10.7413 7.46517 10.7878 7.38876 10.8194C7.31236 10.8511 7.23036 10.8675 7.14754 10.8675C7.06472 10.8675 6.98272 10.8511 6.90632 10.8194C6.82991 10.7878 6.76062 10.7413 6.70248 10.6828L4.49295 8.49202C4.37491 8.37498 4.30859 8.21624 4.30859 8.05072C4.30859 7.88521 4.37491 7.72647 4.49295 7.60943C4.61098 7.49239 4.77108 7.42664 4.93801 7.42664C5.10494 7.42664 5.26503 7.49239 5.38307 7.60943L7.14754 9.35583L11.4372 5.10564C11.5552 4.9886 11.7153 4.92285 11.8823 4.92285C12.0492 4.92285 12.2093 4.9886 12.3273 5.10564C12.4454 5.22268 12.5117 5.38142 12.5117 5.54693C12.5117 5.71245 12.4454 5.87119 12.3273 5.98823Z"
                                                        fill="white" />
                                                </svg>
                                                Assessment Report Analysis
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9972 5.87913 15.1534 3.84594 13.6537 2.34626C12.1541 0.846583 10.1209 0.00282218 8 0ZM12.47 5.80333L7.47 10.8033C7.4086 10.8656 7.33543 10.9151 7.25474 10.9488C7.17406 10.9826 7.08747 11 7 11C6.91254 11 6.82595 10.9826 6.74526 10.9488C6.66458 10.9151 6.59141 10.8656 6.53 10.8033L4.19667 8.47C4.07202 8.34535 4.00199 8.17628 4.00199 8C4.00199 7.82371 4.07202 7.65465 4.19667 7.53C4.32132 7.40535 4.49039 7.33532 4.66667 7.33532C4.84295 7.33532 5.01202 7.40535 5.13667 7.53L7 9.39L11.53 4.86333C11.6547 4.73868 11.8237 4.66865 12 4.66865C12.1763 4.66865 12.3453 4.73868 12.47 4.86333C12.5947 4.98798 12.6647 5.15705 12.6647 5.33333C12.6647 5.50962 12.5947 5.67868 12.47 5.80333Z"
                                                        fill="#121C27" />
                                                    <path
                                                        d="M12.3273 5.98823L7.5926 10.6828C7.53446 10.7413 7.46517 10.7878 7.38876 10.8194C7.31236 10.8511 7.23036 10.8675 7.14754 10.8675C7.06472 10.8675 6.98272 10.8511 6.90632 10.8194C6.82991 10.7878 6.76062 10.7413 6.70248 10.6828L4.49295 8.49202C4.37491 8.37498 4.30859 8.21624 4.30859 8.05072C4.30859 7.88521 4.37491 7.72647 4.49295 7.60943C4.61098 7.49239 4.77108 7.42664 4.93801 7.42664C5.10494 7.42664 5.26503 7.49239 5.38307 7.60943L7.14754 9.35583L11.4372 5.10564C11.5552 4.9886 11.7153 4.92285 11.8823 4.92285C12.0492 4.92285 12.2093 4.9886 12.3273 5.10564C12.4454 5.22268 12.5117 5.38142 12.5117 5.54693C12.5117 5.71245 12.4454 5.87119 12.3273 5.98823Z"
                                                        fill="white" />
                                                </svg>
                                                Project consultations
                                            </li>
                                            <li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9972 5.87913 15.1534 3.84594 13.6537 2.34626C12.1541 0.846583 10.1209 0.00282218 8 0ZM12.47 5.80333L7.47 10.8033C7.4086 10.8656 7.33543 10.9151 7.25474 10.9488C7.17406 10.9826 7.08747 11 7 11C6.91254 11 6.82595 10.9826 6.74526 10.9488C6.66458 10.9151 6.59141 10.8656 6.53 10.8033L4.19667 8.47C4.07202 8.34535 4.00199 8.17628 4.00199 8C4.00199 7.82371 4.07202 7.65465 4.19667 7.53C4.32132 7.40535 4.49039 7.33532 4.66667 7.33532C4.84295 7.33532 5.01202 7.40535 5.13667 7.53L7 9.39L11.53 4.86333C11.6547 4.73868 11.8237 4.66865 12 4.66865C12.1763 4.66865 12.3453 4.73868 12.47 4.86333C12.5947 4.98798 12.6647 5.15705 12.6647 5.33333C12.6647 5.50962 12.5947 5.67868 12.47 5.80333Z"
                                                        fill="#121C27" />
                                                    <path
                                                        d="M12.3273 5.98823L7.5926 10.6828C7.53446 10.7413 7.46517 10.7878 7.38876 10.8194C7.31236 10.8511 7.23036 10.8675 7.14754 10.8675C7.06472 10.8675 6.98272 10.8511 6.90632 10.8194C6.82991 10.7878 6.76062 10.7413 6.70248 10.6828L4.49295 8.49202C4.37491 8.37498 4.30859 8.21624 4.30859 8.05072C4.30859 7.88521 4.37491 7.72647 4.49295 7.60943C4.61098 7.49239 4.77108 7.42664 4.93801 7.42664C5.10494 7.42664 5.26503 7.49239 5.38307 7.60943L7.14754 9.35583L11.4372 5.10564C11.5552 4.9886 11.7153 4.92285 11.8823 4.92285C12.0492 4.92285 12.2093 4.9886 12.3273 5.10564C12.4454 5.22268 12.5117 5.38142 12.5117 5.54693C12.5117 5.71245 12.4454 5.87119 12.3273 5.98823Z"
                                                        fill="white" />
                                                </svg>
                                                Project Management consultations
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9972 5.87913 15.1534 3.84594 13.6537 2.34626C12.1541 0.846583 10.1209 0.00282218 8 0ZM12.47 5.80333L7.47 10.8033C7.4086 10.8656 7.33543 10.9151 7.25474 10.9488C7.17406 10.9826 7.08747 11 7 11C6.91254 11 6.82595 10.9826 6.74526 10.9488C6.66458 10.9151 6.59141 10.8656 6.53 10.8033L4.19667 8.47C4.07202 8.34535 4.00199 8.17628 4.00199 8C4.00199 7.82371 4.07202 7.65465 4.19667 7.53C4.32132 7.40535 4.49039 7.33532 4.66667 7.33532C4.84295 7.33532 5.01202 7.40535 5.13667 7.53L7 9.39L11.53 4.86333C11.6547 4.73868 11.8237 4.66865 12 4.66865C12.1763 4.66865 12.3453 4.73868 12.47 4.86333C12.5947 4.98798 12.6647 5.15705 12.6647 5.33333C12.6647 5.50962 12.5947 5.67868 12.47 5.80333Z"
                                                        fill="#121C27" />
                                                    <path
                                                        d="M12.3273 5.98823L7.5926 10.6828C7.53446 10.7413 7.46517 10.7878 7.38876 10.8194C7.31236 10.8511 7.23036 10.8675 7.14754 10.8675C7.06472 10.8675 6.98272 10.8511 6.90632 10.8194C6.82991 10.7878 6.76062 10.7413 6.70248 10.6828L4.49295 8.49202C4.37491 8.37498 4.30859 8.21624 4.30859 8.05072C4.30859 7.88521 4.37491 7.72647 4.49295 7.60943C4.61098 7.49239 4.77108 7.42664 4.93801 7.42664C5.10494 7.42664 5.26503 7.49239 5.38307 7.60943L7.14754 9.35583L11.4372 5.10564C11.5552 4.9886 11.7153 4.92285 11.8823 4.92285C12.0492 4.92285 12.2093 4.9886 12.3273 5.10564C12.4454 5.22268 12.5117 5.38142 12.5117 5.54693C12.5117 5.71245 12.4454 5.87119 12.3273 5.98823Z"
                                                        fill="white" />
                                                </svg>
                                                Quality and Process Driven
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9972 5.87913 15.1534 3.84594 13.6537 2.34626C12.1541 0.846583 10.1209 0.00282218 8 0ZM12.47 5.80333L7.47 10.8033C7.4086 10.8656 7.33543 10.9151 7.25474 10.9488C7.17406 10.9826 7.08747 11 7 11C6.91254 11 6.82595 10.9826 6.74526 10.9488C6.66458 10.9151 6.59141 10.8656 6.53 10.8033L4.19667 8.47C4.07202 8.34535 4.00199 8.17628 4.00199 8C4.00199 7.82371 4.07202 7.65465 4.19667 7.53C4.32132 7.40535 4.49039 7.33532 4.66667 7.33532C4.84295 7.33532 5.01202 7.40535 5.13667 7.53L7 9.39L11.53 4.86333C11.6547 4.73868 11.8237 4.66865 12 4.66865C12.1763 4.66865 12.3453 4.73868 12.47 4.86333C12.5947 4.98798 12.6647 5.15705 12.6647 5.33333C12.6647 5.50962 12.5947 5.67868 12.47 5.80333Z"
                                                        fill="#121C27" />
                                                    <path
                                                        d="M12.3273 5.98823L7.5926 10.6828C7.53446 10.7413 7.46517 10.7878 7.38876 10.8194C7.31236 10.8511 7.23036 10.8675 7.14754 10.8675C7.06472 10.8675 6.98272 10.8511 6.90632 10.8194C6.82991 10.7878 6.76062 10.7413 6.70248 10.6828L4.49295 8.49202C4.37491 8.37498 4.30859 8.21624 4.30859 8.05072C4.30859 7.88521 4.37491 7.72647 4.49295 7.60943C4.61098 7.49239 4.77108 7.42664 4.93801 7.42664C5.10494 7.42664 5.26503 7.49239 5.38307 7.60943L7.14754 9.35583L11.4372 5.10564C11.5552 4.9886 11.7153 4.92285 11.8823 4.92285C12.0492 4.92285 12.2093 4.9886 12.3273 5.10564C12.4454 5.22268 12.5117 5.38142 12.5117 5.54693C12.5117 5.71245 12.4454 5.87119 12.3273 5.98823Z"
                                                        fill="white" />
                                                </svg>
                                                Assessment Report Analysis
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9972 5.87913 15.1534 3.84594 13.6537 2.34626C12.1541 0.846583 10.1209 0.00282218 8 0ZM12.47 5.80333L7.47 10.8033C7.4086 10.8656 7.33543 10.9151 7.25474 10.9488C7.17406 10.9826 7.08747 11 7 11C6.91254 11 6.82595 10.9826 6.74526 10.9488C6.66458 10.9151 6.59141 10.8656 6.53 10.8033L4.19667 8.47C4.07202 8.34535 4.00199 8.17628 4.00199 8C4.00199 7.82371 4.07202 7.65465 4.19667 7.53C4.32132 7.40535 4.49039 7.33532 4.66667 7.33532C4.84295 7.33532 5.01202 7.40535 5.13667 7.53L7 9.39L11.53 4.86333C11.6547 4.73868 11.8237 4.66865 12 4.66865C12.1763 4.66865 12.3453 4.73868 12.47 4.86333C12.5947 4.98798 12.6647 5.15705 12.6647 5.33333C12.6647 5.50962 12.5947 5.67868 12.47 5.80333Z"
                                                        fill="#121C27" />
                                                    <path
                                                        d="M12.3273 5.98823L7.5926 10.6828C7.53446 10.7413 7.46517 10.7878 7.38876 10.8194C7.31236 10.8511 7.23036 10.8675 7.14754 10.8675C7.06472 10.8675 6.98272 10.8511 6.90632 10.8194C6.82991 10.7878 6.76062 10.7413 6.70248 10.6828L4.49295 8.49202C4.37491 8.37498 4.30859 8.21624 4.30859 8.05072C4.30859 7.88521 4.37491 7.72647 4.49295 7.60943C4.61098 7.49239 4.77108 7.42664 4.93801 7.42664C5.10494 7.42664 5.26503 7.49239 5.38307 7.60943L7.14754 9.35583L11.4372 5.10564C11.5552 4.9886 11.7153 4.92285 11.8823 4.92285C12.0492 4.92285 12.2093 4.9886 12.3273 5.10564C12.4454 5.22268 12.5117 5.38142 12.5117 5.54693C12.5117 5.71245 12.4454 5.87119 12.3273 5.98823Z"
                                                        fill="white" />
                                                </svg>
                                                Report Analysis
                                            </li>
                                        </ul>
                                    </div>
                                    <a href="page-about.html" class="btn-one" data-splitting data-text="Về chúng tôi">About
                                        Us</a>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <p>With the rapid growth of e-commerce and the significant advantages
                                    it offers,
                                    everyone is eager to establish a sales
                                    channel online. However, not everyone knows the best Solution. By bringing together
                                    the right
                                    teams,
                                    we uncover the best paths
                                    forward, elevating your vision of success through our digital agency services.</p>
                                <div class="work-ten__wrp">
                                    <div class="work-ten__item text-start">
                                        <div class="content">
                                            <h4 class="title">01. Ideation</h4>
                                            <p>We meet customers in set place to discuss the details about needs
                                                & demands now.</p>
                                        </div>
                                    </div>
                                    <div class="work-ten__item text-start">
                                        <div class="content">
                                            <h4 class="title">02. Discussion</h4>
                                            <p>We meet customers in set place to discuss the details about needs
                                                & demands now.</p>
                                        </div>
                                    </div>
                                    <div class="work-ten__item text-start">
                                        <div class="content">
                                            <h4 class="title">03. Testing & Initiate</h4>
                                            <p>We meet customers in set place to discuss the details about needs
                                                & demands now.</p>
                                        </div>
                                    </div>
                                </div>
                                <a href="page-about.html" class="btn-one mt-50" data-splitting
                                    data-text="Learn More">Learn
                                    More</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-5 order-1 order-xl-2">
                    <div class="choose-one__image gsap__parallax">
                        <img src="assets/images/choose/choose-one-image.jpg" alt="image">
                        <div class="choose-one__rectangle">
                            <div class="item wow"></div>
                            <div class="item-dark wow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Choose area end here -->

        <!-- Video area start here -->
        <div class="video-area">
            <div class="video__wrp" data-speed="0.3" data-parallax="scroll"
                data-image-src="assets/images/bg/video-bg.jpg">
                <div class="video__btn">
                    <div class="btn-video video-pulse">
                        <a class="video-popup" href="https://www.youtube.com/watch?v=UalTfOIDQ7M"><i
                                class="fa-sharp fa-light fa-play"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Video area end here -->

        <!-- About area start here -->
        <section class="about-area">
            <div class="about__wrp">
                <div class="row g-0">
                    <div class="col-lg-4">
                        <div class="about__item about__content">
                            <h4 class="color-light wow splt-txt" data-splitting>Our user-centred design encourages
                                productivity & boosts revenue.</h4>
                            <ul>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 0.5C7.66563 7.39062 7.39062 7.66563 0.5 8C7.39062 8.33437 7.66563 8.60938 8 15.5C8.33437 8.60938 8.60938 8.33437 15.5 8C8.60938 7.66563 8.33437 7.39062 8 0.5Z"
                                            fill="white" />
                                    </svg>
                                    Clarify the company's vision growth objectives.
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 0.5C7.66563 7.39062 7.39062 7.66563 0.5 8C7.39062 8.33437 7.66563 8.60938 8 15.5C8.33437 8.60938 8.60938 8.33437 15.5 8C8.60938 7.66563 8.33437 7.39062 8 0.5Z"
                                            fill="white" />
                                    </svg>
                                    Business Management consultation
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 0.5C7.66563 7.39062 7.39062 7.66563 0.5 8C7.39062 8.33437 7.66563 8.60938 8 15.5C8.33437 8.60938 8.60938 8.33437 15.5 8C8.60938 7.66563 8.33437 7.39062 8 0.5Z"
                                            fill="white" />
                                    </svg>
                                    Clearly communicate Đội ngũ của chúng tôi's mission
                                </li>
                                <li>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 0.5C7.66563 7.39062 7.39062 7.66563 0.5 8C7.39062 8.33437 7.66563 8.60938 8 15.5C8.33437 8.60938 8.60938 8.33437 15.5 8C8.60938 7.66563 8.33437 7.39062 8 0.5Z"
                                            fill="white" />
                                    </svg>
                                    Review report's objectives to understand purpose
                                </li>
                            </ul>
                            <a href="page-about.html" class="btn-two-light" data-splitting data-text="Learn More">Learn
                                More</a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="about__item about__testimonial">
                            <div>
                                <div class="icon mb-50">
                                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_99_7624)">
                                            <path
                                                d="M13.5302 16.2398C15.5748 11.7362 19.8683 12.1278 21.9164 14.5977C23.9644 17.0677 21.4017 20.254 19.1527 20.6456C16.9037 21.0373 13.3258 19.5686 13.332 14.6571C13.3404 8.11369 20.4386 1.84444 21.2186 1.29395"
                                                stroke="white" stroke-width="3" stroke-linecap="round" />
                                            <path
                                                d="M1.53027 16.2398C3.57479 11.7362 7.8683 12.1278 9.91637 14.5977C11.9644 17.0677 9.4017 20.254 7.1527 20.6456C4.90373 21.0373 1.32581 19.5686 1.33204 14.6571C1.3404 8.11369 8.43857 1.84444 9.21857 1.29395"
                                                stroke="white" stroke-width="3" stroke-linecap="round" />
                                        </g>
                                        <defs>
                                            <clipPath>
                                                <rect width="24" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p>Their user-cantered design approach streamlines outer operations and significantly
                                    boosts your productivity
                                    and revenue. From the start, they took the time to understand best time.</p>
                            </div>
                            <h4 class="title">Ronex HM. <span>Spain</span></h4>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="about__item about__funfact">
                            <h4 class="color-light wow splt-txt mb-40" data-splitting>Driving Growth Through
                                User-Centered Enhancing Productivity and Revenue</h4>
                            <div>
                                <ul>
                                    <li class="icon">
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7 26.25C6.87138 26.25 6.74188 26.2211 6.62025 26.1634C6.31838 26.0173 6.125 25.7119 6.125 25.375V21H3.5C2.05275 21 0.875 19.8223 0.875 18.375V4.375C0.875 2.92775 2.05275 1.75 3.5 1.75H24.5C25.9473 1.75 27.125 2.92775 27.125 4.375V18.375C27.125 19.8223 25.9473 21 24.5 21H13.8696L7.54688 26.0584C7.3885 26.1852 7.19513 26.25 7 26.25ZM3.5 3.5C3.017 3.5 2.625 3.89287 2.625 4.375V18.375C2.625 18.8571 3.017 19.25 3.5 19.25H7C7.48387 19.25 7.875 19.6411 7.875 20.125V23.555L13.0156 19.4416C13.1714 19.3174 13.363 19.25 13.5625 19.25H24.5C24.983 19.25 25.375 18.8571 25.375 18.375V4.375C25.375 3.89287 24.983 3.5 24.5 3.5H3.5Z"
                                                fill="white" />
                                            <path
                                                d="M21 10.5H7C6.51613 10.5 6.125 10.108 6.125 9.625C6.125 9.142 6.51613 8.75 7 8.75H21C21.4839 8.75 21.875 9.142 21.875 9.625C21.875 10.108 21.4839 10.5 21 10.5Z"
                                                fill="white" />
                                            <path
                                                d="M14 14H7C6.51613 14 6.125 13.608 6.125 13.125C6.125 12.642 6.51613 12.25 7 12.25H14C14.4839 12.25 14.875 12.642 14.875 13.125C14.875 13.608 14.4839 14 14 14Z"
                                                fill="white" />
                                        </svg>
                                    </li>
                                    <li>
                                        <h3><span class="count">200</span>k<sup>+</sup></h3>
                                    </li>
                                </ul>
                                <p class="text">Được khách hàng tin tưởng trên toàn thế giới</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="about__rectangle">
                <div class="item wow"></div>
                <div class="item-dark wow"></div>
            </div>
        </section>
        <!-- About area end here -->

        <!-- Team area start here -->
        <section class="team-area pt-130">
            <div class="container">
                <div class="team__wrp">
                    <div class="row g-5">
                        <div class="col-xl-5">
                            <div class="team__left">
                                <div class="section-header">
                                    <h2 class="wow splt-txt" data-splitting>Đội ngũ chuyên gia</h2>
                                    <p class="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">Đội ngũ chuyên gia giàu kinh nghiệm của chúng tôi sẵn sàng hỗ trợ doanh nghiệp của bạn</p>
                                </div>
                                <a href="page-team.html" class="btn-one wow fadeInUp mt-50" data-wow-delay="200ms"
                                    data-wow-duration="1500ms" data-splitting data-text="Xem thêm">Xem thêm</a>
                            </div>
                        </div>
                        <div class="col-xl-7">
                            <div class="team__right">
                                <div class="row g-4 g-lg-5">
                                    <div class="col-sm-6 wow fadeInLeft" data-wow-delay="00ms"
                                        data-wow-duration="1500ms">
                                        <div class="team__item have-margin">
                                            <div class="socials">
                                                <i class="fa-regular fa-plus"></i>
                                                <ul>
                                                    <li><a href="#0"><i class="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#0"><i class="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#0"><i class="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="team__image">
                                                <img src="assets/images/team/team-image1.jpg" alt="image">
                                            </div>
                                            <h4><a class="hover-link" href="page-team-details.html">Nguyễn Văn Đạt</a>
                                            </h4>
                                            <span>Giám đốc điều hành</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 wow fadeInLeft" data-wow-delay="200ms"
                                        data-wow-duration="1500ms">
                                        <div class="team__item">
                                            <div class="socials">
                                                <i class="fa-regular fa-plus"></i>
                                                <ul>
                                                    <li><a href="#0"><i class="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#0"><i class="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#0"><i class="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="team__image">
                                                <img src="assets/images/team/team-image2.jpg" alt="image">
                                            </div>
                                            <h4><a class="hover-link" href="page-team-details.html">Nguyễn Như Mạnh</a>
                                            </h4>
                                            <span>Giám đốc công nghệ</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 wow fadeInLeft" data-wow-delay="00ms"
                                        data-wow-duration="1500ms">
                                        <div class="team__item have-margin">
                                            <div class="socials">
                                                <i class="fa-regular fa-plus"></i>
                                                <ul>
                                                    <li><a href="#0"><i class="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#0"><i class="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#0"><i class="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="team__image">
                                                <img src="assets/images/team/team-image3.jpg" alt="image">
                                            </div>
                                            <h4><a class="hover-link" href="page-team-details.html">Savannah Nguyen</a>
                                            </h4>
                                            <span>BĐS Hưng Gia</span>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 wow fadeInLeft" data-wow-delay="200ms"
                                        data-wow-duration="1500ms">
                                        <div class="team__item">
                                            <div class="socials">
                                                <i class="fa-regular fa-plus"></i>
                                                <ul>
                                                    <li><a href="#0"><i class="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#0"><i class="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#0"><i class="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="team__image">
                                                <img src="assets/images/team/team-image4.jpg" alt="image">
                                            </div>
                                            <h4><a class="hover-link" href="page-team-details.html">Ronald Richards</a>
                                            </h4>
                                            <span>Nhân Viên Văn Phòng</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Team area end here -->

        <!-- FAQ area start here -->
        <section class="faq-one-area pt-130 pb-100">
            <div class="faq-one__bg">
                <img src="assets/images/faq/faq-one-bg.png" alt="image">
            </div>
            <div class="faq-one__image">
                <img class="animation__arryLeftRight" src="assets/images/faq/faq-one-image.png" alt="image">
            </div>
            <div class="container">
                <div class="faq-one__wrp">
                    <div class="row g-5 g-lg-4 justify-content-between">
                        <div class="col-lg-4">
                            <div class="faq-one-left">
                                <div class="section-header">
                                    <h6>Câu hỏi thường gặp</h6>
                                    <h2 class="wow splt-txt" data-splitting>Curious about something?
                                        Just ask us!
                                    </h2>
                                    <p class="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">Stratify is
                                        here to address all your business and consultancy-related questions.
                                        If you have inquiries beyond what's <br />
                                        listed, feel free to email us!</p>
                                </div>
                                <a href="page-faq.html" class="btn-two wow fadeInUp mt-50" data-wow-delay="200ms"
                                    data-wow-duration="1500ms" data-splitting data-text="Browse More">Browse
                                    More</a>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="faq-one__accordion">
                                <div class="section-header mb-30">
                                    <h6>Tìm hiểu thêm về chúng tôi</h6>
                                    <h2 class="wow splt-txt" data-splitting>Câu hỏi thường gặp</h2>
                                </div>
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne" aria-expanded="true"
                                                aria-controls="collapseOne">
                                                What are the primary goals of your business?
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show"
                                            data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <p>We work with a variety of clients. We work with the heads of
                                                    municipalities'
                                                    transportation planning, traffic engineering, or economic
                                                    development
                                                    departments.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                aria-expanded="false" aria-controls="collapseTwo">
                                                How do you currently engage with them?
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" class="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <p>We work with a variety of clients. We work with the heads of
                                                    municipalities'
                                                    transportation planning, traffic engineering, or economic
                                                    development
                                                    departments.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                aria-expanded="false" aria-controls="collapseThree">
                                                What are the biggest challenges your business is facing right now?
                                            </button>
                                        </h2>
                                        <div id="collapseThree" class="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <p>We work with a variety of clients. We work with the heads of
                                                    municipalities'
                                                    transportation planning, traffic engineering, or economic
                                                    development
                                                    departments.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="accordion-item border-0">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                                aria-expanded="false" aria-controls="collapseFour">
                                                What differentiates your business from competitors?
                                            </button>
                                        </h2>
                                        <div id="collapseFour" class="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <p>We work with a variety of clients. We work with the heads of
                                                    municipalities'
                                                    transportation planning, traffic engineering, or economic
                                                    development
                                                    departments.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- FAQ area end here -->

        <!-- Brand area start here -->
        <div class="brand-area">
            <div class="row g-0">
                <div class="col-6 col-lg-2">
                    <div class="brand__item">
                        <img src="assets/images/brand/brand-image1.png" alt="image">
                    </div>
                </div>
                <div class="col-6 col-lg-2">
                    <div class="brand__item">
                        <img src="assets/images/brand/brand-image2.png" alt="image">
                    </div>
                </div>
                <div class="col-6 col-lg-2">
                    <div class="brand__item">
                        <img src="assets/images/brand/brand-image3.png" alt="image">
                    </div>
                </div>
                <div class="col-6 col-lg-2">
                    <div class="brand__item">
                        <img src="assets/images/brand/brand-image4.png" alt="image">
                    </div>
                </div>
                <div class="col-6 col-lg-2">
                    <div class="brand__item">
                        <img src="assets/images/brand/brand-image5.png" alt="image">
                    </div>
                </div>
                <div class="col-6 col-lg-2">
                    <div class="brand__item">
                        <img src="assets/images/brand/brand-image6.png" alt="image">
                    </div>
                </div>
            </div>
        </div>
        <!-- Brand area end here -->

        @include('contact.form')
        @include('home.post')

@endsection
