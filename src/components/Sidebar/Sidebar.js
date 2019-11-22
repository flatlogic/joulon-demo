import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dismissAlert } from '../../actions/alerts';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup';

import { changeActiveSidebarItem } from '../../actions/navigation';
import { logoutUser } from '../../actions/user';

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    activeItem: '',
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener(
      'transitionend',
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
      if (nextProps.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = '';
        }, 0);
      }
    }
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav
        className={cx(s.root)}
        ref={nav => {
          this.element = nav;
        }}
      >
        <header className={s.logo}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Joulon</a>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Dashboard 1"
            isHeader
            iconName="flaticon-folder-10"
            link="/app/main/dashboard"
            index="menu"
            childrenLinks={[
              {
                header: 'GLOBAL',
                link: '/app/main/dashboard/level_12',
                index: 'level_12',
                childrenLinks: [
                  {
                    header: 'Region EU-2',
                    link: '/app/main/dashboard',
                    index: 'level_22',
                  },
                  {
                    header: 'Region ME-4',
                    link: '/app/main/dashboard/level_12/level_23',
                    index: 'level_23',
                  },
                ],
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Dashboard 2"
            isHeader
            iconName="flaticon-folder-10"
            link="/app/menu1"
            index="menu"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Dashboard 3"
            isHeader
            iconName="flaticon-folder-10"
            link="/app/menu2"
            index="menu"
          />
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
