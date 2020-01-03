declare module "react-proxy" {
  interface ReactProxyComponent {
    update(Component: React.ComponentType): void;
    get(): React.ComponentType;
  }
  export default function createProxy(
    Component: React.ComponentType
  ): ReactProxyComponent;
}
