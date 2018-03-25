import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';
import yoga, { Node } from 'yoga-layout';
import * as styleConverter from '../utils/styleToYoga';
import { Wind } from './';

console.log(Node.create().getHeight());

class View extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.node = Node.create();
    console.log(Node.create().getHeight());
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiFixed();
    this.initialProps(this.props);
  }

  updateNodeSize() {
    let size;
    if (this.parent instanceof Wind) {
      size = this.parent.element.contentSize;
    } else {
      size = libui.Ui.size(this.parent.element);
    }
    this.width = size.w;
    this.height = size.h;
    console.log(size);
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

  addAllChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].node = Node.createDefault();
      const size = libui.Ui.size(this.children[i].element);
      this.children[i].height = size.h;
      this.children[i].width = size.w;
      this.children[i].convertStyle();
      console.log(size);
      this.children[i].node.setWidth(size.w);
      this.children[i].node.setHeight(size.h);
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
      console.log(this.node);
      this.node.calculateLayout();
    }
  }

  positionChildren() {
    let self = this.node.getComputedLayout(); // set ourself width and height
    console.log(self.left);
    libui.Ui.setSize(this.element, self.width, self.height); // if our parent is a View, it sets our position and size, else we can only set our size anyway
    for (let i = 0; i < this.children.length; i += 1) {
      // go through each of our children and size them
      let layout = this.children[i].node.getComputedLayout();
      this.element.append(this.children[i].element, layout.left, layout.top);
      libui.Ui.setSize(this.children[i].element, layout.width, layout.height);
    }
  }

  render(parent) {
    this.parent = parent;
    for (let i = 0; i < this.children.length; i += 1) {
      if (this.children[i].node) {
        this.node.removeChild(this.children[i].node);
      }
    }
    this.node.reset(); // reset all properties in case they changed
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
