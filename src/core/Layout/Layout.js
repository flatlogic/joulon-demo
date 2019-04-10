import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';

import Dashboard from '../../pages/dashboard/Dashboard';
import EngineeringSupport from '../../pages/EngineeringSupport';
import EngineeringSupport2 from '../../pages/EngineeringSupport2';
import EngineeringSupport3 from '../../pages/EngineeringSupport3';
import { DashboardThemes } from '../../reducers/layout';
import { notifyFontsDownloaded } from '../../actions/layout';

import Header from '../Header';
import Sidebar from '../Sidebar/Sidebar';
import { closeSidebar, changeActiveSidebarItem, toggleSidebar, openSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dashboardTheme: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
    dashboardTheme: DashboardThemes.SOLID
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);

    // update font family after fonts have been loaded
    document.fonts.onloadingdone = () => {
      this.props.dispatch(notifyFontsDownloaded())
    };
  }

  componentDidMount() {
    const staticSidebar = JSON.parse(localStorage.getItem('staticSidebar'));
    if (staticSidebar && window.innerWidth > 768) {
      this.props.dispatch(toggleSidebar());
    } else if (this.props.sidebarOpened) {
      setTimeout(() => {
        this.props.dispatch(closeSidebar());
        this.props.dispatch(changeActiveSidebarItem(null));
      }, 2500);
    }

    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth <= 768 && this.props.sidebarStatic) {
      this.props.dispatch(toggleSidebar());
    }
  }

  handleSwipe(e) {
    if ('ontouchstart' in window) {
      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
      if (e.direction === 4 && !this.props.sidebarOpened) {
        this.props.dispatch(openSidebar());
        return;
      }
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          this.props.sidebarStatic ? s.sidebarStatic : '',
          !this.props.sidebarOpened ? s.sidebarClose : '',
          'joulon-dashboard',
          'dashboard-' + this.props.dashboardTheme,
        ].join(' ')}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header auth={this.props.auth} />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.pathname}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route path="/app" exact render={() => <Redirect to="/app/dashboard" />} />
                    <Route path="/app/dashboard" exact component={Dashboard} />
                    <Route path="/app/engineering-support" exact component={EngineeringSupport} />
                    <Route path="/app/engineering-support/engineering-support2" exact component={EngineeringSupport2} />
                    <Route path="/app/engineering-support/engineering-support3" exact component={EngineeringSupport3} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    dashboardTheme: store.layout.dashboardTheme,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
