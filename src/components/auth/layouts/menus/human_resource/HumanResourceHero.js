import React from "react";
import humanResourceSvg from "../../../../../svg/human_resource.svg";
import { currentUser } from "../../../../../store/selectors/userSelectors";
import { useShallowEqualSelector } from "../../../../../hooks";
import Moment from "react-moment";
import { capitalizeFirstLetter } from "../../../../../util/helpers";

import styles from "../../../../styles/layout/Layout.module.css";

function HumanResourceHero() {
  const { first_name, last_name, last_login } =
    useShallowEqualSelector(currentUser);
  return (
    <div className="card">
      <section className="content px-2">
        <div className="container-fluid">
          <div className=" d-flex justify-content-between align-items-center flex-wrap">
            <div className="left">
              <p className="h5 ">
                <span className={styles.c_no_wrap}>
                  Welcome back {capitalizeFirstLetter(first_name)}{" "}
                  {capitalizeFirstLetter(last_name)},
                </span>{" "}
                to{" "}
                <span className={styles.c_no_wrap}>
                  <i>Human Resource Management</i>
                </span>
              </p>
              {last_login ? (
                <p className="lead">
                  <small>
                    You last logged in on{" "}
                    <i>
                      {" "}
                      <Moment
                        tz="Africa/Lagos"
                        format="MMMM Do YYYY, h:mm:ss a"
                      >
                        {last_login}
                      </Moment>
                    </i>
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
