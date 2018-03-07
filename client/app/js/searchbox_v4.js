function getTripType(q, r) {
    if (!q || !r) return "holiday";
    q = diffDays(r, q);
    return 3 >= q ? "business": 6 >= q ? "shortbreak": "holiday"
}
var FSearchHistory = function() {
    function q() {
        var d = $("#hisPanel"),
        n = 0 < $("#account-username:visible").length,
        h = $.totalStorage("flight-search-history2");
        if (0 != d.length) {
            if (h && 0 < h.length) {
                if (n && !h[0].id) {
                    FSearchHistory.uploadList();
                    return
                } ! n && h[0].id && ($.totalStorage.deleteItem("flight-search-history2"), h = [])
            }
            if (h && 0 < h.length) {
                for (var d = d.find("ul").empty(), n = 0, q = h.length; n < q; n++) d.append('<li><a target="_blank" href="' + h[n].url + '">' + h[n].text + '</a><span class="fr none">\u00d7</span></li>');
                d.find("li").hover(function() {
                    $(this).find("span").show()
                },
                function() {
                    $(this).find("span").hide()
                });
                d.find("span").click(function() {
                    for (var h = $(this).siblings("a").attr("href"), d = $.totalStorage("flight-search-history2"), n = 0; n < d.length; n++) if (d[n].url == h) {
                        d[n].id ? r({
                            act: "delete",
                            id: d[n].id
                        }) : (d.splice(n, 1), $.totalStorage("flight-search-history2", d));
                        break
                    }
                    $(this).parent().remove()
                });
                $("#search-history").show()
            } else $("#hisPanel").hide(),
            $("#search-history").hide()
        }
    }
    function r(d) {
        d.pageSize = 5;
        d._token_ = $('meta[name="_token_"]').attr("content");
        // $.ajax({
        //     url: t,
        //     dataType: "json",
        //     type: "POST",
        //     data: d,
        //     success: function(d) {
        //         $.totalStorage("flight-search-history2", d && d.data ? d.data: []);
        //         0 < $("#hisPanel").length && q()
        //     }
        // })
    }
    var t = "";//path_domain + "/service/ajax_search_history.php";
    return {
        updateUI: function() {
            $.totalStorage("flight-search-history2") ? q() : r({
                act: "pull"
            })
        },
        clearList: function() {
            $.totalStorage.deleteItem("flight-search-history2");
            q()
        },
        uploadList: function() {
            var d = $.totalStorage("flight-search-history2"),
            n = [];
            if (d && 0 < d.length) for (var h = 0; h < d.length; h++) d[h].id || n.push(d[h].url);
            r({
                act: "upload",
                data: n.join()
            })
        },
        addItem: function(d, n, h) {
            if (h) r({
                act: "upload",
                data: d
            });
            else {
                h = $.totalStorage("flight-search-history2");
                if (!h || 0 < h.length && 0 < h[0].id) h = [];
                for (var t = 0,
                x = h.length; t < x; t++) if (h[t].url == d) {
                    h.splice(t, 1);
                    break
                }
                h.unshift({
                    id: 0,
                    url: d,
                    text: n
                });
                5 < h.length && h.pop();
                $.totalStorage("flight-search-history2", h);
                q()
            }
        }
    }
} (),
category = $("#page_category").val();
window.i1=(function() {
    function q() {
        var a = $(window).scrollTop();
        a > K && !v.data("fixed") && (v.css({
            position: "fixed",
            top: 0,
            zIndex: 100
        }), v.data("fixed", !0));
        a < K && v.data("fixed") && (v.css({
            position: "static"
        }), v.data("fixed", !1));
        v.data("fixed") && ($("div.csResults").hide(), $("div.date_picker").hide(), $("#people-option").hide())
    }
    function r() {
        if (B && L.isUserAgentSupported()) {
            $("#compare-unit-box").hide();
            var a = $("#depCityCode").val(),
            b = $("#dstCityCode").val(),
            c = $("#search-option-adult").val(),
            e = $("#search-option-child").val(),
            f = $("#search-option-infant").val(),
            u = $("#departDate").val(),
            d = $("#returnDate").val(); ! /^[0-9-]+$/.test(u) || !/^[0-9-]+$/.test(d) || 3 > a.length || 4 < a.length || 3 > b.length || 4 < b.length || (a = {
                originId: a,
                destinationId: b,
                departDate: u,
                adults: c,
                children: e,
                infants: f,
                requestId: wsTracking.requestId
            },
            2 == $('input[name="roundType"]:checked').val() && (a.returnDate = d), $.ajax({
                url: path_domain + "/flight/ajax_compare_units.php",
                data: a,
                dataType: "json",
                success: function(b) {
                    if ($.isArray(b) && 0 < b.length) {
                        for (var a = "",
                        c = 0; c < b.length; c++) a += '<input type="checkbox" value="' + b[c].Route + '" id="' + b[c].AgentId + '"/><label for="' + b[c].AgentId + '">' + b[c].Name + "</label>";
                        $("#compare-unit").html(a);
                        $("#compare-unit-box").show();
                        $("#compare-unit input").click(function() {
                            gaq.push([category, "CompareUnits_Check"])
                        })
                    }
                }
            }))
        }
    }
    function t() {
        var a = {
            depCityCode: $("#depCityCode").val(),
            dstCityCode: $("#dstCityCode").val(),
            departDate: $("#departDate").val(),
            returnDate: $("#returnDate").val(),
            isRtn: 2 == $('input[name="roundType"]:checked').val() ? 1 : 0,
            prefDirect: $("#search-option-direct").attr("checked") ? 1 : 0,
            cabinClass: H ? $("#search-option-class-domestic").val() : $("#search-option-class").val(),
            adult: parseInt($("#search-option-adult").val(), 10),
            child: parseInt($("#search-option-child").val(), 10),
            infant: parseInt($("#search-option-infant").val(), 10),
            isIntl: 0
        };
        if ("\u4e2d\u56fd" != $("#depCityCountry").val() || "\u4e2d\u56fd" != $("#dstCityCountry").val()) a.isIntl = 1;
        var b = "",
        c;
        for (c in a) b += (0 < b.length ? "&": "") + c + "::" + a[c];
        SetCookie("flight-search-state", b, 604800);

        if(typeof d=="function"){
            d();
        }

    }
    function d() {
        var a = GetCookie("flight-search-state");
        path_hotel="";
        if (a && (a = a.split("&"), 7 < a.length)) {
            var b = a[10].replace("isIntl::", ""),
            c = a[1].replace("dstCityCode::", ""),
            e = a[7].replace("adult::", ""),
            f = a[2].replace("departDate::", ""),
            a = a[3].replace("returnDate::", ""),
            u = path_hotel;
            "1" == b && c && (u = 0 > f.indexOf("\u5e74") && 0 > a.indexOf("\u5e74") ? path_hotel + "/?cityCode=" + c + "&na=" + e + "&sd=" + f + "&ed=" + a: path_hotel + "/?cityCode=" + c + "&na=" + e);
            $($("header nav a")[1]).attr("href", u)
        }
    }
    function n(a) {
        H = a;
        B ? a ? ($("#search-option-intl").removeClass("type_on"), $("#search-option-domestic").addClass("type_on"), $(".triangle_down").css({
            left: "140px"
        }), $("#advanced-search-box-intl,#roundType-input-3,#roundType-input-3l").hide(), $("#search-option-direct").attr("disabled", "disabled"), $("#advanced-search-box-domestic").show()) : ($("#search-option-intl").addClass("type_on"), $("#search-option-domestic").removeClass("type_on"), $(".triangle_down").css({
            left: "70px"
        }), $("#advanced-search-box-intl,#roundType-input-3,#roundType-input-3l").show(), $("#search-option-direct").removeAttr("disabled"), $("#advanced-search-box-domestic").hide()) : a ? ($("#search-option-direct-box,#advanced-search-box,#advanced-search").hide(), $("#advanced-search-box-domestic").show()) : ($("#search-option-direct-box,#advanced-search-box").show(), $("#advanced-search-box-domestic").hide())
    }
    function h() {
        "" != $("#depCityCountry").val() && "" != $("#dstCityCountry").val() && ("\u4e2d\u56fd" != $("#depCityCountry").val() || "\u4e2d\u56fd" != $("#dstCityCountry").val() ? (H && w(2), n(!1)) : (w(1), n(!0)));
        r();
        t()
    }
    function I(a, b) {
        var c = parseInt($("#search-option-adult").val(), 10),
        e = parseInt($("#search-option-child").val(), 10),
        f = parseInt($("#search-option-infant").val(), 10);
        0 < b && 9 <= c + e + f ? alert("\u6700\u591a\u53ea\u80fd\u67099\u4f4d\u4e58\u673a\u4eba") : (c = parseInt(a.val(), 10), e = parseInt(a.attr("min"), 10), f = parseInt(a.attr("max"), 10), c += b, e > c && (c = e), f < c && (c = f), a.val(c), a.change())
    }
    function x(a, b, c) {
        var e, f = [],
        u = [];
        a = parseInt(a, 10);
        c = parseInt(c, 10);
        b = parseInt(b, 10);
        e = a + b + c;
        $("#passengers_and_cabin").text(e + "\u4f4d\u4e58\u5ba2\uff0c" + $("#people-option #selectedCabin").text());
        10 > e && 2 * a > c ? u.push("#search-option-child") : f.push("#search-option-child");
        10 > e && a > b ? u.push("#search-option-infant") : f.push("#search-option-infant");
        10 > e && 9 > a ? u.push("#search-option-adult") : f.push("#search-option-adult");
        0 < f.length && $(f.join(",")).prev().removeClass("next-icon-hot");
        0 < u.length && $(u.join(",")).prev().addClass("next-icon-hot");
        f = [];
        u = [];
        0 < b ? u.push("#search-option-infant") : f.push("#search-option-infant");
        0 < c ? u.push("#search-option-child") : f.push("#search-option-child");
        1 < a ? u.push("#search-option-adult") : f.push("#search-option-adult");
        0 < f.length && $(f.join(",")).next().removeClass("prev-icon-hot");
        0 < u.length && $(u.join(",")).next().addClass("prev-icon-hot");
        t()
    }
    function J(a) {
        var b = $("#checkin-date-" + a),
        c = b.parents(".rommu,.romlist"),
        e = c.prev().find("input:last").attr("id"),
        c = c.next().find("input:last").attr("id"),
        e = b.dateSuggest({
            preDateObj: e,
            nextDateObj: c,
            hasRangeSelectedFooter: !1,
            minDate: new Date,
            onSelect: function() {
                G();
                gaq.push([category, "SearchControlsUsed", "Date-" + (a + 1)])
            }
        });
        b.data("data", e);
        $("#dep-city-" + a).flightCitySuggest($.extend({},
        F, {
            defaulfVal: "\u57ce\u5e02/\u673a\u573a",
            dataContainer: "#dep-citycode-" + a,
            onInit: function(b) {
                var a = $(b).parents(".rommu,.romlist").prev();
                b = a.find('input[id^="dst-citycode-"]').val();
                a = a.find('input[id^="dst-city-"]').val();
                b && ($(this).val(a), $("#" + $(this).attr("id").replace(/city/, "citycode")).val(b))
            },
            ajaxUrl: function(b) {
                var a = path_flight + "/flightCity.do";
                return a += "?anywhere=false&keyword=" + encodeURIComponent($(b).val()) + "&jsoncallback=?"
            }
        }));
        $("#dst-city-" + a).flightCitySuggest($.extend({},
        F, {
            defaulfVal: "\u57ce\u5e02/\u673a\u573a",
            dataContainer: "#dst-citycode-" + a,
            onInit: function(b) {
                if ($(this).attr("id") == "dst-city-" + (y - 1)) {
                    b = $("#dep-city-0").val();
                    var a = $("#dep-citycode-0").val(),
                    c = $(this).attr("id").replace(/dst/, "dep");
                    $("#" + c).val() != b && ($(this).val(b), $("#" + $(this).attr("id").replace(/city/, "citycode")).val(a))
                }
            },
            ajaxUrl: function(b) {
                var a = path_flight + "/flightCity.do";
                return a += "?anywhere=false&keyword=" + encodeURIComponent($(b).val()) + "&jsoncallback=?"
            }
        }));
        $("#dep-city-" + a).on("click",
        function() {
            gaq.push([category, "SearchControlsUsed", "Multi-origin-" + (a + 1)])
        });
        $("#dst-city-" + a).on("click",
        function() {
            gaq.push([category, "SearchControlsUsed", "Multi-destination-" + (a + 1)])
        })
    }
    function G() {
        var a = "",
        b = "";
        $('#routes input[id^="checkin-date"]').each(function(c) {
            c = $(this);
            var e = c.val();
            e && (e < a ? $(this).val(a) : a = e);
            var f = c.parents(".rommu,.romlist"),
            u = b ? b: null,
            f = f.next().find("input:last").attr("id"),
            d = c.data("data");
            d.preRef = u ? document.getElementById(u) : "undefined";
            d.postRef = f ? document.getElementById(f) : "undefined";
            e && (b = c.attr("id"))
        });
        0 < $("#routes .number").length && $("#routes .number").each(function(b) {
            $(this).text(b + 1)
        })
    }
    function M() {
        for (var a, b, c, e, f = [], d = [], h = [], m = $("#routes > div").toArray(), n = 0; n < m.length; n++) {
            var q = $(m[n]);
            a = q.attr("index");
            b = q.find("#dep-citycode-" + a).val();
            c = q.find("#dst-citycode-" + a).val();
            e = q.find("input:last").val();
            if (!b) {
                $("#dep-city-" + a).focus();
                return
            }
            if (!c || b == c) {
                $("#dst-city-" + a).focus();
                return
            }
            if (!e) {
                setTimeout(function() {
                    q.find("input:last").click()
                },
                100);
                return
            }
            f.push(b);
            d.push(c);
            h.push(e)
        }
        a = $("#search-option-class").val();
        b = parseInt($("#search-option-adult").val(), 10);
        c = parseInt($("#search-option-child").val(), 10);
        e = parseInt($("#search-option-infant").val(), 10);
        var t = "intl-multi-city.html?dep=" + f.join("|").toLowerCase() + "&dst=" + d.join("|").toLowerCase(),
        t = t + ("&checkin=" + h.join("|") + "&cabin=" + a),
        t = t + ("&adult=" + b + "&child=" + c + "&infant=" + e);
        category || (category = "home");
        gaq.push([category, "TripType", "MultiCity"]);
        gaq.push([category, "PassengersInput", b + "_" + c + "_" + e]);
        gaq.push([category, "SearchClick", "Classic"]);
        "undefined" != typeof publish && window.publish("searchclick");
        setTimeout(function() {
            window.location = path_domain + "/" + t
        },
        300)
    }
    function w(a) {
        debugger
      if([1,2].indexOf(Number(a))>-1){
          if(a==1){
              document.getElementById('roundType-input-1').checked=true;
              document.getElementById('roundType-input-2').checked=false;
          }else{
              document.getElementById('roundType-input-2').checked=true;
              document.getElementById('roundType-input-1').checked=false;
           }
       }

        ($("#search-box-s").show(),
            $("#search-box-m").hide(),
            $("#compare-unit-box-wrap").show(),
            $("#passengers-box").appendTo("#advanced-search-box-intl"),
            B ?
                $("#search-option-direct-box").show() && $(".large-button").removeClass("rommu-btn") :
                $("#passengers-box").removeClass("cabin-mu"),
                    1 == a ? $("#returnDate").addClass("date-input_no") : $("#returnDate").removeClass("date-input_no"), t());
        N.showRange = 1 == a ? !1 : !0;
        "day-view" == category && ($(window).unbind("scroll", q), 3 > a && $(window).bind("scroll", q), v.data("fixed") && 3 == a && (v.css({
            position: "static"
        }), v.data("fixed", !1), $(window).scrollTop(0)))
    }
    starTypingFlag = 0;
    var v = $("#flight-search-box"),
    K = v.offset().top;
    "day-view" != category || $("#roundType-input-3").attr("checked") || $(window).bind("scroll", q);
    $.fn.flightCitySuggest = function(a) {
        a = $.citySuggestOptions(a);
        this.each(function() {
            new $.flightCitySuggest(this, a)
        });
        this.opt = a;
        return this
    };
    $.flightCitySuggest = function(a, b) {
        function c() {


            var c = k.offset(),

            D = c.left,
            e = p.find(".city_box").width();
            e || (e = p.width());
            D + e > $(window).width() && (D = k.parent(), D = D.offset().left + D.width() - e);
            p.css({
                top: b.customTop + c.top + a.offsetHeight + "px",
                left: b.customLeft + D + "px"
            });
            try {
                p.bgiframe()
            } catch(O) {}
        }
        function e(b) {
            if (65 <= b.keyCode && 90 >= b.keyCode && p.is(":visible") && 1 == k.val().length) {
                var a = k.attr("id");
                "depCity" == a ? gaq.push([category, "StartedTyping", "Origin"]) : "dstCity" == a ? gaq.push([category, "StartedTyping", "Destination"]) : "dep-city" == a.substr(0, 8) ? gaq.push([category, "StartedTyping", "Multi-origin-" + (parseInt(a.substr(9)) + 1)]) : "dst-city" == a.substr(0, 8) && gaq.push([category, "StartedTyping", "Multi-destination-" + (parseInt(a.substr(9)) + 1)]);
                starTypingFlag = 1
            }
            8 == b.keyCode && (starTypingFlag = 1)
        }
        function f() {
            var a = 0;
            p.find("ul li a").each(function() {
                var b = $(this).text().replace(/[^\x00-\xff]/g, "  ").length;
                b > a && (a = b)
            });
            0 == b.withEqualInput ? (0 < a && (a = 6.25 * a + 20, 380 > a && (a = 380)), 0 < p.children(".results").length && 380 > a && (a = p.children(".results").width())) : (a < k.outerWidth() - 120 && p.find("ul li em").css({
                width: "70%"
            }), a = k.outerWidth());
            p.css("width", a + "px");
            c();
            p.find("ul li").click(function(b) {
                t(b)
            });
            p.find("ul li.data").click(function() {
                p.find("ul").children("li").removeClass(b.selectClass);
                $(this).addClass(b.selectClass)
            });
            if ("" != $.trim(k.val()) && "" != p.html()) {
                for (C = 0; C < z.length; C++) if (z[C].key == $.trim(k.val())) return;
                var e = {};
                e.key = $.trim(k.val().replace(/\(.*$/, ""));
                e.html = p.html();
                z.push(e);
                10 < z.length && z.pop()
            }
        }
        function d() {
            if (!p.is(":visible")) return ! 1;
            var a = p.find("ul").children("li." + b.selectClass);
            a.length || (a = !1);
            return a
        }
        function h(a) {
            if (!w && p.is(":visible")) {
                var c = "",
                l = "",
                e = "",
                d = "",
                g = -1,
                f, h = !1;
                0 < p.children(".city_box").length ? (f = p.find(".city_container a." + b.selectClass), f.length ? (c = f.attr("name"), l = f.attr("rel"), e = f.attr("country"), d = f.attr("iata"), h = !0) : (c = A, l = $(b.dataContainer).val(), e = $(b.countryContainer).val())) : a && b.noAutoSetValue && "" == k.val() ? e = l = c = "": (f = p.find("ul li." + b.selectClass).children("a"), g = p.find("ul li").index(f.parent()), f.length && (c = f.attr("name"), l = f.attr("rel"), e = f.attr("country"), d = f.attr("iata")));
                p.hide();
                if ("" != c) {
                    a = k.val();
                    var u = $(b.dataContainer).val();
                    k.val(c + (d ? "(" + d + ")": ""));
                    $(b.dataContainer).val(l);
                    $(b.countryContainer) && $(b.countryContainer).val(e);
                    b.onSelect && u != l && b.onSelect.call(this, k[0], l, {
                        preval: a,
                        selectedSection: B,
                        selectedIndex: g,
                        selectedType: "city",
                        dataEl: f
                    });
                    h && "\u4e2d\u56fd" != e && 4 == l.length ? "B" != window.TXF_searchbox_sugestion_default && E.displayItems(c, !1, !0) : -1 < k.attr("id").indexOf("dst-city-") && k.parent().parent().find("input:last").click()
                } else k.val(""),
                $(b.dataContainer).val(""),
                $(b.countryContainer) && $(b.countryContainer).val("");
                A = $.trim(k.val());
                "" == A || A == b.defaulfValue ? (k.val(b.defaulfValue).addClass(b.defaulfValueClass), $(b.dataContainer).val(""), $(b.countryContainer).val("")) : k.removeClass(b.defaulfValueClass)
            }
        }
        function n(a) {
            var c = a.removeClass(b.selectClass).next(".data");
            0 == c.length && (c = a.next().next(".data"));
            return c
        }
        function m(a) {
            var c = a.removeClass(b.selectClass).prev(".data");
            0 == c.length && (c = a.prev().prev(".data"));
            return c
        }
        function q(a) {
            clearTimeout(y);
            $(a).addClass("on").siblings("a").removeClass("on");
            var c = $(a).text(),
            l = "",
            e = $(a).parent().next();
            if ("Top20" == c) {
                var f;
                for (g in b.hotCityInt) 0 <= parseInt(g) && (a = "", k.val() == b.hotCityInt[g][1] && (a = 'class="' + b.selectClass + '"'), f = b.hotCityInt[g][b.labelIndex], l += '<a rel="' + b.hotCityInt[g][b.dataIndex] + '" country="' + b.hotCityInt[g][b.countryIndex] + '" iata="' + b.hotCityInt[g][4] + '" dataType="city" name="' + f + '" href="#' + g + '" ' + a + " >" + b.hotCityInt[g][1] + "</a>");
                e.html(l)
            } else if ("\u70ed\u95e8" == c) {
                for (var c = b.hotCity.length,
                g = 0; g < c; g++) a = "",
                f = b.hotCity[g][1],
                k.val() == f && (a = 'class="' + b.selectClass + '"'),
                l += '<a rel="' + b.hotCity[g][b.dataIndex] + '" country="' + b.hotCity[g][b.countryIndex] + '" iata="' + b.hotCity[g][4] + '" dataType="city" name="' + f + '" href="#' + g + '" ' + a + " >" + f + "</a>";
                e.html(l).removeClass("mc_bd_flight").addClass("city_box_flight")
            } else if ("\u4e9a\u6d32/\u5927\u6d0b\u6d32" == c || "\u6b27\u6d32" == c || "\u975e\u6d32" == c || "\u7f8e\u6d32" == c) {
                for (g = 0; g < b.cityInt.length; g++) if (b.cityInt[g].tab == c) for (var d = b.cityInt[g].cities, h = 0; h < d.length; h++) a = "",
                k.val() == d[h][1] && (a = 'class="' + b.selectClass + '"'),
                f = d[h][b.labelIndex],
                l += '<a rel="' + d[h][b.dataIndex] + '" country="' + d[h][b.countryIndex] + '" iata="' + d[h][4] + '" dataType="city" name="' + f + '" href="#' + h + '" ' + a + " >" + d[h][1] + "</a>";
                e.html(l)
            } else {
                c = $(a).attr("letters").split("");
                for (f = 0; f < c.length; f++) {
                    d = "";
                    h = new RegExp("^" + c[f] + ".*$", "im");
                    for (g = 0; g < b.city.length; g++) a = "",
                    k.val() == b.city[g][1] && (a = 'class="' + b.selectClass + '"'),
                    h.test(b.city[g][2]) && (d += '<a rel="' + b.city[g][b.dataIndex] + '" country="' + b.city[g][b.countryIndex] + '" iata="' + b.city[g][4] + '" dataType="city" name="' + b.city[g][1] + '" href="#' + g + '" ' + a + " >" + b.city[g][1] + "</a>");
                    0 < d.length && (l += "<dl><dt>" + c[f] + "</dt><dd>", l += d, l += "<dd></dl>")
                }
                e.html(l).removeClass("city_box_flight").addClass("mc_bd_flight")
            }
            e.find("a").click(function(a) {
                $("#" + r + " .city_container a").removeClass(b.selectClass);
                $(this).addClass(b.selectClass);
                return ! 1
            });
            k.focus().select()
        }
        function t(a) {
            a.preventDefault && a.preventDefault();
            a.stopPropagation && a.stopPropagation();
            a.cancelBubble = !0;
            a.returnValue = !1
        }
        var k = $(a).attr("autocomplete", "off");
        b.attachObject || (b.attachObject = $(a).attr("id") + "Suggest", 0 == $("#" + b.attachObject).length ? $("body").append("<div id='" + b.attachObject + "'></div>") : $("#" + b.attachObject).html(""));
        var p = $("#" + b.attachObject),
        r = b.attachObject,
        v = !1,
        A = "",
        z = [],
        w = !1,
        y = null,
        x = null,
        B = null,
        E = this;
        "" != $.trim(k.val()) && $.trim(k.val()) != b.defaulfValue || k.val(b.defaulfValue).addClass(b.defaulfValueClass);
        $(a).parent().unbind().click(function() {
            $.trim(k.val()) == b.defaulfValue && k.val("").removeClass(b.defaulfValueClass);
            w = !0;
            E.displayItems(k.val(), !0)
        });
        p.addClass(b.resultsClass);

        $(window).on('load',c);
        $(window).resize(c);

        k.unbind().blur(function() {
            y = setTimeout(function() {
                if (starTypingFlag && ("" == $.trim(k.val()) || $.trim(k.val()) == b.defaulfValue)) {
                    var a = k.attr("id");
                    "depCity" == a ? gaq.push([category, "PauseTyping", "PauseTyping.EMPTY.Origin"]) : "dstCity" == a ? gaq.push([category, "PauseTyping", "PauseTyping.EMPTY.Destination"]) : "dep-city" == a.substr(0, 8) ? gaq.push([category, "PauseTyping", "PauseTyping.EMPTY.Multi-origin-" + (parseInt(a.substr(9)) + 1)]) : "dst-city" == a.substr(0, 8) && gaq.push([category, "PauseTyping", "PauseTyping.EMPTY.Multi-destination-" + (parseInt(a.substr(9)) + 1)]);
                    starTypingFlag = 0
                }
                h(!0)
            },
            200)
        });
        k.focus(function() {
            $.trim(k.val()) == b.defaulfValue && (k.val("").removeClass(b.defaulfValueClass), b.onInit && b.onInit.call(this, k[0]));
            A = k.val();
            p.is(":visible") || (w = !0, E.displayItems(k.val(), !0));
            setTimeout(function() {
                w = !1
            },
            300)
        });

        // k.keydown(function(a){
        //     console.log(a.keyCode);
        // })

        k.keyup(function(a) {

            w = !1;
            if (/27$|38$|40$/.test(a.keyCode) && p.is(":visible") || /^13$|^9$/.test(a.keyCode) && d())
            {

                //console.log("1",A,a.keyCode,d());

                switch (t(a), a.keyCode) {
                case 38:
                    ($currentResult = d()) ? m($currentResult).addClass(b.selectClass) : p.find("ul").children("li:last-child").addClass(b.selectClass);
                    break;
                case 40:
                    ($currentResult = d()) ? n($currentResult).addClass(b.selectClass) : p.find("ul").children("li:first-child").addClass(b.selectClass);
                    break;
                case 13:
                    h(!1);
                    break;
                case 27:
                    p.hide()
                }

             }
             else if (k.val() != A || 32 == a.keyCode) {

                //console.log("2",A,a.keyCode,d());

                e(a);
                b.noAutoSetValue && "" == k.val() && $("#" + r + " .city_box_flight a").removeClass(b.selectClass),
                x && x.abort(),
                v && clearTimeout(v),
                A = k.val(),
                1 > A.length || (v = setTimeout(function () {
                    E.displayItems(k.val(), !1)
                },
                    b.delay))

            }
            else{

                //console.log("3",A,a.keyCode,d());

            }

        });
        this.displayItems = function(a, e, d) {
            var l = "";
            d = d || !1;
            a = $.trim(a);
            $("." + b.resultsClass).each(function(a, b) {
                $(b).attr("id") != r && $(b).hide()
            });
            if (e || "" == a) l = '<div class="city_box overflow"><header>' + b.popwindowTip + '<span class="close">\u00d7</span></header>',
            l = b.departureInput ? l + '<div class="city_box_tit"><span class="span fs16 mgr10">\u56fd\u5185</span><a type="popular" class="on">\u70ed\u95e8</a><a type="domestic-AE" letters="ABCDE">ABCDE</a><a type="domestic-FJ" letters="FGHIJ">FGHIJ</a><a type="domestic-KO" letters="KLMNO">KLMNO</a><a type="domestic-PT" letters="PQRST">PQRST</a><a type="domestic-UZ" letters="UVWXYZ">UVWXYZ</a></div><div class="city_container city_box_flight"></div><div class="city_box_tit"><span class="span fs16 mgr10">\u56fd\u9645</span><a type="popular" class="on">Top20</a><a type="international-asia">\u4e9a\u6d32/\u5927\u6d0b\u6d32</a><a type="international-americas">\u7f8e\u6d32</a><a type="international-europe">\u6b27\u6d32</a><a type="international-africa">\u975e\u6d32</a></div><div class="city_container city_box_flight"></div>': l + '<div class="city_box_tit"><span class="span fs16 mgr10">\u56fd\u9645</span><a type="popular" class="on">Top20</a><a type="international-asia">\u4e9a\u6d32/\u5927\u6d0b\u6d32</a><a type="international-americas">\u7f8e\u6d32</a><a type="international-europe">\u6b27\u6d32</a><a type="international-africa">\u975e\u6d32</a></div><div class="city_container city_box_flight"></div><div class="city_box_tit"><span class="span fs16 mgr10">\u56fd\u5185</span><a type="popular" class="on">\u70ed\u95e8</a><a type="domestic-AE" letters="ABCDE">ABCDE</a><a type="domestic-FJ" letters="FGHIJ">FGHIJ</a><a type="domestic-KO" letters="KLMNO">KLMNO</a><a type="domestic-PT" letters="PQRST">PQRST</a><a type="domestic-UZ" letters="UVWXYZ">UVWXYZ</a></div><div class="city_container city_box_flight"></div>',
            //l = b.withAllPlaces ? l + '<div class="city_box_tit"></div><div class="city_container city_box_flight mgb15"><a rel="anywhere" class="button" name="\u6240\u6709\u5730\u70b9">\u6240\u6709\u5730\u70b9\u641c\u7d22</a><a class="visafree mgl10" rel="visafree" name="\u514d\u7b7e/\u843d\u5730\u7b7e">\u514d\u7b7e/\u843d\u5730\u7b7e</a></div>': l + '<div class="mgb15"></div>',

            l += "</div>",
            p.css("width", "350px"),
            p.html(l).show(),
            c(),
            b.withAllPlaces && $("#" + r + " .city_container").find("a").click(function(a) {
                $("#" + r + " .city_container a").removeClass(b.selectClass);
                $(this).addClass(b.selectClass);
                return ! 1
            }),
            $("#" + r + " .city_box").click(function(a) {
                t(a);
                w = !0;
                k.focus().select();
                setTimeout(function() {
                    w = !1
                },
                300)
            }),
            $("#" + r + " .city_box_tit a").click(function(a) {
                B = $(this).attr("type");
                q(this)
            }),
            $("#" + r + " .city_box_tit a").each(function(a, b) {
                "\u70ed\u95e8" != $(this).text() && "Top20" != $(this).text() || $(this).click()
            }),
            $("#" + r + " header > .close").click(function(a) {
                h(!1);
                a.preventDefault();
                a.stopPropagation()
            }),
            k.focus().select();
            else {
                for (e = 0; e < z.length; e++) if (z[e].key == a) {
                    p.html(z[e].html).show();
                    f();
                    k.focus();
                    return
                }
                l = "";
                "" != $.trim(k.val()) && (x = $.getJSON(b.ajaxUrl.call(this, k[0]),
                function(c) {
                    if (d) {
                        if (1 == c.length) { - 1 < k.attr("id").indexOf("dst-city-") && k.parent().parent().find("input:last").click();
                            return
                        }
                        k.focus()
                    }
                    l = E.getMatchedCity(c, a);
                    "" != l && (l = '<div class="results"><h4>' + b.resultsTipVal + "</h4><ul>" + l + "</ul></div>");
                    p.html(l).show();
                    p.find("ul").children("li.data").eq(0).addClass(b.selectClass);
                    f()
                }));
                p.html("").hide()
            }
        };
        this.getMatchedCity = function(a, c) {
            var e = "",
            f, d = new RegExp("^(" + c + ")", "im");
            c = new RegExp("(" + c + ")", "im");
            for (var g = 0; g < a.length && g < b.displayLength; g++) {
                var k = a[g][b.dataIndex],
                h = a[g][b.countryIndex],
                p = a[g][1],
                u = a[g][b.pinyinIndex],
                l,
                n = a[g][1],
                m = "",
                t = "",
                q;
                d.test(a[g][2]) ? l = a[g][2].replace(d, '<b class="' + b.matchClass + '">$1</b>') : d.test(a[g][3]) ? l = a[g][3].replace(d, '<b class="' + b.matchClass + '">$1</b>') : d.test(a[g][0]) ? l = a[g][0].replace(d, '<b class="' + b.matchClass + '">$1</b>') : c.test(a[g][1]) ? (n = a[g][1].replace(c, '<b class="' + b.matchClass + '">$1</b>'), l = a[g][4] ? a[g][4] : a[g][2]) : l = d.test(a[g][4]) ? a[g][4].replace(d, '<b class="' + b.matchClass + '">$1</b>') : a[g][2];
                l = "" != l ? " (" + l + ")": "";
                f = a[g][0];
                switch (a[g][6]) {
                case "country":
                    q = "<span class='label labelA'>\u56fd\u5bb6</span>";
                    n += l;
                    break;
                case "region":
                    q = "<span class='label labelD'>\u5730\u533a</span>";
                    n += l;
                    break;
                case "airport":
                    l = l.replace(/[\(\)]/g, "");
                    n = a[g][8] + "( " + n + " " + l + " )";
                    "\u4e2d\u56fd" == a[g][5] && a[g][9] ? (k = a[g][9], p = a[g][8], u = "") : n += " " + (b.withCodeFollowed ? f: "");
                    q = "<span class='label labelC'>\u673a\u573a</span>";
                    break;
                case "city":
                    n += l;
                    q = "<span class='label labelB'>\u57ce\u5e02</span>";
                    f = a[g][9] ? a[g][9] : a[g][0];
                    n += " " + (b.withCodeFollowed ? f: "");
                    break;
                default:
                    n += l,
                    q = "<span class='label labelE'>" + a[g][6] + "</span>",
                    f = a[g][9] ? a[g][9] : a[g][0],
                    n += " " + (b.withCodeFollowed ? f: "")
                }
                if (a[g][7] && "" != a[g][7]) for (t = "-\u8be5\u57ce\u5e02\u6ca1\u6709\u673a\u573a", l = 0; l < a[g][7].length; l++) {
                    var r = a[g][7][l],
                    v = "border-bottom:0px;padding:5px 10px 3px 52px;";
                    l == a[g][7].length - 1 && (v = "padding:0px 10px 10px 52px;");
                    m += "<li class='data' style='" + v + " '><a href='#' country='" + a[g][5] + "' rel='" + r[0] + "' pinyin='" + r[2] + "' name='" + r[1] + "'  class='grey' iata='" + r[4] + "' dataType='"+a[g][6]+"'>\u90bb\u8fd1\u673a\u573a\uff1a" + r[1] + "-" + r[3] + "\u516c\u91cc</a></li>"
                }
                e = "" != t ? e + ("<li style='border-bottom:0px;margin-bottom:-8px;'>" + q + "<a href='#' style='cursor:default'><em>" + n + t + "</em><i>" + h + "</i></a></li>" + m) : e + ("<li class='data'>" + q + "<a href='#' rel='" + k + "' country='" + a[g][5] + "' iata='" + f + "' pinyin='" + u+ "' dataType='" + a[g][6]  + "' name='" + p + "'><em>" + n + "</em><i>" + h + "</i></a>")
            }
            b.withAllPlaces && (e += "<li class='data'><a rel='anywhere' name='\u6240\u6709\u5730\u70b9'><em><span class='ac_all fl'></span><span class='mgl5'>\u6240\u6709\u5730\u70b9</span></em></a>");
            return e
        }
    };
    var B = "true" == $("#flight-search-box").attr("home") ? !0 : !1,
    H = "\u4e2d\u56fd" == $("#dstCityCountry").val() && "\u4e2d\u56fd" == $("#depCityCountry").val(),
    L = {
        config: {
            supported: [{
                name: "ipad-ios7",
                method: "doubleWindow",
                regex: /ipad; cpu os 7/i
            },
            {
                name: "safari",
                method: "fakeClick",
                regex: /safari/i
            },
            {
                name: "chrome",
                method: "fakeClick",
                regex: /chrome/i
            },
            {
                name: "firefox",
                method: "mozWindow",
                regex: /firefox/i
            },
            {
                name: "ie",
                method: "simpleWindow",
                regex: /(msie|trident)/i
            }],
            unsupported: [{
                name: "ipad-ios8",
                regex: /ipad; cpu os 8/i
            },
            {
                name: "iphone",
                regex: /iphone/i
            },
            {
                name: "android",
                regex: /android/i
            },
            {
                name: "blackberry",
                regex: /blackberry/i
            },
            {
                name: "windowsPhone",
                regex: /windows phone/i
            },
            {
                name: "opera",
                regex: /(opera)/i
            }]
        },
        methods: {
            fakeClick: function(a) {
                var b;
                b = document.createElement("a");
                b.href = a;
                a = document.createEvent("MouseEvents");
                a.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !0, !1, !1, !0, 0, null);
                b.dispatchEvent(a)
            },
            simpleWindow: function(a) {
                a = window.open(a, "", this._getWindowAttrs());
                try {
                    a.blur(),
                    window.focus()
                } catch(b) {}
            },
            doubleWindow: function(a) {
                var b = this._getUniqueName();
                window.open(a, b, this._getWindowAttrs());
                window.name = b;
                window.open("", b)
            },
            mozWindow: function(a) {
                var b, c;
                b = window.open("about:blank", this._getUniqueName(), this._getWindowAttrs());
                b.url = a;
                b.blur();
                "undefined" != typeof window.mozPaintCount && (c = window.open("about:blank"), c.close());
                try {
                    opener.window.focus()
                } catch(e) {}
                b.location = b.url;
                b.opener.window.open("", "_self", "");
                b.opener.window.focus()
            },
            _getUniqueName: function() {
                return "popunder-" + Math.floor(100 * Math.random() + 1)
            },
            _getWindowAttrs: function() {
                return "scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,top=0,left=0,height=600,width=800,total=1,index=0"
            }
        },
        getUserAgentString: function() {
            return window.navigator.userAgent.toLowerCase()
        },
        getUserAgent: function() {
            var a = this.getUserAgentString(),
            b,
            c;
            for (c = 0; c < this.config.unsupported.length; c++) if (b = this.config.unsupported[c], b.regex.test(a)) return null;
            for (c = 0; c < this.config.supported.length; c++) if (b = this.config.supported[c], b.regex.test(a)) return b;
            return null
        },
        isUserAgentSupported: function() {
            return null !== this.getUserAgent()
        },
        firePopunder: function(a) {
            var b = this.getUserAgent();
            if (b) this.methods[b.method](a)
        }
    },
    y = $("#routes > div").length,
    F = {
        hotCity: fcHot,
        ajaxUrl: function(a) {
            var b = path_flight + "/flightCity.do";
            return b += "?keyword=" + encodeURIComponent($(a).val()) + "&jsoncallback=?"
        },
        hotCityInt: fcHotI,
        city: fc,
        typeName: "\u57ce\u5e02",
        cityInt: [{
            tab: "\u4e9a\u6d32/\u5927\u6d0b\u6d32",
            cities: fcInt_1
        },
        {
            tab: "\u7f8e\u6d32",
            cities: fcInt_2
        },
        {
            tab: "\u6b27\u6d32",
            cities: fcInt_3
        },
        {
            tab: "\u975e\u6d32",
            cities: fcInt_4
        }],
        labelIndex: 1,
        defaulfVal: "\u56fd\u5bb6/\u5730\u533a/\u57ce\u5e02/\u673a\u573a",
        resultsTipVal: "\u53ef\u76f4\u63a5\u8f93\u5165\u4e2d\u6587\u540d/\u62fc\u97f3/\u82f1\u6587\u540d/\u673a\u573a\u4ee3\u7801",
        defaulfValClass: "input_flight_grey",
        delay: 800,
        onSelect: function(a, b, c) {
            if (category) {
                a = $(a).attr("id");
                var e = "zh_"; - 1 == c.selectedIndex ? (e += c.selectedSection + "_" + b, gaq.push([category, -1 < a.indexOf("dep") ? "suggestbox-from": "suggestbox-to", e])) : (e += c.preval + "_" + b + "_" + c.selectedIndex, gaq.push([category, -1 < a.indexOf("dep") ? "autosuggest-from": "autosuggest-to", e]), starTypingFlag && (gaq.push([category, "PauseTyping", "PauseTyping." + c.preval + ( - 1 < a.indexOf("dep") ? ".Multi-origin-" + (parseInt(a.substr(9)) + 1) : ".Multi-destination-" + (parseInt(a.substr(9)) + 1))]), starTypingFlag = 0))
            }
        }
    };
    FSearchHistory.updateUI();
    r();
    for (var C = 0; C < y; C++) J(C);
    $(".dropdown").dropdown({
        autoSetValue: !1,
        callback: function(a) {
            gaq.push([category, "CabinClassChoice", a]);
            gaq.push([category, "SearchControlsUsed", "Cabin-class-travellers-toggle"]);
            $("#passengers_and_cabin:visible").length && (a = $("#passengers_and_cabin").text(), a = a.replace(/\uff0c.*$/, "\uff0c" + $("#selectedCabin").text()), $("#passengers_and_cabin").text(a));
            t()
        }
    });
    $("#search-history").floating({
        width: 280,
        offsets: {
            x: -243,
            y: 2
        }
    });
    $("#hisPanel a").bind("click",
    function() {
        $.floating.hide()
    });
    $("#hisPanel li a, #hisPanel li span").bind("click",
    function() {
        gaq.push([category, "SearchControlsUsed", "History"])
    });
    $(".people-info").floating({
        offsets: {
            y: -1
        }
    });
    $("#depCity").flightCitySuggest(

        $.extend({},
    F, {
        dataContainer: "#depCityCode",
        countryContainer: "#depCityCountry",
        onSelect: function(a, b, c) {
            $("#depType").val($(c.dataEl).attr("dataType"));
            $(a).val() != c.preval && ("function" == typeof h?h():"", "function" == typeof setDepartCityIndex && setDepartCityIndex($("#depCityCode").val()), a = "zh_", category && ( - 1 == c.selectedIndex ? (a += c.selectedSection + "_" + b, gaq.push([category, "suggestbox-from", a])) : (a += c.preval + "_" + b + "_" + c.selectedIndex, gaq.push([category, "autosuggest-from", a]), starTypingFlag && (gaq.push([category, "PauseTyping", "PauseTyping." + c.preval + ".Origin"]), starTypingFlag = 0))))
        }
    }));
    $("#depCity").on("click",
    function() {
        gaq.push([category, "SearchControlsUsed", "Origin"])
    });
    $("#dstCity").flightCitySuggest($.extend({},
    F, {
        dataContainer: "#dstCityCode",
        countryContainer: "#dstCityCountry",
        defaulfVal: "\u6240\u6709\u5730\u70b9",
        withAllPlaces: !0,
        defaulfValClass: "default",
        onSelect: function(a, b, c) {
            $("#dstType").val($(c.dataEl).attr("dataType"));
            $(a).val() != c.preval && ("function" == typeof h?h():"", a = "zh_", typeof categh!="undefined"?categh():"", a = "zh_", category && ( - 1 == c.selectedIndex ? (a += c.selectedSection + "_" + b, gaq.push([category, "suggestbox-to", a])) : (a += c.preval + "_" + b + "_" + c.selectedIndex, gaq.push([category, "autosuggest-to", a]), starTypingFlag && (gaq.push([category, "PauseTyping", "PauseTyping." + c.preval + ".Destination"]), starTypingFlag = 0))))
        }
    }));
    $("#dstCity").on("click",
    function() {
        gaq.push([category, "SearchControlsUsed", "Destination"])
    });
    var N = $("#departDate").dateSuggest({
        nextDateObj: "returnDate",
        minDate: new Date,
        showRange: $("#roundType-input-1:checked").length ? !1 : !0,
        onSelect: function(a) {
            var b = $("#departDate").val(),
            c = $("#departDate").attr("data-preval");
            b != c && (r(), t(), $("#departDate").attr("data-preval", b));
            a && "undefined" != a.postRef && !$(a.postRef).hasClass("date-input_no") && a.postRef.click();
            gaq.push([category, "SearchControlsUsed", "Date-1"])
        }
    });
    $("#returnDate").dateSuggest({
        preDateObj: "departDate",
        minDate: new Date,
        onSelect: function() {
            var a = $("#returnDate").val(),
            b = $("#returnDate").attr("data-preval");
            a != b && (r(), t(), $("#returnDate").attr("data-preval", a));
            gaq.push([category, "SearchControlsUsed", "Date-2"])
        }
    });
    $("#returnDate").bind("focus",
    function() {
        $(this).hasClass("date-input_no") && w(2)
    });
    $("#flight-search-box").find(".search_trade, .list_search_trade").bind("click",
    function() {
        if (0 < $(".csResults:visible").length) {
            var a = this;
            setTimeout(function() {
                a.click()
            },
            1E3)
        } else {
            var b = $("#depCityCode").val();
            if ("" != b && "" != $("#dstCityCode").val()) {
                var c = $("#depCity").val(),
                e = $("#depCityCountry").val();
                $("#depCity").val($("#dstCity").val());
                $("#depCityCountry").val($("#dstCityCountry").val());
                $("#depCityCode").val($("#dstCityCode").val());
                $("#dstCity").val(c);
                $("#dstCityCountry").val(e);
                $("#dstCityCode").val(b);
                r();
                t();
                gaq.push([category, "SearchControlsUsed", "Exchange"])
            }
        }
    });
    $("#flight-search-box").find(":radio").bind("click",
    function() {
        var a = $(this).val();
        w(a);
        gaq.push([category, "SearchControlsUsed", "Triptype"])
    });
    var m = {
        domestic: {},
        intl: {}
    };
    m.domestic.depCity = $("#depCityDefault").val();
    m.domestic.depCityCountry = $("#depCityCountryDefault").val();
    m.domestic.depCityCode = $("#depCityCodeDefault").val();
    m.domestic.dstCity = "\u6240\u6709\u5730\u70b9";
    m.domestic.dstCityCountry = "";
    m.domestic.dstCityCode = "";
    m.intl.depCity = $("#depCityDefault").val();
    m.intl.depCityCountry = $("#depCityCountryDefault").val();
    m.intl.depCityCode = $("#depCityCodeDefault").val();
    m.intl.dstCity = "\u6240\u6709\u5730\u70b9";
    m.intl.dstCityCountry = "";
    m.intl.dstCityCode = "";
    $("#search-option-switch").find("span").bind("click",
    function() {
        if (!$(this).hasClass("type_on")) {
            var a, b;
            "search-option-intl" == $(this).attr("id") ? (w(2), n(!1), a = "domestic", b = "intl") : (w(1), n(!0), a = "intl", b = "domestic");
            m[a].depCity = $("#depCity").val();
            m[a].depCityCountry = $("#depCityCountry").val();
            m[a].depCityCode = $("#depCityCode").val();
            m[a].dstCity = $("#dstCity").val();
            m[a].dstCityCountry = $("#dstCityCountry").val();
            m[a].dstCityCode = $("#dstCityCode").val();
            $("#depCity").val(m[b].depCity);
            $("#depCityCountry").val(m[b].depCityCountry);
            $("#depCityCode").val(m[b].depCityCode);
            $("#dstCity").val(m[b].dstCity);
            $("#dstCityCountry").val(m[b].dstCityCountry);
            $("#dstCityCode").val(m[b].dstCityCode);
            "" == m[b].depCityCode ? $("#depCity").val("\u56fd\u5bb6/\u5730\u533a/\u57ce\u5e02/\u673a\u573a").addClass("input_flight_grey") : $("#depCity").removeClass("input_flight_grey");
            r();
            t()
        }
    });
    $("#search-option-adult, #search-option-child, #search-option-infant").bind("keypress",
    function(a) {
        var b = a.keyCode || a.which,
        c = $(this).attr("id");
        if ((b < ("search-option-adult" == c ? 49 : 48) || 56 < b) && 8 != b) return a.preventDefault(),
        !1;
        var e = b - 48,
        b = "search-option-adult" == c ? e: parseInt($("#search-option-adult").val(), 10),
        f = "search-option-infant" == c ? e: parseInt($("#search-option-infant").val(), 10),
        c = "search-option-child" == c ? e: parseInt($("#search-option-child").val(), 10);
        if (9 < b + f + c) return alert("\u6700\u591a\u53ea\u80fd\u67099\u4f4d\u4e58\u673a\u4eba"),
        a.preventDefault(),
        !1
    }).bind("focus",
    function() {
        $(this).select()
    });
    $("#search-option-adult").bind("change",
    function(a) {
        a = $(this).val();
        var b = parseInt($("#search-option-infant").val(), 10),
        c = parseInt($("#search-option-child").val(), 10);
        if (9 < a || 1 > a) a = 1 > a ? 1 : 9,
        $(this).val(a),
        alert("\u6210\u4eba\u7684\u4eba\u6570\u5fc5\u987b\u4ecb\u4e8e 1 \u5230 9 \u4e4b\u95f4\u3002\r\n\u5df2\u5c06\u60a8\u8f93\u5165\u7684\u4eba\u6570\u66f4\u6b63\u4e3a\u6700\u63a5\u8fd1\u7684\u5141\u8bb8\u4eba\u6570\u3002");
        b > a && (alert("\u6240\u8f93\u5165\u7684\u6210\u4eba\u6570\u6bd4\u5a74\u513f\u5c11\u3002\r\n\u7cfb\u7edf\u5c06\u6839\u636e\u7ed9\u51fa\u7684\u6210\u4eba\u6570\uff0c\u5c06\u5a74\u513f\u6570\u51cf\u81f3\u5141\u8bb8\u7684\u4e0a\u9650\u503c\u3002"), $("#search-option-infant").val(a), $("#search-option-infant-txt").text(a));
        2 * a < c && (alert(a + "\u4e2a\u6210\u4eba\u6700\u591a\u53ea\u80fd\u5e26\u4e2a" + 2 * a + "\u4e2a\u513f\u7ae5\u3002\r\n\u7cfb\u7edf\u5c06\u6839\u636e\u7ed9\u51fa\u7684\u6210\u4eba\u6570\uff0c\u5c06\u513f\u7ae5\u6570\u51cf\u81f3\u5141\u8bb8\u7684\u4e0a\u9650\u503c\u3002"), c = 2 * a, $("#search-option-child").val(c), $("#search-option-child-txt").text(c));
        x(a, b, c)
    });
    $("#search-option-child").bind("change",
    function(a) {
        a = parseInt($("#search-option-adult").val(), 10);
        var b = parseInt($("#search-option-infant").val(), 10),
        c = $(this).val();
        "" == c ? c = 0 : 2 * a < c && (alert(a + "\u4e2a\u6210\u4eba\u6700\u591a\u53ea\u80fd\u5e26\u4e2a" + 2 * a + "\u4e2a\u513f\u7ae5\u3002\r\n\u7cfb\u7edf\u5c06\u6839\u636e\u7ed9\u51fa\u7684\u6210\u4eba\u6570\uff0c\u5c06\u513f\u7ae5\u6570\u51cf\u81f3\u5141\u8bb8\u7684\u4e0a\u9650\u503c\u3002"), c = 2 * a);
        $(this).val(c);
        x(a, b, c)
    });
    $("#search-option-infant").bind("change",
    function(a) {
        a = $(this).val();
        var b = parseInt($("#search-option-adult").val(), 10),
        c = parseInt($("#search-option-child").val(), 10);
        "" == a ? a = 0 : a > b && (alert("\u6240\u8f93\u5165\u7684\u5a74\u513f\u6570\u6bd4\u6210\u4eba\u591a\u3002\r\n\u7cfb\u7edf\u5c06\u6839\u636e\u7ed9\u51fa\u7684\u6210\u4eba\u6570\uff0c\u5c06\u5a74\u513f\u6570\u51cf\u81f3\u5141\u8bb8\u7684\u4e0a\u9650\u503c\u3002"), a = b);
        $(this).val(a);
        x(b, a, c)
    });
    $("#people-option .prev-icon").bind("click",
    function() {
        I($(this).siblings("input"), -1);
        gaq.push([category, "SearchControlsUsed", "Cabin-class-travellers-toggle"])
    });
    $("#people-option .next-icon").bind("click",
    function() {
        I($(this).siblings("input"), 1);
        gaq.push([category, "SearchControlsUsed", "Cabin-class-travellers-toggle"])
    });
    $("#compare-unit").delegate("input", "click",
    function() {
        $(this).attr("checked") && L.firePopunder($(this).val())
    });
    $(".list_search .people-option .dropdownlist li").bind("click",
    function() {
        var a = $("#passengers_and_cabin").text().trim().split("\uff0c");
        $("#passengers_and_cabin").text(a[0] + "\uff0c" + $("#selectedCabin").text())
    });
    $("#destinaion-add").bind("click",
    function() {
        var a = $("#routes > div").length,
        b = $("#routes > div:first").clone().appendTo("#routes").attr("index", y);
        b.find("input").each(function() {
            var a = $(this).val("").attr("id"),
            a = a.replace(/[0-9]+$/, y);
            $(this).attr("id", a)
        });
        b.find(".clost-mu").show();
        5 < a + 1 && $("#destinaion-add").parent().hide();
        J(y);
        G();
        y++
    });
    $("#search-box-m").delegate(".clost-mu", "click",
    function() {
        var a = $("#routes > div").length;
        if (! (3 > a)) {
            var b = $(this).parents(".romlist,.rommu");
            b.find("input:last").data("data").destoryUI();
            b.find('input[name^="depCitys[]"],input[name^="dstCitys[]"]').each(function() {
                $("#" + $(this).attr("id") + "Suggest").remove()
            });
            b.remove(); --a;
            $("#destinaion-add").parent().show();
            G()
        }
    });
    $("#search-option-direct").bind("click",
    function() {
        t();
        gaq.push([category, "SearchControlsUsed", "Direct"])
    });


    window.getACResult=function() {

        var a = $('input[name="roundType"]:checked').val();
        if (3 == a) M();
        else {
            var b = $("#depCityCountry").val(),
            c = $("#dstCityCountry").val(),

            e = $("#depCityCode").val().toLowerCase(),
            f = $("#dstCityCode").val().toLowerCase();


            e = $("#depCity").val().split('(')[1].substr(0,3);
            f = $("#dstCity").val().split('(')[1].substr(0,3);

            //console.log(e,f);

            d = $("#departDate").val(),
            h = $("#returnDate").val(),

            n = "";
            if ("" == e) $("#depCity").focus();
            else if ("" == f ? f = "anywhere": "visafree" == f && (n = "visafree", f = "anywhere"), 2 < e.length && e == f) $("#dstCity").val("").focus();
            else {
                var m = e + "-" + f,
                q = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
                q.test(d) && q.test(h) || ("\u5168\u5e74" == d && (h = d = (new Date).getFullYear()), /[0-9]+\u5e74[0-9]+\u6708/.test(d) && (q = d.match(/[0-9]+/g), d = q[0] + "-" + q[1]), /[0-9]+\u5e74[0-9]+\u6708/.test(h) && (q = h.match(/[0-9]+/g), h = q[0] + "-" + q[1]));
                if ("\u4e2d\u56fd" != b || "\u4e2d\u56fd" != c) {
                    var r = $("#search-option-direct").attr("checked") ? !0 : !1,
                    b = $("#search-option-class").val(),
                    k = parseInt($("#search-option-adult").val(), 10),
                    p = parseInt($("#search-option-child").val(), 10),
                    t = parseInt($("#search-option-infant").val(), 10),
                    m = 1 == a ? "intl-oneway-" + m + ".html?depdate=" + d: "intl-round-" + m + ".html?depdate=" + d + "&rtndate=" + h;
                    if (b || k) m += "&cabin=" + b + "&adult=" + k + "&child=" + p + "&infant=" + t;
                    r && (m += "&direct=1")
                } else b = $("#search-option-class-domestic").val(),
                m = 1 == a ? "oneway-" + m + ".html?depdate=" + d: "round-" + m + ".html?depdate=" + d + "&rtndate=" + h,
                b && (m += "&cabin=" + b);
                if (10 != d.length || 3 != e.length && 4 != e.length || 3 != f.length && 4 != f.length) m = "custom-" + m.replace(/^intl-/, "");
                n && (m += "&filter=" + n);
                category || (category = "home");
                gaq.push([category, "TripType", 1 == a ? "OneWay": "Return"]);
                void 0 !== r && gaq.push([category, "PassengersInput", k + "_" + p + "_" + t]);
                gaq.push([category, "SearchClick", "Classic"]);
                "undefined" != typeof publish && window.publish("searchclick");


                var data1={

                    adults: k,
                    children: p,
                    infants: t,
                    cabinClass: b,
                    dateLeg1: d,
                    originCodeLeg1: e,
                    destinationCodeLeg1: f,
                    dateLeg2: 1 == a ? "": h,
                    originCodeLeg2: f,
                    destinationCodeLeg2: e,
                    tripType: 1 == a ? "OneWay": "Return",
                    pageType: category,
                    legCount: 1 == a ? 1 : 2,
                    dateOffsetLeg1: "",
                    preferDirect: r ? "true": "false"

                }

                //console.log(data1)
                return data1;

            }
        }
    }


});
