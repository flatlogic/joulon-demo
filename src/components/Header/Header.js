import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Navbar,
  Nav,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Button,
  BreadcrumbItem,
  Breadcrumb,
  NavItem,
} from 'reactstrap';
import { logoutUser } from '../../actions/user';
import {
  changeSidebarPosition,
  changeSidebarVisibility,
  openSidebar,
  closeSidebar,
} from '../../actions/navigation';

import sender1 from '../../images/1.png';

import s from './Header.module.scss';

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
    sidebarVisibility: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.state = {
      settingsOpen: false,
      accountOpen: false,
    };
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  moveSidebar(position) {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar(visibility) {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar());
  }

  render() {
    return (
      <Navbar className={`d-print-none ${s.root}`}>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard 1</BreadcrumbItem>
          <BreadcrumbItem>Global View</BreadcrumbItem>
          <BreadcrumbItem>Region EU2</BreadcrumbItem>
          <BreadcrumbItem active>RIG T15</BreadcrumbItem>
        </Breadcrumb>
        <Nav className="ml-md-0">
          <Dropdown
            nav
            isOpen={this.state.settingsOpen}
            toggle={this.toggleSettingsDropdown}
            className="d-none d-md-block"
          >
            <DropdownToggle nav className={s.navItem}>
              <i className="fi flaticon-settings-5" />
            </DropdownToggle>
            <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
              <h6>Sidebar on the</h6>
              <ButtonGroup size="sm">
                <Button
                  color="dark"
                  onClick={() => this.moveSidebar('left')}
                  className={
                    this.props.sidebarPosition === 'left' ? 'active' : ''
                  }
                >
                  Left
                </Button>
                <Button
                  color="dark"
                  onClick={() => this.moveSidebar('right')}
                  className={
                    this.props.sidebarPosition === 'right' ? 'active' : ''
                  }
                >
                  Right
                </Button>
              </ButtonGroup>
              <h6 className="mt-2">Sidebar</h6>
              <ButtonGroup size="sm">
                <Button
                  color="dark"
                  onClick={() => this.toggleVisibilitySidebar('show')}
                  className={
                    this.props.sidebarVisibility === 'show' ? 'active' : ''
                  }
                >
                  Show
                </Button>
                <Button
                  color="dark"
                  onClick={() => this.toggleVisibilitySidebar('hide')}
                  className={
                    this.props.sidebarVisibility === 'hide' ? 'active' : ''
                  }
                >
                  Hide
                </Button>
              </ButtonGroup>
            </DropdownMenu>
          </Dropdown>
          <Dropdown
            nav
            isOpen={false}
            toggle={() => {}}
            className="d-none d-md-block"
          >
            <DropdownToggle nav className={s.navItem}>
              <i className="fi flaticon-alarm" />
            </DropdownToggle>
          </Dropdown>
          <Dropdown
            isOpen={this.state.accountOpen}
            toggle={this.toggleAccountDropdown}
            className="d-md-block"
            nav
          >
            <DropdownToggle nav className={s.navItem}>
              <img src={sender1} alt="" className={s.imageAccount} />
              <span className={s.userName}>Hi, Robert</span>
              <i className={`${s.dropdownArrow} fa fa-angle-left`} />
            </DropdownToggle>
            <DropdownMenu right className={`${s.dropdownMenu} ${s.account}`}>
              <DropdownItem>
                <NavLink href="/#/app/profile">
                  <i className="fa fa-user fa-fw" />
                  Profile
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="#" onClick={this.doLogout}>
                  <i className="glyphicon glyphicon-off" />
                  Logout
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem className="d-md-none">
            <NavLink
              onClick={this.toggleSidebar}
              className={s.navItem}
              href="#"
            >
              <i className="fa fa-bars" />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
    isSidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
