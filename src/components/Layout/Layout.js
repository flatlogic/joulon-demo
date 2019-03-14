import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import $ from 'jquery';
import Hammer from 'rc-hammerjs';

import UIIcons from '../../pages/icons';
import UINotifications from '../../pages/notifications';
import TablesStatic from '../../pages/static';
import MapsGoogle from '../../pages/google';
import CoreTypography from '../../pages/typography';
import Charts from '../../pages/charts';
import DashboardAnalytics from '../../pages/analytics';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Helper from '../Helper';
import { openSidebar, closeSidebar, changeActiveSidebarItem, toggleSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
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
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
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
        ].join(' ')}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header chatToggle={this.chatToggle} />
          <Helper />
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
                    <Route path="/app/dashboard" exact component={DashboardAnalytics} />
                    <Route path="/app/notifications" exact component={UINotifications} />
                    <Route path="/app/tables" exact component={TablesStatic} />
                    <Route path="/app/typography" exact component={CoreTypography} />
                    <Route path="/app/ui" exact render={() => <Redirect to="/app/ui/icons" />} />
                    <Route path="/app/ui/icons" exact component={UIIcons} />
                    <Route path="/app/ui/map" exact component={MapsGoogle} />
                    <Route path="/app/ui/charts/" exact component={Charts} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>
                Sing App React Admin Dashboard Template - Made by <a href="https://flatlogic.com" rel="nofollow noopener noreferrer" target="_blank">Flatlogic</a>
              </footer>
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
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
