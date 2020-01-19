import * as PropTypes from "prop-types";
import * as _ from "lodash";

function propChecker(
  props: any,
  propTypes: any,
  defaultProps: any,
  name: string
): any {
  // for (let prop in defaultProps) {
  //   if (!(prop in props) || typeof props[prop] === 'undefined') {
  //     props[prop] = defaultProps[prop];
  //   }
  // }
  props = _.merge(defaultProps, props);
  PropTypes.checkPropTypes(propTypes, props, "prop", name);
  return props;
}

export default propChecker;
