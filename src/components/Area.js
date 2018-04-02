import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import { Component } from 'react';
import libui from 'libui-node';
import PropTypes from 'prop-types';

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
      /*this.props.onMouseMove || */
      (area, event) => {
        // console.log(area, event);
      },
      (area, inOut) => {
        // if(inOut === 0)
        //   console.log("enter: ", area); // this.props.onMouseEnter
        // else
        //   console.log("leave: ", area); // this.props.onMouseLeave
      },
      function dragBroken() {},
      /*this.props.onKeyPress || */
      (area, event) => {
        // console.log(area, event);
      }
    );
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
  }
}

Area.PropTypes = {
  ...universalPropTypes,
  // onMouseMove: PropTypes.func,
  // onMouseEnter: PropTypes.func,
  // onMouseLeave: PropTypes.func,
  // onKeyPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

Area.defaultProps = {
  ...universalDefaultProps,
  // onMouseMove: (area, event) => {},
  // onMouseEnter: (area) => {},
  // onMouseLeave: (area) => {},
  // onKeyPress: (area, event) => {}
};

function buildSolidBrush(color, alpha) {
  let component;

  component = (color >> 16) & 0xff;
  const R = component / 255;
  component = (color >> 8) & 0xff;
  const G = component / 255;
  component = color & 0xff;
  const B = component / 255;
  const A = alpha;

  const uiDrawBrushTypeSolid = 0;
  const brush = new libui.DrawBrush();
  brush.color = new libui.Color(R, G, B, A);
  brush.type = uiDrawBrushTypeSolid;

  return brush;
}

function fallback(...vals) {
  let func = a => a;
  if (typeof vals[vals.length - 1] === 'function') {
    func = vals.pop();
  }

  for (let v of vals) {
    if (typeof v !== 'undefined') {
      return func(v);
    }
  }
}

// parse x, y, width, height into this.*
// as numbers, remove percent

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
    this.updateDims();
    if (this.parent) this.parent.element.queueRedrawAll();
  }

  updateDims() {}

  parseDim(val, y = false) {
    if (typeof val === 'string') {
      let num = Number(val);
      if (num == val) {
        return num;
      } else if (val.slice(-1) == '%') {
        let num = Number(val.slice(0, -1));
        return (
          num /
          100 *
          (y
            ? fallback(this.props.height, this.height, a => Number(a))
            : fallback(this.props.width, this.width, a => Number(a)))
        );
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

      console.log(fallback(this.props.width, this.width));

      //rotate(deg [x y]) x: 0, y: 0
      const rotate = this.props.transform.match(
        /rotate\s*\(\s*([0-9.]+)(?:\s*|\s+([0-9.%]+)\s+([0-9.%]+))?\s*\)/
      );
      if (rotate) {
        const rad = rotate[1] * (Math.PI / 180);
        // console.log(rotate[2], this.parseDim(rotate[2]))
        matrix.rotate(Number(rotate[2]) || 0, Number(rotate[3]) || 0, rad);
      }

      //translate(x [y]) y: x
      const translate = this.props.transform.match(
        /translate\s*\(\s*([0-9.%]+)(?:\s+([0-9.%]+))?\s*\)/
      );
      if (translate) {
        matrix.translate(
          Number(translate[1]),
          fallback(translate[2], translate[1], v => Number(v))
        );
      }

      //scale(x [y [xCenter yCenter]]) y: x, xCenter=yCenter: 50%
      // how to set center?
      const scale = this.props.transform.match(
        /scale\s*\(\s*([0-9.]+)(?:\s+([0-9.]+)?(?:\s+([0-9.]+)\s+([0-9.]+))?)?\s*\)/
      );
      if (scale) {
        matrix.scale(
          this.width,
          0,
          Number(scale[1]),
          fallback(scale[2], scale[1], v => Number(v))
        );
      }

      p.getContext().transform(matrix);
    }

    this.draw(area, p);

    if (this.props.transform) {
      p.getContext().restore();
    }
  }

  draw(area, p) {}
}

const AreaComponentProps = {
  transform: PropTypes.string,
  color: PropTypes.string,
};

function parseCoord(val, p, y = false) {
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

Area.Rectangle = class Rectangle extends AreaComponent {
  constructor(root, props) {
    super(root, props);
  }

  draw(area, p) {
    var brush = buildSolidBrush(Number(this.props.color), 1.0);
    var path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
    path.addRectangle(
      parseCoord(this.props.x, p),
      parseCoord(this.props.y, p, true),
      parseCoord(this.props.width, p),
      parseCoord(this.props.height, p, true)
    );
    path.end();
    p.getContext().fill(path, brush);
    path.freePath();
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

  updateDims() {
    this.width = Math.abs(this.props.x2 - this.props.x1);
    this.height = Math.abs(this.props.y2 - this.props.y1);
  }

  render(parent, area, p) {
    super.render(parent, area, p);

    var brush = buildSolidBrush(Number(this.props.color), 1.0);
    var path = new libui.UiDrawPath(0 /*uiDrawFillModeWinding*/);
    path.newFigure(
      parseCoord(this.props.x1, p),
      parseCoord(this.props.y1, p, true)
    );
    path.lineTo(
      parseCoord(this.props.x2, p),
      parseCoord(this.props.y2, p, true)
    );
    path.end();

    const sp = new libui.DrawStrokeParams();

    // Make a stroke for both the axes and the histogram line
    sp.cap = 0;
    sp.join = 0;
    sp.thickness = 2;
    sp.miterLimit = 10.0;

    p.getContext().stroke(path, brush, sp);
    path.freePath();
  }
};

Area.Line.propTypes = {
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

export default Area;
