!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).SmoothDnD = {})
}(this, function (e) {
    "use strict";
    var l, t, r = "smooth-dnd-container-instance", b = "smooth-dnd-draggable-wrapper", o = "animated",
        p = "__smooth_dnd_draggable_translation_value", u = "__smooth_dnd_draggable_visibility_value",
        C = "smooth-dnd-ghost", w = "smooth-dnd-container", d = "smooth-dnd-extra-size-for-insertion",
        v = "smooth-dnd-stretcher-element", h = "smooth-dnd-stretcher-instance", s = "smooth-dnd-disable-touch-action",
        c = "smooth-dnd-no-user-select", i = "smooth-dnd-prevent-auto-scroll-class",
        y = "smooth-dnd-drop-preview-default-class", x = "smooth-dnd-drop-preview-inner-class",
        E = "smooth-dnd-drop-preview-constant-class", D = "smooth-dnd-drop-preview-flex-container-class",
        n = Object.freeze({
            containerInstance: r,
            defaultGroupName: "@@smooth-dnd-default-group@@",
            wrapperClass: b,
            defaultGrabHandleClass: "smooth-dnd-default-grap-handle",
            animationClass: o,
            translationValue: p,
            visibilityValue: u,
            ghostClass: C,
            containerClass: w,
            extraSizeForInsertion: d,
            stretcherElementClass: v,
            stretcherElementInstance: h,
            isDraggableDetached: "smoth-dnd-is-draggable-detached",
            disbaleTouchActions: s,
            noUserSelectClass: c,
            preventAutoScrollClass: i,
            dropPlaceholderDefaultClass: y,
            dropPlaceholderInnerClass: x,
            dropPlaceholderWrapperClass: E,
            dropPlaceholderFlexContainerClass: D
        }), S = {
            groupName: void 0,
            behaviour: "move",
            orientation: "vertical",
            getChildPayload: void 0,
            animationDuration: 250,
            autoScrollEnabled: !0,
            shouldAcceptDrop: void 0,
            shouldAnimateDrop: void 0
        };

    function a(e) {
        return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function f(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function g(e) {
        return function (e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
        }(e) || function (e) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
        }(e) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    (t = l || (l = {})).x = "x", t.y = "y", t.xy = "xy";
    var O = function (e, t) {
        return {
            left: Math.max(e.left, t.left),
            top: Math.max(e.top, t.top),
            right: Math.min(e.right, t.right),
            bottom: Math.min(e.bottom, t.bottom)
        }
    }, m = function (e, t, n) {
        return "x" === n ? {
            left: Math.max(e.left, t.left),
            top: e.top,
            right: Math.min(e.right, t.right),
            bottom: e.bottom
        } : {left: e.left, top: Math.max(e.top, t.top), right: e.right, bottom: Math.min(e.bottom, t.bottom)}
    }, R = function (e) {
        var t = e.getBoundingClientRect(), n = {left: t.left, right: t.right, top: t.top, bottom: t.bottom};
        if (P(e, "x") && !B(e, "x")) {
            var o = n.right - n.left;
            n.right = n.right + e.scrollWidth - o
        }
        if (P(e, "y") && !B(e, "y")) {
            var r = n.bottom - n.top;
            n.bottom = n.bottom + e.scrollHeight - r
        }
        return n
    }, A = function (e) {
        var t = window.getComputedStyle(e), n = t.overflow;
        if ("auto" === n || "scroll" === n) return l.xy;
        var o = t["overflow-x"], r = "auto" === o || "scroll" === o, i = t["overflow-y"],
            a = "auto" === i || "scroll" === i;
        return r && a ? l.xy : r ? l.x : a ? l.y : null
    }, I = function (e, t) {
        var n = window.getComputedStyle(e), o = n.overflow, r = n["overflow-".concat(t)];
        return "auto" === o || "scroll" === o || ("auto" === r || "scroll" === r)
    }, B = function (e, t) {
        var n = window.getComputedStyle(e), o = n.overflow, r = n["overflow-".concat(t)];
        return "auto" === o || "scroll" === o || "hidden" === o || ("auto" === r || "scroll" === r || "hidden" === r)
    }, P = function (e, t) {
        return "x" === t ? e.scrollWidth > e.clientWidth : e.scrollHeight > e.clientHeight
    }, T = function (e, t) {
        var n = e, o = t || R(e);
        for (n = e.parentElement; n;) P(n, "x") && B(n, "x") && (o = m(o, n.getBoundingClientRect(), "x")), P(n, "y") && B(n, "y") && (o = m(o, n.getBoundingClientRect(), "y")), n = n.parentElement;
        return o
    }, z = function (e, n) {
        for (var o = e; o;) {
            if (o[r]) {
                var t = function () {
                    var t = o[r];
                    if (n.some(function (e) {
                        return e === t
                    })) return {v: t}
                }();
                if ("object" === a(t)) return t.v
            }
            o = o.parentElement
        }
        return null
    }, N = function (e, t) {
        for (var n = e; n;) {
            if (n.matches(t)) return n;
            n = n.parentElement
        }
        return null
    }, L = function (e, t) {
        return -1 < e.className.split(" ").map(function (e) {
            return e
        }).indexOf(t)
    }, M = function (e, t) {
        if (e) {
            var n = e.className.split(" ").filter(function (e) {
                return e
            });
            -1 === n.indexOf(t) && (n.unshift(t), e.className = n.join(" "))
        }
    }, j = function (e, t) {
        if (e) {
            var n = e.className.split(" ").filter(function (e) {
                return e && e !== t
            });
            e.className = n.join(" ")
        }
    }, _ = function (e, t) {
        return e.removeChild(e.children[t])
    }, F = function (e, t, n) {
        n >= e.children.length ? e.appendChild(t) : e.insertBefore(t, e.children[n])
    }, V = function () {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : window.document.selection && window.document.selection.empty()
    }, X = function (e) {
        if (e) {
            var t = window.getComputedStyle(e);
            if (t) return t.cursor
        }
        return null
    };

    function H(e) {
        return !(e.bottom <= e.top || e.right <= e.left)
    }

    function Y(e) {
        var s = e.element, c = e.draggables;
        return function (e, t) {
            var n = e, o = n.removedIndex, r = n.addedIndex, i = n.droppedElement, a = null;
            if (null !== o && (a = _(s, o), c.splice(o, 1)), null !== r) {
                var l = window.document.createElement("div");
                l.className = "".concat(b), l.appendChild(a && a.firstElementChild ? a.firstElementChild : i), F(s, l, r), r >= c.length ? c.push(l) : c.splice(r, 0, l)
            }
            t && t(e)
        }
    }

    var k = Object.freeze({
        domDropHandler: Y, reactDropHandler: function () {
            return {
                handler: function () {
                    return function (e, t) {
                        t && t(e)
                    }
                }
            }
        }
    }), G = {
        size: "offsetWidth",
        distanceToParent: "offsetLeft",
        translate: "transform",
        begin: "left",
        end: "right",
        dragPosition: "x",
        scrollSize: "scrollWidth",
        offsetSize: "offsetWidth",
        scrollValue: "scrollLeft",
        scale: "scaleX",
        setSize: "width",
        setters: {
            translate: function (e) {
                return "translate3d(".concat(e, "px, 0, 0)")
            }
        }
    }, W = {
        size: "offsetHeight",
        distanceToParent: "offsetTop",
        translate: "transform",
        begin: "top",
        end: "bottom",
        dragPosition: "y",
        scrollSize: "scrollHeight",
        offsetSize: "offsetHeight",
        scrollValue: "scrollTop",
        scale: "scaleY",
        setSize: "height",
        setters: {
            translate: function (e) {
                return "translate3d(0,".concat(e, "px, 0)")
            }
        }
    };

    function q(o, s, e) {
        o[d] = 0;
        var r, i = (r = "horizontal" === s ? G : W, {
            get: function (e, t) {
                return e[r[t] || t]
            }, set: function (e, t, n) {
                e[r[t]] = r.setters[t] ? r.setters[t](n) : n
            }
        }), c = {translation: 0};

        function t() {
            var e, t;
            n(o), t = (e = o).getBoundingClientRect(), c.scaleX = e.offsetWidth ? (t.right - t.left) / e.offsetWidth : 1, c.scaleY = e.offsetHeight ? (t.bottom - t.top) / e.offsetHeight : 1
        }

        function n(e) {
            c.rect = R(e);
            var t = T(e, c.rect);
            H(t) && (c.lastVisibleRect = c.visibleRect), c.visibleRect = t
        }

        function a(e) {
            var t = e;
            if (t.tagName) {
                var n = t.getBoundingClientRect();
                return "vertical" === s ? n.bottom - n.top : n.right - n.left
            }
            return i.get(e, "size") * i.get(c, "scale")
        }

        function l(e) {
            return i.get(e, "dragPosition")
        }

        return window.addEventListener("resize", function () {
            n(o)
        }), setTimeout(function () {
            t()
        }, 10), {
            getSize: a, getContainerRectangles: function () {
                return {rect: c.rect, visibleRect: c.visibleRect, lastVisibleRect: c.lastVisibleRect}
            }, getBeginEndOfDOMRect: function (e) {
                return {begin: i.get(e, "begin"), end: i.get(e, "end")}
            }, getBeginEndOfContainer: function () {
                return {begin: i.get(c.rect, "begin") + c.translation, end: i.get(c.rect, "end") + c.translation}
            }, getBeginEndOfContainerVisibleRect: function () {
                return {
                    begin: i.get(c.visibleRect, "begin") + c.translation,
                    end: i.get(c.visibleRect, "end") + c.translation
                }
            }, getBeginEnd: function (e) {
                var t,
                    n = (t = e, (i.get(t, "distanceToParent") + (t[p] || 0)) * i.get(c, "scale") + (i.get(c.rect, "begin") + c.translation) - i.get(o, "scrollValue"));
                return {begin: n, end: n + a(e) * i.get(c, "scale")}
            }, getAxisValue: l, setTranslation: function (e, t) {
                t ? i.set(e.style, "translate", t) : e.style.removeProperty("transform"), e[p] = t
            }, getTranslation: function (e) {
                return e[p]
            }, setVisibility: function (e, t) {
                void 0 !== e[u] && e[u] === t || (t ? e.style.removeProperty("visibility") : e.style.visibility = "hidden", e[u] = t)
            }, isVisible: function (e) {
                return void 0 === e[u] || e[u]
            }, isInVisibleRect: function (e, t) {
                var n = c.visibleRect, o = n.left, r = n.top, i = n.right, a = n.bottom;
                a - r < 2 && (a = r + 30);
                var l = c.rect;
                return "vertical" === s ? e > l.left && e < l.right && r < t && t < a : o < e && e < i && t > l.top && t < l.bottom
            }, setSize: function (e, t) {
                i.set(e, "setSize", t)
            }, getTopLeftOfElementBegin: function (e) {
                var t = 0;
                return {top: "horizontal" === s ? (t = e, c.rect.top) : (t = c.rect.left, e), left: t}
            }, getScrollSize: function (e) {
                return i.get(e, "scrollSize")
            }, getScrollValue: function (e) {
                return i.get(e, "scrollValue")
            }, setScrollValue: function (e, t) {
                return i.set(e, "scrollValue", t)
            }, invalidate: t, invalidateRects: function () {
                n(o)
            }, getPosition: function (e) {
                return l(e)
            }, setBegin: function (e, t) {
                i.set(e, "begin", t)
            }
        }
    }

    function U(e, t, n) {
        var o, r, i, a = n.left, l = n.right, s = n.top, c = n.bottom, u = e.x, d = e.y;
        if (u < a || l < u || d < s || c < d) return null;
        i = "x" === t ? (o = a, r = l, u) : (o = s, r = c, d);
        var f = r - o, g = 400 < f ? 100 : f / 4;
        return r - i < g ? {direction: "end", speedFactor: (g - (r - i)) / g} : i - o < g ? {
            direction: "begin",
            speedFactor: (g - (i - o)) / g
        } : null
    }

    var J = function (l) {
        var s = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "y", c = null, u = null, d = null,
            f = null;
        return {
            animate: function (e, t) {
                d = e, f = t, function a() {
                    null === c && (c = requestAnimationFrame(function (e) {
                        null === u && (u = e);
                        var t = e - u;
                        u = e;
                        var n, o, r, i = t / 1e3 * f;
                        o = s, r = i = "begin" === d ? 0 - i : i, (n = l) && (n !== window ? "x" === o ? n.scrollLeft += r : n.scrollTop += r : "x" === o ? n.scrollBy(r, 0) : n.scrollBy(0, r)), c = null, a()
                    }))
                }()
            }, stop: function () {
                null !== c && (cancelAnimationFrame(c), c = null), u = null
            }
        }
    };

    function K(e) {
        return function () {
            return T(e, e.getBoundingClientRect())
        }
    }

    var Q, Z, $, ee = function (e) {
        var u = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1500, a = e.reduce(function (e, t) {
            var n = function (e) {
                for (var t = [], n = e.element; n;) {
                    var o = A(n);
                    if (o && !L(n, i)) {
                        var r = {};
                        switch (o) {
                            case l.xy:
                                r.x = {animator: J(n, "x")}, r.y = {animator: J(n, "y")};
                                break;
                            case l.x:
                                r.x = {animator: J(n, "x")};
                                break;
                            case l.y:
                                r.y = {animator: J(n, "y")}
                        }
                        t.push({axisAnimations: r, getRect: K(n), scrollerElement: n})
                    }
                    n = n.parentElement
                }
                return t
            }(t).filter(function (t) {
                return !e.find(function (e) {
                    return e.scrollerElement === t.scrollerElement
                })
            });
            return [].concat(g(e), g(n))
        }, []);
        return function (e) {
            var t, o, n = e.draggableInfo;
            if (e.reset) a.forEach(function (e) {
                e.axisAnimations.x && e.axisAnimations.x.animator.stop(), e.axisAnimations.y && e.axisAnimations.y.animator.stop()
            }); else if (n) {
                t = a, o = n.mousePosition, t.forEach(function (e) {
                    var t = e.axisAnimations, n = (0, e.getRect)();
                    t.x && (t.x.scrollParams = U(o, "x", n), e.cachedRect = n), t.y && (t.y.scrollParams = U(o, "y", n), e.cachedRect = n)
                }), a.forEach(function (e) {
                    var t = e.axisAnimations, n = t.x, o = t.y;
                    if (n) if (n.scrollParams) {
                        var r = n.scrollParams, i = r.direction, a = r.speedFactor;
                        n.animator.animate(i, a * u)
                    } else n.animator.stop();
                    if (o) if (o.scrollParams) {
                        var l = o.scrollParams, s = l.direction, c = l.speedFactor;
                        o.animator.animate(s, c * u)
                    } else o.animator.stop()
                });
                var r = a.filter(function (e) {
                    return e.cachedRect
                });
                if (r.length && 1 < r.length) {
                    var i = function (e, t) {
                        for (var n = document.elementFromPoint(t.x, t.y); n;) {
                            var o = e.find(function (e) {
                                return e.scrollerElement === n
                            });
                            if (o) return o;
                            n = n.parentElement
                        }
                        return null
                    }(r, n.mousePosition);
                    i && r.forEach(function (e) {
                        e !== i && (e.axisAnimations.x && e.axisAnimations.x.animator.stop(), e.axisAnimations.y && e.axisAnimations.y.animator.stop())
                    })
                }
            }
        }
    };
    "undefined" != typeof window && ((Q = Node || Element) && Q.prototype && !Q.prototype.matches && (Q.prototype.matches = Q.prototype.matchesSelector || Q.prototype.mozMatchesSelector || Q.prototype.msMatchesSelector || Q.prototype.oMatchesSelector || Q.prototype.webkitMatchesSelector || function (e) {
        for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; 0 <= --n && t.item(n) !== this;) ;
        return -1 < n
    }), (Z = Node || Element) && Z.prototype && null == Z.prototype.firstElementChild && Object.defineProperty(Z.prototype, "firstElementChild", {
        get: function () {
            for (var e, t = this.childNodes, n = 0; e = t[n++];) if (1 === e.nodeType) return e;
            return null
        }
    }), Array.prototype.some || (Array.prototype.some = function (e) {
        if (null == this) throw new TypeError("Array.prototype.some called on null or undefined");
        if ("function" != typeof e) throw new TypeError;
        for (var t = Object(this), n = t.length >>> 0, o = 2 <= arguments.length ? arguments[1] : void 0, r = 0; r < n; r++) if (r in t && e.call(o, t[r], r, t)) return !0;
        return !1
    }));
    var te = {overflow: "hidden", display: "block"},
        ne = {height: "100%", display: "table-cell", "vertical-align": "top"}, oe = (f($ = {}, ".".concat(w), {
            position: "relative",
            "min-height": "30px",
            "min-width": "30px"
        }), f($, ".".concat(w, ".horizontal"), {display: "table"}), f($, ".".concat(w, ".horizontal > .").concat(v), {display: "inline-block"}), f($, ".".concat(w, ".horizontal > .").concat(b), ne), f($, ".".concat(w, ".vertical > .").concat(b), te), f($, ".".concat(b), {"box-sizing": "border-box"}), f($, ".".concat(b, ".horizontal"), ne), f($, ".".concat(b, ".vertical"), te), f($, ".".concat(b, ".animated"), {transition: "transform ease"}), f($, ".".concat(C), {"box-sizing": "border-box"}), f($, ".".concat(C, ".animated"), {transition: "all ease-in-out"}), f($, ".".concat(C, " *"), {"pointer-events": "none"}), f($, ".".concat(s, " *"), {
            "touch-actions": "none",
            "-ms-touch-actions": "none"
        }), f($, ".".concat(c), {
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none"
        }), f($, ".".concat(x), {flex: "1"}), f($, ".".concat(w, ".horizontal > .").concat(E), {
            height: "100%",
            overflow: "hidden",
            display: "table-cell",
            "vertical-align": "top"
        }), f($, ".".concat(w, ".vertical > .").concat(E), {
            overflow: "hidden",
            display: "block",
            width: "100%"
        }), f($, ".".concat(D), {
            width: "100%",
            height: "100%",
            display: "flex",
            "justify-content": "stretch",
            "align-items": "stretch"
        }), f($, ".".concat(y), {"background-color": "rgba(150, 150, 150, 0.1)", border: "1px solid #ccc"}), $);

    function re(o) {
        return Object.keys(o).reduce(function (e, t) {
            var n = o[t];
            return "object" === a(n) ? "".concat(e).concat(t, "{").concat(re(n), "}") : "".concat(e).concat(t, ":").concat(n, ";")
        }, "")
    }

    function ie(e) {
        if (e && "undefined" != typeof window) {
            var t = window.document.head || window.document.getElementsByTagName("head")[0],
                n = window.document.createElement("style"), o = re({"body *": {cursor: "".concat(e, " !important")}});
            return n.type = "text/css", n.styleSheet ? n.styleSheet.cssText = o : n.appendChild(window.document.createTextNode(o)), t.appendChild(n), n
        }
        return null
    }

    var ae, le, se = ["mousedown", "touchstart"], ce = ["mousemove", "touchmove"], ue = ["mouseup", "touchend"],
        de = null, fe = null, ge = null, me = null, pe = [], ve = !1, he = !1, ye = !1, be = !1, we = null, xe = null,
        Ee = null, Ce = null, De = (ae = null, le = !1, {
            start: function () {
                le || (le = !0, function e() {
                    ae = requestAnimationFrame(function () {
                        de.forEach(function (e) {
                            return e.layout.invalidateRects()
                        }), setTimeout(function () {
                            null !== ae && e()
                        }, 50)
                    })
                }())
            }, stop: function () {
                null !== ae && (cancelAnimationFrame(ae), ae = null), le = !1
            }
        }),
        Se = "undefined" != typeof window && !!(window.navigator.userAgent.match(/Android/i) || window.navigator.userAgent.match(/webOS/i) || window.navigator.userAgent.match(/iPhone/i) || window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPod/i) || window.navigator.userAgent.match(/BlackBerry/i) || window.navigator.userAgent.match(/Windows Phone/i));

    function Oe() {
        "undefined" != typeof window && se.forEach(function (e) {
            window.document.addEventListener(e, Ie, {passive: !1})
        })
    }

    function Re() {
        return me && me.ghostParent ? me.ghostParent : fe && fe.parentElement || window.document.body
    }

    var Ae = function () {
        var r, i, o, a = null, l = 1, s = 5;

        function c(e) {
            var t = _e(e), n = t.clientX, o = t.clientY;
            if (i) (Math.abs(r.clientX - n) > s || Math.abs(r.clientY - o) > s) && f(); else if (Math.abs(r.clientX - n) > l || Math.abs(r.clientY - o) > l) return g()
        }

        function u() {
            f()
        }

        function d() {
            f()
        }

        function f() {
            clearTimeout(a), ce.forEach(function (e) {
                return window.document.removeEventListener(e, c)
            }, {passive: !1}), ue.forEach(function (e) {
                return window.document.removeEventListener(e, u)
            }, {passive: !1}), window.document.removeEventListener("drag", d, {passive: !1})
        }

        function g() {
            clearTimeout(a), f(), o()
        }

        return function (e, t, n) {
            r = _e(e), o = n, (i = "number" == typeof t ? t : Se ? 200 : 0) && (a = setTimeout(g, i)), ce.forEach(function (e) {
                return window.document.addEventListener(e, c)
            }, {passive: !1}), ue.forEach(function (e) {
                return window.document.addEventListener(e, u)
            }, {passive: !1}), window.document.addEventListener("drag", d, {passive: !1})
        }
    }();

    function Ie(e) {
        var t = _e(e);
        if (!ve && (void 0 === t.button || 0 === t.button) && (fe = N(t.target, "." + b))) {
            var n = N(fe, "." + w), o = pe.filter(function (e) {
                return e.element === n
            })[0], r = o.getOptions().dragHandleSelector, i = o.getOptions().nonDragAreaSelector, a = !0;
            if (r && !N(t.target, r) && (a = !1), i && N(t.target, i) && (a = !1), a) {
                M(window.document.body, s), M(window.document.body, c);
                window.document.addEventListener("mouseup", function e() {
                    j(window.document.body, s), j(window.document.body, c), window.document.removeEventListener("mouseup", e)
                })
            }
            a && Ae(t, o.getOptions().dragBeginDelay, function () {
                V(), Ye(t, X(e.target)), ce.forEach(function (e) {
                    window.document.addEventListener(e, Be, {passive: !1})
                }), ue.forEach(function (e) {
                    window.document.addEventListener(e, je, {passive: !1})
                })
            })
        }
    }

    function Be(e) {
        e.preventDefault();
        var t = _e(e);
        if (me) {
            var n = me.container.getOptions();
            "contain" === n.behaviour ? function (e) {
                var t, n, o, r, i = e.clientX, a = e.clientY,
                    l = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "vertical",
                    s = me.container.layout.getBeginEndOfContainerVisibleRect();
                r = "vertical" === l ? (t = a, n = "y", o = "top", me.size.offsetHeight) : (t = i, n = "x", o = "left", me.size.offsetWidth);
                var c = s.begin, u = s.end - r, d = Math.max(c, Math.min(u, t + ge.positionDelta[o]));
                ge.topLeft[n] = d, me.position[n] = Math.max(s.begin, Math.min(s.end, t + ge.centerDelta[n])), me.mousePosition[n] = Math.max(s.begin, Math.min(s.end, t)), me.position[n] < s.begin + r / 2 && (me.position[n] = s.begin + 2), me.position[n] > s.end - r / 2 && (me.position[n] = s.end - 2)
            }(t, n.orientation) : Ee ? "y" === Ee ? (ge.topLeft.y = t.clientY + ge.positionDelta.top, me.position.y = t.clientY + ge.centerDelta.y, me.mousePosition.y = t.clientY) : "x" === Ee && (ge.topLeft.x = t.clientX + ge.positionDelta.left, me.position.x = t.clientX + ge.centerDelta.x, me.mousePosition.x = t.clientX) : (ge.topLeft.x = t.clientX + ge.positionDelta.left, ge.topLeft.y = t.clientY + ge.positionDelta.top, me.position.x = t.clientX + ge.centerDelta.x, me.position.y = t.clientY + ge.centerDelta.y, me.mousePosition.x = t.clientX, me.mousePosition.y = t.clientY), Ge(), (be = !we(me)) && Le()
        } else Ye(t, X(e.target))
    }

    var Pe, Te, ze, Ne, Le = (Pe = Me, ze = !(Te = 20), Ne = null, function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        Ne && clearTimeout(Ne), ze && !Ne ? Pe.call.apply(Pe, [null].concat(t)) : Ne = setTimeout(function () {
            Ne = null, Pe.call.apply(Pe, [null].concat(t))
        }, Te)
    });

    function Me() {
        be && (be = !1, Fe(me, de))
    }

    function je() {
        var e;
        ce.forEach(function (e) {
            window.document.removeEventListener(e, Be, {passive: !1})
        }), ue.forEach(function (e) {
            window.document.removeEventListener(e, je, {passive: !1})
        }), xe({reset: !0}), Ce && ((e = Ce) && "undefined" != typeof window && (window.document.head || window.document.getElementsByTagName("head")[0]).removeChild(e), Ce = null), me && (De.stop(), Me(), ye = !0, function (e) {
            function i() {
                j(ge.ghost, "animated"), ge.ghost.style.transitionDuration = null, Re().removeChild(ge.ghost), e()
            }

            function t(e, t, n) {
                var o = e.top, r = e.left;
                M(ge.ghost, "animated"), n && M(ge.ghost.firstElementChild, n), ge.topLeft.x = r, ge.topLeft.y = o, Ge(t), setTimeout(function () {
                    i()
                }, t + 20)
            }

            function n(e, t) {
                M(ge.ghost, "animated"), Ge(e, .9, !0), setTimeout(function () {
                    t()
                }, e + 20)
            }

            if (me.targetElement) {
                var o = pe.filter(function (e) {
                    return e.element === me.targetElement
                })[0];
                !(p = o.getOptions()).shouldAnimateDrop || p.shouldAnimateDrop(me.container.getOptions(), me.payload) ? t(o.getDragResult().shadowBeginEnd.rect, Math.max(150, o.getOptions().animationDuration / 2), o.getOptions().dropClass) : i()
            } else {
                var r = pe.filter(function (e) {
                    return e === me.container
                })[0];
                if (r) {
                    var a = r.getOptions(), l = a.behaviour, s = a.removeOnDropOut;
                    if ("move" !== l && "contain" !== l || !he && s || !r.getDragResult()) n(r.getOptions().animationDuration, i); else {
                        var c = r.layout.getContainerRectangles();
                        if (!H(c.visibleRect) && H(c.lastVisibleRect)) t({
                            top: c.lastVisibleRect.top,
                            left: c.lastVisibleRect.left
                        }, r.getOptions().animationDuration, r.getOptions().dropClass); else {
                            var u = r.getDragResult(), d = u.removedIndex, f = u.elementSize, g = r.layout;
                            r.getTranslateCalculator({
                                dragResult: {
                                    removedIndex: d,
                                    addedIndex: d,
                                    elementSize: f,
                                    pos: void 0,
                                    shadowBeginEnd: void 0
                                }
                            });
                            var m = 0 < d ? g.getBeginEnd(r.draggables[d - 1]).end : g.getBeginEndOfContainer().begin;
                            t(g.getTopLeftOfElementBegin(m), r.getOptions().animationDuration, r.getOptions().dropClass)
                        }
                    }
                } else n(S.animationDuration, i)
            }
            var p
        }(function () {
            He(ve = !1);
            for (var e = de || [], t = e.shift(); void 0 !== t;) t.handleDrop(me), t = e.shift();
            we = Ee = me = ge = fe = de = null, ye = !1
        }))
    }

    function _e(e) {
        return e.touches ? e.touches[0] : e
    }

    function Fe(n, e) {
        var o = !1;
        e.forEach(function (e) {
            var t = e.handleDrag(n);
            o = !!t.containerBoxChanged || !1, t.containerBoxChanged = !1
        }), o && (o = !1, requestAnimationFrame(function () {
            pe.forEach(function (e) {
                e.layout.invalidateRects(), e.onTranslated()
            })
        }))
    }

    function Ve(e) {
        var t = e, n = null;
        return function (e) {
            return !(null !== n || !ve || ye) && (n = requestAnimationFrame(function () {
                ve && !ye && (Fe(e, t), xe({draggableInfo: e})), n = null
            }), !0)
        }
    }

    function Xe(e, t) {
        return e.getOptions().autoScrollEnabled ? ee(t, e.getScrollMaxSpeed()) : function (e) {
            return null
        }
    }

    function He(o) {
        pe.forEach(function (e) {
            var t = o ? e.getOptions().onDragStart : e.getOptions().onDragEnd;
            if (t) {
                var n = {isSource: e === me.container, payload: me.payload};
                e.isDragRelevant(me.container, me.payload) ? n.willAcceptDrop = !0 : n.willAcceptDrop = !1, t(n)
            }
        })
    }

    function Ye(e, t) {
        if (null !== fe) {
            ve = !0;
            var n = pe.filter(function (e) {
                return fe.parentElement === e.element
            })[0];
            n.setDraggables(), Ee = n.getOptions().lockAxis ? n.getOptions().lockAxis.toLowerCase() : null, y = fe, b = pe.filter(function (e) {
                return y.parentElement === e.element
            })[0], w = b.draggables.indexOf(y), x = b.getOptions().getGhostParent, E = y.getBoundingClientRect(), me = {
                container: b,
                element: y,
                size: {offsetHeight: E.bottom - E.top, offsetWidth: E.right - E.left},
                elementIndex: w,
                payload: b.getOptions().getChildPayload ? b.getOptions().getChildPayload(w) : void 0,
                targetElement: null,
                position: {x: 0, y: 0},
                groupName: b.getOptions().groupName,
                ghostParent: x ? x() : null,
                invalidateShadow: null,
                mousePosition: null,
                relevantContainers: null
            }, o = fe, r = {
                x: e.clientX,
                y: e.clientY
            }, i = me.container, a = t, l = r.x, s = r.y, c = o.getBoundingClientRect(), u = c.left, d = c.top, f = c.right, g = c.bottom, m = O(i.layout.getContainerRectangles().visibleRect, c), p = m.left + (m.right - m.left) / 2, v = m.top + (m.bottom - m.top) / 2, (h = o.cloneNode(!0)).style.zIndex = "1000", h.style.boxSizing = "border-box", h.style.position = "fixed", h.style.top = "0px", h.style.left = "0px", h.style.transform = null, h.style.removeProperty("transform"), i.shouldUseTransformForGhost() ? h.style.transform = "translate3d(".concat(u, "px, ").concat(d, "px, 0)") : (h.style.top = "".concat(d, "px"), h.style.left = "".concat(u, "px")), h.style.width = f - u + "px", h.style.height = g - d + "px", h.style.overflow = "visible", h.style.transition = null, h.style.removeProperty("transition"), h.style.pointerEvents = "none", h.style.userSelect = "none", i.getOptions().dragClass ? setTimeout(function () {
                M(h.firstElementChild, i.getOptions().dragClass);
                var e = window.getComputedStyle(h.firstElementChild).cursor;
                Ce = ie(e)
            }) : Ce = ie(a), M(h, i.getOptions().orientation || "vertical"), M(h, C), ge = {
                ghost: h,
                centerDelta: {x: p - l, y: v - s},
                positionDelta: {left: u - l, top: d - s},
                topLeft: {x: u, y: d}
            }, me.position = {
                x: e.clientX + ge.centerDelta.x,
                y: e.clientY + ge.centerDelta.y
            }, me.mousePosition = {x: e.clientX, y: e.clientY}, de = pe.filter(function (e) {
                return e.isDragRelevant(n, me.payload)
            }), me.relevantContainers = de, we = Ve(de), xe && xe({
                reset: !0,
                draggableInfo: void 0
            }), xe = Xe(n, de), de.forEach(function (e) {
                return e.prepareDrag(e, de)
            }), He(!0), we(me), Re().appendChild(ge.ghost), De.start()
        }
        var o, r, i, a, l, s, c, u, d, f, g, m, p, v, h, y, b, w, x, E
    }

    var ke = null;

    function Ge() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1,
            n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], o = ge, r = o.ghost, i = o.topLeft,
            a = i.x, l = i.y, s = !me.container || me.container.shouldUseTransformForGhost(),
            c = s ? "translate3d(".concat(a, "px,").concat(l, "px, 0)") : null;
        if (1 !== t && (c = c ? "".concat(c, " scale(").concat(t, ")") : "scale(".concat(t, ")")), 0 < e) return ge.ghost.style.transitionDuration = e + "ms", void requestAnimationFrame(function () {
            c && (r.style.transform = c), s || (r.style.left = a + "px", r.style.top = l + "px"), ke = null, n && (r.style.opacity = "0")
        });
        null === ke && (ke = requestAnimationFrame(function () {
            c && (r.style.transform = c), s || (r.style.left = a + "px", r.style.top = l + "px"), ke = null, n && (r.style.opacity = "0")
        }))
    }

    function We() {
        if (ve && !he && !ye) {
            be = !(he = !0);
            var t = Object.assign({}, me, {
                targetElement: null,
                position: {x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER},
                mousePosition: {x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER}
            });
            de.forEach(function (e) {
                e.handleDrag(t)
            }), me.targetElement = null, me.cancelDrop = !0, je(), he = !1
        }
    }

    "undefined" != typeof window && function () {
        if ("undefined" != typeof window) {
            var e = window.document.head || window.document.getElementsByTagName("head")[0],
                t = window.document.createElement("style");
            t.id = "smooth-dnd-style-definitions";
            var n = re(oe);
            t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = n : t.appendChild(window.document.createTextNode(n)), e.appendChild(t)
        }
    }();
    var qe = (Oe(), {
        register: function (e) {
            var t;
            t = e, pe.push(t), ve && me && t.isDragRelevant(me.container, me.payload) && (de.push(t), t.prepareDrag(t, de), xe && xe({
                reset: !0,
                draggableInfo: void 0
            }), xe = Xe(t, de), we = Ve(de), t.handleDrag(me))
        }, unregister: function (e) {
            !function (e) {
                if (pe.splice(pe.indexOf(e), 1), ve && me) {
                    me.container === e && e.fireRemoveElement(), me.targetElement === e.element && (me.targetElement = null);
                    var t = de.indexOf(e);
                    -1 < t && (de.splice(t, 1), xe && xe({
                        reset: !0,
                        draggableInfo: void 0
                    }), xe = Xe(e, de), we = Ve(de))
                }
            }(e)
        }, isDragging: function () {
            return ve
        }, cancelDrag: We
    });

    function Ue(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : S.animationDuration;
        t ? (M(e, o), e.style.transitionDuration = n + "ms") : (j(e, o), e.style.removeProperty("transition-duration"))
    }

    function Je(n) {
        var o = [];
        return Array.prototype.forEach.call(n.children, function (e) {
            if (e.nodeType === Node.ELEMENT_NODE) {
                var t = e;
                L(e, b) || (t = function (e) {
                    if (yt.wrapChild) {
                        var t = window.document.createElement("div");
                        return t.className = "".concat(b), e.parentElement.insertBefore(t, e), t.appendChild(e), t
                    }
                    return e
                }(e)), t[p] = 0, o.push(t)
            } else n.removeChild(e)
        }), o
    }

    function Ke(e) {
        var g = e.layout;
        return function (e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            return function e(t, n, o, r) {
                var i = 4 < arguments.length && void 0 !== arguments[4] && arguments[4];
                if (r < o) return o;
                if (o === r) {
                    var a = g.getBeginEnd(t[o]), l = a.begin, s = a.end;
                    return i ? n < (s + l) / 2 ? o : o + 1 : o
                }
                var c = Math.floor((r + o) / 2), u = g.getBeginEnd(t[c]), d = u.begin, f = u.end;
                return n < d ? e(t, n, o, c - 1, i) : f < n ? e(t, n, c + 1, r, i) : i ? n < (f + d) / 2 ? c : c + 1 : c
            }(e, t, 0, e.length - 1, n)
        }
    }

    function Qe(e) {
        var t, n, o, r, i = e.element, a = e.draggables, l = e.layout, s = e.getOptions, c = (n = (t = {
            element: i,
            draggables: a,
            layout: l,
            getOptions: s
        }).element, o = t.draggables, r = t.layout, function () {
            o.forEach(function (e) {
                Ue(e, !1), r.setTranslation(e, 0), r.setVisibility(e, !0)
            }), n[h] && (n[h].parentNode.removeChild(n[h]), n[h] = null)
        }), u = (yt.dropHandler || Y)({element: i, draggables: a, layout: l, getOptions: s});
        return function (e, t) {
            var n = t.addedIndex, o = t.removedIndex,
                r = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            if (c(), !e.cancelDrop && (e.targetElement || s().removeOnDropOut || r)) {
                var i = {
                    removedIndex: o,
                    addedIndex: null !== n ? null !== o && o < n ? n - 1 : n : null,
                    payload: e.payload
                };
                u(i, s().onDrop)
            }
        }
    }

    function Ze(e) {
        var o = e.element, r = e.getOptions, i = null;
        return function (e) {
            var t = e.draggableInfo, n = i;
            return null == i && t.container.element === o && "copy" !== r().behaviour && (n = i = t.elementIndex), {removedIndex: n}
        }
    }

    function $e(e) {
        var n = e.draggables, o = e.layout;
        return function (e) {
            var t = e.dragResult;
            null !== t.removedIndex && o.setVisibility(n[t.removedIndex], !1)
        }
    }

    function et(e) {
        var r = e.element, i = e.layout;
        return function (e) {
            var t = e.draggableInfo, n = document.elementFromPoint(t.position.x, t.position.y);
            if (n) {
                var o = z(n, t.relevantContainers);
                if (o && o.element === r) return {pos: i.getPosition(t.position)}
            }
            return {pos: null}
        }
    }

    function tt(e) {
        var n = e.layout, o = null;
        return function (e) {
            var t = e.draggableInfo;
            return null === e.dragResult.pos ? o = null : {elementSize: o = o || n.getSize(t.size)}
        }
    }

    function nt(e) {
        var o = e.element;
        return function (e) {
            var t = e.draggableInfo, n = e.dragResult;
            !function (e, t) {
                var n = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2];
                t && n ? e.targetElement = t : e.targetElement === t && (e.targetElement = null)
            }(t, o, !!n.pos)
        }
    }

    function ot() {
        return function (e) {
            return null !== e.dragResult.pos ? {addedIndex: 0} : {addedIndex: null}
        }
    }

    function rt(e) {
        var r = e.layout, i = null;
        return function (e) {
            var t = e.dragResult.addedIndex;
            if (t === i) return null;
            i = t;
            var n = r.getBeginEndOfContainer(), o = n.begin;
            n.end;
            return {shadowBeginEnd: {rect: r.getTopLeftOfElementBegin(o)}}
        }
    }

    function it(e) {
        var g = e.layout, m = e.element, p = e.getOptions, v = null;
        return function (e) {
            var t = e.dragResult, n = t.elementSize, o = t.shadowBeginEnd, r = t.addedIndex,
                i = t.dropPlaceholderContainer, a = p();
            if (a.dropPlaceholder) {
                var l = "boolean" == typeof a.dropPlaceholder ? {} : a.dropPlaceholder, s = l.animationDuration,
                    c = l.className, u = l.showOnTop;
                if (null === r) return i && null !== v && m.removeChild(i), v = null, {dropPlaceholderContainer: void 0};
                if (!i) {
                    var d = document.createElement("div"), f = document.createElement("div");
                    f.className = D, d.className = "".concat(x, " ").concat(c || y), (i = document.createElement("div")).className = "".concat(E), i.style.position = "absolute", void 0 !== s && (i.style.transition = "all ".concat(s, "ms ease")), i.appendChild(f), f.appendChild(d), g.setSize(i.style, n + "px"), i.style.pointerEvents = "none", u ? m.appendChild(i) : m.insertBefore(i, m.firstElementChild)
                }
                return v !== r && o.dropArea && g.setBegin(i.style, o.dropArea.begin - g.getBeginEndOfContainer().begin + "px"), v = r, {dropPlaceholderContainer: i}
            }
            return null
        }
    }

    function at(e) {
        var o = dt(e);
        return function (e) {
            var t = e.draggableInfo, n = e.dragResult;
            return t.invalidateShadow ? o({draggableInfo: t, dragResult: n}) : null
        }
    }

    function lt(e) {
        var t, i, a, o = (i = (t = e).draggables, a = Ke({layout: t.layout}), function (e) {
            var t = e.dragResult, n = t.shadowBeginEnd, o = t.pos;
            if (n) return n.begin + n.beginAdjustment <= o && n.end >= o ? null : o < n.begin + n.beginAdjustment ? a(i, o) : o > n.end ? a(i, o) + 1 : i.length;
            var r = a(i, o, !0);
            return null !== r ? r : i.length
        });
        return function (e) {
            var t = e.dragResult, n = null;
            return null !== t.pos && null === (n = o({dragResult: t})) && (n = t.addedIndex), {addedIndex: n}
        }
    }

    function st() {
        var r = null;
        return function (e) {
            var t = e.dragResult, n = t.addedIndex, o = t.shadowBeginEnd;
            n !== r && null !== r && o && (o.beginAdjustment = 0), r = n
        }
    }

    function ct(e) {
        var u = e.element, d = e.draggables, f = e.layout, g = e.getOptions, m = null;
        return function (e) {
            var t = e.dragResult, n = t.addedIndex, o = t.removedIndex, r = t.elementSize;
            if (null === o) if (null !== n) {
                if (!m) {
                    var i = f.getBeginEndOfContainer();
                    i.end = i.begin + f.getSize(u);
                    var a = f.getScrollSize(u) > f.getSize(u) ? i.begin + f.getScrollSize(u) - f.getScrollValue(u) : i.end,
                        l = 0 < d.length ? f.getBeginEnd(d[d.length - 1]).end - d[d.length - 1][p] : i.begin;
                    if (a < l + r) {
                        (m = window.document.createElement("div")).className = v + " " + g().orientation;
                        var s = 0 < d.length ? r + l - a : r;
                        return f.setSize(m.style, "".concat(s, "px")), u.appendChild(m), u[h] = m, {containerBoxChanged: !0}
                    }
                }
            } else if (m) {
                f.setTranslation(m, 0);
                var c = m;
                return m = null, u.removeChild(c), {containerBoxChanged: !(u[h] = null)}
            }
        }
    }

    function ut(e) {
        var s = e.draggables, c = e.layout, u = null, d = null;
        return function (e) {
            var t = e.dragResult, n = t.addedIndex, o = t.removedIndex, r = t.elementSize;
            if (n !== u || o !== d) {
                for (var i = 0; i < s.length; i++) if (i !== o) {
                    var a = s[i], l = 0;
                    null !== o && o < i && (l -= r), null !== n && n <= i && (l += r), c.setTranslation(a, l)
                }
                return {addedIndex: u = n, removedIndex: d = o}
            }
        }
    }

    function dt(e) {
        var x = e.draggables, E = e.layout, C = null;
        return function (e) {
            var t = e.draggableInfo, n = e.dragResult, o = n.addedIndex, r = n.removedIndex, i = n.elementSize,
                a = n.pos, l = n.shadowBeginEnd;
            if (null === a) return {shadowBeginEnd: C = null};
            if (null === o || !t.invalidateShadow && o === C) return null;
            var s = o - 1, c = Number.MIN_SAFE_INTEGER, u = 0, d = 0, f = null, g = null;
            if (s === r && s--, -1 < s) {
                var m = E.getSize(x[s]);
                if (g = E.getBeginEnd(x[s]), i < m) {
                    var p = (m - i) / 2;
                    c = g.end - p
                } else c = g.end;
                u = g.end
            } else g = {end: E.getBeginEndOfContainer().begin}, u = E.getBeginEndOfContainer().begin;
            var v = Number.MAX_SAFE_INTEGER, h = o;
            if (h === r && h++, h < x.length) {
                var y = E.getSize(x[h]);
                if (f = E.getBeginEnd(x[h]), i < y) {
                    var b = (y - i) / 2;
                    v = f.begin + b
                } else v = f.begin;
                d = f.begin
            } else f = {begin: E.getContainerRectangles().rect.end}, d = E.getContainerRectangles().rect.end - E.getContainerRectangles().rect.begin;
            var w = g && f ? E.getTopLeftOfElementBegin(g.end) : null;
            return C = o, {
                shadowBeginEnd: {
                    dropArea: {begin: u, end: d},
                    begin: c,
                    end: v,
                    rect: w,
                    beginAdjustment: l ? l.beginAdjustment : 0
                }
            }
        }
    }

    function ft() {
        var a = null;
        return function (e) {
            var t = e.dragResult, n = t.pos, o = t.addedIndex, r = t.shadowBeginEnd;
            if (null !== n) {
                if (null != o && null === a) {
                    if (n < r.begin) {
                        var i = n - r.begin - 5;
                        r.beginAdjustment = i
                    }
                    a = o
                }
            } else a = null
        }
    }

    function gt(e) {
        var t = e.getOptions, n = !1, o = t();
        return function (e) {
            var t = !!e.dragResult.pos;
            t !== n && ((n = t) ? o.onDragEnter && o.onDragEnter() : o.onDragLeave && o.onDragLeave())
        }
    }

    function mt(e) {
        var t = e.getOptions, s = null, c = t();
        return function (e) {
            var t = e.dragResult, n = t.addedIndex, o = t.removedIndex, r = e.draggableInfo, i = r.payload,
                a = r.element;
            if (c.onDropReady && null !== n && s !== n) {
                var l = s = n;
                null !== o && o < n && l--, c.onDropReady({
                    addedIndex: l,
                    removedIndex: o,
                    payload: i,
                    element: a ? a.firstElementChild : void 0
                })
            }
        }
    }

    function pt(e) {
        return "drop-zone" === e.getOptions().behaviour ? vt(e)(Ze, $e, et, tt, nt, ot, rt, gt, mt) : vt(e)(Ze, $e, et, tt, nt, at, lt, st, ct, ut, dt, it, ft, gt, mt)
    }

    function vt(i) {
        return function () {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            var o = t.map(function (e) {
                return e(i)
            }), r = null;
            return function (n) {
                return r = o.reduce(function (e, t) {
                    return Object.assign(e, t({draggableInfo: n, dragResult: e}))
                }, r || {addedIndex: null, removedIndex: null, elementSize: null, pos: null, shadowBeginEnd: null})
            }
        }
    }

    function ht(y) {
        return function (e) {
            var t, n, o, r, i, a, l, s = Object.assign({}, S, e), c = null, u = null,
                d = (n = h, o = Je(t = y), r = n(), M(t, "".concat(w, " ").concat(r.orientation)), {
                    element: t,
                    draggables: o,
                    getOptions: n,
                    layout: q(t, r.orientation, r.animationDuration)
                }), f = pt(d), g = Qe(d), m = function (t, n) {
                    var o = [];

                    function e() {
                        o && (o.forEach(function (e) {
                            return e.removeEventListener("scroll", n)
                        }), window.removeEventListener("scroll", n))
                    }

                    return function () {
                        for (var e = t; e;) (I(e, "x") || I(e, "y")) && o.push(e), e = e.parentElement
                    }(), {
                        dispose: function () {
                            e(), o = null
                        }, start: function () {
                            o && (o.forEach(function (e) {
                                return e.addEventListener("scroll", n)
                            }), window.addEventListener("scroll", n))
                        }, stop: e
                    }
                }(y, function () {
                    d.layout.invalidateRects(), p()
                });

            function p() {
                null !== u && (u.invalidateShadow = !0, c = f(u), u.invalidateShadow = !1)
            }

            function v(e, t) {
                for (var n = Je(t), o = 0; o < n.length; o++) e[o] = n[o];
                for (var r = 0; r < e.length - n.length; r++) e.pop()
            }

            function h() {
                return s
            }

            return {
                element: y,
                draggables: d.draggables,
                isDragRelevant: (i = d, a = i.element, l = i.getOptions, function (e, t) {
                    var n = l();
                    if (n.shouldAcceptDrop) return n.shouldAcceptDrop(e.getOptions(), t);
                    var o = e.getOptions();
                    return "copy" !== n.behaviour && N(a, "." + b) !== e.element && (e.element === a || !(!o.groupName || o.groupName !== n.groupName))
                }),
                layout: d.layout,
                dispose: function (e) {
                    var t;
                    m.dispose(), t = e.element, yt.wrapChild && Array.prototype.forEach.call(t.children, function (e) {
                        e.nodeType === Node.ELEMENT_NODE && L(e, b) && (t.insertBefore(e.firstElementChild, e), t.removeChild(e))
                    })
                },
                prepareDrag: function (e, t) {
                    var n = e.element, o = d.draggables;
                    v(o, n), e.layout.invalidateRects(), o.forEach(function (e) {
                        return Ue(e, !0, h().animationDuration)
                    }), m.start()
                },
                handleDrag: function (e) {
                    return c = f(u = e)
                },
                handleDrop: function (e) {
                    m.stop(), c && c.dropPlaceholderContainer && y.removeChild(c.dropPlaceholderContainer), u = null, f = pt(d), g(e, c), c = null
                },
                fireRemoveElement: function () {
                    g(u, Object.assign({}, c, {addedIndex: null}), !0), c = null
                },
                getDragResult: function () {
                    return c
                },
                getTranslateCalculator: function (e) {
                    return ut(d)(e)
                },
                onTranslated: function () {
                    p()
                },
                setDraggables: function () {
                    v(d.draggables, y)
                },
                getScrollMaxSpeed: function () {
                    return yt.maxScrollSpeed
                },
                shouldUseTransformForGhost: function () {
                    return !0 === yt.useTransformForGhost
                },
                getOptions: h,
                setOptions: function (e) {
                    var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
                    s = !1 === t ? Object.assign({}, S, e) : Object.assign({}, S, s, e)
                }
            }
        }
    }

    var yt = function (e, t) {
        var n = ht(e)(t);
        return e[r] = n, qe.register(n), {
            dispose: function () {
                qe.unregister(n), n.dispose(n)
            }, setOptions: function (e, t) {
                n.setOptions(e, t)
            }
        }
    };

    function bt(e, t, n) {
        Object.defineProperty(e, n, {
            set: function (e) {
                t[n] = e
            }, get: function () {
                return t[n]
            }
        })
    }

    yt.wrapChild = !0, yt.cancelDrag = function () {
        qe.cancelDrag()
    }, yt.isDragging = function () {
        return qe.isDragging()
    };
    var wt = function (e, t) {
        return console.warn('default export is deprecated. please use named export "smoothDnD"'), yt(e, t)
    };
    wt.cancelDrag = function () {
        yt.cancelDrag()
    }, wt.isDragging = function () {
        return yt.isDragging()
    }, bt(wt, yt, "useTransformForGhost"), bt(wt, yt, "maxScrollSpeed"), bt(wt, yt, "wrapChild"), bt(wt, yt, "dropHandler"), e.smoothDnD = yt, e.constants = n, e.dropHandlers = k, e.default = wt, Object.defineProperty(e, "__esModule", {value: !0})
});
