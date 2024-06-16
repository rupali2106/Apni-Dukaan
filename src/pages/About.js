import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About us - Apni Dukaan">
      <div className="pathroute">
        <h2>
          <span className="p1">Home</span>
          <span>/</span>
          <span className="p2">About</span>
        </h2>
      </div>
      <div className="container about">
        <div className="row about_cont d-flex flex-row">
          <div className="col-md-6 ">
            <img
              src="/images/template.jpg"
              alt="contactus"
              style={{ width: "100%" }}
              className="abt_img"
            />
          </div>
          <div className="col-md-6 abt_right">
            <div className="abt_head">
              <h2>My Story</h2>
            </div>
            <div className="abt_bdr "></div>
            <p className="text-justify  abt_p">
              Apni Dukaan was started by Rajesh Jha in July'23, with an aim
              to build a strong infrastructure for small bussiness owners to
              expand their reach, by bringing their products online. Today
              Apni Dukaan is used by hundreds of shop owners to expand their
              bussiness. This is possible just due to your trust, support and
              our constant efforts to make the platform even better. We are
              working tirelessly to improve the experience of our end users and
              hope to soon reach 1000+ customers.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
