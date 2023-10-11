/* ==================================================
	Theme Name: Business Coach Template
    Theme URL: https://www.ogwebsolutions.com/
    Author: OG Websolutions Pvt. Ltd.
    Version:  1.0
===================================================== */
jQuery(document).ready(function($) {
   
    var counters = $(".count");

    var countersQuantity = counters.length;

    var counter = [];
    
        /* ==================================================
          Counter
        ================================================== */
    

    for (i = 0; i < countersQuantity; i++) {

        counter[i] = parseInt(counters[i].innerHTML);

    }

    var count = function(start, value, id) {

        var localStart = start;

        setInterval(function() {

            if (localStart < value) {

                localStart++;

                counters[id].innerHTML = localStart;

            }

        }, 0.1);

    }
    for (j = 0; j < countersQuantity; j++) {

        count(0, counter[j], j);

    }

    /*const counters = document.querySelectorAll(".count");
    const speed = 200;

  counters.forEach((counter) => {
   const updateCount = () => {
    const target = parseInt(+counter.getAttribute("data-target"));
    const count = parseInt(+counter.innerText);
    const increment = Math.trunc(target / speed);
    console.log(increment);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(updateCount, 1);
    } else {
      count.innerText = target;
    }
  };
  updateCount();
   });*/

    /*=========================================
		# Header
	=========================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $('header').addClass('fixed');
        } else {
            $('header').removeClass('fixed');
        }
    })

    /*=========================================
        Back to top button
    =========================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.backtotop').fadeIn(100);
        } else {
            $('.backtotop').fadeOut(100);
        }
    });
    $('.backtotop').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 100);
        return false;
    });
    
    /* ==================================================
        Preloader
    ================================================== */
    $(window).on('load', function() {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function() {
              $(this).remove();
            });
         }
    });
    /*================================================== 
        Copyright year auto update 
    ================================================== */
    $('#copy_rightYears').html(new Date().getFullYear());

    /*=========================================
        Registration Form
    =========================================*/
    if ($("#consultationForm").length) {
        $('#consultationForm').validate({
            errorPlacement: function(error, element) {
                return true;
            },
            rules: {
                email: {
                    required: true,
                    email: true
                },
            },
            submitHandler: function(form) {
                var formData = $('#consultationForm').serialize();
                $.ajax({
                    type: 'POST',
                    url: 'assets/php/popup-form.php',
                    dataType: "json",
                    data: formData,
                    success: function(data) {
                        if (data.success) {
                            $('.form-status').addClass('alert alert-success');
                            $('.form-status').text('Your Message Has been Sent Successfully');
                            form.submit();
                            $('.form-status').slideDown().delay(3000).slideUp();
                            $("#consultationForm").trigger("reset");
                            window.location.href = 'order.html';
                        } else {
                            $('.form-status').addClass('alert alert-danger');
                            $('.form-status').text('Error Occurred, Please Try Again');
                            $('.form-status').slideDown().delay(3000).slideUp();
                        }
                    },
                    error: function(xhr, status, error) {
                        $('.form-status').addClass('alert alert-danger');
                        $('.form-status').text('Something Went Wrong');
                        $('.form-status').slideDown().delay(3000).slideUp();
                    }
                });
            }
        });
    }
    /*=========================================
        Order Form
    =========================================*/
    if ($("#order-form").length) {
        $("#order-form").validate({
            errorPlacement: function(error, element) {
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
                },
                billing_address: {
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
            submitHandler: function(form) {
                var formData = $('#order-form').serialize();
                $.ajax({
                    type: 'POST',
                    url: 'assets/php/order-form.php',
                    dataType: "json",
                    data: formData,
                    success: function(data) {
                        if (data.success) {
                            $('.form-status').addClass('alert alert-success');
                            $('.form-status').text('Your Message Has been Sent Successfully');
                            $('.form-status').slideDown().delay(3000).slideUp();
                            $("#order-form").trigger("reset");
                            form.submit();
                        } else {
                            $('.form-status').addClass('alert alert-danger');
                            $('.form-status').text('Error Occurred, Please Try Again');
                            $('.form-status').slideDown().delay(3000).slideUp();
                        }
                    },
                    error: function(xhr, status, error) {
                        $('.form-status').addClass('alert alert-danger');
                        $('.form-status').text('Something Went Wrong');
                        $('.form-status').slideDown().delay(3000).slideUp();
                    }
                });
            }
        });
    }



});



/* ================================================== 
   FAQ 
================================================== */
function close_accordion_section() {
    $('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}

$('.accordion-section-title').click(function(e) {
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