import React from 'react';
import humanResourceSvg from '../../../../../svg/human_resource.svg';
import { currentUser } from '../../../../../store/selectors/userSelectors';
import {
  useShallowEqualSelector,
  useUserNotification,
} from '../../../../../hooks';

import { capitalizeFirstLetter } from '../../../../../util/helpers';

import styles from '../../../../styles/layout/Layout.module.css';

function HumanResourceHero() {
  const { first_name, last_name, last_login } =
    useShallowEqualSelector(currentUser);
  useUserNotification();
  return (
    <div className="card rounded-0">
      <section className="content px-2">
        <div className="container-fluid">
          <div className=" d-flex justify-content-between align-items-center flex-wrap">
            <div
              className="  left d-flex flex-column justify-content-between py-2 py-sm-0 "
              style={{ height: '90px' }}
            >
              <p className="h6 m-0">
                <span className={styles.c_no_wrap}>
                  Welcome {capitalizeFirstLetter(first_name)}{' '}
                  {capitalizeFirstLetter(last_name)},
                </span>{' '}
              </p>

              <p className="h5 m-0">
                <span className={styles.c_no_wrap}>
                  Human Resource Management
                </span>
              </p>
              {last_login ? (
                <p className="h6 m-0">
                  <small>
                    Manage and develop your workforce to meet organizational
                    goals effectively
                  </small>
                </p>
              ) : null}
            </div>
            <div className="right d-none d-sm-block">
              <img src={humanResourceSvg} alt="" width={200} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HumanResourceHero;
