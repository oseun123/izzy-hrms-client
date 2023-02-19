import React from "react";
import humanResourceSvg from "../../../../../svg/human_resource.svg";
import { currentUser } from "../../../../../store/selectors/userSelectors";
import { useShallowEqualSelector } from "../../../../../hooks";

import { capitalizeFirstLetter } from "../../../../../util/helpers";

import styles from "../../../../styles/layout/Layout.module.css";

function HumanResourceHero() {
  const { first_name, last_name } = useShallowEqualSelector(currentUser);
  return (
    <div class="card">
      <section className="content px-2">
        <div class="container-fluid">
          <div className=" d-flex justify-content-between align-items-center flex-wrap">
            <div className="left">
              <p class="h5 ">
                <span className={styles.c_no_wrap}>
                  Welcome back {capitalizeFirstLetter(first_name)}{" "}
                  {capitalizeFirstLetter(last_name)},
                </span>{" "}
                to{" "}
                <span className={styles.c_no_wrap}>
                  <i>Human Resource Management</i>
                </span>
              </p>
              <p class="lead">
                <small>
                  You last logged out on <i>February 16th 2023, 11:58:57 am</i>
                </small>
              </p>
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
