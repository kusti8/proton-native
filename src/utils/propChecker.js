import PropTypes from 'prop-types';

function propChecker(props, propTypes, defaultProps, name) {
  for (let prop in defaultProps) {
    if (!(prop in props) || typeof props[prop] === 'undefined') {
      props[prop] = defaultProps[prop];
    }
  }
  PropTypes.checkPropTypes(propTypes, props, 'prop', name);
  return props;
}

export default propChecker;
