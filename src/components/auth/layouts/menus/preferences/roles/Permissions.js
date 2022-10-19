import React, { useState, useEffect } from "react";
import { filtered_permissions } from "../../../../../../util/helpers";

import { Divider } from "antd";

function Permissions(props) {
  const { index, permission, all_permissions, handleCheckChange, readonly } =
    props;
  // console.log(filtered_permissions2(all_permissions["Dashboard"], "module"));

  const [filtered, setFiltered] = useState({});

  useEffect(() => {
    setFiltered(filtered_permissions(all_permissions[permission], "module"));
  }, [all_permissions, permission]);
  return (
    <div className="card  card-outline card-secondary  ">
      <div className="card-header" id={`headingRole${index}`}>
        <h3 className="card-title font-weight-light">{permission}</h3>
        <div className="card-tools d-flex">
          <div className="form-check ">
            {!readonly && (
              <input
                className="form-check-input"
                type="checkbox"
                value={`chk-${index}`}
                title="check all permissions"
                onChange={handleCheckChange}
              />
            )}
          </div>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
            data-toggle="tooltip"
            title="Collapse"
            style={{ marginTop: "-4px" }}
          >
            <i className="fas fa-minus" />
          </button>
        </div>
      </div>
      <div className="card-body">
        {Object.keys(filtered).length &&
          Object.keys(filtered).map((item) => {
            return (
              <div className="row">
                <Divider
                  orientation="left"
                  plain
                  style={{
                    fontSize: "11px",
                    fontStyle: "italic",
                    marginTop: "0",
                    marginBottom: "20px",
                  }}
                  orientationMargin={0}
                >
                  {item}
                </Divider>
                {filtered[item].map((item2) => {
                  return (
                    <div
                      className="form-group  col-12 col-sm-6 col-md-3 "
                      key={item2.id}
                    >
                      <div className="form-check">
                        {!readonly && (
                          <input
                            type="checkbox"
                            className={`chk-${index} perm-role form-check-input`}
                            value={item2.id}
                            id={item2.id}
                          />
                        )}

                        <label className="form-check-label" htmlFor={item2.id}>
                          {item2.name}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      {/* /.card-body */}
    </div>
  );
}

export default Permissions;
