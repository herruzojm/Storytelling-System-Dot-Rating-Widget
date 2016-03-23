/* ============================================
 * Storytelling System Dot Rating Widget v1.1
 * ========================================= */

(function ($) {
    "use strict";
    function SetDotRating(element, value) {
        element.children(".ss-dot").removeClass("ss-dot-marked");

        if(element.data("dot-color-empty")) {
          element.children(".ss-dot").css("background-color", element.data("dot-color-empty"));
        }

        if(element.data("dot-color-border")) {
          element.children(".ss-dot").css("border-color", element.data("dot-color-border"));
        }

        if(element.data("dot-color-marked")) {
          element.children(".ss-dot").slice(0, value).css("background-color", element.data("dot-color-marked"));
        }

        if (value > element.data("dot-min")) {
            element.children(".ss-dot").slice(0, value).addClass("ss-dot-marked");
            element.data("dot-value", value);
        } else {
            element.children(".ss-dot").slice(0, element.data("dot-min")).css("background-color", element.data("dot-color-marked"));
            element.children(".ss-dot").slice(0, element.data("dot-min")).addClass("ss-dot-marked");
            element.data("dot-value", element.data("dot-min"));
        }
    }

    $.fn.DotRating = function () {
        var max, value;
        max = this.data("dot-max");
        value = this.data("dot-value");
        var hasAttr = this.attr("readonly");
        var readOnly = false;
        if (typeof hasAttr !== typeof undefined && hasAttr !== false) {
            readOnly = true;
        }

        var basicClass;
        if (readOnly) {
            basicClass = "<div class='ss-dot readonly'></div>";
        } else {
            basicClass = "<div class='ss-dot clickclable'></div>";
        }
        this.html((new Array(max + 1)).join(basicClass));
        SetDotRating(this, value);
        if (this.data("dot-is-squared") === true) {
            this.children(".ss-dot").addClass("ss-dot-xmark");
        }

        if (!readOnly) {
            this.click(function (e) {
                var target = $(e.target);
                if (target.attr("id") !== $(this).attr("id")) {
                    SetDotRating($(this), $(this).children(".ss-dot").index(target) + 1);
                } else {
                    SetDotRating($(this), 0);
                }
            });
        }
    };

})(window.jQuery);
