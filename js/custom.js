var $jscomp = {scope: {}};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, d) {
    if (d.get || d.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[c] = d.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (a) {
    return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.arrayIterator = function (a) {
    var c = 0;
    return $jscomp.iteratorPrototype(function () {
        return c < a.length ? {done: !1, value: a[c++]} : {done: !0}
    })
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {next: a};
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function (a, c) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var d = 0, b = {
        next: function () {
            if (d < a.length) {
                var f = d++;
                return {value: c(f, a[f]), done: !1}
            }
            b.next = function () {
                return {done: !0, value: void 0}
            };
            return b.next()
        }
    };
    b[Symbol.iterator] = function () {
        return b
    };
    return b
};
$jscomp.polyfill = function (a, c, d, b) {
    if (c) {
        d = $jscomp.global;
        a = a.split(".");
        for (b = 0; b < a.length - 1; b++) {
            var f = a[b];
            f in d || (d[f] = {});
            d = d[f]
        }
        a = a[a.length - 1];
        b = d[a];
        c = c(b);
        c != b && null != c && $jscomp.defineProperty(d, a, {configurable: !0, writable: !0, value: c})
    }
};
$jscomp.polyfill("Array.prototype.keys", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a) {
            return a
        })
    }
}, "es6-impl", "es3");
(function () {
    var a = function (a) {
        var d = this, b = {
            logo: "OwO\u8868\u60c5",
            container: document.getElementsByClassName("OwO")[0],
            target: document.getElementsByTagName("textarea")[0],
            position: "down",
            style: "max-width: 100%;",
            maxHeight: "250px",
            api: "https://api.anotherhome.net/OwO/OwO.json"
        }, c;
        for (c in b) b.hasOwnProperty(c) && !a.hasOwnProperty(c) && (a[c] = b[c]);
        this.container = a.container;
        this.target = a.target;
        "up" === a.position && this.container.classList.add("OwO-up");
        var e = new XMLHttpRequest;
        e.onreadystatechange = function () {
            4 ===
            e.readyState && (200 <= e.status && 300 > e.status || 304 === e.status ? (d.odata = JSON.parse(e.responseText), d.init(a)) : console.log("OwO data request was unsuccessful: " + e.status))
        };
        e.open("get", a.api, !0);
        e.send(null)
    };
    a.prototype.init = function (a) {
        var d = this;
        this.area = a.target;
        this.packages = Object.keys(this.odata);
        for (var b = '\n            <div class="OwO-logo"><span>' + a.logo + '</span></div>\n            <div class="OwO-body" style="' + a.style + '">', c = 0; c < this.packages.length; c++) {
            b += '\n                <ul class="OwO-items OwO-items-' +
                this.odata[this.packages[c]].type + '" style="max-height: ' + (parseInt(a.maxHeight) - 53 + "px") + ';">';
            if ("biaoqing" === this.odata[this.packages[c]].type) {
                var e = this.odata[this.packages[c]].baseURL, h = this.odata[this.packages[c]].suffix,
                    m = this.odata[this.packages[c]].input, g = this.odata[this.packages[c]].retinaSuffix,
                    n = this.odata[this.packages[c]].imgClass, k = this.odata[this.packages[c]].container;
                void 0 != window.devicePixelRatio && 1.49 <= window.devicePixelRatio && (h = g);
                e = e.replace("{BIAOQING_PAOPAO_PATH}", LocalConst.BIAOQING_PAOPAO_PATH);
                e = e.replace("{BIAOQING_ARU_PATH}", LocalConst.BIAOQING_ARU_PATH);
                for (g = 0; g < k.length; g++) var p = '<img data-src="' + (e + encodeURI(k[g]).replace(/%/g, "") + h) + '" class="' + n + '" title="' + k[g] + '">', l = m.replace("{NAME}", k[g]), l = "{IMG_TAG}" !== m ? 'data-input="' + l + '"' : "", b = b + ('\n                    <li class="OwO-item" title="' + k[g] + '" ' + l + ">" + p + "</li>")
            } else for (e = this.odata[this.packages[c]].container, h = 0; h < e.length; h++) b += '\n                    <li class="OwO-item" title="' + e[h].text + '">' + e[h].icon + "</li>";
            b +=
                "\n                </ul>"
        }
        b += '\n                <div class="OwO-bar">\n                    <ul class="OwO-packages">';
        for (a = 0; a < this.packages.length; a++) b += "\n                        <li><span>" + this.packages[a] + "</span></li>";
        this.container.innerHTML = b + "\n                    </ul>\n                </div>\n            </div>\n            ";
        this.logo = this.container.getElementsByClassName("OwO-logo")[0];
        this.logo.addEventListener("click", function (a) {
            d.toggle(a)
        });
        this.container.getElementsByClassName("OwO-body")[0].addEventListener("click",
            function (a) {
                var b = null;
                a.target.classList.contains("OwO-item") ? b = a.target : a.target.parentNode.classList.contains("OwO-item") && (b = a.target.parentNode);
                if (b) {
                    var c = d.area.selectionEnd, e = d.area.value, f = b.innerHTML;
                    b.dataset.hasOwnProperty("input") && (f = b.dataset.input);
                    d.area.value = e.slice(0, c) + f + e.slice(c);
                    d.moveCaretRange(c + f.length);
                    d.area.focus();
                    d.toggle(a)
                }
            });
        this.packagesEle = this.container.getElementsByClassName("OwO-packages")[0];
        for (b = {i$4: 0}; b.i$4 < this.packagesEle.children.length; b = {i$4: b.i$4},
            b.i$4++) (function (a) {
            return function (b) {
                d.packagesEle.children[a.i$4].addEventListener("click", function (a) {
                    d.tab(b, a)
                })
            }
        })(b)(b.i$4);
        this.tab(0)
    };
    a.prototype.moveCaretRange = function (a) {
        if (this.area.setSelectionRange) this.area.focus(), this.area.setSelectionRange(a, a); else if (this.area.createTextRange) {
            var c = this.area.createTextRange();
            c.collapse(!0);
            c.moveEnd("character", a);
            c.moveStart("character", a);
            c.select()
        }
    };
    a.prototype.toggle = function (a) {
        var c = this, b = document.getElementById("body");
        b || (b = document.getElementsByClassName("body")[0]);
        var f = function (a) {
            c.container.classList.remove("OwO-open");
            document.getElementsByTagName("body")[0].classList.remove("OwO-open");
            b && b.removeEventListener("click", f);
            a.stopPropagation()
        };
        this.container.classList.contains("OwO-open") ? (this.container.classList.remove("OwO-open"), document.getElementsByTagName("body")[0].classList.remove("OwO-open")) : (this.container.classList.add("OwO-open"), document.getElementsByTagName("body")[0].classList.add("OwO-open"), b && (b.removeEventListener("click", f), b.addEventListener("click",
            f)), this.loadImageForCurrentTab(), a.stopPropagation())
    };
    a.prototype.tab = function (a, d) {
        var b = this.container.getElementsByClassName("OwO-items-show")[0];
        b && b.classList.remove("OwO-items-show");
        this.container.getElementsByClassName("OwO-items")[a].classList.add("OwO-items-show");
        this.loadImageForCurrentTab();
        (b = this.container.getElementsByClassName("OwO-package-active")[0]) && b.classList.remove("OwO-package-active");
        this.packagesEle.getElementsByTagName("li")[a].classList.add("OwO-package-active");
        "undefined" !=
        typeof d && d.stopPropagation()
    };
    a.prototype.loadImageForCurrentTab = function () {
        if (this.container.classList.contains("OwO-open")) {
            var a = this.container.querySelectorAll(".OwO-items.OwO-items-show>li img");
            [].forEach.call(a, function (a) {
                var b = a.dataset.src;
                b && (a.src = b, a.removeAttribute("data-src"))
            })
        }
    };
    "undefined" !== typeof module && "undefined" !== typeof module.exports ? module.exports = a : window.OwO = a
})();
