import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <section class="page_404">
        <div class="container">
          <div class="row">
            <h1>Oops!</h1>
            <h2>Page Not Found</h2>
            <h6>
              We could not find what you were looking for. Please contact the
              owner of the site that linked you to the original URL and let them
              know their link is broken.
            </h6>
            <div className="col-6">

           <button   className="link_404" onClick={()=>navigate("/")}>Go To Home</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
