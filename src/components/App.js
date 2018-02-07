import DesktopComponent, {universalPropTypes, universalDefaultProps} from './DesktopComponent';;

class App extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
  }

  render() {
    console.log('App render');
    this.renderChildNode();
  }
}

export default App;
