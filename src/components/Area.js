import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import React, { Component } from 'react';
import libui from 'libui-node';
import PropTypes from 'prop-types';
import Color from 'color';
import parseSVG from 'svg-path-parser';
import { StyledText } from '..';

const onMouse = component => (area, evt) => {
  const down = evt.getDown();
  const up = evt.getUp();
  if (up) {
    component.props.onMouseUp({
      x: evt.getX(),
      y: evt.getY(),
      width: evt.getAreaWidth(),
      height: evt.getAreaHeight(),
      button: up,
    });
  } else if (down) {
    component.props.onMouseDown({
      x: evt.getX(),
      y: evt.getY(),
      width: evt.getAreaWidth(),
      height: evt.getAreaHeight(),
      button: down,
      count: evt.getCount(),
    });
  } else {
    const buttons = [];
    const held = evt.getHeld1To64();
    if (held > 0) {
      for (let i = 0; i <= 6; i++) {
        if (held & Math.pow(2, i)) buttons.push(i + 1);
        if (!(held >> (i + 1))) break;
      }
    }
    component.props.onMouseMove({
      x: evt.getX(),
      y: evt.getY(),
      width: evt.getAreaWidth(),
      height: evt.getAreaHeight(),
      buttons,
    });
  }
};

const onKey = component => (area, event) => {
  let extKey = event.getExtKey();
  if (extKey) {
    for (let k of Object.keys(libui.extKeys)) {
      if (extKey == libui.extKeys[k]) {
        extKey = k;
        break;
      }
    }
  }

  let modifierKey = event.getModifier();
  if (modifierKey) {
    for (let k of Object.keys(libui.modifierKeys)) {
      if (modifierKey == libui.modifierKeys[k]) {
        modifierKey = k;
        break;
      }
    }
  }

  let modifiers = event.getModifiers();
  let modifiersList = [];

  if (modifiers) {
    for (let k of Object.keys(libui.modifierKeys)) {
      if (modifiers & libui.modifierKeys[k]) {
        modifiersList.push(k);
      }
    }
  }

  if (event.getUp()) {
    return component.props.onKeyUp({
      key: event.getKey(),
      extKey,
      modifierKey,
      modifiers: modifiersList,
    });
  } else {
    return component.props.onKeyDown({
      key: event.getKey(),
      extKey,
      modifierKey,
      modifiers: modifiersList,
    });
  }
};

class Area extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.width = null;
    this.height = null;

    this.element = new libui.UiArea(
      (area, p) => {
        const width = p.getAreaWidth();
        const height = p.getAreaHeight();
        if (width !== this.width || height !== this.height) {
          this.width = width;
          this.height = height;
          this.props.onSizeChange(area, { width, height });
        }

        for (let i = 0; i < this.children.length; i += 1) {
          if (typeof this.children[i] === 'object') {
            this.children[i].render(this, area, p);
          }
        }
      },
      onMouse(this),
      (area, inOut) => {
        if (inOut === 0) {
          this.props.onMouseEnter();
        } else {
          this.props.onMouseLeave();
        }
      },
      function dragBroken() {},
      onKey(this)
    );
  }

  getArea() {
    return this.element;
  }

  // to prevent TypeError: Cannot read property 'undefined' of undefined
  // because onMouseMove, ... shouldn't be handled by DesktopComponent
  update(oldProps, newProps) {}

  render(parent) {
    this.addParent(parent);
  }
}

Area.propTypes = {
  ...universalPropTypes,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSizeChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Area.defaultProps = {
  ...universalDefaultProps,
  onMouseMove: e => {},
  onMouseUp: e => {},
  onMouseDown: e => {},
  onMouseEnter: area => {},
  onMouseLeave: area => {},
  onKeyUp: (area, event) => {},
  onKeyDown: (area, event) => {},
  onSizeChange: (area, event) => {},
};

function fallback(...vals) {
  let func = a => Number(a);
  if (typeof vals[vals.length - 1] === 'function') {
    func = vals.pop();
  }

  for (let v of vals) {
    if (typeof v !== 'undefined') {
      return func(v);
    }
  }
}

function toLibuiColor(color) {
  return new libui.Color(
    color.red() / 255,
    color.green() / 255,
    color.blue() / 255,
    color.alpha()
  );
}

function createBrush(color, alpha) {
  const brush = new libui.DrawBrush();
  brush.color = toLibuiColor(color);
  brush.color.alpha = brush.color.alpha * alpha;
  brush.type = libui.brushType.solid;

  return brush;
}

class AreaComponent {
  constructor(root, props) {
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = {};
  }

  setDefaults(props) {
    for (let prop in this.constructor.defaultProps) {
      if (!(prop in props) || typeof props[prop] === 'undefined') {
        // children can exist, but be undefined
        this.props[prop] = this.constructor.defaultProps[prop];
      }
    }
    PropTypes.checkPropTypes(
      this.constructor.propTypes,
      this.props,
      'prop',
      this.constructor.name
    );
  }

  getArea() {
    return this.parent.getArea();
  }

  update(oldProps, newProps) {
    this.props = { ...this.props, ...newProps };
    if (this.parent) this.getArea().queueRedrawAll();
  }

  getWidth(p) {
    return this.props.width ? this.parseParent(this.props.width, p) : 0;
  }

  getHeight(p) {
    return this.props.width ? this.parseParent(this.props.height, p, true) : 0;
  }

  // parse numbers (especially percentages with respect to the parent)
  parseParent(val, p, y = false) {
    if (typeof val === 'string') {
      let num = Number(val);
      if (num == val) {
        return num;
      } else if (val.slice(-1) == '%') {
        let num = Number(val.slice(0, -1));
        return num / 100 * (y ? p.getAreaHeight() : p.getAreaWidth());
      }
    } else if (typeof val === 'number') {
      return val;
    }
  }

  // parse numbers (especially percentages with respect to itself)
  parseSelf(val, p, y = false) {
    if (typeof val === 'string') {
      let num = Number(val);
      if (num == val) {
        return num;
      } else if (val.slice(-1) == '%') {
        let num = Number(val.slice(0, -1));
        return num / 100 * (y ? this.getHeight(p) : this.getWidth(p));
      }
    } else if (typeof val === 'number') {
      return val;
    }
  }

  // translates coordinates relative to this component into the area coordinate system
  selfToParent(xx, yy, p) {
    // get top left corner
    let x = 0;
    let y = 0;
    if (this.props.x) {
      x = this.parseParent(this.props.x, p);
    } else if (this.props.x1 && this.props.x2) {
      const realX1 = this.parseParent(this.props.x1, p);
      const realX2 = this.parseParent(this.props.x2, p);
      x = realX1 < realX2 ? realX1 : realX2;
    }
    if (this.props.y) {
      y = this.parseParent(this.props.y, p, true);
    } else if (this.props.y1 && this.props.y2) {
      const realY1 = this.parseParent(this.props.y1, p, true);
      const realY2 = this.parseParent(this.props.y2, p, true);
      y = realY1 < realY2 ? realY1 : realY2;
    }

    return {
      x: x + this.parseSelf(xx, p),
      y: y + this.parseSelf(yy, p, true),
    };
  }

  applyTransforms(p) {
    p.getContext().save();

    const mat = new libui.UiDrawMatrix();
    mat.setIdentity();

    for (const transform of this.props.transform.match(/\w+\([^)]+\)/g)) {
      // rotate(deg [,x, y])
      // default x: 50%, y: 50%
      const rotate = transform.match(
        /rotate\s*\(\s*([-0-9.]+)(?:\s*,\s*([-0-9.%]+)\s*,\s*([-0-9.%]+))?\s*\)/
      );
      if (rotate) {
        const xy = this.selfToParent(
          fallback(rotate[2], '50%', v => v),
          fallback(rotate[3], '50%', v => v),
          p
        );
        const rad = Number(rotate[1]) * (Math.PI / 180);
        mat.rotate(xy.x, xy.y, rad);
      }

      // translate(x [y])
      // default y: x
      const translate = transform.match(
        /translate\s*\(\s*([-0-9.%]+)(?:\s*,\s*([-0-9.%]+))?\s*\)/
      );
      if (translate) {
        mat.translate(
          this.parseSelf(translate[1], p),
          fallback(translate[2], translate[1], v => this.parseSelf(v, p, true))
        );
      }

      // 1: scale(x)
      // 2: scale(x, y)
      // 3: scale(x, xCenter, yCenter)
      // 4: scale(x, y, xCenter, yCenter)
      // default y: x, xCenter=yCenter: 50%
      const scale = transform.match(
        /scale\s*\(([-0-9.]+)(?:(?:\s*,\s*([-0-9.]+))?(?:\s*,\s*([-0-9.%]+)\s*,\s*([-0-9.%]+))?)?\)/
      );
      if (scale) {
        const xy = this.selfToParent(
          fallback(scale[3], '50%', v => v),
          fallback(scale[4], '50%', v => v),
          p
        );
        if (process.platform === 'win32') {
          mat.scale(xy.x, xy.y, Number(scale[1]), fallback(scale[2], scale[1]));
        } else {
          // https://github.com/andlabs/libui/issues/331:
          mat.translate(xy.x, xy.y);
          mat.scale(0, 0, Number(scale[1]), fallback(scale[2], scale[1]));
          mat.translate(-xy.x, -xy.y);
        }
      }

      // skew(a, b [,x, y])
      // a, b: x/y angle
      // default x=y: 50%
      const skew = transform.match(
        /skew\s*\(\s*([-0-9.]+)\s*,\s*([-0-9.]+)(?:,\s*([-0-9.%]+),\s*([-0-9.%]+))?\)/
      );
      if (skew) {
        const rad1 = Number(skew[1]) * (Math.PI / 180);
        const rad2 = Number(skew[2]) * (Math.PI / 180);
        mat.skew(
          fallback(skew[2], '50%', v => this.parseSelf(v, p)),
          fallback(skew[3], '50%', v => this.parseSelf(v, p, true)),
          rad1,
          rad2
        );
      }

      // matrix(a, b, c, d, e, f, g)
      const matrix = transform.match(
        /matrix\s*\(\s*([-0-9.]+)\s*,\s*([-0-9.]+)\s*,\s*([-0-9.]+)\s*,\s*([-0-9.]+)\s*,\s*([-0-9.]+)\s*,\s*([-0-9.]+)\s*\)/
      );
      if (matrix) {
        mat.setM11(matrix[1]);
        mat.setM12(matrix[2]);
        mat.setM21(matrix[3]);
        mat.setM22(matrix[4]);
        mat.setM31(matrix[5]);
        mat.setM32(matrix[6]);
      }
    }

    p.getContext().transform(mat);
  }

  render(parent, area, p, props) {
    this.parent = parent;
    const { children, ...appendProps } = this.props;
    props = { ...props, ...appendProps };

    if (this.props.transform) {
      this.applyTransforms(p);
    }

    const path = this.draw(area, p, props);

    if (path) {
      const fillBrush =
        props.fill &&
        props.fill != 'none' &&
        createBrush(Color(props.fill), Number(props.fillOpacity));
      const strokeBrush =
        props.stroke &&
        props.stroke != 'none' &&
        createBrush(Color(props.stroke), Number(props.strokeOpacity));

      if (strokeBrush) {
        const sp = new libui.DrawStrokeParams();

        switch (props.strokeLinecap) {
          case 'flat':
            sp.cap = libui.lineCap.flat;
            break;
          case 'round':
            sp.cap = libui.lineCap.round;
            break;
          case 'square':
            sp.cap = libui.lineCap.square;
            break;
        }

        switch (props.strokeLinejoin) {
          case 'miter':
            sp.join = libui.lineJoin.miter;
            break;
          case 'round':
            sp.join = libui.lineJoin.round;
            break;
          case 'bevel':
            sp.join = libui.lineJoin.bevel;
            break;
        }

        sp.thickness = Number(props.strokeWidth);
        sp.miterLimit = Number(props.strokeMiterlimit);

        p.getContext().stroke(path, strokeBrush, sp);

        sp.free();
        strokeBrush.free();
      }

      if (fillBrush) {
        p.getContext().fill(path, fillBrush);
        fillBrush.free();
      }

      path.freePath();
    }

    if (this.props.transform) {
      p.getContext().restore();
    }
  }

  draw(area, p) {}
}

const AreaComponentPropTypes = {
  transform: PropTypes.string,
  fill: PropTypes.string,
  fillOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stroke: PropTypes.string,
  strokeOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeLinecap: PropTypes.oneOf(['flat', 'round', 'square']),
  strokeLinejoin: PropTypes.oneOf(['miter', 'round', 'bevel']),
  strokeMiterlimit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const AreaComponentDefaultProps = {
  fillOpacity: 1,
  strokeOpacity: 1,
  strokeWidth: 1,
  strokeMiterlimit: 10,
  strokeLinecap: 'flat',
  strokeLinejoin: 'miter',
};

Area.Group = class AreaGroup extends AreaComponent {
  constructor(root, props) {
    super(root, props);
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  draw(area, p, props) {
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'object') {
        this.children[i].render(this, area, p, props);
      }
    }
  }
};

Area.Group.propTypes = {
  ...AreaComponentPropTypes,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Area.Rectangle = class Rectangle extends AreaComponent {
  getWidth(p) {
    return this.parseParent(this.props.width, p);
  }

  getHeight(p) {
    return this.parseParent(this.props.height, p, true);
  }

  draw(area, p) {
    const path = new libui.UiDrawPath(libui.fillMode.winding);
    path.addRectangle(
      this.parseParent(this.props.x, p),
      this.parseParent(this.props.y, p, true),
      this.parseParent(this.props.width, p),
      this.parseParent(this.props.height, p, true)
    );
    path.end();
    return path;
  }
};

Area.Rectangle.propTypes = {
  ...AreaComponentPropTypes,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Area.Line = class Line extends AreaComponent {
  getWidth(p) {
    return Math.abs(
      this.parseParent(this.props.x2, p) - this.parseParent(this.props.x1, p)
    );
  }

  getHeight(p) {
    return Math.abs(
      this.parseParent(this.props.y2, p, true) -
        this.parseParent(this.props.y1, p, true)
    );
  }

  draw(area, p) {
    const path = new libui.UiDrawPath(libui.fillMode.winding);
    path.newFigure(
      this.parseParent(this.props.x1, p),
      this.parseParent(this.props.y1, p, true)
    );
    path.lineTo(
      this.parseParent(this.props.x2, p),
      this.parseParent(this.props.y2, p, true)
    );
    path.end();

    return path;
  }
};

Area.Line.propTypes = {
  ...AreaComponentPropTypes,
  x1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  x2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Area.Arc = class Arc extends AreaComponent {
  getWidth(p) {
    return 2 * this.parseParent(this.props.r, p);
  }

  getHeight(p) {
    return getWidth(p);
  }

  draw(area, p) {
    const path = new libui.UiDrawPath(libui.fillMode.winding);
    path.newFigureWithArc(
      this.parseParent(this.props.x, p),
      this.parseParent(this.props.y, p, true),
      this.parseParent(this.props.r, p),
      Number(this.props.start) * (Math.PI / 180),
      Number(this.props.sweep) * (Math.PI / 180),
      false
    );
    path.end();
    return path;
  }
};

Area.Arc.propTypes = {
  ...AreaComponentPropTypes,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  r: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sweep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Area.Arc.defaultProps = {
  ...AreaComponentDefaultProps,
  start: 0,
};

Area.Circle = class Circle extends AreaComponent {
  getWidth(p) {
    return 2 * this.parseParent(this.props.r, p);
  }

  getHeight(p) {
    return getWidth(p);
  }

  draw(area, p) {
    const path = new libui.UiDrawPath(libui.fillMode.winding);
    path.newFigureWithArc(
      this.parseParent(this.props.x, p),
      this.parseParent(this.props.y, p, true),
      this.parseParent(this.props.r, p),
      0,
      2 * Math.PI,
      false
    );
    path.end();
    return path;
  }
};

Area.Circle.propTypes = {
  ...AreaComponentPropTypes,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  r: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Area.Circle.defaultProps = {
  ...AreaComponentDefaultProps,
};

Area.Bezier = class Bezier extends AreaComponent {
  draw(area, p) {
    const path = new libui.UiDrawPath(libui.fillMode.winding);
    path.newFigure(
      this.parseParent(this.props.x1, p),
      this.parseParent(this.props.y1, p, true)
    );
    path.bezierTo(
      this.parseParent(this.props.cx1, p),
      this.parseParent(this.props.cy1, p, true),
      this.parseParent(this.props.cx2, p),
      this.parseParent(this.props.cy2, p, true),
      this.parseParent(this.props.x2, p),
      this.parseParent(this.props.y2, p, true)
    );
    path.end();

    return path;
  }
};

Area.Bezier.propTypes = {
  ...AreaComponentPropTypes,
  x1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cx1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cy1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  x2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cx2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cy2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Area.Path = class Path extends AreaComponent {
  draw(area, p) {
    const path = new libui.UiDrawPath(
      this.props.fillRule === 'evenodd'
        ? libui.fillMode.alternate
        : libui.fillMode.winding
    );
    const commands = parseSVG(this.props.d);
    parseSVG.makeAbsolute(commands);

    for (let i = 0; i < commands.length; i++) {
      const c = commands[i];
      switch (c.command) {
        case 'moveto':
          path.newFigure(c.x, c.y);
          break;

        case 'lineto':
        case 'horizontal lineto':
        case 'vertical lineto':
          path.lineTo(c.x, c.y);
          break;

        case 'curveto':
          path.bezierTo(c.x1, c.y1, c.x2, c.y2, c.x, c.y);
          break;

        case 'smooth curveto':
          //uses point from previous curve
          const x1 = c.x0 - (commands[i - 1].x2 - c.x0);
          const y1 = c.y0 - (commands[i - 1].y2 - c.y0);
          path.bezierTo(x1, y1, c.x2, c.y2, c.x, c.y);
          break;

        case 'closepath':
          path.closeFigure();
          break;

        default:
          // 'quadratic curveto', 'elliptical arc'
          throw new Error(
            'Not implemented in Area.Path - ' + c.code + ': ' + c.command
          );
      }
    }

    path.end();

    return path;
  }
};

Area.Path.propTypes = {
  ...AreaComponentPropTypes,
  d: PropTypes.string.isRequired,
  fillRule: PropTypes.oneOf(['nonzero', 'evenodd']),
};

Area.Path.defaultProps = {
  fillRule: 'nonzero',
};

Area.Text = class AreaText extends AreaComponent {
  constructor(root, props) {
    super(root, props);
    this.children = [];

    this.str = new libui.AttributedString('');
  }

  appendChild(child) {
    this.children.push(child);
  }

  appendText(t, ...attr) {
    if (this.parent instanceof AreaText) {
      this.parent.appendText(t, ...attr);
    } else {
      if (attr) {
        this.str.appendAttributed(t, ...attr);
      } else {
        this.str.appendUnattributed(t);
      }
    }
  }

  render(parent, area, p, props, parentStyle = {}) {
    this.parent = parent;
    let style = { ...parentStyle, ...this.props.style };

    this.str.free();
    this.str = new libui.AttributedString('');

    const attrs = Object.keys(style)
      .map(k => {
        const v = style[k];
        switch (k) {
          case 'color':
            const color = Color(v);
            return libui.FontAttribute.newColor(toLibuiColor(Color(v)));
          case 'fontSize':
            return libui.FontAttribute.newSize(Number(v));
          case 'fontFamily':
            return libui.FontAttribute.newFamily(v);
          case 'backgroundColor':
            return libui.FontAttribute.newBackgroundColor(
              toLibuiColor(Color(v))
            );
          case 'fontStyle':
            if (v in libui.textItalic) {
              return libui.FontAttribute.newItalic(libui.textItalic[v]);
            }
            break;
          case 'fontWeight':
            if (typeof v === 'string' && v in libui.textWeight) {
              return libui.FontAttribute.newWeight(libui.textWeight[v]);
            } else if (
              Number(v) >= libui.textWeight.minimum &&
              Number(v) <= libui.textWeight.maximum
            ) {
              return libui.FontAttribute.newWeight(Number(v));
            }
            break;
          case 'textStretch':
            if (v in libui.textStretch) {
              return libui.FontAttribute.newStretch(libui.textStretch[v]);
            }
            break;
          case 'textUnderline':
            if (v in libui.textUnderline) {
              return libui.FontAttribute.newUnderline(libui.textUnderline[v]);
            }
            break;
          case 'textUnderlineColor':
            if (v !== 'custom' && v in libui.textUnderlineColor) {
              return libui.FontAttribute.newUnderlineColor(
                libui.textUnderlineColor[v]
              );
            } else {
              return libui.FontAttribute.newUnderlineColor(
                libui.textUnderlineColor[v],
                toLibuiColor(Color(v))
              );
            }
        }
      })
      .filter(x => x);

    this.children.forEach(v => {
      if (typeof v === 'string') {
        this.appendText(v, ...attrs);
      } else {
        v.render(this, area, p, props, style);
      }
    });

    if (!(this.parent instanceof AreaText)) {
      let textAlign;
      switch (style.textAlign || 'left') {
        case 'left':
          textAlign = libui.textAlign.left;
          break;
        case 'center':
          textAlign = libui.textAlign.center;
          break;
        case 'right':
          textAlign = libui.textAlign.right;
          break;
      }

      const font = new libui.FontDescriptor(
        'Arial',
        12,
        libui.textWeight.normal,
        libui.textItalic.normal,
        libui.textStretch.normal
      );

      const layout = new libui.DrawTextLayout(
        this.str,
        font,
        p.getAreaWidth() - this.parseParent(this.props.x, p, false),
        textAlign
      );

      if (this.props.transform) {
        this.applyTransforms(p);
      }

      p
        .getContext()
        .text(
          this.parseParent(this.props.x, p, false),
          this.parseParent(this.props.y, p, true),
          layout
        );

      font.free();
      layout.free();

      if (this.props.transform) {
        p.getContext().restore();
      }
    }
  }
};

function areaProp(props, propName, componentName) {
  const v = props[propName];
  if (
    !(typeof v === 'string' || v.type === 'AREATEXT' || v.type === StyledText)
  ) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Has to be a string or an Area.Text component.'
    );
  }
}

Area.Text.propTypes = {
  children: PropTypes.oneOfType([areaProp, PropTypes.arrayOf(areaProp)]),
  x: PropTypes.number,
  y: PropTypes.number,
};

Area.Text.defaultProps = {
  x: 0,
  y: 0,
};

export default Area;
