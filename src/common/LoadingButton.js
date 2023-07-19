import React from "react";

export default function LoadingButton() {
  return (
    <>
      <button className="btn btn-primary" type="button" disabled style={{width: '100%'
              ,height: '52px'}}>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </>
  );
}
