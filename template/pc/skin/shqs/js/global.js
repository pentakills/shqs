/**
 * Author: liu <roccoliu@gmail.com>
 * Date: 14-2-23
 * Update: 15-4-19
 */
window.onload = function() {
	$(".wrapper").prepend("<div id='tip_box'><div class='col' style='position: relative;display:none;'><p class='tip_box_item'>我们会使用cookies以使您在本网站有更好的访问体验。如您继续浏览或使用本网站，即视为您已同意我们对cookies的使用。想了解更多信息请查看我们的<a href='http://www.huaxiadnb.com/privacy.html' style='text-decoration:underline;'>隐私政策</a></p><a class='btn_close' onclick='closeTip()'><img src='/global/images/close.jpg' alt='' /></a></div></div>");

	if(getCookie("headtip") == 0) {
		document.getElementById("tip_box").style.display = "none";
	} else {
		document.getElementById("tip_box").style.display = "block";
		$(".header").css("padding-top","43px");
		$(".business-carousel.sticky-business .slides_pager").css("top","254px");
	}
}

//关闭底部广告
function closeTip() {
	document.getElementById("tip_box").style.display = "none";
	setCookie("headtip", "0");
	$(".header").css("padding-top","0");
	$(".business-carousel.sticky-business .slides_pager").css("top","212px");
}
//设置cookie 
function setCookie(name, value) {
	var exp = new Date();
	exp.setTime(exp.getTime() + 9 * 60 * 60 * 1000); //有效期1小时 
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//取cookies函数 
function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]);
	return null;
}
$.fn.extend({
    scrollFollow: function (d) {
        d = d || {};
        d.container = d.container || $(this).parent();
        d.bottomObj = d.bottomObj || '';
        d.bottomMargin = d.bottomMargin || 0;
        d.marginTop = d.marginTop || 0;
        d.marginBottom = d.marginBottom || 0;
        d.zindex = d.zindex || 2001;
        var e = $(window);
        var f = $(this);
        if (f.length <= 0) {
            return false;
        }
        // var g = f.position().top;
        var g = f.position().top + 86;
        // var h = d.container.height();
        var i = f.css('position');
        var j;
        if (d.bottomObj === '' || $(d.bottomObj).length <= 0) {
            j = false;
        } else {
            j = true;
        }
        e.scroll(function () {
            var b = f.height(),
                scrollTop,
                topPosition,
                cc;
            if (f.css('position') === i) {
                g = f.position().top + 86;
                // g = f.position().top;
            }
            scrollTop = e.scrollTop();
            topPosition = Math.max(0, g - scrollTop);
            // cc = $(d.bottomObj).position().top - d.marginBottom - d.marginTop;
            cc = $(d.bottomObj).offset().top - d.marginBottom - d.marginTop;
            if (j === true) {
                topPosition = Math.min(topPosition, cc - scrollTop - b);
            }
            if (scrollTop > g) {
                if (j === true && g + b > cc) {
                    f.css({ position: i, top: g });
                } else {
                    // if (window.XMLHttpRequest) {
                    f.css({ position: 'fixed', top: topPosition + d.marginTop, 'z-index': d.zindex });
                    // } else {
                    //     f.css({
                    //         position: 'absolute',
                    //         top: scrollTop + topPosition + d.marginTop + 'px',
                    //         'z-index': d.zindex
                    //     });
                    // }
                }
            } else {
                f.css({
                    position: i,
                    top: g
                });
            }
        });
        return this;
    }
});

$(function () {
    /**
     * 头部地区选择框
     * @name: #J_GlobalSelect
     */
    $('#J_GlobalSelect').on('click', function (e) {
        e.stopPropagation();
        if ($(this).hasClass('show')) {
            $(this).removeClass('show');
        } else {
            $(this).addClass('show');
        }
    });
    $(document).on('click', function (e) {
        if (e.target !== $('#J_GlobalSelect')) {
            $('#J_GlobalSelect').removeClass('show');
        }
    });

    /**
     * 特定元素随浏览器缩放居中
     */
    // $(window).bind('resize', function () {
    //     // bannerCenter();
    //     stickyCenter();
    // });

    /**
     * 头部跟随滚动
     * @name: #J_Sticky
     */
    // function stickyCenter () {
    //     if ($(window).width() < 1032) {
    //         $('#J_Sticky').css('width', '960px');
    //     } else if ($(window).width() > 1352) {
    //         $('#J_Sticky').css('width', '1280px');
    //     } else {
    //         var w = ($(window).width() - 72) + 'px';
    //         $('#J_Sticky').css('width', w);
    //     }
    // }
    // stickyCenter();

    var sticky = $('#J_Sticky');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            sticky.fadeIn(300);
        } else {
            sticky.fadeOut(300);
        }
    });

    /**
     * 头部导航 Navigation 伸缩菜单
     * @name: #J_Navigation
     * @name: #J_ExpandNavigation
     */
    $('#J_Navigation .expand').click(function (e) {
        e.preventDefault();
        // var index = $(this).index('.expand');
        var index = 0;
        if ($(this).hasClass('ck')) {
            $('#J_Navigation .expand.ck').find('s').hide();
            $('#J_ExpandNavigation').slideUp('1000', function () {
                $('#J_ExpandNavigation .expand-item').hide();
                $('#J_Navigation .expand').removeClass('ck');
            });
        } else {
            $(this).addClass('ck').siblings().removeClass('ck');
            $('#J_ExpandNavigation').slideDown('1000', function () {
                $('#J_ExpandNavigation .expand-item').hide().eq(index).fadeIn(300);
                $('#J_Navigation .expand').find('s').hide();
                $('#J_Navigation .expand.ck').find('s').show();
            });
        }
    });

    var timer  = null;
    $('#J_ExpandNavigation').mouseover(function () {
        clearInterval(timer);
    }).mouseout(function () {
        timer  = setTimeout(function () {
            $('#J_Navigation .expand.ck').find('s').hide();
            $('#J_ExpandNavigation').slideUp('1000', function () {
                $('#J_ExpandNavigation .expand-item').hide();
                $('#J_Navigation .expand').removeClass('ck');
            });
        }, 1000);
    });

    /**
     * 首页 banner 滚动
     * @name: #J_BannerCarousel
     */

    $('#J_BannerCarousel .jcarousel').jcarousel({
        wrap: 'circular'
    }).jcarouselAutoscroll({
        interval: 5000,
        target: '+=1',
        autostart: true
    }).on('mouseover', function () {
        $(this).jcarouselAutoscroll('stop');
    }).on('mouseout', function () {
        $(this).jcarouselAutoscroll('start');
    });

    $('#J_BannerCarousel .jcarousel-control-prev').on('jcarouselcontrol:active', function () {
        $(this).removeClass('inactive');
    }).on('jcarouselcontrol:inactive', function () {
        $(this).addClass('inactive');
    }).jcarouselControl({
        target: '-=1'
    });

    $('#J_BannerCarousel .jcarousel-control-next').on('jcarouselcontrol:active', function () {
        $(this).removeClass('inactive');
    }).on('jcarouselcontrol:inactive', function () {
        $(this).addClass('inactive');
    }).on('click', function (e) {
        e.preventDefault();
    }).jcarouselControl({
        target: '+=1'
    });


    $('#J_BannerCarousel .jcarousel-pagination').on('jcarouselpagination:active', 'li', function () {
        $(this).addClass('active');
    }).on('jcarouselpagination:inactive', 'li', function () {
        $(this).removeClass('active');
    }).on('click', function (e) {
        e.preventDefault();
    }).jcarouselPagination({
        item: function () {
            return '<li></li>';
        }
    });


    /**
     * 问答伸缩折叠
     * @name: .fold-title
     */
    $('.fold-title').click(function () {
        if ($(this).hasClass('bg-minus')) {
            $(this).removeClass('bg-minus');
            $(this).next('.fold-content').slideUp(500);
        } else {
            $(this).addClass('bg-minus');
            $(this).next('.fold-content').slideDown(500);
        }
    });

    /**
     * 回到顶部
     * @name: #goToTop
     */
    function goTopButton() {
        // var a = arguments[0] ? arguments[0] : 0;
        var b = '<style type="text/css">';
        b += '#goToTop{position:fixed;display:block;bottom:20px;right:20px;z-index:2002;}';
        b += '#goToTop a{display:block;width:72px;height:72px;background:url("/global/images/bg_scrollTop.png") no-repeat 0 0;text-indent:-100%;overflow:hidden;}';
        b += '</style>';
        var c = 300;
        var d = '<div id="goToTop"><a href="#">回到顶部</a></div>';
        $('.left-shadow').append(b).append(d);
        // var e = '';
        // if ($('.shell').length) {
        //     e = $('.shell');
        // }
        if ($(window).scrollTop() < c) {
            $('#goToTop').hide();
        }
        $(window).scroll(function () {
            if ($(this).scrollTop() < c) {
                $('#goToTop').hide();
            } else {
                $('#goToTop').show();
            }
        });
        $('#goToTop a').click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 'slow');
            return false;
        });
    }
    goTopButton();

    /**
     * 左侧跟随滚动
     * @name: #J_ColSubSticky
     */
    $('#J_ColSubSticky').scrollFollow({
        bottomObj: '.footer',
        marginTop: 118,
        //marginTop: 0,
        marginBottom: 20
    });

    /**
     * tab
     * @name: #J_Trainingtab
     */
    var tabTrigger = $("#J_Trainingtab .hd a");
    tabTrigger.on('click', function () {
        $(this).addClass("ck").siblings().removeClass("ck");
        var index = tabTrigger.index(this);
        $("#J_Trainingtab .bd > div").eq(index).show().siblings().hide();
    });

    /**
     * 讲师介绍/客户感言
     * @name: #J_TeacherinfoJcarousel
     * @name: #J_CustomerFeedbackJcarousel
     */
    $('#J_TeacherinfoJcarousel .jcarousel, #J_CourseinfoJcarousel .jcarousel').jcarousel({
        wrap: 'circular'
    }).jcarouselAutoscroll({
        interval: 3000,
        target: '+=1',
        autostart: true
    });

    $('#J_TeacherinfoJcarousel .jcarousel, #J_CourseinfoJcarousel .jcarousel').mouseover(function () {
        $(this).jcarouselAutoscroll('stop');
    });
    $('#J_TeacherinfoJcarousel .jcarousel, #J_CourseinfoJcarousel .jcarousel').mouseout(function () {
        $(this).jcarouselAutoscroll('start');
    });

    $('#J_TeacherinfoJcarousel .jcarousel-control-prev, #J_CourseinfoJcarousel .jcarousel-control-prev')
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .on('click', function (e) {
            e.preventDefault();
        })
        .jcarouselControl({
            target: '-=1'
        });

    $('#J_TeacherinfoJcarousel .jcarousel-control-next, #J_CourseinfoJcarousel .jcarousel-control-next')
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .on('click', function (e) {
            e.preventDefault();
        })
        .jcarouselControl({
            target: '+=1'
        });

    $('#J_CustomerFeedbackJcarousel .jcarousel').jcarousel({
        wrap: 'circular',
        vertical: true
    }).jcarouselAutoscroll({
        interval: 3000,
        target: '+=1',
        autostart: true
    });

    $('#J_CustomerFeedbackJcarousel .jcarousel').mouseover(function () {
        $(this).jcarouselAutoscroll('stop');
    });
    $('#J_CustomerFeedbackJcarousel .jcarousel').mouseout(function () {
        $(this).jcarouselAutoscroll('start');
    });

    /**
     * 隔行变色
     * @name: .table-l .table-r
     */
    $('.table tr:even').addClass('row-bg');

    /**
     * Tooltips
     * @name: .bubble-info
     */
    $('.bubble-info').each(function () {
        var distance = 0;
        var time = 100;
        var hideDelay = 50;
        var hideDelayTimer = null;
        var beingShown = false;
        var shown = false;
        var trigger = $('.bubble-trigger', this);
        var info = $('.bubble-popup', this).css('opacity', 0);
        var infoH = ($('.bubble-popup', this).height() / 2);
        var triggerW = ($('.bubble-trigger', this).width() + 10);

        $([trigger.get(0), info.get(0)]).mouseover(function () {
            if (hideDelayTimer) {
                clearTimeout(hideDelayTimer);
            }
            if (beingShown || shown) {
                // don't trigger the animation again
                return;
            } else {
                // reset position of info box
                beingShown = true;

                info.css({
                    top: -infoH,
                    left: triggerW,
                    width: 245,
                    display: 'block'
                }).animate({
                    top: '-=' + distance + 'px',
                    opacity: 1
                }, time, 'swing', function () {
                    beingShown = false;
                    shown = true;
                });
            }

            return false;
        }).mouseout(function () {
            if (hideDelayTimer) {
                clearTimeout(hideDelayTimer);
            }
            hideDelayTimer = setTimeout(function () {
                hideDelayTimer = null;
                info.animate({
                    top: '-=' + distance + 'px',
                    opacity: 0
                }, time, 'swing', function () {
                    shown = false;
                    info.css('display', 'none');
                });

            }, hideDelay);

            return false;
        });
    });
});

/**
 * GA
 */
// (function (i, s, o, g, r, a, m) {
//     i['GoogleAnalyticsObject'] = r;
//     i[r] = i[r] || function () {
//         (i[r].q = i[r].q || []).push(arguments)
//     }, i[r].l = 1 * new Date();
//     a = s.createElement(o),
//         m = s.getElementsByTagName(o)[0];
//     a.async = 1;
//     a.src = g;
//     m.parentNode.insertBefore(a, m)
// })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

// ga('create', 'UA-50450508-1', 'auto');
// ga('send', 'pageview');


/**
 * 首页 business 滚动
 * @name: #J_BusinessCarousel
 */
var Personas;
if (!Personas) {
    Personas = {
        active: null,
        menuOffset: 60,
        init: function () {
            for (var i = 0; i < $("#J_BusinessCarousel .slides_container li").length; i++) {
                var b = $("#J_BusinessCarousel .slides_container li").eq(i).offset().top;
                Personas.role[i] = b
            }
        },
        role: new Array(),
        scrollBy: function () {
            for (i = 0; i < Personas.role.length; i++) {
                if ($(window).scrollTop() > Personas.role[i] - $("#J_Sticky").height() - Personas.menuOffset && Personas.active != i) {
                    $("#J_BusinessCarousel .slides_pager li.ck").removeClass("ck");
                    $("#J_BusinessCarousel .slides_pager li").eq(i).addClass("ck");
                    Personas.active = i
                }
            }
        },
        stickPersonas: function () {
            if ($(window).scrollTop() >= ($("#J_BusinessCarousel").offset().top - $("#J_Sticky").height())) {
                $("#J_BusinessCarousel").addClass("sticky-business");
                Personas.init()
            } else {
                $("#J_BusinessCarousel").removeClass("sticky-business");
                Personas.init()
            }
        },
        toggleRole: function (a) {
            Personas.target = $("#J_BusinessCarousel .slides_container li").eq(a);
            $("html, body").animate({
                scrollTop: Math.round(Personas.target.offset().top - ($("#J_Sticky").height() + 45))
            }, 500, "swing", function() {
                if (Personas.target.hasClass("ck")) {
                    return
                } else {
                    $("#J_BusinessCarousel .slides_pager li.ck").removeClass("ck");
                    $("#J_BusinessCarousel .slides_pager li").eq(a).addClass("ck")
                }
            })
        }
    }
}
$(document).ready(function () {
    Personas.init();
    $("#J_BusinessCarousel .slides_pager li").on({
        click: function (a) {
            a.preventDefault();
            Personas.active = $(this).index();
            Personas.toggleRole(Personas.active)
        }
    });
    $(window).on({
        resize: function (a) {
            Personas.stickPersonas()
        },
        scroll: function () {
            Personas.stickPersonas();
            Personas.scrollBy()
        },
        touchstart: function (a) {
            Personas.stickPersonas()
        },
        touchend: function (a) {
            Personas.stickPersonas()
        }
    })
});



/* 文章内容部分 图片滚动 yzh-20150602  */


function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name]
	}
	else
	{
		return getComputedStyle(obj,false)[name]
	}
}

//function getByClass(oParent,nClass)
//{
//	var eLe = oParent.getElementsByTagName('*');
//	var aRrent  = [];
//	for(var i=0; i<eLe.length; i++)
//	{
//		if(eLe[i].className == nClass)
//		{
//			aRrent.push(eLe[i]);
//		}
//	}
//	return aRrent;
//}

function startMove(obj,att,add)
{
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){
	   var cutt = 0 ;
	   if(att=='opacity')
	   {
		   cutt = Math.round(parseFloat(getStyle(obj,att)));
	   }
	   else
	   {
		   cutt = Math.round(parseInt(getStyle(obj,att)));
	   }
	   var speed = (add-cutt)/4;
	   speed = speed>0?Math.ceil(speed):Math.floor(speed);
	   if(cutt==add)
	   {
		   clearInterval(obj.timer)
	   }
	   else
	   {
		   if(att=='opacity')
		   {
			   obj.style.opacity = (cutt+speed)/100;
			   obj.style.filter = 'alpha(opacity:'+(cutt+speed)+')';
		   }
		   else
		   {
			   obj.style[att] = cutt+speed+'px';
		   }
	   }
	   
	},30)
}
//手机和pc的判断
$(function(){
	if($(window).width() > 750) {
		$('#attr11').val('PC')
	}else{
		$('#attr11').val('手机');
	}
})
//window.onload = function()
//{
//	  var oDiv = document.getElementById('playBox');
//	  var oPre = getByClass(oDiv,'pre')[0];
//	  var oNext = getByClass(oDiv,'next')[0];
//	  var oUlBig = getByClass(oDiv,'oUlplay')[0];
//	  var aBigLi = oUlBig.getElementsByTagName('li');
//	  var oDivSmall = getByClass(oDiv,'smalltitle')[0]
//	  var aLiSmall = oDivSmall.getElementsByTagName('li');
//	  
//	  function tab()
//	  {
//	     for(var i=0; i<aLiSmall.length; i++)
//	     {
//		    aLiSmall[i].className = '';
//	     }
//	     aLiSmall[now].className = 'thistitle'
//	     startMove(oUlBig,'left',-(now*aBigLi[0].offsetWidth))
//	  }
//	  var now = 0;
//	  for(var i=0; i<aLiSmall.length; i++)
//	  {
//		  aLiSmall[i].index = i;
//		  aLiSmall[i].onclick = function()
//		  {
//			  now = this.index;
//			  tab();
//		  }
//	 }
//	  oPre.onclick = function()
//	  {
//		  now--
//		  if(now ==-1)
//		  {
//			  now = aBigLi.length;
//		  }
//		   tab();
//	  }
//	   oNext.onclick = function()
//	  {
//		   now++
//		  if(now ==aBigLi.length)
//		  {
//			  now = 0;
//		  }
//		  tab();
//	  }
//	  var timer = setInterval(oNext.onclick,3000) //滚动间隔时间设置
//	  oDiv.onmouseover = function()
//	  {
//		  clearInterval(timer)
//	  }
//	   oDiv.onmouseout = function()
//	  {
//		  timer = setInterval(oNext.onclick,3000) //滚动间隔时间设置
//	  }
//}
/* 文章内容部分 图片滚动 yzh-20150602 - end  */