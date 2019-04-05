import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './Input.module.scss';


class Input extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    addon: PropTypes.string
  };

  static defaultProps = {
    type: "text",
    value: "",
    addon: ""
  };

  render() {
    return (
      <div className={s.root}>
        <input className={s.input} type={this.props.type} defaultValue={this.props.value}/>
        <div className={s.addon}>
          {this.props.addon}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Input);
