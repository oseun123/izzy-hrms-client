import React from "react";

function Permissions(props) {
  const { index, permission, all_permissions, handleCheckChange, readonly } =
    props;
  return (
    <div className="card  card-outline card-secondary ">
      <div className="card-header" id={`headingRole${index}`}>
        <h3 className="card-title font-weight-light">{permission}</h3>
        <div className="card-tools d-flex">
          <div className="form-check ">
            <input
              className="form-check-input"
              type="checkbox"
              value={`chk-${index}`}
              title="check all permissions"
              onChange={handleCheckChange}
            />
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
        <div className="row">
          {Object.keys(all_permissions[permission]).map((item, ind) => {
            return (
              <div className="form-group col-sm-3 " key={ind}>
                <div className="form-check">
                  {!readonly && (
                    <input
                      type="checkbox"
                      className={`chk-${index} perm-role form-check-input`}
                      value={all_permissions[permission][item].id}
                      id={all_permissions[permission][item].id}
                    />
                  )}

                  <label
                    className="form-check-label"
                    for={all_permissions[permission][item].id}
                  >
                    {all_permissions[permission][item].name}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* /.card-body */}
    </div>
  );
}

export default Permissions;
