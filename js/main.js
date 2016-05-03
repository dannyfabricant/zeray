(function( $ ) {
    var open = false;
    var vectors;

    $.fn.bounce = function(options) {
        
        var settings = $.extend({
            speed: 10
        }, options);

        return $(this).each(function() {
            
            var nums = [1, -1];
            var directionX = nums[Math.floor(Math.random()*2)];
            var directiony = nums[Math.floor(Math.random()*2)];
            var $this = $(this),
                $parent = $this.parent(),
                height = $parent.height(),
                width = $parent.width(),
                top = Math.floor(Math.random() * (height - $this.height())),
                left = Math.floor(Math.random() * (width - $this.width())),
                // vectorX = (Math.random(2) * settings.speed) + 0.5,
                // vectorX = vectorX * (Math.random() < 0.5 ? 1 : -1),
                // vectorY = (Math.random(2) * settings.speed) + 0.5,
                // vectorY = vectorY * (Math.random() < 0.5 ? 1 : -1);
                vectorX = (Math.floor(Math.random() * 3) + 1),
                vectorY = (Math.floor(Math.random() * 3) + 1);
            $this.data('vector', {
                'x': vectorX * directionX,
                'y': vectorY * directiony
            });
            

            var move = function($e) {
                
                var offset = $e.offset(),
                    position = $e.position(),
                    width = $e.width(),
                    height = $e.height(),
                    vector = $e.data('vector'),
                    $parent = $e.parent();
                // console.log($e.data('vector'));
                if (offset.left <= 0) {
                    vector.x = -1 * vector.x;
                }
                if ((offset.left + width) >= $parent.width()) {
                    offset.left = $parent.width() - width;
                    vector.x = -1 * vector.x;
                }
                if (offset.top <= 0) {
                    vector.y = -1 * vector.y;
                }
                if ((offset.top + height) >= $parent.height()) {
                    offset.top = $parent.height() - height;
                    vector.y = -1 * vector.y;
                }

                if(open == false) {
                    $e.css({
                    'top': offset.top + vector.y,
                    'left': offset.left + vector.x
                    }).data('vector', {
                        'x': vector.x,
                        'y': vector.y
                    });
                } else {
                    $e.css({
                    'top': offset.top + 'px',
                    'left': offset.left + 'px'
                    }).data('vector', {
                        'x': vector.x,
                        'y': vector.y
                    });
                }
                
                // if (open == false) {
                    setTimeout(function() {
                        move($e);
                    }, 50);
                // } else {}
            };

            move($this);
        });

    };
        

    $(window).load(function(){
        $('p').each(function() {
            var $this = $(this);
            if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                $this.remove();
        });

        $('.left, .right').click(function() {
            var $this = $(this);
            moveSlider($this);
        });

        $('.catalog').click(function(){
            $(this).addClass('open');
            $('#catalog').fadeIn(1000);
            $('.close').fadeIn();
            $('.catalog').addClass('open');
            open = true;

            $(".close").on("click", function(){
                $('#catalog').fadeOut(600);
                $('.close').fadeOut(600);
                $('.catalog').removeClass('open');
                open = false;
            });
        })

        bounceSetup()
        gallerySetup();
    });

    function bounceSetup() {
        var bounce = $("div[bouncy='ball']");

        $(bounce).click(function() {
            $this = $(this);
            openpost($this);
        });
        $(bounce).bounce({
            'speed': 1
        });

        $(bounce).click(function() {
            if (open == false) {
                open = true;
            }
        });

        $(bounce).each(function() {
            
            var $this = $(this),
                $parent = $this.parent(),
                height = $parent.height(),
                width = $parent.width(),
                top = Math.floor(Math.random() * (height - $this.height())),
                left = Math.floor(Math.random() * (width - $this.width()));

            $this.css({
                'top': top,
                'left': left
            });
        });
    }

    function openpost($this) {
        var $this = $this,
            cl = $this.attr('class'),
            id = "#" + cl;

        $('#catalog').fadeIn();
        $('.close').fadeIn();
        $('.catalog').addClass('open');

        var scrolltop = $(id).offset().top;
        $('#catalog').animate({
            'scrollTop': scrolltop - 100
        }, 400);
        
        var pictures = $(id).children('.gallery').children('.gallery-item');

        $(pictures).each(function() {

        });

        // $(pictures).each(function() {
        //     var $this = $(this),
        //         width = $this.width(),
        //         left = width/2;

        //     $this.css({
        //         'margin-left': left
        //     });
        // });

        $(".close").on("click", function(){
            $('#catalog').fadeOut();
            $('.close').fadeOut();
            $('.catalog').removeClass('open');
            open = false;
        });
    }

    function gallerySetup() {
        $('.gallery .gallery-item').each( function() {
            var rotation,
                portrait = (Math.random() * 4) * (Math.random() < 0.5 ? 1 : -1),
                landscape = (Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1);

            if ($(this).children('.gallery-icon').is('.portrait')) {
                rotation = portrait;
            } else if($(this).children('.gallery-icon').is('.landscape')) {
                rotation = landscape;
            }

            $(this).css({
                '-ms-transform': 'rotate(' + rotation + 'deg)', /* IE 9 */
                '-webkit-transform': 'rotate(' + rotation + 'deg)', /* Chrome, Safari, Opera */
                'transform': 'rotate(' + rotation + 'deg)'
            });
        });
        // $('.project .title').each( function() {
        //     var rotation = (Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1);

        //     $(this).css({
        //         '-ms-transform': 'rotate(' + rotation + 'deg)', /* IE 9 */
        //         '-webkit-transform': 'rotate(' + rotation + 'deg)', /* Chrome, Safari, Opera */
        //         'transform': 'rotate(' + rotation + 'deg)'
        //     });
        // });

        $('.gallery .gallery-item:nth-of-type(1)').addClass('show');
    }

    function moveSlider($this) {
        var $this = $this;
        var galleryid = '.galleryid-' + $this.parent().attr('gallery');

        if($this.is('.left')) {
           var index = $(galleryid).children('.show').index(),
                max = $(galleryid).children('.gallery-item').length;
            var newindex = index - 1 < 0 ? max-1 : index - 1;

            var oldImg = $(galleryid).children('.show');
            var newImg = galleryid +' .gallery-item';
            
            $(newImg).eq(newindex).css({'margin-left': ($(galleryid).width() + 20) * -1 + 'px'});
            oldImg.animate({
                'margin-left': $(galleryid).width() + 20 + 'px',
                'opacity': 0
            }, 300);

            setTimeout(function() {
                oldImg.removeClass('show');
                $(newImg).eq(newindex).addClass('show');
                $(newImg).eq(newindex).animate({
                    'margin-left' : '0px',
                    'opacity': 1
                },500);
            }, 550);    
            console.log(newImg);


        } else if($this.is('.right')) {
            var index = $(galleryid).children('.show').index(),
                max = $(galleryid).children('.gallery-item').length;
            var newindex = index + 1 == max ? 0 : index + 1;

            var oldImg = $(galleryid).children('.show');
            var newImg = galleryid +' .gallery-item';

            $(newImg).eq(newindex).css({'margin-left': $(galleryid).width() + 20 + 'px'});
            oldImg.animate({
                'margin-left': ($(galleryid).width() + 20) * -1 + 'px',
                'opacity': 0
            },300);

            setTimeout(function() {
                oldImg.removeClass('show');
                $(newImg).eq(newindex).addClass('show');
                $(newImg).eq(newindex).animate({
                    'margin-left' : '0px',
                    'opacity': 1
                },500);
            }, 550);    
        }
    }
})(jQuery);