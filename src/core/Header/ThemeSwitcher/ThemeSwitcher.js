import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { DashboardThemes } from '../../../reducers/layout';
import Switch from "react-switch";
import s from './ThemeSwitcher.module.scss';
import { changeTheme } from '../../../actions/layout';

class ThemeSwitcher extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dashboardTheme: PropTypes.string
  };

  static defaultProps = {
    dashboardTheme: DashboardThemes.SOLID
  };

  constructor(props) {
    super(props);

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme = (state) => {
    this.props.dispatch(changeTheme(state ? DashboardThemes.SOLID : DashboardThemes.TRANSPARENT));
  };

  render() {
    return (
      <section className={[s.themeSwitcher, this.props.className].join(' ')}>
        <i
          className={cx("la la-paint-brush mr-3", s.icon)}/>
        <Switch
          onChange={this.changeTheme}
          checked={this.props.dashboardTheme === DashboardThemes.SOLID}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={"#00a9b4"}
          offColor={"#a3aeb7"}
          height={20}
          width={40}
        />
      </section>
    )
  }
}

function mapStateToProps(store) {
  return {
    dashboardTheme: store.layout.dashboardTheme,
  };
}

export default connect(mapStateToProps)(ThemeSwitcher);