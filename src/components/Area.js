import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import { Component } from 'react';
import libui from 'libui-node';
import PropTypes from 'prop-types';
import Color from 'color';
import parseSVG from 'svg-path-parser';

class Area extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);

    this.element = new libui.UiArea(
      (area, p) => {
        for (let i = 0; i < this.children.length; i += 1) {
          if (typeof this.children[i] === 'object') {
            this.children[i].render(this, area, p);
          }
        }
      },
      this.props.onMouseMove,
      (area, inOut) => {
        if (inOut === 0) {
          this.props.onMouseEnter(area);
        } else {
          this.props.onMouseLeave(area);
        }
      },
      function dragBroken() {},
      (area, event) => {
        if (event.getUp()) {
          this.props.onKeyUp(area, event);
        } else {
          this.props.onKeyDown(area, event);
        }
      }
    );
  }

  // to prevent TypeError: Cannot read property 'undefined' of undefined
  // because onMouseMove, ... shouldn't be handled by DesktopComponent
  update(oldProps, newProps) {}

  render(parent) {
    this.addParent(parent);
  }
}

Area.PropTypes = {
  ...universalPropTypes,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Area.defaultProps = {
  ...universalDefaultProps,
  onMouseMove: (area, event) => {},
  onMouseEnter: area => {},
  onMouseLeave: area => {},
  onKeyUp: (area, event) => {},
  onKeyDown: (area, event) => {},
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

function createBrush(color, alpha) {
  const brush = new libui.DrawBrush();
  brush.color = new libui.Color(
    color.red() / 255,
    color.green() / 255,
    color.blue() / 255,
    color.alpha() * alpha
  );
  brush.type = 0 /*uiDrawBrushTypeSolid*/;

  return brush;
}

class AreaComponent {
  constructor(root, props) {
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
  }

  setDefaults(props) {
    for (let prop in this.constructor.defaultProps) {
      if (!(prop in props) || typeof props[prop] === 'undefined') {
        // children can exist, but be undefined
        this.props[prop] = this.constructor.defaultProps[prop];
      }
    }
    PropTypes.checkPropTypes(
      this.constructor.PropTypes,
      this.props,
      'prop',
      this.constructor.name
    );
  }

  update(oldProps, newProps) {
    this.props = { ...this.props, ...newProps };
    if (this.parent) this.parent.element.queueRedrawAll();
  }

  getWidth(p) {
    return 0;
  }

  getHeight(p) {
    return 0;
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

  render(parent, area, p) {
    this.parent = parent;
    if (this.props.transform) {
      p.getContext().save();

      const mat = new libui.UiDrawMatrix();
      mat.setIdentity();

      // rotate(deg [,x, y])
      // default x: 0, y: 0
      const rotate = this.props.transform.match(
        /rotate\s*\(\s*([-0-9.]+)(?:\s*,\s*([-0-9.%]+)\s*,\s*([-0-9.%]+))?\s*\)/
      );
      if (rotate) {
        const xy = this.selfToParent(
          fallback(rotate[2], 0, v => v),
          fallback(rotate[3], 0, v => v),
          p
        );
        const rad = Number(rotate[1]) * (Math.PI / 180);
        mat.rotate(xy.x, xy.y, rad);
      }

      // translate(x [y])
      // default y: x
      const translate = this.props.transform.match(
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
      const scale = this.props.transform.match(
        /scale\s*\(([-0-9.]+)(?:(?:\s*,\s*([-0-9.]+))?(?:\s*,\s*([-0-9.%]+)\s*,\s*([-0-9.%]+))?)?\)/
      );
      if (scale) {
        mat.scale(
          fallback(scale[3], '50%', v => this.parseParent(v, p)),
          fallback(scale[4], '50%', v => this.parseParent(v, p, true)),
          scale[1],
          fallback(scale[2], scale[1])
        );
      }

      // skew(a, b [,x, y])
      // a, b: x/y angle
      // default x=y: 50%
      const skew = this.props.transform.match(
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
      const matrix = this.props.transform.match(
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

      p.getContext().transform(mat);
    }

    const path = this.draw(area, p);

    const fillBrush =
      this.props.fill &&
      createBrush(Color(this.props.fill), Number(this.props.fillOpacity));
    const strokeBrush =
      this.props.stroke &&
      createBrush(Color(this.props.stroke), Number(this.props.strokeOpacity));

    // console.log("render", this.props.strokeWidth);

    if (strokeBrush) {
      const sp = new libui.DrawStrokeParams();

      switch (this.props.strokeLinecap) {
        case 'flat':
          sp.cap = 0;
          break;
        case 'round':
          sp.cap = 1;
          break;
        case 'square':
          sp.cap = 2;
          break;
      }

      switch (this.props.strokeLinejoin) {
        case 'miter':
          sp.join = 0;
          break;
        case 'round':
          sp.join = 1;
          break;
        case 'bevel':
          sp.join = 2;
          break;
      }

      sp.thickness = Number(this.props.strokeWidth);
      sp.miterLimit = Number(this.props.strokeMiterlimit);

      // console.log(sp.join, sp.cap, sp.thickness, sp.miterLimit)
      p.getContext().stroke(path, strokeBrush, sp);

      //sp.free();
      //strokBrush.free();
    }

    if (fillBrush) {
      p.getContext().fill(path, fillBrush);
      //fillBrush.free();
    }

    path.freePath();

    if (this.props.transform) {
      p.getContext().restore();
    }
  }

  draw(area, p) {}
}

const AreaComponentProps = {
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

Area.Rectangle = class Rectangle extends AreaComponent {
  constructor(root, props) {
    super(root, props);
  }

  getWidth(p) {
    return this.parseParent(this.props.width, p);
  }

  getHeight(p) {
    return this.parseParent(this.props.height, p, true);
  }

  draw(area, p) {
    const path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
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

Area.Rectangle.PropTypes = {
  ...AreaComponentProps,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Area.Rectangle.defaultProps = {
  ...AreaComponentDefaultProps,
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
    const path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
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

Area.Line.PropTypes = {
  ...AreaComponentProps,
  x1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  x2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Area.Line.defaultProps = {
  ...AreaComponentDefaultProps,
};

Area.Arc = class Arc extends AreaComponent {
  getWidth(p) {
    return 2 * this.parseParent(this.props.r, p);
  }

  getHeight(p) {
    return getWidth(p);
  }

  draw(area, p) {
    const path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
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

Area.Arc.PropTypes = {
  ...AreaComponentProps,
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

Area.Bezier = class Bezier extends AreaComponent {
  draw(area, p) {
    const path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
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

Area.Bezier.PropTypes = {
  ...AreaComponentProps,
  x1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cx1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cy1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  x2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cx2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cy2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Area.Bezier.defaultProps = {
  ...AreaComponentDefaultProps,
};

Area.Path = class Path extends AreaComponent {
  getWidth(p) {
    return this.parseParent(fallback(this.props.height, 0), p, true);
  }

  getHeight(p) {
    return this.parseParent(fallback(this.props.height, 0), p, true);
  }

  draw(area, p) {
    const path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
    const commands = parseSVG(this.props.d);
    parseSVG.makeAbsolute(commands);

    for (let i = 0; i < commands.length; i++) {
      const c = commands[i];
      switch (c.command) {
        case 'moveto':
          path.newFigure(c.x, c.y);
          break;

        case 'quadratic curveto':
          console.log("Quadratic Beziers aren't implemented!");
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
          console.log('Not implemented in Path:', c);
      }
    }

    path.end();

    return path;
  }
};

Area.Path.PropTypes = {
  ...AreaComponentProps,
  d: PropTypes.string.isRequired,
};

Area.Path.defaultProps = {
  ...AreaComponentDefaultProps,
};

export default Area;
