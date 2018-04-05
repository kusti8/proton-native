import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import { Component } from 'react';
import libui from 'libui-node';
import PropTypes from 'prop-types';
import Color from 'color';

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
    this.initialProps(this.props);
  }

  // ?? to prevent TypeError: Cannot read property 'undefined' of undefined
  // because onMouseMove, ... shouldn't be handled by DesktopComponent
  initialProps(props) {}
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

function buildSolidBrush(c) {
  const uiDrawBrushTypeSolid = 0;
  const brush = new libui.DrawBrush();
  brush.color = new libui.Color(
    c.red() / 255,
    c.green() / 255,
    c.blue() / 255,
    c.alpha()
  );
  brush.type = uiDrawBrushTypeSolid;

  return brush;
}

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
    this.props = { ...newProps };
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

  render(parent, area, p) {
    this.parent = parent;
    if (this.props.transform) {
      p.getContext().save();
      const matrix = new libui.UiDrawMatrix();
      matrix.setIdentity();

      // rotate(deg [x y])
      // default x: 0, y: 0
      const rotate = this.props.transform.match(
        /rotate\s*\(\s*([-0-9.]+)(?:\s*|\s+([-0-9.%]+)\s+([-0-9.%]+))?\s*\)/
      );
      if (rotate) {
        // console.log(rotate[1], this.parseSelf(rotate[2], p), this.parseSelf(rotate[3], p, true))
        const rad = rotate[1] * (Math.PI / 180);
        matrix.rotate(
          this.parseSelf(rotate[2], p) || 0,
          this.parseSelf(rotate[3], p, true) || 0,
          rad
        );
      }

      // translate(x [y])
      // default y: x
      const translate = this.props.transform.match(
        /translate\s*\(\s*([-0-9.%]+)(?:\s+([-0-9.%]+))?\s*\)/
      );
      if (translate) {
        matrix.translate(
          this.parseSelf(translate[1], p),
          fallback(translate[2], translate[1], v => this.parseSelf(v, p, true))
        );
      }

      // scale(x [y [xCenter yCenter]])
      // default y: x, xCenter=yCenter: 50%
      const scale = this.props.transform.match(
        /scale\s*\(\s*([-0-9.]+)(?:\s+([-0-9.]+)?(?:\s+([-0-9.%]+)\s+([-0-9.%]+))?)?\s*\)/
      );
      if (scale) {
        // console.log(
        //   fallback(scale[3], '50%', v => v),
        //   fallback(scale[4], '50%', v => v),
        //   scale[1],
        //   fallback(scale[2], scale[1])
        // );
        matrix.scale(
          fallback(scale[3], '50%', v => this.parseParent(v, p)),
          fallback(scale[4], '50%', v => this.parseParent(v, p, true)),
          scale[1],
          fallback(scale[2], scale[1])
        );
      }

      p.getContext().transform(matrix);
    }

    var brush = buildSolidBrush(Color(this.props.color));

    const sp = new libui.DrawStrokeParams();

    sp.cap = 0;
    sp.join = 0;
    sp.thickness = 2;
    sp.miterLimit = 10.0;

    const path = this.draw(area, p);
    p.getContext().stroke(path, brush, sp);
    path.freePath();

    if (this.props.transform) {
      p.getContext().restore();
    }
  }

  draw(area, p) {}
}

const AreaComponentProps = {
  transform: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
    var path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
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
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Area.Rectangle.defaultProps = {
  x: 0,
  y: 0,
};

Area.Line = class Line extends AreaComponent {
  constructor(root, props) {
    super(root, props);
  }

  getWidth(p) {
    return (
      this.parseParent(this.props.x2, p) - this.parseParent(this.props.x1, p)
    );
  }

  getHeight(p) {
    return (
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
  x1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  x2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Area.Line.defaultProps = {
  x1: 0,
  y1: 0,
};

Area.Arc = class Arc extends AreaComponent {
  constructor(root, props) {
    super(root, props);
  }

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
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  r: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sweep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Area.Bezier = class Bezier extends AreaComponent {
  constructor(root, props) {
    super(root, props);
  }

  draw(area, p) {
    var path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
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
  x1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cx1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cy1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  x2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cx2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cy2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Area;
