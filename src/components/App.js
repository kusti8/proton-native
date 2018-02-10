import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';

class App extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = {};
  }

  render() {
    this.renderChildNode(this);
  }
}

export default App;
