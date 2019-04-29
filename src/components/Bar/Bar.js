import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './Bar.module.scss';


class Bar extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  };

  static defaultProps = {
    value: 0,
    height: 100,
    width: 15
  };

  render() {
    const barStyle = {
      height: this.props.height + "px",
      width: this.props.width + "px",
    };
    const valueStyle = {
      height: this.props.value + "%"
    };
    return (
      <div className={cx(s.bar, this.props.className, "vertical-bar")} style={barStyle}>
        <div className={s.barValue} style={valueStyle}/>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Bar);
