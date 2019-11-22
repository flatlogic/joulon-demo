import React, { Component } from 'react';
import s from './JumbotronDowntime.module.scss';

class JumbotronDowntime extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.block}>
          <div className={s.textWrapper}>
            <p className={s.title}>EU-2 Downtime Hours</p>
          </div>
          <div className={s.textWrapper}>
            <p className={s.subtitle}>(Sep - Oct)</p>
          </div>
          <div className={s.textWrapper}>
            <span className={`${s.valueWrapper} ${s.red}`}>
              <p className={s.value}>123.78</p>
              <p className={s.measure}>&nbsp;Hours</p>
            </span>
          </div>
        </div>

        <div className={s.verticalLine} />

        <div className={s.block}>
          <div className={s.textWrapper}>
            <p className={s.title}>EU-2 Downtime Hours</p>
          </div>
          <div className={s.textWrapper}>
            <p className={s.subtitle}>(Sep - Oct)</p>
          </div>
          <div className={s.textWrapper}>
            <span className={`${s.valueWrapper} ${s.green}`}>
              <p className={s.value}>23.16</p>
              <p className={s.measure}>&nbsp;%</p>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default JumbotronDowntime;
