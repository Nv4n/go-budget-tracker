var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(Fe) {
  return Fe && Fe.__esModule && Object.prototype.hasOwnProperty.call(Fe, "default") ? Fe.default : Fe;
}
var htmx_min = { exports: {} };
(function(module) {
  (function(Fe, Yr) {
    module.exports ? module.exports = Yr() : Fe.htmx = Fe.htmx || Yr();
  })(typeof self < "u" ? self : commonjsGlobal, function() {
    return function() {
      var Y = { onLoad: t, process: Dt, on: Z, off: K, trigger: fe, ajax: Cr, find: E, findAll: f, closest: d, values: function(Fe, Yr) {
        var Fr = or(Fe, Yr || "post");
        return Fr.values;
      }, remove: B, addClass: F, removeClass: n, toggleClass: V, takeClass: j, defineExtension: Ar, removeExtension: Nr, logAll: X, logNone: U, logger: null, config: { historyEnabled: !0, historyCacheSize: 10, refreshOnHistoryMiss: !1, defaultSwapStyle: "innerHTML", defaultSwapDelay: 0, defaultSettleDelay: 20, includeIndicatorStyles: !0, indicatorClass: "htmx-indicator", requestClass: "htmx-request", addedClass: "htmx-added", settlingClass: "htmx-settling", swappingClass: "htmx-swapping", allowEval: !0, allowScriptTags: !0, inlineScriptNonce: "", attributesToSettle: ["class", "style", "width", "height"], withCredentials: !1, timeout: 0, wsReconnectDelay: "full-jitter", wsBinaryType: "blob", disableSelector: "[hx-disable], [data-hx-disable]", useTemplateFragments: !1, scrollBehavior: "smooth", defaultFocusScroll: !1, getCacheBusterParam: !1, globalViewTransitions: !1, methodsThatUseUrlParams: ["get"], selfRequestsOnly: !1, scrollIntoViewOnBoost: !0 }, parseInterval: v, _: e, createEventSource: function(Fe) {
        return new EventSource(Fe, { withCredentials: !0 });
      }, createWebSocket: function(Fe) {
        var Yr = new WebSocket(Fe, []);
        return Yr.binaryType = Y.config.wsBinaryType, Yr;
      }, version: "1.9.8" }, r = { addTriggerHandler: St, bodyContains: oe, canAccessLocalStorage: M, findThisElement: ve, filterValues: cr, hasAttribute: o, getAttributeValue: ee, getClosestAttributeValue: re, getClosestMatch: c, getExpressionVars: wr, getHeaders: fr, getInputValues: or, getInternalData: ie, getSwapSpecification: dr, getTriggerSpecs: Ze, getTarget: ge, makeFragment: l, mergeObjects: se, makeSettleInfo: T, oobSwap: ye, querySelectorExt: le, selectAndSwap: Ue, settleImmediately: Jt, shouldCancel: tt, triggerEvent: fe, triggerErrorEvent: ue, withExtensions: C }, b = ["get", "post", "put", "delete", "patch"], w = b.map(function(Fe) {
        return "[hx-" + Fe + "], [data-hx-" + Fe + "]";
      }).join(", ");
      function v(Fe) {
        if (Fe != null)
          return Fe.slice(-2) == "ms" ? parseFloat(Fe.slice(0, -2)) || void 0 : Fe.slice(-1) == "s" ? parseFloat(Fe.slice(0, -1)) * 1e3 || void 0 : Fe.slice(-1) == "m" ? parseFloat(Fe.slice(0, -1)) * 1e3 * 60 || void 0 : parseFloat(Fe) || void 0;
      }
      function Q(Fe, Yr) {
        return Fe.getAttribute && Fe.getAttribute(Yr);
      }
      function o(Fe, Yr) {
        return Fe.hasAttribute && (Fe.hasAttribute(Yr) || Fe.hasAttribute("data-" + Yr));
      }
      function ee(Fe, Yr) {
        return Q(Fe, Yr) || Q(Fe, "data-" + Yr);
      }
      function u(Fe) {
        return Fe.parentElement;
      }
      function te() {
        return document;
      }
      function c(Fe, Yr) {
        for (; Fe && !Yr(Fe); )
          Fe = u(Fe);
        return Fe || null;
      }
      function R(Fe, Yr, Fr) {
        var Ur = ee(Yr, Fr), Br = ee(Yr, "hx-disinherit");
        return Fe !== Yr && Br && (Br === "*" || Br.split(" ").indexOf(Fr) >= 0) ? "unset" : Ur;
      }
      function re(Fe, Yr) {
        var Fr = null;
        if (c(Fe, function(Ur) {
          return Fr = R(Fe, Ur, Yr);
        }), Fr !== "unset")
          return Fr;
      }
      function h(Fe, Yr) {
        var Fr = Fe.matches || Fe.matchesSelector || Fe.msMatchesSelector || Fe.mozMatchesSelector || Fe.webkitMatchesSelector || Fe.oMatchesSelector;
        return Fr && Fr.call(Fe, Yr);
      }
      function q(Fe) {
        var Yr = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, Fr = Yr.exec(Fe);
        return Fr ? Fr[1].toLowerCase() : "";
      }
      function i(Fe, Yr) {
        for (var Fr = new DOMParser(), Ur = Fr.parseFromString(Fe, "text/html"), Br = Ur.body; Yr > 0; )
          Yr--, Br = Br.firstChild;
        return Br == null && (Br = te().createDocumentFragment()), Br;
      }
      function H(Fe) {
        return Fe.match(/<body/);
      }
      function l(Fe) {
        var Yr = !H(Fe);
        if (Y.config.useTemplateFragments && Yr) {
          var Fr = i("<body><template>" + Fe + "</template></body>", 0);
          return Fr.querySelector("template").content;
        } else {
          var Ur = q(Fe);
          switch (Ur) {
            case "thead":
            case "tbody":
            case "tfoot":
            case "colgroup":
            case "caption":
              return i("<table>" + Fe + "</table>", 1);
            case "col":
              return i("<table><colgroup>" + Fe + "</colgroup></table>", 2);
            case "tr":
              return i("<table><tbody>" + Fe + "</tbody></table>", 2);
            case "td":
            case "th":
              return i("<table><tbody><tr>" + Fe + "</tr></tbody></table>", 3);
            case "script":
            case "style":
              return i("<div>" + Fe + "</div>", 1);
            default:
              return i(Fe, 0);
          }
        }
      }
      function ne(Fe) {
        Fe && Fe();
      }
      function L(Fe, Yr) {
        return Object.prototype.toString.call(Fe) === "[object " + Yr + "]";
      }
      function A(Fe) {
        return L(Fe, "Function");
      }
      function N(Fe) {
        return L(Fe, "Object");
      }
      function ie(Fe) {
        var Yr = "htmx-internal-data", Fr = Fe[Yr];
        return Fr || (Fr = Fe[Yr] = {}), Fr;
      }
      function I(Fe) {
        var Yr = [];
        if (Fe)
          for (var Fr = 0; Fr < Fe.length; Fr++)
            Yr.push(Fe[Fr]);
        return Yr;
      }
      function ae(Fe, Yr) {
        if (Fe)
          for (var Fr = 0; Fr < Fe.length; Fr++)
            Yr(Fe[Fr]);
      }
      function k(Fe) {
        var Yr = Fe.getBoundingClientRect(), Fr = Yr.top, Ur = Yr.bottom;
        return Fr < window.innerHeight && Ur >= 0;
      }
      function oe(Fe) {
        return Fe.getRootNode && Fe.getRootNode() instanceof window.ShadowRoot ? te().body.contains(Fe.getRootNode().host) : te().body.contains(Fe);
      }
      function P(Fe) {
        return Fe.trim().split(/\s+/);
      }
      function se(Fe, Yr) {
        for (var Fr in Yr)
          Yr.hasOwnProperty(Fr) && (Fe[Fr] = Yr[Fr]);
        return Fe;
      }
      function S(Fe) {
        try {
          return JSON.parse(Fe);
        } catch (Yr) {
          return y(Yr), null;
        }
      }
      function M() {
        var Fe = "htmx:localStorageTest";
        try {
          return localStorage.setItem(Fe, Fe), localStorage.removeItem(Fe), !0;
        } catch {
          return !1;
        }
      }
      function D(Fe) {
        try {
          var Yr = new URL(Fe);
          return Yr && (Fe = Yr.pathname + Yr.search), Fe.match("^/$") || (Fe = Fe.replace(/\/+$/, "")), Fe;
        } catch {
          return Fe;
        }
      }
      function e(e) {
        return xr(te().body, function() {
          return eval(e);
        });
      }
      function t(Fe) {
        var Yr = Y.on("htmx:load", function(Fr) {
          Fe(Fr.detail.elt);
        });
        return Yr;
      }
      function X() {
        Y.logger = function(Fe, Yr, Fr) {
          console && console.log(Yr, Fe, Fr);
        };
      }
      function U() {
        Y.logger = null;
      }
      function E(Fe, Yr) {
        return Yr ? Fe.querySelector(Yr) : E(te(), Fe);
      }
      function f(Fe, Yr) {
        return Yr ? Fe.querySelectorAll(Yr) : f(te(), Fe);
      }
      function B(Fe, Yr) {
        Fe = s(Fe), Yr ? setTimeout(function() {
          B(Fe), Fe = null;
        }, Yr) : Fe.parentElement.removeChild(Fe);
      }
      function F(Fe, Yr, Fr) {
        Fe = s(Fe), Fr ? setTimeout(function() {
          F(Fe, Yr), Fe = null;
        }, Fr) : Fe.classList && Fe.classList.add(Yr);
      }
      function n(Fe, Yr, Fr) {
        Fe = s(Fe), Fr ? setTimeout(function() {
          n(Fe, Yr), Fe = null;
        }, Fr) : Fe.classList && (Fe.classList.remove(Yr), Fe.classList.length === 0 && Fe.removeAttribute("class"));
      }
      function V(Fe, Yr) {
        Fe = s(Fe), Fe.classList.toggle(Yr);
      }
      function j(Fe, Yr) {
        Fe = s(Fe), ae(Fe.parentElement.children, function(Fr) {
          n(Fr, Yr);
        }), F(Fe, Yr);
      }
      function d(Fe, Yr) {
        if (Fe = s(Fe), Fe.closest)
          return Fe.closest(Yr);
        do
          if (Fe == null || h(Fe, Yr))
            return Fe;
        while (Fe = Fe && u(Fe));
        return null;
      }
      function g(Fe, Yr) {
        return Fe.substring(0, Yr.length) === Yr;
      }
      function _(Fe, Yr) {
        return Fe.substring(Fe.length - Yr.length) === Yr;
      }
      function z(Fe) {
        var Yr = Fe.trim();
        return g(Yr, "<") && _(Yr, "/>") ? Yr.substring(1, Yr.length - 2) : Yr;
      }
      function W(Fe, Yr) {
        return Yr.indexOf("closest ") === 0 ? [d(Fe, z(Yr.substr(8)))] : Yr.indexOf("find ") === 0 ? [E(Fe, z(Yr.substr(5)))] : Yr === "next" ? [Fe.nextElementSibling] : Yr.indexOf("next ") === 0 ? [$(Fe, z(Yr.substr(5)))] : Yr === "previous" ? [Fe.previousElementSibling] : Yr.indexOf("previous ") === 0 ? [G(Fe, z(Yr.substr(9)))] : Yr === "document" ? [document] : Yr === "window" ? [window] : Yr === "body" ? [document.body] : te().querySelectorAll(z(Yr));
      }
      var $ = function(Fe, Yr) {
        for (var Fr = te().querySelectorAll(Yr), Ur = 0; Ur < Fr.length; Ur++) {
          var Br = Fr[Ur];
          if (Br.compareDocumentPosition(Fe) === Node.DOCUMENT_POSITION_PRECEDING)
            return Br;
        }
      }, G = function(Fe, Yr) {
        for (var Fr = te().querySelectorAll(Yr), Ur = Fr.length - 1; Ur >= 0; Ur--) {
          var Br = Fr[Ur];
          if (Br.compareDocumentPosition(Fe) === Node.DOCUMENT_POSITION_FOLLOWING)
            return Br;
        }
      };
      function le(Fe, Yr) {
        return Yr ? W(Fe, Yr)[0] : W(te().body, Fe)[0];
      }
      function s(Fe) {
        return L(Fe, "String") ? E(Fe) : Fe;
      }
      function J(Fe, Yr, Fr) {
        return A(Yr) ? { target: te().body, event: Fe, listener: Yr } : { target: s(Fe), event: Yr, listener: Fr };
      }
      function Z(Fe, Yr, Fr) {
        Pr(function() {
          var Br = J(Fe, Yr, Fr);
          Br.target.addEventListener(Br.event, Br.listener);
        });
        var Ur = A(Yr);
        return Ur ? Yr : Fr;
      }
      function K(Fe, Yr, Fr) {
        return Pr(function() {
          var Ur = J(Fe, Yr, Fr);
          Ur.target.removeEventListener(Ur.event, Ur.listener);
        }), A(Yr) ? Yr : Fr;
      }
      var he = te().createElement("output");
      function de(Fe, Yr) {
        var Fr = re(Fe, Yr);
        if (Fr) {
          if (Fr === "this")
            return [ve(Fe, Yr)];
          var Ur = W(Fe, Fr);
          return Ur.length === 0 ? (y('The selector "' + Fr + '" on ' + Yr + " returned no matches!"), [he]) : Ur;
        }
      }
      function ve(Fe, Yr) {
        return c(Fe, function(Fr) {
          return ee(Fr, Yr) != null;
        });
      }
      function ge(Fe) {
        var Yr = re(Fe, "hx-target");
        if (Yr)
          return Yr === "this" ? ve(Fe, "hx-target") : le(Fe, Yr);
        var Fr = ie(Fe);
        return Fr.boosted ? te().body : Fe;
      }
      function me(Fe) {
        for (var Yr = Y.config.attributesToSettle, Fr = 0; Fr < Yr.length; Fr++)
          if (Fe === Yr[Fr])
            return !0;
        return !1;
      }
      function pe(Fe, Yr) {
        ae(Fe.attributes, function(Fr) {
          !Yr.hasAttribute(Fr.name) && me(Fr.name) && Fe.removeAttribute(Fr.name);
        }), ae(Yr.attributes, function(Fr) {
          me(Fr.name) && Fe.setAttribute(Fr.name, Fr.value);
        });
      }
      function xe(Fe, Yr) {
        for (var Fr = Ir(Yr), Ur = 0; Ur < Fr.length; Ur++) {
          var Br = Fr[Ur];
          try {
            if (Br.isInlineSwap(Fe))
              return !0;
          } catch (jr) {
            y(jr);
          }
        }
        return Fe === "outerHTML";
      }
      function ye(Fe, Yr, Fr) {
        var Ur = "#" + Q(Yr, "id"), Br = "outerHTML";
        Fe === "true" || (Fe.indexOf(":") > 0 ? (Br = Fe.substr(0, Fe.indexOf(":")), Ur = Fe.substr(Fe.indexOf(":") + 1, Fe.length)) : Br = Fe);
        var jr = te().querySelectorAll(Ur);
        return jr ? (ae(jr, function(Vr) {
          var _r, Qr = Yr.cloneNode(!0);
          _r = te().createDocumentFragment(), _r.appendChild(Qr), xe(Br, Vr) || (_r = Qr);
          var zr = { shouldSwap: !0, target: Vr, fragment: _r };
          fe(Vr, "htmx:oobBeforeSwap", zr) && (Vr = zr.target, zr.shouldSwap && De(Br, Vr, Vr, _r, Fr), ae(Fr.elts, function(Wr) {
            fe(Wr, "htmx:oobAfterSwap", zr);
          }));
        }), Yr.parentNode.removeChild(Yr)) : (Yr.parentNode.removeChild(Yr), ue(te().body, "htmx:oobErrorNoTarget", { content: Yr })), Fe;
      }
      function be(Fe, Yr, Fr) {
        var Ur = re(Fe, "hx-select-oob");
        if (Ur) {
          var Br = Ur.split(",");
          for (let zr = 0; zr < Br.length; zr++) {
            var jr = Br[zr].split(":", 2), Vr = jr[0].trim();
            Vr.indexOf("#") === 0 && (Vr = Vr.substring(1));
            var _r = jr[1] || "true", Qr = Yr.querySelector("#" + Vr);
            Qr && ye(_r, Qr, Fr);
          }
        }
        ae(f(Yr, "[hx-swap-oob], [data-hx-swap-oob]"), function(zr) {
          var Wr = ee(zr, "hx-swap-oob");
          Wr != null && ye(Wr, zr, Fr);
        });
      }
      function we(Fe) {
        ae(f(Fe, "[hx-preserve], [data-hx-preserve]"), function(Yr) {
          var Fr = ee(Yr, "id"), Ur = te().getElementById(Fr);
          Ur != null && Yr.parentNode.replaceChild(Ur, Yr);
        });
      }
      function Se(Fe, Yr, Fr) {
        ae(Yr.querySelectorAll("[id]"), function(Ur) {
          var Br = Q(Ur, "id");
          if (Br && Br.length > 0) {
            var jr = Br.replace("'", "\\'"), Vr = Ur.tagName.replace(":", "\\:"), _r = Fe.querySelector(Vr + "[id='" + jr + "']");
            if (_r && _r !== Fe) {
              var Qr = Ur.cloneNode();
              pe(Ur, _r), Fr.tasks.push(function() {
                pe(Ur, Qr);
              });
            }
          }
        });
      }
      function Ee(Fe) {
        return function() {
          n(Fe, Y.config.addedClass), Dt(Fe), Ct(Fe), Ce(Fe), fe(Fe, "htmx:load");
        };
      }
      function Ce(Fe) {
        var Yr = "[autofocus]", Fr = h(Fe, Yr) ? Fe : Fe.querySelector(Yr);
        Fr != null && Fr.focus();
      }
      function a(Fe, Yr, Fr, Ur) {
        for (Se(Fe, Fr, Ur); Fr.childNodes.length > 0; ) {
          var Br = Fr.firstChild;
          F(Br, Y.config.addedClass), Fe.insertBefore(Br, Yr), Br.nodeType !== Node.TEXT_NODE && Br.nodeType !== Node.COMMENT_NODE && Ur.tasks.push(Ee(Br));
        }
      }
      function Te(Fe, Yr) {
        for (var Fr = 0; Fr < Fe.length; )
          Yr = (Yr << 5) - Yr + Fe.charCodeAt(Fr++) | 0;
        return Yr;
      }
      function Oe(Fe) {
        var Yr = 0;
        if (Fe.attributes)
          for (var Fr = 0; Fr < Fe.attributes.length; Fr++) {
            var Ur = Fe.attributes[Fr];
            Ur.value && (Yr = Te(Ur.name, Yr), Yr = Te(Ur.value, Yr));
          }
        return Yr;
      }
      function Re(Fe) {
        var Yr = ie(Fe);
        if (Yr.onHandlers) {
          for (let Fr = 0; Fr < Yr.onHandlers.length; Fr++) {
            const Ur = Yr.onHandlers[Fr];
            Fe.removeEventListener(Ur.event, Ur.listener);
          }
          delete Yr.onHandlers;
        }
      }
      function qe(Fe) {
        var Yr = ie(Fe);
        Yr.timeout && clearTimeout(Yr.timeout), Yr.webSocket && Yr.webSocket.close(), Yr.sseEventSource && Yr.sseEventSource.close(), Yr.listenerInfos && ae(Yr.listenerInfos, function(Fr) {
          Fr.on && Fr.on.removeEventListener(Fr.trigger, Fr.listener);
        }), Yr.initHash && (Yr.initHash = null), Re(Fe);
      }
      function m(Fe) {
        fe(Fe, "htmx:beforeCleanupElement"), qe(Fe), Fe.children && ae(Fe.children, function(Yr) {
          m(Yr);
        });
      }
      function He(Fe, Yr, Fr) {
        if (Fe.tagName === "BODY")
          return Pe(Fe, Yr, Fr);
        var Ur, Br = Fe.previousSibling;
        for (a(u(Fe), Fe, Yr, Fr), Br == null ? Ur = u(Fe).firstChild : Ur = Br.nextSibling, ie(Fe).replacedWith = Ur, Fr.elts = Fr.elts.filter(function(jr) {
          return jr != Fe;
        }); Ur && Ur !== Fe; )
          Ur.nodeType === Node.ELEMENT_NODE && Fr.elts.push(Ur), Ur = Ur.nextElementSibling;
        m(Fe), u(Fe).removeChild(Fe);
      }
      function Le(Fe, Yr, Fr) {
        return a(Fe, Fe.firstChild, Yr, Fr);
      }
      function Ae(Fe, Yr, Fr) {
        return a(u(Fe), Fe, Yr, Fr);
      }
      function Ne(Fe, Yr, Fr) {
        return a(Fe, null, Yr, Fr);
      }
      function Ie(Fe, Yr, Fr) {
        return a(u(Fe), Fe.nextSibling, Yr, Fr);
      }
      function ke(Fe, Yr, Fr) {
        return m(Fe), u(Fe).removeChild(Fe);
      }
      function Pe(Fe, Yr, Fr) {
        var Ur = Fe.firstChild;
        if (a(Fe, Ur, Yr, Fr), Ur) {
          for (; Ur.nextSibling; )
            m(Ur.nextSibling), Fe.removeChild(Ur.nextSibling);
          m(Ur), Fe.removeChild(Ur);
        }
      }
      function Me(Fe, Yr, Fr) {
        var Ur = Fr || re(Fe, "hx-select");
        if (Ur) {
          var Br = te().createDocumentFragment();
          ae(Yr.querySelectorAll(Ur), function(jr) {
            Br.appendChild(jr);
          }), Yr = Br;
        }
        return Yr;
      }
      function De(Fe, Yr, Fr, Ur, Br) {
        switch (Fe) {
          case "none":
            return;
          case "outerHTML":
            He(Fr, Ur, Br);
            return;
          case "afterbegin":
            Le(Fr, Ur, Br);
            return;
          case "beforebegin":
            Ae(Fr, Ur, Br);
            return;
          case "beforeend":
            Ne(Fr, Ur, Br);
            return;
          case "afterend":
            Ie(Fr, Ur, Br);
            return;
          case "delete":
            ke(Fr);
            return;
          default:
            for (var jr = Ir(Yr), Vr = 0; Vr < jr.length; Vr++) {
              var _r = jr[Vr];
              try {
                var Qr = _r.handleSwap(Fe, Fr, Ur, Br);
                if (Qr) {
                  if (typeof Qr.length < "u")
                    for (var zr = 0; zr < Qr.length; zr++) {
                      var Wr = Qr[zr];
                      Wr.nodeType !== Node.TEXT_NODE && Wr.nodeType !== Node.COMMENT_NODE && Br.tasks.push(Ee(Wr));
                    }
                  return;
                }
              } catch (Jr) {
                y(Jr);
              }
            }
            Fe === "innerHTML" ? Pe(Fr, Ur, Br) : De(Y.config.defaultSwapStyle, Yr, Fr, Ur, Br);
        }
      }
      function Xe(Fe) {
        if (Fe.indexOf("<title") > -1) {
          var Yr = Fe.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, ""), Fr = Yr.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);
          if (Fr)
            return Fr[2];
        }
      }
      function Ue(Fe, Yr, Fr, Ur, Br, jr) {
        Br.title = Xe(Ur);
        var Vr = l(Ur);
        if (Vr)
          return be(Fr, Vr, Br), Vr = Me(Fr, Vr, jr), we(Vr), De(Fe, Fr, Yr, Vr, Br);
      }
      function Be(Fe, Yr, Fr) {
        var Ur = Fe.getResponseHeader(Yr);
        if (Ur.indexOf("{") === 0) {
          var Br = S(Ur);
          for (var jr in Br)
            if (Br.hasOwnProperty(jr)) {
              var Vr = Br[jr];
              N(Vr) || (Vr = { value: Vr }), fe(Fr, jr, Vr);
            }
        } else
          for (var _r = Ur.split(","), Qr = 0; Qr < _r.length; Qr++)
            fe(Fr, _r[Qr].trim(), []);
      }
      var p = /[\s,]/, Ve = /[_$a-zA-Z]/, je = /[_$a-zA-Z0-9]/, _e = ['"', "'", "/"], ze = /[^\s]/;
      function We(Fe) {
        for (var Yr = [], Fr = 0; Fr < Fe.length; ) {
          if (Ve.exec(Fe.charAt(Fr))) {
            for (var Ur = Fr; je.exec(Fe.charAt(Fr + 1)); )
              Fr++;
            Yr.push(Fe.substr(Ur, Fr - Ur + 1));
          } else if (_e.indexOf(Fe.charAt(Fr)) !== -1) {
            var Br = Fe.charAt(Fr), Ur = Fr;
            for (Fr++; Fr < Fe.length && Fe.charAt(Fr) !== Br; )
              Fe.charAt(Fr) === "\\" && Fr++, Fr++;
            Yr.push(Fe.substr(Ur, Fr - Ur + 1));
          } else {
            var jr = Fe.charAt(Fr);
            Yr.push(jr);
          }
          Fr++;
        }
        return Yr;
      }
      function $e(Fe, Yr, Fr) {
        return Ve.exec(Fe.charAt(0)) && Fe !== "true" && Fe !== "false" && Fe !== "this" && Fe !== Fr && Yr !== ".";
      }
      function Ge(Fe, Yr, Fr) {
        if (Yr[0] === "[") {
          Yr.shift();
          for (var Ur = 1, Br = " return (function(" + Fr + "){ return (", jr = null; Yr.length > 0; ) {
            var Vr = Yr[0];
            if (Vr === "]") {
              if (Ur--, Ur === 0) {
                jr === null && (Br = Br + "true"), Yr.shift(), Br += ")})";
                try {
                  var _r = xr(Fe, function() {
                    return Function(Br)();
                  }, function() {
                    return !0;
                  });
                  return _r.source = Br, _r;
                } catch (Qr) {
                  return ue(te().body, "htmx:syntax:error", { error: Qr, source: Br }), null;
                }
              }
            } else
              Vr === "[" && Ur++;
            $e(Vr, jr, Fr) ? Br += "((" + Fr + "." + Vr + ") ? (" + Fr + "." + Vr + ") : (window." + Vr + "))" : Br = Br + Vr, jr = Yr.shift();
          }
        }
      }
      function x(Fe, Yr) {
        for (var Fr = ""; Fe.length > 0 && !Fe[0].match(Yr); )
          Fr += Fe.shift();
        return Fr;
      }
      var Je = "input, textarea, select";
      function Ze(Fe) {
        var Yr = ee(Fe, "hx-trigger"), Fr = [];
        if (Yr) {
          var Ur = We(Yr);
          do {
            x(Ur, ze);
            var Br = Ur.length, jr = x(Ur, /[,\[\s]/);
            if (jr !== "")
              if (jr === "every") {
                var Vr = { trigger: "every" };
                x(Ur, ze), Vr.pollInterval = v(x(Ur, /[,\[\s]/)), x(Ur, ze);
                var _r = Ge(Fe, Ur, "event");
                _r && (Vr.eventFilter = _r), Fr.push(Vr);
              } else if (jr.indexOf("sse:") === 0)
                Fr.push({ trigger: "sse", sseEvent: jr.substr(4) });
              else {
                var Qr = { trigger: jr }, _r = Ge(Fe, Ur, "event");
                for (_r && (Qr.eventFilter = _r); Ur.length > 0 && Ur[0] !== ","; ) {
                  x(Ur, ze);
                  var zr = Ur.shift();
                  if (zr === "changed")
                    Qr.changed = !0;
                  else if (zr === "once")
                    Qr.once = !0;
                  else if (zr === "consume")
                    Qr.consume = !0;
                  else if (zr === "delay" && Ur[0] === ":")
                    Ur.shift(), Qr.delay = v(x(Ur, p));
                  else if (zr === "from" && Ur[0] === ":") {
                    Ur.shift();
                    var Wr = x(Ur, p);
                    if (Wr === "closest" || Wr === "find" || Wr === "next" || Wr === "previous") {
                      Ur.shift();
                      var Jr = x(Ur, p);
                      Jr.length > 0 && (Wr += " " + Jr);
                    }
                    Qr.from = Wr;
                  } else
                    zr === "target" && Ur[0] === ":" ? (Ur.shift(), Qr.target = x(Ur, p)) : zr === "throttle" && Ur[0] === ":" ? (Ur.shift(), Qr.throttle = v(x(Ur, p))) : zr === "queue" && Ur[0] === ":" ? (Ur.shift(), Qr.queue = x(Ur, p)) : (zr === "root" || zr === "threshold") && Ur[0] === ":" ? (Ur.shift(), Qr[zr] = x(Ur, p)) : ue(Fe, "htmx:syntax:error", { token: Ur.shift() });
                }
                Fr.push(Qr);
              }
            Ur.length === Br && ue(Fe, "htmx:syntax:error", { token: Ur.shift() }), x(Ur, ze);
          } while (Ur[0] === "," && Ur.shift());
        }
        return Fr.length > 0 ? Fr : h(Fe, "form") ? [{ trigger: "submit" }] : h(Fe, 'input[type="button"], input[type="submit"]') ? [{ trigger: "click" }] : h(Fe, Je) ? [{ trigger: "change" }] : [{ trigger: "click" }];
      }
      function Ke(Fe) {
        ie(Fe).cancelled = !0;
      }
      function Ye(Fe, Yr, Fr) {
        var Ur = ie(Fe);
        Ur.timeout = setTimeout(function() {
          oe(Fe) && Ur.cancelled !== !0 && (nt(Fr, Fe, Ut("hx:poll:trigger", { triggerSpec: Fr, target: Fe })) || Yr(Fe), Ye(Fe, Yr, Fr));
        }, Fr.pollInterval);
      }
      function Qe(Fe) {
        return location.hostname === Fe.hostname && Q(Fe, "href") && Q(Fe, "href").indexOf("#") !== 0;
      }
      function et(Fe, Yr, Fr) {
        if (Fe.tagName === "A" && Qe(Fe) && (Fe.target === "" || Fe.target === "_self") || Fe.tagName === "FORM") {
          Yr.boosted = !0;
          var Ur, Br;
          if (Fe.tagName === "A")
            Ur = "get", Br = Q(Fe, "href");
          else {
            var jr = Q(Fe, "method");
            Ur = jr ? jr.toLowerCase() : "get", Br = Q(Fe, "action");
          }
          Fr.forEach(function(Vr) {
            it(Fe, function(_r, Qr) {
              if (d(_r, Y.config.disableSelector)) {
                m(_r);
                return;
              }
              ce(Ur, Br, _r, Qr);
            }, Yr, Vr, !0);
          });
        }
      }
      function tt(Fe, Yr) {
        return !!((Fe.type === "submit" || Fe.type === "click") && (Yr.tagName === "FORM" || h(Yr, 'input[type="submit"], button') && d(Yr, "form") !== null || Yr.tagName === "A" && Yr.href && (Yr.getAttribute("href") === "#" || Yr.getAttribute("href").indexOf("#") !== 0)));
      }
      function rt(Fe, Yr) {
        return ie(Fe).boosted && Fe.tagName === "A" && Yr.type === "click" && (Yr.ctrlKey || Yr.metaKey);
      }
      function nt(Fe, Yr, Fr) {
        var Ur = Fe.eventFilter;
        if (Ur)
          try {
            return Ur.call(Yr, Fr) !== !0;
          } catch (Br) {
            return ue(te().body, "htmx:eventFilter:error", { error: Br, source: Ur.source }), !0;
          }
        return !1;
      }
      function it(Fe, Yr, Fr, Ur, Br) {
        var jr = ie(Fe), Vr;
        Ur.from ? Vr = W(Fe, Ur.from) : Vr = [Fe], Ur.changed && Vr.forEach(function(_r) {
          var Qr = ie(_r);
          Qr.lastValue = _r.value;
        }), ae(Vr, function(_r) {
          var Qr = function(zr) {
            if (!oe(Fe)) {
              _r.removeEventListener(Ur.trigger, Qr);
              return;
            }
            if (!rt(Fe, zr) && ((Br || tt(zr, Fe)) && zr.preventDefault(), !nt(Ur, Fe, zr))) {
              var Wr = ie(zr);
              if (Wr.triggerSpec = Ur, Wr.handledFor == null && (Wr.handledFor = []), Wr.handledFor.indexOf(Fe) < 0) {
                if (Wr.handledFor.push(Fe), Ur.consume && zr.stopPropagation(), Ur.target && zr.target && !h(zr.target, Ur.target))
                  return;
                if (Ur.once) {
                  if (jr.triggeredOnce)
                    return;
                  jr.triggeredOnce = !0;
                }
                if (Ur.changed) {
                  var Jr = ie(_r);
                  if (Jr.lastValue === _r.value)
                    return;
                  Jr.lastValue = _r.value;
                }
                if (jr.delayed && clearTimeout(jr.delayed), jr.throttle)
                  return;
                Ur.throttle ? jr.throttle || (Yr(Fe, zr), jr.throttle = setTimeout(function() {
                  jr.throttle = null;
                }, Ur.throttle)) : Ur.delay ? jr.delayed = setTimeout(function() {
                  Yr(Fe, zr);
                }, Ur.delay) : (fe(Fe, "htmx:trigger"), Yr(Fe, zr));
              }
            }
          };
          Fr.listenerInfos == null && (Fr.listenerInfos = []), Fr.listenerInfos.push({ trigger: Ur.trigger, listener: Qr, on: _r }), _r.addEventListener(Ur.trigger, Qr);
        });
      }
      var at = !1, ot = null;
      function st() {
        ot || (ot = function() {
          at = !0;
        }, window.addEventListener("scroll", ot), setInterval(function() {
          at && (at = !1, ae(te().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(Fe) {
            lt(Fe);
          }));
        }, 200));
      }
      function lt(Fe) {
        if (!o(Fe, "data-hx-revealed") && k(Fe)) {
          Fe.setAttribute("data-hx-revealed", "true");
          var Yr = ie(Fe);
          Yr.initHash ? fe(Fe, "revealed") : Fe.addEventListener("htmx:afterProcessNode", function(Fr) {
            fe(Fe, "revealed");
          }, { once: !0 });
        }
      }
      function ut(Fe, Yr, Fr) {
        for (var Ur = P(Fr), Br = 0; Br < Ur.length; Br++) {
          var jr = Ur[Br].split(/:(.+)/);
          jr[0] === "connect" && ft(Fe, jr[1], 0), jr[0] === "send" && ht(Fe);
        }
      }
      function ft(Fe, Yr, Fr) {
        if (oe(Fe)) {
          if (Yr.indexOf("/") == 0) {
            var Ur = location.hostname + (location.port ? ":" + location.port : "");
            location.protocol == "https:" ? Yr = "wss://" + Ur + Yr : location.protocol == "http:" && (Yr = "ws://" + Ur + Yr);
          }
          var Br = Y.createWebSocket(Yr);
          Br.onerror = function(jr) {
            ue(Fe, "htmx:wsError", { error: jr, socket: Br }), ct(Fe);
          }, Br.onclose = function(jr) {
            if ([1006, 1012, 1013].indexOf(jr.code) >= 0) {
              var Vr = dt(Fr);
              setTimeout(function() {
                ft(Fe, Yr, Fr + 1);
              }, Vr);
            }
          }, Br.onopen = function(jr) {
            Fr = 0;
          }, ie(Fe).webSocket = Br, Br.addEventListener("message", function(jr) {
            if (!ct(Fe)) {
              var Vr = jr.data;
              C(Fe, function(Kr) {
                Vr = Kr.transformResponse(Vr, null, Fe);
              });
              for (var _r = T(Fe), Qr = l(Vr), zr = I(Qr.children), Wr = 0; Wr < zr.length; Wr++) {
                var Jr = zr[Wr];
                ye(ee(Jr, "hx-swap-oob") || "true", Jr, _r);
              }
              Jt(_r.tasks);
            }
          });
        }
      }
      function ct(Fe) {
        if (!oe(Fe))
          return ie(Fe).webSocket.close(), !0;
      }
      function ht(Fe) {
        var Yr = c(Fe, function(Fr) {
          return ie(Fr).webSocket != null;
        });
        Yr ? Fe.addEventListener(Ze(Fe)[0].trigger, function(Fr) {
          var Ur = ie(Yr).webSocket, Br = fr(Fe, Yr), jr = or(Fe, "post"), Vr = jr.errors, _r = jr.values, Qr = wr(Fe), zr = se(_r, Qr), Wr = cr(zr, Fe);
          if (Wr.HEADERS = Br, Vr && Vr.length > 0) {
            fe(Fe, "htmx:validation:halted", Vr);
            return;
          }
          Ur.send(JSON.stringify(Wr)), tt(Fr, Fe) && Fr.preventDefault();
        }) : ue(Fe, "htmx:noWebSocketSourceError");
      }
      function dt(Fe) {
        var Yr = Y.config.wsReconnectDelay;
        if (typeof Yr == "function")
          return Yr(Fe);
        if (Yr === "full-jitter") {
          var Fr = Math.min(Fe, 6), Ur = 1e3 * Math.pow(2, Fr);
          return Ur * Math.random();
        }
        y('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
      }
      function vt(Fe, Yr, Fr) {
        for (var Ur = P(Fr), Br = 0; Br < Ur.length; Br++) {
          var jr = Ur[Br].split(/:(.+)/);
          jr[0] === "connect" && gt(Fe, jr[1]), jr[0] === "swap" && mt(Fe, jr[1]);
        }
      }
      function gt(Fe, Yr) {
        var Fr = Y.createEventSource(Yr);
        Fr.onerror = function(Ur) {
          ue(Fe, "htmx:sseError", { error: Ur, source: Fr }), xt(Fe);
        }, ie(Fe).sseEventSource = Fr;
      }
      function mt(Fe, Yr) {
        var Fr = c(Fe, yt);
        if (Fr) {
          var Ur = ie(Fr).sseEventSource, Br = function(jr) {
            if (!xt(Fr)) {
              if (!oe(Fe)) {
                Ur.removeEventListener(Yr, Br);
                return;
              }
              var Vr = jr.data;
              C(Fe, function(Wr) {
                Vr = Wr.transformResponse(Vr, null, Fe);
              });
              var _r = dr(Fe), Qr = ge(Fe), zr = T(Fe);
              Ue(_r.swapStyle, Qr, Fe, Vr, zr), Jt(zr.tasks), fe(Fe, "htmx:sseMessage", jr);
            }
          };
          ie(Fe).sseListener = Br, Ur.addEventListener(Yr, Br);
        } else
          ue(Fe, "htmx:noSSESourceError");
      }
      function pt(Fe, Yr, Fr) {
        var Ur = c(Fe, yt);
        if (Ur) {
          var Br = ie(Ur).sseEventSource, jr = function() {
            xt(Ur) || (oe(Fe) ? Yr(Fe) : Br.removeEventListener(Fr, jr));
          };
          ie(Fe).sseListener = jr, Br.addEventListener(Fr, jr);
        } else
          ue(Fe, "htmx:noSSESourceError");
      }
      function xt(Fe) {
        if (!oe(Fe))
          return ie(Fe).sseEventSource.close(), !0;
      }
      function yt(Fe) {
        return ie(Fe).sseEventSource != null;
      }
      function bt(Fe, Yr, Fr, Ur) {
        var Br = function() {
          Fr.loaded || (Fr.loaded = !0, Yr(Fe));
        };
        Ur ? setTimeout(Br, Ur) : Br();
      }
      function wt(Fe, Yr, Fr) {
        var Ur = !1;
        return ae(b, function(Br) {
          if (o(Fe, "hx-" + Br)) {
            var jr = ee(Fe, "hx-" + Br);
            Ur = !0, Yr.path = jr, Yr.verb = Br, Fr.forEach(function(Vr) {
              St(Fe, Vr, Yr, function(_r, Qr) {
                if (d(_r, Y.config.disableSelector)) {
                  m(_r);
                  return;
                }
                ce(Br, jr, _r, Qr);
              });
            });
          }
        }), Ur;
      }
      function St(Fe, Yr, Fr, Ur) {
        if (Yr.sseEvent)
          pt(Fe, Ur, Yr.sseEvent);
        else if (Yr.trigger === "revealed")
          st(), it(Fe, Ur, Fr, Yr), lt(Fe);
        else if (Yr.trigger === "intersect") {
          var Br = {};
          Yr.root && (Br.root = le(Fe, Yr.root)), Yr.threshold && (Br.threshold = parseFloat(Yr.threshold));
          var jr = new IntersectionObserver(function(Vr) {
            for (var _r = 0; _r < Vr.length; _r++) {
              var Qr = Vr[_r];
              if (Qr.isIntersecting) {
                fe(Fe, "intersect");
                break;
              }
            }
          }, Br);
          jr.observe(Fe), it(Fe, Ur, Fr, Yr);
        } else
          Yr.trigger === "load" ? nt(Yr, Fe, Ut("load", { elt: Fe })) || bt(Fe, Ur, Fr, Yr.delay) : Yr.pollInterval ? (Fr.polling = !0, Ye(Fe, Ur, Yr)) : it(Fe, Ur, Fr, Yr);
      }
      function Et(Fe) {
        if (Y.config.allowScriptTags && (Fe.type === "text/javascript" || Fe.type === "module" || Fe.type === "")) {
          var Yr = te().createElement("script");
          ae(Fe.attributes, function(Ur) {
            Yr.setAttribute(Ur.name, Ur.value);
          }), Yr.textContent = Fe.textContent, Yr.async = !1, Y.config.inlineScriptNonce && (Yr.nonce = Y.config.inlineScriptNonce);
          var Fr = Fe.parentElement;
          try {
            Fr.insertBefore(Yr, Fe);
          } catch (Ur) {
            y(Ur);
          } finally {
            Fe.parentElement && Fe.parentElement.removeChild(Fe);
          }
        }
      }
      function Ct(Fe) {
        h(Fe, "script") && Et(Fe), ae(f(Fe, "script"), function(Yr) {
          Et(Yr);
        });
      }
      function Tt() {
        return document.querySelector("[hx-boost], [data-hx-boost]");
      }
      function Ot(Fe) {
        var Yr = null, Fr = [];
        if (document.evaluate)
          for (var Ur = document.evaluate('//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") ]]', Fe); Yr = Ur.iterateNext(); )
            Fr.push(Yr);
        else
          for (var Br = document.getElementsByTagName("*"), jr = 0; jr < Br.length; jr++)
            for (var Vr = Br[jr].attributes, _r = 0; _r < Vr.length; _r++) {
              var Qr = Vr[_r].name;
              (g(Qr, "hx-on:") || g(Qr, "data-hx-on:")) && Fr.push(Br[jr]);
            }
        return Fr;
      }
      function Rt(Fe) {
        if (Fe.querySelectorAll) {
          var Yr = Tt() ? ", a" : "", Fr = Fe.querySelectorAll(w + Yr + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
          return Fr;
        } else
          return [];
      }
      function qt(Fe) {
        var Yr = d(Fe.target, "button, input[type='submit']"), Fr = Lt(Fe);
        Fr && (Fr.lastButtonClicked = Yr);
      }
      function Ht(Fe) {
        var Yr = Lt(Fe);
        Yr && (Yr.lastButtonClicked = null);
      }
      function Lt(Fe) {
        var Yr = d(Fe.target, "button, input[type='submit']");
        if (Yr) {
          var Fr = s("#" + Q(Yr, "form")) || d(Yr, "form");
          if (Fr)
            return ie(Fr);
        }
      }
      function At(Fe) {
        Fe.addEventListener("click", qt), Fe.addEventListener("focusin", qt), Fe.addEventListener("focusout", Ht);
      }
      function Nt(Fe) {
        var Yr = We(Fe), Fr = 0;
        for (let Ur = 0; Ur < Yr.length; Ur++) {
          const Br = Yr[Ur];
          Br === "{" ? Fr++ : Br === "}" && Fr--;
        }
        return Fr;
      }
      function It(Fe, Yr, Fr) {
        var Ur = ie(Fe);
        Array.isArray(Ur.onHandlers) || (Ur.onHandlers = []);
        var Br, jr = function(Vr) {
          return xr(Fe, function() {
            Br || (Br = new Function("event", Fr)), Br.call(Fe, Vr);
          });
        };
        Fe.addEventListener(Yr, jr), Ur.onHandlers.push({ event: Yr, listener: jr });
      }
      function kt(Fe) {
        var Yr = ee(Fe, "hx-on");
        if (Yr) {
          for (var Fr = {}, Ur = Yr.split(`
`), Br = null, jr = 0; Ur.length > 0; ) {
            var Vr = Ur.shift(), _r = Vr.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
            jr === 0 && _r ? (Vr.split(":"), Br = _r[1].slice(0, -1), Fr[Br] = _r[2]) : Fr[Br] += Vr, jr += Nt(Vr);
          }
          for (var Qr in Fr)
            It(Fe, Qr, Fr[Qr]);
        }
      }
      function Pt(Fe) {
        Re(Fe);
        for (var Yr = 0; Yr < Fe.attributes.length; Yr++) {
          var Fr = Fe.attributes[Yr].name, Ur = Fe.attributes[Yr].value;
          if (g(Fr, "hx-on:") || g(Fr, "data-hx-on:")) {
            let Br = Fr.slice(Fr.indexOf(":") + 1);
            g(Br, ":") && (Br = "htmx" + Br), It(Fe, Br, Ur);
          }
        }
      }
      function Mt(Fe) {
        if (d(Fe, Y.config.disableSelector)) {
          m(Fe);
          return;
        }
        var Yr = ie(Fe);
        if (Yr.initHash !== Oe(Fe)) {
          qe(Fe), Yr.initHash = Oe(Fe), kt(Fe), fe(Fe, "htmx:beforeProcessNode"), Fe.value && (Yr.lastValue = Fe.value);
          var Fr = Ze(Fe), Ur = wt(Fe, Yr, Fr);
          Ur || (re(Fe, "hx-boost") === "true" ? et(Fe, Yr, Fr) : o(Fe, "hx-trigger") && Fr.forEach(function(Vr) {
            St(Fe, Vr, Yr, function() {
            });
          })), (Fe.tagName === "FORM" || Q(Fe, "type") === "submit" && o(Fe, "form")) && At(Fe);
          var Br = ee(Fe, "hx-sse");
          Br && vt(Fe, Yr, Br);
          var jr = ee(Fe, "hx-ws");
          jr && ut(Fe, Yr, jr), fe(Fe, "htmx:afterProcessNode");
        }
      }
      function Dt(Fe) {
        if (Fe = s(Fe), d(Fe, Y.config.disableSelector)) {
          m(Fe);
          return;
        }
        Mt(Fe), ae(Rt(Fe), function(Yr) {
          Mt(Yr);
        }), ae(Ot(Fe), Pt);
      }
      function Xt(Fe) {
        return Fe.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Ut(Fe, Yr) {
        var Fr;
        return window.CustomEvent && typeof window.CustomEvent == "function" ? Fr = new CustomEvent(Fe, { bubbles: !0, cancelable: !0, detail: Yr }) : (Fr = te().createEvent("CustomEvent"), Fr.initCustomEvent(Fe, !0, !0, Yr)), Fr;
      }
      function ue(Fe, Yr, Fr) {
        fe(Fe, Yr, se({ error: Yr }, Fr));
      }
      function Bt(Fe) {
        return Fe === "htmx:afterProcessNode";
      }
      function C(Fe, Yr) {
        ae(Ir(Fe), function(Fr) {
          try {
            Yr(Fr);
          } catch (Ur) {
            y(Ur);
          }
        });
      }
      function y(Fe) {
        console.error ? console.error(Fe) : console.log && console.log("ERROR: ", Fe);
      }
      function fe(Fe, Yr, Fr) {
        Fe = s(Fe), Fr == null && (Fr = {}), Fr.elt = Fe;
        var Ur = Ut(Yr, Fr);
        Y.logger && !Bt(Yr) && Y.logger(Fe, Yr, Fr), Fr.error && (y(Fr.error), fe(Fe, "htmx:error", { errorInfo: Fr }));
        var Br = Fe.dispatchEvent(Ur), jr = Xt(Yr);
        if (Br && jr !== Yr) {
          var Vr = Ut(jr, Ur.detail);
          Br = Br && Fe.dispatchEvent(Vr);
        }
        return C(Fe, function(_r) {
          Br = Br && _r.onEvent(Yr, Ur) !== !1 && !Ur.defaultPrevented;
        }), Br;
      }
      var Ft = location.pathname + location.search;
      function Vt() {
        var Fe = te().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return Fe || te().body;
      }
      function jt(Fe, Yr, Fr, Ur) {
        if (M()) {
          if (Y.config.historyCacheSize <= 0) {
            localStorage.removeItem("htmx-history-cache");
            return;
          }
          Fe = D(Fe);
          for (var Br = S(localStorage.getItem("htmx-history-cache")) || [], jr = 0; jr < Br.length; jr++)
            if (Br[jr].url === Fe) {
              Br.splice(jr, 1);
              break;
            }
          var Vr = { url: Fe, content: Yr, title: Fr, scroll: Ur };
          for (fe(te().body, "htmx:historyItemCreated", { item: Vr, cache: Br }), Br.push(Vr); Br.length > Y.config.historyCacheSize; )
            Br.shift();
          for (; Br.length > 0; )
            try {
              localStorage.setItem("htmx-history-cache", JSON.stringify(Br));
              break;
            } catch (_r) {
              ue(te().body, "htmx:historyCacheError", { cause: _r, cache: Br }), Br.shift();
            }
        }
      }
      function _t(Fe) {
        if (!M())
          return null;
        Fe = D(Fe);
        for (var Yr = S(localStorage.getItem("htmx-history-cache")) || [], Fr = 0; Fr < Yr.length; Fr++)
          if (Yr[Fr].url === Fe)
            return Yr[Fr];
        return null;
      }
      function zt(Fe) {
        var Yr = Y.config.requestClass, Fr = Fe.cloneNode(!0);
        return ae(f(Fr, "." + Yr), function(Ur) {
          n(Ur, Yr);
        }), Fr.innerHTML;
      }
      function Wt() {
        var Fe = Vt(), Yr = Ft || location.pathname + location.search, Fr;
        try {
          Fr = te().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch {
          Fr = te().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        Fr || (fe(te().body, "htmx:beforeHistorySave", { path: Yr, historyElt: Fe }), jt(Yr, zt(Fe), te().title, window.scrollY)), Y.config.historyEnabled && history.replaceState({ htmx: !0 }, te().title, window.location.href);
      }
      function $t(Fe) {
        Y.config.getCacheBusterParam && (Fe = Fe.replace(/org\.htmx\.cache-buster=[^&]*&?/, ""), (_(Fe, "&") || _(Fe, "?")) && (Fe = Fe.slice(0, -1))), Y.config.historyEnabled && history.pushState({ htmx: !0 }, "", Fe), Ft = Fe;
      }
      function Gt(Fe) {
        Y.config.historyEnabled && history.replaceState({ htmx: !0 }, "", Fe), Ft = Fe;
      }
      function Jt(Fe) {
        ae(Fe, function(Yr) {
          Yr.call();
        });
      }
      function Zt(Fe) {
        var Yr = new XMLHttpRequest(), Fr = { path: Fe, xhr: Yr };
        fe(te().body, "htmx:historyCacheMiss", Fr), Yr.open("GET", Fe, !0), Yr.setRequestHeader("HX-History-Restore-Request", "true"), Yr.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            fe(te().body, "htmx:historyCacheMissLoad", Fr);
            var Ur = l(this.response);
            Ur = Ur.querySelector("[hx-history-elt],[data-hx-history-elt]") || Ur;
            var Br = Vt(), jr = T(Br), Vr = Xe(this.response);
            if (Vr) {
              var _r = E("title");
              _r ? _r.innerHTML = Vr : window.document.title = Vr;
            }
            Pe(Br, Ur, jr), Jt(jr.tasks), Ft = Fe, fe(te().body, "htmx:historyRestore", { path: Fe, cacheMiss: !0, serverResponse: this.response });
          } else
            ue(te().body, "htmx:historyCacheMissLoadError", Fr);
        }, Yr.send();
      }
      function Kt(Fe) {
        Wt(), Fe = Fe || location.pathname + location.search;
        var Yr = _t(Fe);
        if (Yr) {
          var Fr = l(Yr.content), Ur = Vt(), Br = T(Ur);
          Pe(Ur, Fr, Br), Jt(Br.tasks), document.title = Yr.title, setTimeout(function() {
            window.scrollTo(0, Yr.scroll);
          }, 0), Ft = Fe, fe(te().body, "htmx:historyRestore", { path: Fe, item: Yr });
        } else
          Y.config.refreshOnHistoryMiss ? window.location.reload(!0) : Zt(Fe);
      }
      function Yt(Fe) {
        var Yr = de(Fe, "hx-indicator");
        return Yr == null && (Yr = [Fe]), ae(Yr, function(Fr) {
          var Ur = ie(Fr);
          Ur.requestCount = (Ur.requestCount || 0) + 1, Fr.classList.add.call(Fr.classList, Y.config.requestClass);
        }), Yr;
      }
      function Qt(Fe) {
        var Yr = de(Fe, "hx-disabled-elt");
        return Yr == null && (Yr = []), ae(Yr, function(Fr) {
          var Ur = ie(Fr);
          Ur.requestCount = (Ur.requestCount || 0) + 1, Fr.setAttribute("disabled", "");
        }), Yr;
      }
      function er(Fe, Yr) {
        ae(Fe, function(Fr) {
          var Ur = ie(Fr);
          Ur.requestCount = (Ur.requestCount || 0) - 1, Ur.requestCount === 0 && Fr.classList.remove.call(Fr.classList, Y.config.requestClass);
        }), ae(Yr, function(Fr) {
          var Ur = ie(Fr);
          Ur.requestCount = (Ur.requestCount || 0) - 1, Ur.requestCount === 0 && Fr.removeAttribute("disabled");
        });
      }
      function tr(Fe, Yr) {
        for (var Fr = 0; Fr < Fe.length; Fr++) {
          var Ur = Fe[Fr];
          if (Ur.isSameNode(Yr))
            return !0;
        }
        return !1;
      }
      function rr(Fe) {
        return Fe.name === "" || Fe.name == null || Fe.disabled || Fe.type === "button" || Fe.type === "submit" || Fe.tagName === "image" || Fe.tagName === "reset" || Fe.tagName === "file" ? !1 : Fe.type === "checkbox" || Fe.type === "radio" ? Fe.checked : !0;
      }
      function nr(Fe, Yr, Fr) {
        if (Fe != null && Yr != null) {
          var Ur = Fr[Fe];
          Ur === void 0 ? Fr[Fe] = Yr : Array.isArray(Ur) ? Array.isArray(Yr) ? Fr[Fe] = Ur.concat(Yr) : Ur.push(Yr) : Array.isArray(Yr) ? Fr[Fe] = [Ur].concat(Yr) : Fr[Fe] = [Ur, Yr];
        }
      }
      function ir(Fe, Yr, Fr, Ur, Br) {
        if (!(Ur == null || tr(Fe, Ur))) {
          if (Fe.push(Ur), rr(Ur)) {
            var jr = Q(Ur, "name"), Vr = Ur.value;
            Ur.multiple && Ur.tagName === "SELECT" && (Vr = I(Ur.querySelectorAll("option:checked")).map(function(Qr) {
              return Qr.value;
            })), Ur.files && (Vr = I(Ur.files)), nr(jr, Vr, Yr), Br && ar(Ur, Fr);
          }
          if (h(Ur, "form")) {
            var _r = Ur.elements;
            ae(_r, function(Qr) {
              ir(Fe, Yr, Fr, Qr, Br);
            });
          }
        }
      }
      function ar(Fe, Yr) {
        Fe.willValidate && (fe(Fe, "htmx:validation:validate"), Fe.checkValidity() || (Yr.push({ elt: Fe, message: Fe.validationMessage, validity: Fe.validity }), fe(Fe, "htmx:validation:failed", { message: Fe.validationMessage, validity: Fe.validity })));
      }
      function or(Fe, Yr) {
        var Fr = [], Ur = {}, Br = {}, jr = [], Vr = ie(Fe);
        Vr.lastButtonClicked && !oe(Vr.lastButtonClicked) && (Vr.lastButtonClicked = null);
        var _r = h(Fe, "form") && Fe.noValidate !== !0 || ee(Fe, "hx-validate") === "true";
        if (Vr.lastButtonClicked && (_r = _r && Vr.lastButtonClicked.formNoValidate !== !0), Yr !== "get" && ir(Fr, Br, jr, d(Fe, "form"), _r), ir(Fr, Ur, jr, Fe, _r), Vr.lastButtonClicked || Fe.tagName === "BUTTON" || Fe.tagName === "INPUT" && Q(Fe, "type") === "submit") {
          var Qr = Vr.lastButtonClicked || Fe, zr = Q(Qr, "name");
          nr(zr, Qr.value, Br);
        }
        var Wr = de(Fe, "hx-include");
        return ae(Wr, function(Jr) {
          ir(Fr, Ur, jr, Jr, _r), h(Jr, "form") || ae(Jr.querySelectorAll(Je), function(Kr) {
            ir(Fr, Ur, jr, Kr, _r);
          });
        }), Ur = se(Ur, Br), { errors: jr, values: Ur };
      }
      function sr(Fe, Yr, Fr) {
        Fe !== "" && (Fe += "&"), String(Fr) === "[object Object]" && (Fr = JSON.stringify(Fr));
        var Ur = encodeURIComponent(Fr);
        return Fe += encodeURIComponent(Yr) + "=" + Ur, Fe;
      }
      function lr(Fe) {
        var Yr = "";
        for (var Fr in Fe)
          if (Fe.hasOwnProperty(Fr)) {
            var Ur = Fe[Fr];
            Array.isArray(Ur) ? ae(Ur, function(Br) {
              Yr = sr(Yr, Fr, Br);
            }) : Yr = sr(Yr, Fr, Ur);
          }
        return Yr;
      }
      function ur(Fe) {
        var Yr = new FormData();
        for (var Fr in Fe)
          if (Fe.hasOwnProperty(Fr)) {
            var Ur = Fe[Fr];
            Array.isArray(Ur) ? ae(Ur, function(Br) {
              Yr.append(Fr, Br);
            }) : Yr.append(Fr, Ur);
          }
        return Yr;
      }
      function fr(Fe, Yr, Fr) {
        var Ur = { "HX-Request": "true", "HX-Trigger": Q(Fe, "id"), "HX-Trigger-Name": Q(Fe, "name"), "HX-Target": ee(Yr, "id"), "HX-Current-URL": te().location.href };
        return pr(Fe, "hx-headers", !1, Ur), Fr !== void 0 && (Ur["HX-Prompt"] = Fr), ie(Fe).boosted && (Ur["HX-Boosted"] = "true"), Ur;
      }
      function cr(Fe, Yr) {
        var Fr = re(Yr, "hx-params");
        if (Fr) {
          if (Fr === "none")
            return {};
          if (Fr === "*")
            return Fe;
          if (Fr.indexOf("not ") === 0)
            return ae(Fr.substr(4).split(","), function(Br) {
              Br = Br.trim(), delete Fe[Br];
            }), Fe;
          var Ur = {};
          return ae(Fr.split(","), function(Br) {
            Br = Br.trim(), Ur[Br] = Fe[Br];
          }), Ur;
        } else
          return Fe;
      }
      function hr(Fe) {
        return Q(Fe, "href") && Q(Fe, "href").indexOf("#") >= 0;
      }
      function dr(Fe, Yr) {
        var Fr = Yr || re(Fe, "hx-swap"), Ur = { swapStyle: ie(Fe).boosted ? "innerHTML" : Y.config.defaultSwapStyle, swapDelay: Y.config.defaultSwapDelay, settleDelay: Y.config.defaultSettleDelay };
        if (Y.config.scrollIntoViewOnBoost && ie(Fe).boosted && !hr(Fe) && (Ur.show = "top"), Fr) {
          var Br = P(Fr);
          if (Br.length > 0)
            for (var jr = 0; jr < Br.length; jr++) {
              var Vr = Br[jr];
              if (Vr.indexOf("swap:") === 0)
                Ur.swapDelay = v(Vr.substr(5));
              else if (Vr.indexOf("settle:") === 0)
                Ur.settleDelay = v(Vr.substr(7));
              else if (Vr.indexOf("transition:") === 0)
                Ur.transition = Vr.substr(11) === "true";
              else if (Vr.indexOf("ignoreTitle:") === 0)
                Ur.ignoreTitle = Vr.substr(12) === "true";
              else if (Vr.indexOf("scroll:") === 0) {
                var _r = Vr.substr(7), Qr = _r.split(":"), zr = Qr.pop(), Wr = Qr.length > 0 ? Qr.join(":") : null;
                Ur.scroll = zr, Ur.scrollTarget = Wr;
              } else if (Vr.indexOf("show:") === 0) {
                var Jr = Vr.substr(5), Qr = Jr.split(":"), Kr = Qr.pop(), Wr = Qr.length > 0 ? Qr.join(":") : null;
                Ur.show = Kr, Ur.showTarget = Wr;
              } else if (Vr.indexOf("focus-scroll:") === 0) {
                var on = Vr.substr(13);
                Ur.focusScroll = on == "true";
              } else
                jr == 0 ? Ur.swapStyle = Vr : y("Unknown modifier in hx-swap: " + Vr);
            }
        }
        return Ur;
      }
      function vr(Fe) {
        return re(Fe, "hx-encoding") === "multipart/form-data" || h(Fe, "form") && Q(Fe, "enctype") === "multipart/form-data";
      }
      function gr(Fe, Yr, Fr) {
        var Ur = null;
        return C(Yr, function(Br) {
          Ur == null && (Ur = Br.encodeParameters(Fe, Fr, Yr));
        }), Ur ?? (vr(Yr) ? ur(Fr) : lr(Fr));
      }
      function T(Fe) {
        return { tasks: [], elts: [Fe] };
      }
      function mr(Fe, Yr) {
        var Fr = Fe[0], Ur = Fe[Fe.length - 1];
        if (Yr.scroll) {
          var Br = null;
          Yr.scrollTarget && (Br = le(Fr, Yr.scrollTarget)), Yr.scroll === "top" && (Fr || Br) && (Br = Br || Fr, Br.scrollTop = 0), Yr.scroll === "bottom" && (Ur || Br) && (Br = Br || Ur, Br.scrollTop = Br.scrollHeight);
        }
        if (Yr.show) {
          var Br = null;
          if (Yr.showTarget) {
            var jr = Yr.showTarget;
            Yr.showTarget === "window" && (jr = "body"), Br = le(Fr, jr);
          }
          Yr.show === "top" && (Fr || Br) && (Br = Br || Fr, Br.scrollIntoView({ block: "start", behavior: Y.config.scrollBehavior })), Yr.show === "bottom" && (Ur || Br) && (Br = Br || Ur, Br.scrollIntoView({ block: "end", behavior: Y.config.scrollBehavior }));
        }
      }
      function pr(Fe, Yr, Fr, Ur) {
        if (Ur == null && (Ur = {}), Fe == null)
          return Ur;
        var Br = ee(Fe, Yr);
        if (Br) {
          var jr = Br.trim(), Vr = Fr;
          if (jr === "unset")
            return null;
          jr.indexOf("javascript:") === 0 ? (jr = jr.substr(11), Vr = !0) : jr.indexOf("js:") === 0 && (jr = jr.substr(3), Vr = !0), jr.indexOf("{") !== 0 && (jr = "{" + jr + "}");
          var _r;
          Vr ? _r = xr(Fe, function() {
            return Function("return (" + jr + ")")();
          }, {}) : _r = S(jr);
          for (var Qr in _r)
            _r.hasOwnProperty(Qr) && Ur[Qr] == null && (Ur[Qr] = _r[Qr]);
        }
        return pr(u(Fe), Yr, Fr, Ur);
      }
      function xr(Fe, Yr, Fr) {
        return Y.config.allowEval ? Yr() : (ue(Fe, "htmx:evalDisallowedError"), Fr);
      }
      function yr(Fe, Yr) {
        return pr(Fe, "hx-vars", !0, Yr);
      }
      function br(Fe, Yr) {
        return pr(Fe, "hx-vals", !1, Yr);
      }
      function wr(Fe) {
        return se(yr(Fe), br(Fe));
      }
      function Sr(Fe, Yr, Fr) {
        if (Fr !== null)
          try {
            Fe.setRequestHeader(Yr, Fr);
          } catch {
            Fe.setRequestHeader(Yr, encodeURIComponent(Fr)), Fe.setRequestHeader(Yr + "-URI-AutoEncoded", "true");
          }
      }
      function Er(Fe) {
        if (Fe.responseURL && typeof URL < "u")
          try {
            var Yr = new URL(Fe.responseURL);
            return Yr.pathname + Yr.search;
          } catch {
            ue(te().body, "htmx:badResponseUrl", { url: Fe.responseURL });
          }
      }
      function O(Fe, Yr) {
        return Fe.getAllResponseHeaders().match(Yr);
      }
      function Cr(Fe, Yr, Fr) {
        return Fe = Fe.toLowerCase(), Fr ? Fr instanceof Element || L(Fr, "String") ? ce(Fe, Yr, null, null, { targetOverride: s(Fr), returnPromise: !0 }) : ce(Fe, Yr, s(Fr.source), Fr.event, { handler: Fr.handler, headers: Fr.headers, values: Fr.values, targetOverride: s(Fr.target), swapOverride: Fr.swap, returnPromise: !0 }) : ce(Fe, Yr, null, null, { returnPromise: !0 });
      }
      function Tr(Fe) {
        for (var Yr = []; Fe; )
          Yr.push(Fe), Fe = Fe.parentElement;
        return Yr;
      }
      function Or(Fe, Yr, Fr) {
        var Ur, Br;
        if (typeof URL == "function") {
          Br = new URL(Yr, document.location.href);
          var jr = document.location.origin;
          Ur = jr === Br.origin;
        } else
          Br = Yr, Ur = g(Yr, document.location.origin);
        return Y.config.selfRequestsOnly && !Ur ? !1 : fe(Fe, "htmx:validateUrl", se({ url: Br, sameHost: Ur }, Fr));
      }
      function ce(Fe, Yr, Fr, Ur, Br, jr) {
        var Vr = null, _r = null;
        if (Br = Br ?? {}, Br.returnPromise && typeof Promise < "u")
          var Qr = new Promise(function(sn, hn) {
            Vr = sn, _r = hn;
          });
        Fr == null && (Fr = te().body);
        var zr = Br.handler || qr;
        if (!oe(Fr))
          return ne(Vr), Qr;
        var Wr = Br.targetOverride || ge(Fr);
        if (Wr == null || Wr == he)
          return ue(Fr, "htmx:targetError", { target: ee(Fr, "hx-target") }), ne(_r), Qr;
        var Jr = ie(Fr), Kr = Jr.lastButtonClicked;
        if (Kr) {
          var on = Q(Kr, "formaction");
          on != null && (Yr = on);
          var gn = Q(Kr, "formmethod");
          gn != null && gn.toLowerCase() !== "dialog" && (Fe = gn);
        }
        var mn = re(Fr, "hx-confirm");
        if (jr === void 0) {
          var En = function(sn) {
            return ce(Fe, Yr, Fr, Ur, Br, !!sn);
          }, pn = { target: Wr, elt: Fr, path: Yr, verb: Fe, triggeringEvent: Ur, etc: Br, issueRequest: En, question: mn };
          if (fe(Fr, "htmx:confirm", pn) === !1)
            return ne(Vr), Qr;
        }
        var dn = Fr, ln = re(Fr, "hx-sync"), un = null, An = !1;
        if (ln) {
          var nn = ln.split(":"), en = nn[0].trim();
          if (en === "this" ? dn = ve(Fr, "hx-sync") : dn = le(Fr, en), ln = (nn[1] || "drop").trim(), Jr = ie(dn), ln === "drop" && Jr.xhr && Jr.abortable !== !0)
            return ne(Vr), Qr;
          if (ln === "abort") {
            if (Jr.xhr)
              return ne(Vr), Qr;
            An = !0;
          } else if (ln === "replace")
            fe(dn, "htmx:abort");
          else if (ln.indexOf("queue") === 0) {
            var Cn = ln.split(" ");
            un = (Cn[1] || "last").trim();
          }
        }
        if (Jr.xhr)
          if (Jr.abortable)
            fe(dn, "htmx:abort");
          else {
            if (un == null) {
              if (Ur) {
                var tn = ie(Ur);
                tn && tn.triggerSpec && tn.triggerSpec.queue && (un = tn.triggerSpec.queue);
              }
              un == null && (un = "last");
            }
            return Jr.queuedRequests == null && (Jr.queuedRequests = []), un === "first" && Jr.queuedRequests.length === 0 ? Jr.queuedRequests.push(function() {
              ce(Fe, Yr, Fr, Ur, Br);
            }) : un === "all" ? Jr.queuedRequests.push(function() {
              ce(Fe, Yr, Fr, Ur, Br);
            }) : un === "last" && (Jr.queuedRequests = [], Jr.queuedRequests.push(function() {
              ce(Fe, Yr, Fr, Ur, Br);
            })), ne(Vr), Qr;
          }
        var Gr = new XMLHttpRequest();
        Jr.xhr = Gr, Jr.abortable = An;
        var an = function() {
          if (Jr.xhr = null, Jr.abortable = !1, Jr.queuedRequests != null && Jr.queuedRequests.length > 0) {
            var sn = Jr.queuedRequests.shift();
            sn();
          }
        }, wn = re(Fr, "hx-prompt");
        if (wn) {
          var xn = prompt(wn);
          if (xn === null || !fe(Fr, "htmx:prompt", { prompt: xn, target: Wr }))
            return ne(Vr), an(), Qr;
        }
        if (mn && !jr && !confirm(mn))
          return ne(Vr), an(), Qr;
        var $r = fr(Fr, Wr, xn);
        Br.headers && ($r = se($r, Br.headers));
        var Sn = or(Fr, Fe), vn = Sn.errors, fn = Sn.values;
        Br.values && (fn = se(fn, Br.values));
        var kn = wr(Fr), In = se(fn, kn), yn = cr(In, Fr);
        Fe !== "get" && !vr(Fr) && ($r["Content-Type"] = "application/x-www-form-urlencoded"), Y.config.getCacheBusterParam && Fe === "get" && (yn["org.htmx.cache-buster"] = Q(Wr, "id") || "true"), (Yr == null || Yr === "") && (Yr = te().location.href);
        var qn = pr(Fr, "hx-request"), Nn = ie(Fr).boosted, On = Y.config.methodsThatUseUrlParams.indexOf(Fe) >= 0, rn = { boosted: Nn, useUrlParams: On, parameters: yn, unfilteredParameters: In, headers: $r, target: Wr, verb: Fe, errors: vn, withCredentials: Br.credentials || qn.credentials || Y.config.withCredentials, timeout: Br.timeout || qn.timeout || Y.config.timeout, path: Yr, triggeringEvent: Ur };
        if (!fe(Fr, "htmx:configRequest", rn))
          return ne(Vr), an(), Qr;
        if (Yr = rn.path, Fe = rn.verb, $r = rn.headers, yn = rn.parameters, vn = rn.errors, On = rn.useUrlParams, vn && vn.length > 0)
          return fe(Fr, "htmx:validation:halted", rn), ne(Vr), an(), Qr;
        var Pn = Yr.split("#"), Mn = Pn[0], Hn = Pn[1], cn = Yr;
        if (On) {
          cn = Mn;
          var Dn = Object.keys(yn).length !== 0;
          Dn && (cn.indexOf("?") < 0 ? cn += "?" : cn += "&", cn += lr(yn), Hn && (cn += "#" + Hn));
        }
        if (!Or(Fr, cn, rn))
          return ue(Fr, "htmx:invalidPath", rn), ne(_r), Qr;
        if (Gr.open(Fe.toUpperCase(), cn, !0), Gr.overrideMimeType("text/html"), Gr.withCredentials = rn.withCredentials, Gr.timeout = rn.timeout, !qn.noHeaders) {
          for (var Ln in $r)
            if ($r.hasOwnProperty(Ln)) {
              var Xn = $r[Ln];
              Sr(Gr, Ln, Xn);
            }
        }
        var Zr = { xhr: Gr, target: Wr, requestConfig: rn, etc: Br, boosted: Nn, pathInfo: { requestPath: Yr, finalRequestPath: cn, anchor: Hn } };
        if (Gr.onload = function() {
          try {
            var sn = Tr(Fr);
            if (Zr.pathInfo.responsePath = Er(Gr), zr(Fr, Zr), er(Tn, Rn), fe(Fr, "htmx:afterRequest", Zr), fe(Fr, "htmx:afterOnLoad", Zr), !oe(Fr)) {
              for (var hn = null; sn.length > 0 && hn == null; ) {
                var bn = sn.shift();
                oe(bn) && (hn = bn);
              }
              hn && (fe(hn, "htmx:afterRequest", Zr), fe(hn, "htmx:afterOnLoad", Zr));
            }
            ne(Vr), an();
          } catch (Yn) {
            throw ue(Fr, "htmx:onLoadError", se({ error: Yn }, Zr)), Yn;
          }
        }, Gr.onerror = function() {
          er(Tn, Rn), ue(Fr, "htmx:afterRequest", Zr), ue(Fr, "htmx:sendError", Zr), ne(_r), an();
        }, Gr.onabort = function() {
          er(Tn, Rn), ue(Fr, "htmx:afterRequest", Zr), ue(Fr, "htmx:sendAbort", Zr), ne(_r), an();
        }, Gr.ontimeout = function() {
          er(Tn, Rn), ue(Fr, "htmx:afterRequest", Zr), ue(Fr, "htmx:timeout", Zr), ne(_r), an();
        }, !fe(Fr, "htmx:beforeRequest", Zr))
          return ne(Vr), an(), Qr;
        var Tn = Yt(Fr), Rn = Qt(Fr);
        ae(["loadstart", "loadend", "progress", "abort"], function(sn) {
          ae([Gr, Gr.upload], function(hn) {
            hn.addEventListener(sn, function(bn) {
              fe(Fr, "htmx:xhr:" + sn, { lengthComputable: bn.lengthComputable, loaded: bn.loaded, total: bn.total });
            });
          });
        }), fe(Fr, "htmx:beforeSend", Zr);
        var Fn = On ? null : gr(Gr, Fr, yn);
        return Gr.send(Fn), Qr;
      }
      function Rr(Fe, Yr) {
        var Fr = Yr.xhr, Ur = null, Br = null;
        if (O(Fr, /HX-Push:/i) ? (Ur = Fr.getResponseHeader("HX-Push"), Br = "push") : O(Fr, /HX-Push-Url:/i) ? (Ur = Fr.getResponseHeader("HX-Push-Url"), Br = "push") : O(Fr, /HX-Replace-Url:/i) && (Ur = Fr.getResponseHeader("HX-Replace-Url"), Br = "replace"), Ur)
          return Ur === "false" ? {} : { type: Br, path: Ur };
        var jr = Yr.pathInfo.finalRequestPath, Vr = Yr.pathInfo.responsePath, _r = re(Fe, "hx-push-url"), Qr = re(Fe, "hx-replace-url"), zr = ie(Fe).boosted, Wr = null, Jr = null;
        return _r ? (Wr = "push", Jr = _r) : Qr ? (Wr = "replace", Jr = Qr) : zr && (Wr = "push", Jr = Vr || jr), Jr ? Jr === "false" ? {} : (Jr === "true" && (Jr = Vr || jr), Yr.pathInfo.anchor && Jr.indexOf("#") === -1 && (Jr = Jr + "#" + Yr.pathInfo.anchor), { type: Wr, path: Jr }) : {};
      }
      function qr(Fe, Yr) {
        var Fr = Yr.xhr, Ur = Yr.target, Br = Yr.etc;
        if (Yr.requestConfig, !!fe(Fe, "htmx:beforeOnLoad", Yr)) {
          if (O(Fr, /HX-Trigger:/i) && Be(Fr, "HX-Trigger", Fe), O(Fr, /HX-Location:/i)) {
            Wt();
            var jr = Fr.getResponseHeader("HX-Location"), Vr;
            jr.indexOf("{") === 0 && (Vr = S(jr), jr = Vr.path, delete Vr.path), Cr("GET", jr, Vr).then(function() {
              $t(jr);
            });
            return;
          }
          var _r = O(Fr, /HX-Refresh:/i) && Fr.getResponseHeader("HX-Refresh") === "true";
          if (O(Fr, /HX-Redirect:/i)) {
            location.href = Fr.getResponseHeader("HX-Redirect"), _r && location.reload();
            return;
          }
          if (_r) {
            location.reload();
            return;
          }
          O(Fr, /HX-Retarget:/i) && (Yr.target = te().querySelector(Fr.getResponseHeader("HX-Retarget")));
          var Qr = Rr(Fe, Yr), zr = Fr.status >= 200 && Fr.status < 400 && Fr.status !== 204, Wr = Fr.response, Jr = Fr.status >= 400, Kr = Y.config.ignoreTitle, on = se({ shouldSwap: zr, serverResponse: Wr, isError: Jr, ignoreTitle: Kr }, Yr);
          if (fe(Ur, "htmx:beforeSwap", on)) {
            if (Ur = on.target, Wr = on.serverResponse, Jr = on.isError, Kr = on.ignoreTitle, Yr.target = Ur, Yr.failed = Jr, Yr.successful = !Jr, on.shouldSwap) {
              Fr.status === 286 && Ke(Fe), C(Fe, function(nn) {
                Wr = nn.transformResponse(Wr, Fr, Fe);
              }), Qr.type && Wt();
              var gn = Br.swapOverride;
              O(Fr, /HX-Reswap:/i) && (gn = Fr.getResponseHeader("HX-Reswap"));
              var Vr = dr(Fe, gn);
              Vr.hasOwnProperty("ignoreTitle") && (Kr = Vr.ignoreTitle), Ur.classList.add(Y.config.swappingClass);
              var mn = null, En = null, pn = function() {
                try {
                  var nn = document.activeElement, en = {};
                  try {
                    en = { elt: nn, start: nn ? nn.selectionStart : null, end: nn ? nn.selectionEnd : null };
                  } catch {
                  }
                  var Cn;
                  O(Fr, /HX-Reselect:/i) && (Cn = Fr.getResponseHeader("HX-Reselect"));
                  var tn = T(Ur);
                  if (Ue(Vr.swapStyle, Ur, Fe, Wr, tn, Cn), en.elt && !oe(en.elt) && Q(en.elt, "id")) {
                    var Gr = document.getElementById(Q(en.elt, "id")), an = { preventScroll: Vr.focusScroll !== void 0 ? !Vr.focusScroll : !Y.config.defaultFocusScroll };
                    if (Gr) {
                      if (en.start && Gr.setSelectionRange)
                        try {
                          Gr.setSelectionRange(en.start, en.end);
                        } catch {
                        }
                      Gr.focus(an);
                    }
                  }
                  if (Ur.classList.remove(Y.config.swappingClass), ae(tn.elts, function($r) {
                    $r.classList && $r.classList.add(Y.config.settlingClass), fe($r, "htmx:afterSwap", Yr);
                  }), O(Fr, /HX-Trigger-After-Swap:/i)) {
                    var wn = Fe;
                    oe(Fe) || (wn = te().body), Be(Fr, "HX-Trigger-After-Swap", wn);
                  }
                  var xn = function() {
                    if (ae(tn.tasks, function(fn) {
                      fn.call();
                    }), ae(tn.elts, function(fn) {
                      fn.classList && fn.classList.remove(Y.config.settlingClass), fe(fn, "htmx:afterSettle", Yr);
                    }), Qr.type && (fe(te().body, "htmx:beforeHistoryUpdate", se({ history: Qr }, Yr)), Qr.type === "push" ? ($t(Qr.path), fe(te().body, "htmx:pushedIntoHistory", { path: Qr.path })) : (Gt(Qr.path), fe(te().body, "htmx:replacedInHistory", { path: Qr.path }))), Yr.pathInfo.anchor) {
                      var $r = te().getElementById(Yr.pathInfo.anchor);
                      $r && $r.scrollIntoView({ block: "start", behavior: "auto" });
                    }
                    if (tn.title && !Kr) {
                      var Sn = E("title");
                      Sn ? Sn.innerHTML = tn.title : window.document.title = tn.title;
                    }
                    if (mr(tn.elts, Vr), O(Fr, /HX-Trigger-After-Settle:/i)) {
                      var vn = Fe;
                      oe(Fe) || (vn = te().body), Be(Fr, "HX-Trigger-After-Settle", vn);
                    }
                    ne(mn);
                  };
                  Vr.settleDelay > 0 ? setTimeout(xn, Vr.settleDelay) : xn();
                } catch ($r) {
                  throw ue(Fe, "htmx:swapError", Yr), ne(En), $r;
                }
              }, dn = Y.config.globalViewTransitions;
              if (Vr.hasOwnProperty("transition") && (dn = Vr.transition), dn && fe(Fe, "htmx:beforeTransition", Yr) && typeof Promise < "u" && document.startViewTransition) {
                var ln = new Promise(function(nn, en) {
                  mn = nn, En = en;
                }), un = pn;
                pn = function() {
                  document.startViewTransition(function() {
                    return un(), ln;
                  });
                };
              }
              Vr.swapDelay > 0 ? setTimeout(pn, Vr.swapDelay) : pn();
            }
            Jr && ue(Fe, "htmx:responseError", se({ error: "Response Status Error Code " + Fr.status + " from " + Yr.pathInfo.requestPath }, Yr));
          }
        }
      }
      var Hr = {};
      function Lr() {
        return { init: function(Fe) {
          return null;
        }, onEvent: function(Fe, Yr) {
          return !0;
        }, transformResponse: function(Fe, Yr, Fr) {
          return Fe;
        }, isInlineSwap: function(Fe) {
          return !1;
        }, handleSwap: function(Fe, Yr, Fr, Ur) {
          return !1;
        }, encodeParameters: function(Fe, Yr, Fr) {
          return null;
        } };
      }
      function Ar(Fe, Yr) {
        Yr.init && Yr.init(r), Hr[Fe] = se(Lr(), Yr);
      }
      function Nr(Fe) {
        delete Hr[Fe];
      }
      function Ir(Fe, Yr, Fr) {
        if (Fe == null)
          return Yr;
        Yr == null && (Yr = []), Fr == null && (Fr = []);
        var Ur = ee(Fe, "hx-ext");
        return Ur && ae(Ur.split(","), function(Br) {
          if (Br = Br.replace(/ /g, ""), Br.slice(0, 7) == "ignore:") {
            Fr.push(Br.slice(7));
            return;
          }
          if (Fr.indexOf(Br) < 0) {
            var jr = Hr[Br];
            jr && Yr.indexOf(jr) < 0 && Yr.push(jr);
          }
        }), Ir(u(Fe), Yr, Fr);
      }
      var kr = !1;
      te().addEventListener("DOMContentLoaded", function() {
        kr = !0;
      });
      function Pr(Fe) {
        kr || te().readyState === "complete" ? Fe() : te().addEventListener("DOMContentLoaded", Fe);
      }
      function Mr() {
        Y.config.includeIndicatorStyles !== !1 && te().head.insertAdjacentHTML("beforeend", "<style>                      ." + Y.config.indicatorClass + "{opacity:0;transition: opacity 200ms ease-in;}                      ." + Y.config.requestClass + " ." + Y.config.indicatorClass + "{opacity:1}                      ." + Y.config.requestClass + "." + Y.config.indicatorClass + "{opacity:1}                    </style>");
      }
      function Dr() {
        var Fe = te().querySelector('meta[name="htmx-config"]');
        return Fe ? S(Fe.content) : null;
      }
      function Xr() {
        var Fe = Dr();
        Fe && (Y.config = se(Y.config, Fe));
      }
      return Pr(function() {
        Xr(), Mr();
        var Fe = te().body;
        Dt(Fe);
        var Yr = te().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
        Fe.addEventListener("htmx:abort", function(Ur) {
          var Br = Ur.target, jr = ie(Br);
          jr && jr.xhr && jr.xhr.abort();
        });
        var Fr = window.onpopstate;
        window.onpopstate = function(Ur) {
          Ur.state && Ur.state.htmx ? (Kt(), ae(Yr, function(Br) {
            fe(Br, "htmx:restored", { document: te(), triggerEvent: fe });
          })) : Fr && Fr(Ur);
        }, setTimeout(function() {
          fe(Fe, "htmx:load", {}), Fe = null;
        }, 0);
      }), Y;
    }();
  });
})(htmx_min);
var htmx_minExports = htmx_min.exports;
const htmx = /* @__PURE__ */ getDefaultExportFromCjs(htmx_minExports);
window.htmx = htmx;
