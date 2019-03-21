import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';

import Dashboard from '../../pages/dashboard';
import { DashboardThemes } from '../../reducers/layout';

import Header from '../Header';
import Sidebar from '../Sidebar';
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
          <Header />
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
    dashboardTheme: store.dashboard.dashboardTheme,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
