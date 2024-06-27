(function (e) {
    "use strict";
    function t() {
        var e = document.createElement("style");
        e.appendChild(document.createTextNode("@-ms-viewport { width: device-width; }"));
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            e.appendChild(document.createTextNode("@-ms-viewport { width: auto !important; }"))
        }
        document.getElementsByTagName("head")[0].appendChild(e)
    }

    function n(t) {
        return e(t).length > 0
    }

    function r() {
        return!!("ontouchstart"in window) || !!("onmsgesturechange"in window) && !!window.navigator.maxTouchPoints
    }

    function i() {
        e(".pie-chart").each(function () {
            var t = e(this);
            var n = t.parent().width();
            var r = t.attr("data-barSize");
            if (n < r) {
                r = n
            }
            t.css("height", r);
            t.css("width", r);
            t.css("line-height", r + "px");
            t.find("i").css({"line-height": r + "px", "font-size": r / 3})
        })
    }

    function s() {
        if (typeof e.fn.easyPieChart != "undefined") {
            e(".pie-chart:in-viewport").each(function () {
                var t = e(this);
                var n = t.parent().width();
                var r = t.attr("data-barSize");
                if (n < r) {
                    r = n
                }
                t.easyPieChart({animate: 1300, lineCap: "square", lineWidth: t.attr("data-lineWidth"), size: r, barColor: t.attr("data-barColor"), trackColor: t.attr("data-trackColor"), scaleColor: "transparent", onStep: function (t, n, r) {
                    e(this.el).find(".pie-chart-percent span").text(Math.round(r))
                }})
            })
        }
    }

    function o() {
        e(".milestone:in-viewport").each(function () {
            var t = e(this);
            var n = t.find(".milestone-value").attr("data-stop");
            var r = parseInt(t.find(".milestone-value").attr("data-speed"));
            if (!t.hasClass("already-animated")) {
                t.addClass("already-animated");
                e({countNum: t.find(".milestone-value").text()}).animate({countNum: n}, {duration: r, easing: "linear", step: function () {
                    t.find(".milestone-value").text(Math.floor(this.countNum))
                }, complete: function () {
                    t.find(".milestone-value").text(this.countNum)
                }})
            }
        })
    }

    function u() {
        e(".progress-bar .progress-bar-outer:in-viewport").each(function () {
            var t = e(this);
            if (!t.hasClass("already-animated")) {
                t.addClass("already-animated");
                t.animate({width: t.attr("data-width") + "%"}, 2e3)
            }
        })
    }

    function a() {
        if (typeof e.fn.parallax != "undefined") {
            e(".parallax").each(function () {
                var t = e(this);
                t.addClass("parallax-enabled");
                t.parallax("49%", .3, false)
            })
        }
    }

    function f() {
        if (typeof e.fn.validate != "undefined") {
            e("#contact-form").validate({errorClass: "validation-error", rules: {name: {required: true}, email: {required: true, email: true}, subject: {required: true}, message: {required: true}}, messages: {name: {required: "Field is required!"}, email: {required: "Field is required!", email: "Please enter a valid email address"}, subject: {required: "Field is required!"}, message: {required: "Field is required!"}}, submitHandler: function (t) {
                var n;
                e(t).ajaxSubmit({type: "POST", data: e(t).serialize(), url: "_layout/php/send.php", success: function (t) {
                    if (t == "OK") {
                        n = '<div class="alert success"><i class="fa fa-check-circle-o"></i>The message has been sent!</div>';
                        e("#contact-form").clearForm()
                    } else {
                        n = '<div class="alert error"><i class="fa fa-times-circle"></i>' + t + "</div>"
                    }
                    e("#formstatus").html(n)
                }, error: function () {
                    n = '<div class="alert error"><i class="fa fa-times-circle"></i>There was an error sending the message!</div>';
                    e("#formstatus").html(n)
                }})
            }})
        }
    }

    function c() {
        if (e(window).width() > l) {
            e("#mobile-menu").hide();
            e("#mobile-menu-trigger").removeClass("mobile-menu-opened").addClass("mobile-menu-closed")
        } else {
            if (!n("#mobile-menu")) {
                e("#menu").clone().attr({id: "mobile-menu", "class": "fixed"}).insertAfter("#header");
                e("#mobile-menu > li > a, #mobile-menu > li > ul > li > a").each(function () {
                    var t = e(this);
                    if (t.next().hasClass("sub-menu") || t.next().is("ul")) {
                        t.append('<span class="fa fa-angle-down mobile-menu-submenu-arrow mobile-menu-submenu-closed"></span>')
                    }
                });
                e(".mobile-menu-submenu-arrow").click(function (t) {
                    var n = e(this);
                    if (n.hasClass("mobile-menu-submenu-closed")) {
                        n.parent().siblings("ul").slideDown(300);
                        n.removeClass("mobile-menu-submenu-closed fa-angle-down").addClass("mobile-menu-submenu-opened fa-angle-up")
                    } else {
                        n.parent().siblings("ul").slideUp(300);
                        n.removeClass("mobile-menu-submenu-opened fa-angle-up").addClass("mobile-menu-submenu-closed fa-angle-down")
                    }
                    t.preventDefault()
                });
                e("#mobile-menu li, #mobile-menu li a, #mobile-menu ul").attr("style", "")
            }
        }
    }

    function h() {
        e("#mobile-menu-trigger").click(function (t) {
            var n = e(this);
            var r = e("#mobile-menu");
            if (n.hasClass("mobile-menu-opened")) {
                n.removeClass("mobile-menu-opened").addClass("mobile-menu-closed");
                r.slideUp(300)
            } else {
                n.removeClass("mobile-menu-closed").addClass("mobile-menu-opened");
                r.slideDown(300)
            }
            t.preventDefault()
        })
    }

    function p() {
        e(".accordion a.accordion-item-toggle").click(function (t) {
            var n = e(this).closest(".accordion-item").find(".accordion-item-content");
            e(this).closest(".accordion").find(".accordion-item-content").not(n).slideUp();
            if (e(this).hasClass("active")) {
                e(this).removeClass("active")
            } else {
                e(this).closest(".accordion").find(".accordion-item-toggle.active").removeClass("active");
                e(this).addClass("active")
            }
            n.stop(false, true).slideToggle();
            t.preventDefault()
        });
        e(".toggle a.toggle-item-toggle").click(function (t) {
            var n = e(this).closest(".toggle-item").find(".toggle-item-content");
            if (e(this).hasClass("active")) {
                e(this).removeClass("active")
            } else {
                e(this).addClass("active")
            }
            n.stop(false, true).slideToggle();
            t.preventDefault()
        })
    }

    function d() {
        if (e(window).width() > 767) {
            e(".left-side, .separator").equalCols()
        } else {
            e(".left-side, .right-side, .separator").css({"min-height": 0})
        }
        if (e(window).width() > 767) {
            e(".left-side, .right-side, .separator").css({"min-height": 0});
            e(".left-side, .right-side, .separator").equalCols()
        } else {
            e(".left-side, .right-side, .separator").css({"min-height": 0})
        }
    }

    var l = 979;
    e.fn.equalCols = function () {
        var t = function (e, t) {
            return t - e
        };
        var n = [];
        e(this).each(function () {
            n.push(e(this).height())
        });
        n.sort(t);
        var r = n[0];
        return this.each(function () {
            e(this).css({"min-height": r})
        })
    };
    e(document).ready(function () {
        t();
        i();
        s();
        o();
        u();
        if (!r()) {
            a()
        }
        f();
        c();
        h();
        p();
        d()
    });
    e(window).scroll(function () {
        o();
        s();
        u()
    });
    e(window).resize(function () {
        c();
        d()
    })
})(window.jQuery)