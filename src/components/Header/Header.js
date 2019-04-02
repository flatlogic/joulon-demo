import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Navbar,
  Nav,
  Dropdown,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from 'reactstrap';

import ThemeSwitcher from './ThemeSwitcher'
import { logoutUser } from '../../actions/user';
import { toggleSidebar, openSidebar, closeSidebar, changeActiveSidebarItem } from '../../actions/navigation';

import a5 from '../../images/people/a5.jpg';

import s from './Header.module.scss';

class Header extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool.isRequired,
    sidebarStatic: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleConfig = this.toggleConfig.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);

    this.state = {
      configOpen: false,
    };
  }


  toggleConfig() {
    this.setState({
      configOpen: !this.state.configOpen,
    });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  }

  // static/non-static
  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
    if (this.props.sidebarStatic) {
      localStorage.setItem('staticSidebar', 'false');
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      localStorage.setItem('staticSidebar', 'true');
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  }

  render() {
    let locationParts = window.location.href.split("/");
    const header = locationParts[locationParts.length - 1].split("?")[0].split('-').join(' ');
    return (
      <Navbar className={`${s.root} d-print-none`}>
        <Nav className="ml-4 mr-3">
          <NavItem>
            <NavLink className="d-md-down-none" id="toggleSidebar" onClick={this.toggleSidebar}>
              <i className="la la-bars" />
            </NavLink>
            <UncontrolledTooltip placement="bottom" target="toggleSidebar">
              Turn on/off<br />sidebar<br />collapsing
            </UncontrolledTooltip>
            <NavLink className="d-lg-none" onClick={this.switchSidebar}>
              <i className="la la-bars" />
            </NavLink>
          </NavItem>
        </Nav>
        <h3 className={'page-title'}>{header.charAt(0).toUpperCase() + header.slice(1)}</h3>

        <Nav className="ml-auto mr-4">
          <ThemeSwitcher className="mr-md-3"/>
          <Dropdown nav isOpen={this.state.configOpen} toggle={this.toggleConfig} id="basic-nav-dropdown" className={`d-sm-down-none`}>
            <DropdownToggle nav caret>
              <span className={`${s.avatar} thumb-sm float-left mr-2`}>
                <img className="rounded-circle" src={a5} alt="..." />
              </span>
              <span className="small">Philip <span className="fw-semi-bold">Smith</span></span>
            </DropdownToggle>
            <DropdownMenu className={`py-0`}>
              <DropdownItem><i className="la la-user"/> My Account</DropdownItem>
              <DropdownItem onClick={this.doLogout}><i className="la la-sign-out"/> Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Header));

