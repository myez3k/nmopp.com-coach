
/*=========================================
# Document Ready
=========================================*/
$(document).ready(function ($) {


/*=========================================
	## Smooth Scroll
=========================================*/

$(".navbar a[href^='#'], .hero-section a[href^='#']").on('click', function (event) {
	event.preventDefault();
	var $anchor = $(this);
	$('html, body').stop().animate({
		scrollTop: $($anchor.attr('href')).offset().top - 60
	}, 300);
});
/*==================================================
		FAQ Section
	==================================================*/
function close_accordion_section() {
	$('.accordion .accordion-section-title').removeClass('active');
	$('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}

$('.accordion-section-title').click(function (e) {
	// Grab current anchor value
	var currentAttrValue = $(this).attr('href');

	if ($(e.target).is('.active')) {
		close_accordion_section();
	} else {
		close_accordion_section();

		// Add active class to section title
		$(this).addClass('active');
		// Open up the hidden content panel
		$('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
	}
	e.preventDefault();
});
/* ================================================== */
/* ##. Order Form */
/* ================================================== */
if ($("#order-form").length) {
	$("#order-form").validate({
		errorPlacement: function (error, element) {
			return true;
		},
		rules: {
			first_name: {
				required: true,
				minlength: 3
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true,
				number: true,
				minlength: 10
			},
			shipping_address: {
				required: true,
			},
			city: {
				required: true,
			},
			state: {
				required: true,
			},
			zip: {
				required: true,
			},
			country: {
				required: true,
			}
		},
		submitHandler: function (form) {
			var formData = $('#order-form').serialize();
			$.ajax({
				type: 'POST',
				url: 'assets/php/order-form.php',
				dataType: "json",
				data: formData,
				success: function (data) {
					if (data.success) {
						$('.form-status').addClass('alert alert-success');
						$('.form-status').text('Your Message Has been Sent Successfully');
						$('.form-status').slideDown().delay(3000).slideUp();
						$("#order-form").trigger("reset");
						form.submit();
					} else {
						$('.form-status').addClass('alert alert-danger');
						$('.form-status').text('SMTP connect() failed.');
						$('.form-status').slideDown().delay(3000).slideUp();
					}
				},
				error: function (xhr, status, error) {
					$('.form-status').addClass('alert alert-danger');
					$('.form-status').text('Something Went Wrong');
					$('.form-status').slideDown().delay(3000).slideUp();
				}
			});
		}
	});
}


/*=========================================
	## Back To Top
=========================================*/
$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		$('.backtotop').fadeIn(100);
	} else {
		$('.backtotop').fadeOut(100);
	}
});
$('.backtotop').click(function () {
	$("html, body").animate({ scrollTop: 0 }, 100);
	return false;
});

/* ================================================== */
/* Footer Copyrights Year. */
/* ================================================== */
document.getElementById("copyright_year").innerHTML = new Date().getFullYear();


});