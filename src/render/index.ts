//@ts-ignore
import * as deepForceUpdate from "react-deep-force-update";
import { connectDevtools } from "../devtools";
import DesktopRenderer from "../reconciler";
import { createElement } from "../utils/createElement";
import { hot } from "../misc/hot";
import * as ReactReconciler from "react-reconciler";

export let ROOT_NODE: any = {};

export let container: ReactReconciler.FiberRoot;

const AppRegistry = {
  registerComponent: (name: string, component: React.ComponentType) => {
    const newComponent =
      process.env.NODE_ENV === "production" ? component : hot(component);
    connectDevtools(DesktopRenderer);
    ROOT_NODE = createElement("ROOT", {});

    container = DesktopRenderer.createContainer(ROOT_NODE);
    DesktopRenderer.updateContainer(newComponent, container, null);
  },
  updateProxy: (app: any) => {
    if (container) {
      hot(app);
      //@ts-ignore
      container._reactInternalInstance = container.current;
      deepForceUpdate(container);
    }
  }
};

export default AppRegistry;
