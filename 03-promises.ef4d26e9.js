!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var r=o("h6c0i"),u=(document.querySelector("body"),document.querySelector("form.form"));document.querySelector('[name="step"]'),document.querySelector('[name="amount"]'),document.querySelector("button"),document.querySelector('input[name="delay"]');function i(e,n){var t=Math.random()>.3;return new Promise((function(o,r){setTimeout((function(){t?o({position:e,delay:n}):r({position:e,delay:n})}),n)}))}u.addEventListener("submit",(function(e){e.preventDefault();for(var n=e.currentTarget.elements,t=n.delay,o=n.step,u=n.amount,a=Number(t.value),c=Number(o.value),l=Number(u.value),d=1;d<=l;d+=1){i(d,a).then((function(e){var n=e.position,t=e.delay;r.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;r.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms"))})),a+=c}}))}();
//# sourceMappingURL=03-promises.ef4d26e9.js.map