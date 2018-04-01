import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';
import yoga, { Node } from 'yoga-layout';
import * as styleConverter from '../utils/styleToYoga';
import { Wind, VerticalBox, HorizontalBox } from './';

class View extends DesktopComponent {
  notUsableComponents = [VerticalBox, HorizontalBox, View];

  constructor(root, props) {
    super(root, props);
    this.node = Node.create();
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiFixed();
    this.initialProps(this.props);
  }

  checkUsable(component) {
    for (let i = 0; i < this.notUsableComponents.length; i++) {
      if (component instanceof this.notUsableComponents[i]) {
        return false;
      }
    }
    return true;
  }

  updateNodeSize() {
    let size;
    if (this.parent instanceof Wind) {
      size = this.parent.element.contentSize;
    } else {
      size = libui.Ui.size(this.parent.element);
    }
    if (size.w == 0 || size.h == 0) {
      return;
    }
    this.width = size.w;
    this.height = size.h;
    this.node.setWidth(size.w);
    this.node.setHeight(size.h);
  }

  parseStyleFlexbox() {
    if (this.props.style) {
      Object.keys(this.props.style).map(key => {
        styleConverter[key](this.node, this.props.style[key]);
      });
    }
  }

  sizeChild(i) {
    const size = libui.Ui.size(this.children[i].element);
    this.children[i].height = size.h;
    this.children[i].width = size.w;
    if (!this.children[i].convertStyle()) {
      // we don't have a size
      if (!this.checkUsable(this.children[i])) {
        throw "You didn't specify a size for one of your View children";
      }
    }
    this.children[i].node.setWidth(this.children[i].width);
    this.children[i].node.setHeight(this.children[i].height);
  }

  addAllChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].node = Node.createDefault();
      this.sizeChild(i);
      this.node.insertChild(this.children[i].node, i);
    }
  }

  calcLayout() {
    let directionMap = {
      ltr: yoga.DIRECTION_LTR,
      rtl: yoga.DIRECTION_RTL,
      inherit: yoga.DIRECTION_INHERIT,
    };
    let direction;
    if (
      this.props.style &&
      'direction' in this.props.style &&
      this.props.style.direction in directionMap
    ) {
      direction = directionMap[this.props.style.direction];
    } else {
      direction = directionMap['ltr'];
    }
    if (this.parent instanceof View) {
      // our parent is a view, so already called calculateLayout
      this.parent.calcLayout();
    } else {
      this.node.calculateLayout();
    }
  }

  moveChildren() {
    let self = this.node.getComputedLayout(); // set ourself width and height
    for (let i = 0; i < this.children.length; i += 1) {
      // go through each of our children and size them
      let layout = this.children[i].node.getComputedLayout();
      this.element.move(this.children[i].element, layout.left, layout.top);
      libui.Ui.setSize(this.children[i].element, layout.width, layout.height);
    }
  }

  positionChildren() {
    let self = this.node.getComputedLayout(); // set ourself width and height
    for (let i = 0; i < this.children.length; i += 1) {
      // go through each of our children and size them
      let layout = this.children[i].node.getComputedLayout();
      this.element.append(this.children[i].element, layout.left, layout.top);
      libui.Ui.setSize(this.children[i].element, layout.width, layout.height);
    }
  }

  newSize() {
    // the component resized, so we recalculate layout
    if (!this.parent || this.sizing) {
      // we haven't rendered yet or we are already sizing
      return;
    }
    this.sizing = true;
    this.updateNodeSize();
    this.parseStyleFlexbox();
    for (let i = 0; i < this.children.length; i += 1) {
      if (this.children[i].node) {
        this.sizeChild(i);
      }
    }
    this.calcLayout();
    this.moveChildren();
    this.sizing = false;
  }

  update(oldProps, newProps) {
    // if we are a view, it calls newSize anyway, so we just set the props
    this.props = newProps;
  }

  render(parent) {
    this.parent = parent;
    for (let i = 0; i < this.children.length; i += 1) {
      if (this.children[i].node) {
        this.node.removeChild(this.children[i].node);
      }
    }
    this.addParent(parent);
    this.updateNodeSize(); // set the view default size
    this.parseStyleFlexbox(); // convert all styles
    this.addAllChildren(); // add nodes to children
    this.renderChildNode(this); // place the children and call their render
    this.calcLayout(); // calculate the layout (traverses to root node and calculates layout)
    this.positionChildren(); // position and size the children
  }
}

View.PropTypes = {
  ...universalPropTypes,
  style: PropTypes.object,
};

View.defaultProps = {
  ...universalDefaultProps,
  style: {},
};

export default View;
