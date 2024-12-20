function p(e, t, i, r, s, o, d, n) {
  var h = typeof e == "function" ? e.options : e;
  return t && (h.render = t, h.staticRenderFns = i, h._compiled = !0), o && (h._scopeId = "data-v-" + o), {
    exports: e,
    options: h
  };
}
const _ = {
  props: ["x", "y", "width", "height", "tag"],
  data() {
    return {
      defaultTag: "div"
    };
  },
  computed: {},
  methods: {},
  mounted() {
  }
};
var M = function() {
  var t = this, i = t._self._c;
  return i(t.tag || t.defaultTag, { tag: "component", staticClass: "grid-layout-element", style: `display: flex; grid-column-start:${t.x + 1}; grid-column-end:${t.x + 1 + t.width}; grid-row-start:${t.y + 1}; grid-row-end:${t.y + 1 + t.height};` }, [t._t("default")], 2);
}, R = [], I = /* @__PURE__ */ p(
  _,
  M,
  R,
  !1,
  null,
  "35c5d425"
);
const w = I.exports;
let a = {};
a.DIR_UP = 1;
a.DIR_RIGHT = 2;
a.DIR_DOWN = 3;
a.DIR_LEFT = 4;
a.DIRECTIONS_ALL = [a.DIR_UP, a.DIR_RIGHT, a.DIR_DOWN, a.DIR_LEFT];
a.MAX_GRID_SIZE = 100;
a.getWidth = function(e, t = 0) {
  if (e.length === 0)
    return 0;
  let i = Math.max.apply(
    null,
    e.map((r) => r.x + r.width)
  );
  return Math.max(i, t);
};
a.getHeight = function(e, t = 0) {
  if (e.length === 0)
    return 0;
  let i = Math.max.apply(
    null,
    e.map((r) => r.y + r.height)
  );
  return Math.max(i, t);
};
a.insertDuplicate = function(e, t, i, r = {}) {
  return e = l(e, r.dontCopy), a.isFreeSpace(e, t.x + t.width, t.y, t.width, t.height, r) ? (i.x = t.x + t.width, e.push(i)) : a.isFreeSpace(e, t.x, t.y + t.height, t.width, t.height, r) ? (i.y = t.y + t.height, e.push(i)) : a.isFreeSpace(e, t.x - t.width, t.y, t.width, t.height, r) ? (i.x = t.x - t.width, e.push(i)) : a.isFreeSpace(e, t.x, t.y - t.height, t.width, t.height, r) ? (i.y = t.y - t.height, e.push(i)) : (e.push(i), r.dontCopy = !0, e = a.resolveCollisions(e, t, r)), e;
};
a.moveElements = function(e, t = {}) {
  e = e || [], t.moveX = t.moveX || 0, t.moveY = t.moveY || 0, t.startX = t.startX || 0, t.startY = t.startY || 0, t.moveElements = t.moveElements || e.filter((i) => i.x >= t.startX && i.y >= t.startY), v(t.moveElements, t.moveX, t.moveY);
  for (let i of t.moveElements)
    a.isFreeSpace(
      e,
      i.x + t.moveX,
      i.y + t.moveY,
      i.width,
      i.height,
      { outOfBounds: !0 }
    ) && (i.x += t.moveX, i.y += t.moveY);
  return t.moveElements;
};
a.moveAsPossible = function(e = [], t = [], i, r = {}) {
  if (r.dontCopy || (e = l(e), t = t.map((o) => e.find((d) => d.id === o.id))), !a.DIRECTIONS_ALL.includes(i))
    return e;
  let s = C(i);
  v(t, s.x, s.y);
  for (let o of t) {
    let d = e.filter((h) => h.id !== o.id), n;
    for (n = 1; n <= (r.maxMove || a.MAX_GRID_SIZE) && a.isFreeSpace(d, o.x + s.x * n, o.y + s.y * n, o.width, o.height, r); n++)
      ;
    o.x += (n - 1) * s.x, o.y += (n - 1) * s.y;
  }
  return e;
};
a.isFreeSpace = function(e, t, i, r, s, o = {}) {
  if (t < 0 || i < 0)
    return !1;
  o.outOfBounds = o.outOfBounds === !0;
  let d = a.getWidth(e, o.gridWidth), n = a.getHeight(e, o.gridHeight), h = m(e, o);
  for (let c = t; c < t + r; c++)
    for (let u = i; u < i + s; u++)
      if (b(h, c, u) || !o.outOfBounds && (c < 0 || u < 0 || c >= d || u >= n))
        return !1;
  return !0;
};
a.normalizeGrid = function(e, t = {}) {
  e = l(e, t.dontCopy);
  for (let i of e)
    i.width = 1, i.height = 1;
  return t.outOfBounds = !0, t.dontCopy = !0, e = a.moveAsPossible(e, e, a.DIR_LEFT, t), e;
};
a.resolveCollisions = function(e, t, i = {}) {
  e = l(e, i.dontCopy), t = e.find((d) => d.id === t.id);
  let r = i.diff || { x: void 0, y: void 0, exact: void 0, xExact: void 0, yExact: void 0 }, s = i.calcNewPos ? a.getSwapPosition(t, r) : l(t), o = e.filter((d) => d.id !== t.id).concat(s);
  if (!f(o))
    return i.calcNewPos && (t.x = s.x, t.y = s.y), e;
  if (y(e, s) && Math.abs(r.x) <= t.width && Math.abs(r.y) <= t.height && (r.x === 0 || r.y === 0)) {
    i.calcNewPos && (t.x = s.x, t.y = s.y);
    let d = g(e, t);
    for (let n of d)
      Math.abs(r.x) > 0 ? n.x += Math.sign(r.x) * -1 * t.width : Math.abs(r.y) > 0 && (n.y += Math.sign(r.y) * -1 * t.height);
  } else if (r.exact && y(e, s)) {
    i.calcNewPos && (t.x = s.x, t.y = s.y);
    let d = g(e, t);
    for (let n of d)
      n.x = n.x - r.x, n.y = n.y - r.y;
  } else {
    if (i.calcNewPos) {
      let u = a.getMoveRightPosition(t, r);
      t.x = u.x, t.y = u.y;
    }
    let d = e.filter((u) => u.id !== t.id), n = d.filter((u) => u.x >= t.x || // elements that are equal or more right on x-axis
    f([u, t])), h = Math.max.apply(null, n.map((u) => u.width + t.width)), c = a.moveElements(d, {
      moveX: h,
      moveElements: n
    });
    i.outOfBounds = !0, i.maxMove = h, i.dontCopy = !0, e = a.moveAsPossible(e, c, a.DIR_LEFT, i);
  }
  return e;
};
a.getSwapPosition = function(e, t) {
  let i = l(e);
  return i.x = Math.max(0, i.x + t.x), i.y = Math.max(0, i.y + t.y), i;
};
a.getMoveRightPosition = function(e, t) {
  let i = l(e);
  return i.x = Math.max(0, i.x + Math.round(t.xExact + 0.5)), i.y = Math.max(0, i.y + t.y), i;
};
a.getElementById = function(e = [], t) {
  return e.find((i) => i.id === t);
};
function m(e, t = {}) {
  let i = D(
    a.getWidth(e, t.gridWidth),
    a.getHeight(e, t.gridHeight),
    0
  );
  for (let r of e)
    for (let s = r.x; s < r.x + r.width; s++)
      for (let o = r.y; o < r.y + r.height; o++)
        i[s][o]++;
  return i;
}
function b(e, t, i) {
  return !!(e[t] && e[t][i]);
}
function f(e) {
  let t = m(e), i = 0;
  for (let r = 0; r < t.length; r++)
    i = Math.max(i, Math.max.apply(null, t[r]));
  return i > 1;
}
function g(e, t) {
  return e.filter((i) => i.id !== t.id && f([i, t]));
}
function y(e, t) {
  return g(e, t).every((r) => $(t, r));
}
function C(e) {
  return {
    x: e === a.DIR_LEFT ? -1 : e === a.DIR_RIGHT ? 1 : 0,
    y: e === a.DIR_UP ? -1 : e === a.DIR_DOWN ? 1 : 0
  };
}
function $(e, t) {
  return e.width >= t.width && e.height >= t.height && e.x <= t.x && e.x + e.width >= t.x + t.width && e.y <= t.y && e.y + e.height >= t.y + t.height;
}
function v(e, t, i) {
  e.sort((r, s) => t !== 0 ? t * (s.x - r.x) : i * (s.y - r.y));
}
function D(e, t, i) {
  let r = [];
  for (let s = 0; s < e; s++) {
    let o = new Array(t).fill(i);
    r.push(o);
  }
  return r;
}
function l(e, t) {
  return t ? e : Array.isArray(e) ? e.map((i) => x(i)) : x(e);
}
function x(e = {}) {
  return Object.assign({}, e);
}
const L = {
  components: { GridElement: w },
  props: {
    rows: Number,
    columns: Number,
    elements: Array,
    renderComponent: {
      type: [Object, String],
      default: null
    },
    backgroundColor: {
      type: String,
      default: "white"
    },
    baseTag: {
      type: String,
      default: "ol"
    },
    elementTag: {
      type: String,
      default: "li"
    },
    editable: {
      type: Boolean,
      default: !1
    },
    resizeHandleSelector: {
      type: String,
      default: ".ui-resizable-handle"
    },
    backgroundLines: {
      type: Boolean,
      default: !1
    },
    animationDurationMs: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      interact: null,
      timeoutHandler: null,
      noMoveId: null,
      myId: "grid-parent-" + (/* @__PURE__ */ new Date()).getTime(),
      elementClassSelector: ".grid-layout-element"
    };
  },
  watch: {
    editable() {
      this.reinit();
    },
    rows() {
      this.reinit();
    },
    columns() {
      this.reinit();
    }
  },
  computed: {
    cssProps() {
      return {
        "--animation-duration": this.animationDurationMs + "ms"
      };
    }
  },
  methods: {
    getRasterX() {
      return this.getSizeFromStyle("grid-template-columns");
    },
    getRasterY() {
      return this.getSizeFromStyle("grid-template-rows");
    },
    getSizeFromStyle(e) {
      if (!this.$refs.gridComponent)
        return 0;
      let i = getComputedStyle(this.$refs.gridComponent.$el).getPropertyValue(e).split(" ")[0];
      return parseFloat(i);
    },
    handleMove(e, t) {
      if (t.x === 0 && t.y === 0)
        return;
      let i = e.children[0].id, r = this.getElement(i), s = a.resolveCollisions(this.elements, r, {
        diff: t,
        gridWidth: this.columns,
        gridHeight: this.rows,
        calcNewPos: !0
      });
      this.$emit("changed", s), this.reinit();
    },
    handleResize(e, t) {
      let i = e.children[0].id, r = this.getElement(i);
      if (!r || !t || t.width === e.width && t.height === e.height)
        return;
      r.width = t.width, r.height = t.height;
      let s = a.resolveCollisions(this.elements, r, {
        gridWidth: this.columns,
        gridHeight: this.rows
      });
      this.$emit("changed", s), this.reinit();
    },
    getElement(e) {
      return this.elements.find((t) => t.id + "" == e + "");
    },
    reinit() {
      this.$nextTick(() => {
        this.initInteract(), this.$forceUpdate();
      });
    },
    async initInteract() {
      if (this.destroyInteract(), !this.editable)
        return;
      let e = this;
      this.interact = this.interact || (await import("./interact.min-BLzsWw0f.js").then((r) => r.i)).default;
      let t = { x: 0, y: 0 }, i = 0;
      this.interact(this.elementClassSelector).draggable({
        listeners: {
          start(r) {
            i = r.target.style.zIndex;
          },
          move(r) {
            t.x += r.dx, t.y += r.dy, r.target.style.transform = `translate(${t.x}px, ${t.y}px)`, r.target.style.zIndex = 100;
          },
          end(r) {
            let s = r.target, o = t.x / e.getRasterX(), d = t.y / e.getRasterY(), n = Math.round(o), h = Math.abs(n - o) < 0.25, c = {
              x: n,
              y: Math.round(d),
              exact: h,
              xExact: o,
              yExact: d
            };
            e.handleMove(s, c), r.target.style.transform = "", e.noMoveId = r.target.getAttribute("data-id"), setTimeout(() => {
              r.target.style.zIndex = i, e.noMoveId = null;
            }, e.animationDurationMs + 100);
          }
        }
      }).resizable({
        edges: { left: !1, right: !0, bottom: this.resizeHandleSelector, top: !1 },
        listeners: {
          start(r) {
            i = r.target.style.zIndex;
          },
          move(r) {
            r.target.style.width = r.rect.width + "px", r.target.style.height = r.rect.height + "px", r.target.style.zIndex = 100;
          },
          end(r) {
            r.target.style.width = "", r.target.style.height = "", r.target.style.zIndex = i;
            let s = r.target;
            e.handleResize(s, {
              width: Math.round(r.rect.width / e.getRasterX()),
              height: Math.round(r.rect.height / e.getRasterY())
            });
          }
        },
        modifiers: [
          // minimum size
          this.interact.modifiers.restrictSize({
            min: { width: this.getRasterX(), height: this.getRasterY() }
          })
        ]
      });
    },
    destroyInteract() {
      this.interact && this.interact(this.elementClassSelector).unset();
    },
    onResize() {
      clearTimeout(this.timeoutHandler), this.timeoutHandler = setTimeout(() => {
        this.$forceUpdate();
      }, 50);
    },
    pointerEventListener(e) {
      let t = e.target, i = !1;
      for (; t; ) {
        if (t.className.includes(this.myId)) {
          i = !0;
          break;
        }
        t = t.parentElement;
      }
      if (i) {
        let r = this.$refs.gridComponent.$el.getBoundingClientRect(), s = e.changedTouches ? e.changedTouches[0] : null, o = s ? s.clientX : e.clientX, d = s ? s.clientY : e.clientY, n = o - r.x, h = d - r.y;
        this.$emit("interacted", Math.floor(n / this.getRasterX()), Math.floor(h / this.getRasterY()), e);
      }
    }
  },
  created() {
    window.addEventListener("resize", this.onResize), document.addEventListener("click", this.pointerEventListener), document.addEventListener("touchend", this.pointerEventListener), document.addEventListener("contextmenu", this.pointerEventListener);
  },
  beforeDestroy() {
    this.destroyInteract(), window.removeEventListener("resize", this.onResize), document.removeEventListener("click", this.pointerEventListener), document.removeEventListener("touchend", this.pointerEventListener), document.removeEventListener("contextmenu", this.pointerEventListener);
  },
  async mounted() {
    this.initInteract(), this.$forceUpdate();
  }
};
var S = function() {
  var t = this, i = t._self._c;
  return i("div", { class: "grid-parent " + t.myId, style: t.cssProps }, [t.backgroundLines ? i("div", [i("div", { staticClass: "grid-bg-lines", style: `margin-left: ${t.getRasterX()}px; margin-right: 1px; background-size: ${t.getRasterX()}px ${t.getRasterX()}px; background-image: linear-gradient(to right, grey 1px, transparent 1px)` }), i("div", { staticClass: "grid-bg-lines", style: `margin-top: ${t.getRasterY()}px; margin-bottom: 1px; background-size: ${t.getRasterY()}px ${t.getRasterY()}px; background-image: linear-gradient(to bottom, grey 1px, transparent 1px);` })]) : t._e(), i("transition-group", { ref: "gridComponent", staticClass: "grid-layout", style: `grid-template-columns: repeat(${t.columns}, minmax(0, 1fr)); grid-template-rows: repeat(${t.rows}, minmax(0, 1fr)); background-color: ${t.backgroundColor}`, attrs: { name: t.editable ? "grid-transition" : "", tag: t.baseTag } }, t._l(t.elements, function(r) {
    return i("grid-element", { key: r.id, class: r.id + "" === t.noMoveId ? "nomove" : "", attrs: { "data-id": r.id, x: r.x, y: r.y, width: r.width, height: r.height, tag: t.elementTag } }, [i(t.renderComponent, t._b({ tag: "component", attrs: { id: r.id, element: r } }, "component", t.$attrs, !1))], 1);
  }), 1)], 1);
}, X = [], P = /* @__PURE__ */ p(
  L,
  S,
  X,
  !1,
  null,
  "0c061dff"
);
const T = P.exports;
export {
  T as GridLayout,
  a as gridLayoutUtil
};
