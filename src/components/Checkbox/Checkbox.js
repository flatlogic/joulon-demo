import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import { Input, Label } from 'reactstrap';
import s from './Checkbox.module.scss';


class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    checked: false,
    name: "checkbox",
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: true
    }
  }

  onChange(state) {
    this.setState({
      checked: state
    })
  }

  render() {
    return (
      <div className={cx(s.root, this.props.className)}>
        <Input className={s.checkboxInput} id={this.props.name || this.props.key} type="checkbox" checked={this.state.checked}
               onChange={() => {this.onChange(!this.state.checked)}}
        />
        <Label
          className={s.checkboxLabel}
          for={this.props.name || this.props.key}
          check
        >
          {this.props.label || ""}
        </Label>
      </div>
    );
  }

}

function mapStateToProps(store) {
  return {

  };
}

export default withRouter(connect(mapStateToProps)(Checkbox));
