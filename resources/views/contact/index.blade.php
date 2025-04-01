@extends('layout.app')

@section('title', 'Liên hệ')
@section('meta_description', 'Liên hệ với chúng tôi')

@section('content')
<!-- Breadcrumb area start here -->
<section class="breadcrumb-area" data-background="assets/images/banner/banner-inner.jpg">
    <div class="container">
        <div class="breadcrumb__wrp">
            <div class="breadcrumb__item">
                <h1 class="title">Liên hệ</h1>
                <ul>
                    <li><a href="{{ route('home') }}">Trang chủ</a></li>
                    <li><i class="fa-light fa-angle-right"></i></li>
                    <li>Liên hệ</li>
                </ul>
            </div>
        </div>
    </div>
</section>
<!-- Breadcrumb area end here -->

<!-- Contact Area start -->
<section class="contact-area pt-120 pb-120">
    <div class="container">
        <div class="contact__bottom">
            <div class="row">
                <div class="col-lg-6">
                    <div class="contact__info ml-30">
                        <h3 class="section-heading__title mb-30">Thông tin liên hệ</h3>
                        <div class="contact__infowrapper">
                            <div class="contact__item">
                                <div class="contact__item-icon">
                                    <i class="icon-location"></i>
                                </div>
                                <div class="contact__item-content">
                                    <h5>Địa chỉ văn phòng</h5>
                                    <p>{{ $getConfig('address', '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh') }}</p>
                                </div>
                            </div>
                            <div class="contact__item">
                                <div class="contact__item-icon">
                                    <i class="icon-email"></i>
                                </div>
                                <div class="contact__item-content">
                                    <h5>Email</h5>
                                    <p><a href="mailto:{{ $getConfig('email', 'info@example.com') }}">{{ $getConfig('email', 'info@example.com') }}</a></p>
                                </div>
                            </div>
                            <div class="contact__item">
                                <div class="contact__item-icon">
                                    <i class="icon-phone"></i>
                                </div>
                                <div class="contact__item-content">
                                    <h5>Điện thoại</h5>
                                    <p><a href="tel:{{ $getConfig('phone', '0123456789') }}">{{ $getConfig('phone', '0123456789') }}</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="contact__form">
                        <h3 class="section-heading__title mb-30">Gửi thông tin liên hệ</h3>
                        <form id="contactForm">
                            <div class="alert alert-success d-none" id="contactSuccess">
                                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                            </div>
                            <div class="alert alert-danger d-none" id="contactError">
                                Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group mb-30">
                                        <input type="text" class="form-control" name="name" id="name" placeholder="Họ tên *" required>
                                        <div class="invalid-feedback" id="nameError"></div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group mb-30">
                                        <input type="email" class="form-control" name="email" id="email" placeholder="Email *" required>
                                        <div class="invalid-feedback" id="emailError"></div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group mb-30">
                                        <input type="text" class="form-control" name="phone" id="phone" placeholder="Số điện thoại">
                                        <div class="invalid-feedback" id="phoneError"></div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group mb-30">
                                        <input type="text" class="form-control" name="subject" id="subject" placeholder="Tiêu đề *" required>
                                        <div class="invalid-feedback" id="subjectError"></div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group mb-30">
                                        <textarea class="form-control" name="message" id="message" rows="5" placeholder="Nội dung *" required></textarea>
                                        <div class="invalid-feedback" id="messageError"></div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <button type="submit" class="btn-one mt-2" id="submitButton">Gửi liên hệ</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- Contact Area end -->

<!-- Map Area Start -->
<div class="map-area">
    <iframe src="{{ $getConfig('google_map', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5177580567037!2d106.69877911414062!3d10.771594092323582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1618229379252!5m2!1svi!2s') }}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
</div>
<!-- Map Area End -->
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        const submitButton = document.getElementById('submitButton');
        const successAlert = document.getElementById('contactSuccess');
        const errorAlert = document.getElementById('contactError');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset any error messages
            document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
            document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
            successAlert.classList.add('d-none');
            errorAlert.classList.add('d-none');
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';
            
            // Gather form data
            const formData = new FormData(contactForm);
            
            // Send ajax request
            fetch('{{ route('contact.submit') }}', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    successAlert.textContent = data.message;
                    successAlert.classList.remove('d-none');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Handle validation errors
                    if (data.errors) {
                        Object.keys(data.errors).forEach(field => {
                            const errorEl = document.getElementById(field + 'Error');
                            if (errorEl) {
                                errorEl.textContent = data.errors[field][0];
                                document.getElementById(field).classList.add('is-invalid');
                            }
                        });
                    } else {
                        // Show general error message
                        errorAlert.textContent = data.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.';
                        errorAlert.classList.remove('d-none');
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorAlert.textContent = 'Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.';
                errorAlert.classList.remove('d-none');
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Gửi liên hệ';
            });
        });
    });
</script>
@endsection
