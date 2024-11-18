import React from "react";
import dashboardSvg from "../../../../../svg/dashboard.svg";
import { currentUser } from "../../../../../store/selectors/userSelectors";
import { useShallowEqualSelector } from "../../../../../hooks";
import Moment from "react-moment";
import "moment-timezone";
import { capitalizeFirstLetter } from "../../../../../util/helpers";
import styles from "../../../../styles/layout/Layout.module.css";

function DashBoardHero() {
  const { first_name, last_name, last_login } =
    useShallowEqualSelector(currentUser);

  return (
    <div className="card rounded-0 ">
      <section className="content px-2">
        <div className="container-fluid">
          <div className=" d-flex justify-content-between align-items-center flex-wrap">
            <div
              className="left d-flex flex-column justify-content-between py-2 py-sm-0 "
              style={{ height: "90px" }}
            >
              <p className="h6 m-0">
                <span className={styles.c_no_wrap}>
                  Welcome {capitalizeFirstLetter(first_name)}{" "}
                  {capitalizeFirstLetter(last_name)},
                </span>{" "}
              </p>
              <p className="h5 m-0">
                <span className={styles.c_no_wrap}>Dashboard Management</span>
              </p>

              {last_login ? (
                <p className="h6 m-0">
                  <small className="m-0">
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
              <img src={dashboardSvg} alt="" width={200} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashBoardHero;
