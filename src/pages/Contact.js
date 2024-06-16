import React from "react";
import Layout from "../components/Layout/Layout";
import {BiMailSend,BiPhoneCall} from "react-icons/bi";
import {Link} from "react-router-dom";
import {SlSocialLinkedin} from "react-icons/sl";
import {PiAddressBookLight} from "react-icons/pi";

const About = () => {
  return (
    <Layout title="About us - Apni Dukaan">
      <div className="pathroute">
        <h2>
          <span className="p1">Home</span>
          <span>/</span>
          <span className="p2">contact</span>
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
              <h2>Contact</h2>
            </div>
            <div className="abt_bdr "></div>
            <p className="text-justify mt-2 cont_p">
            If You have any query and want information about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3 cont_p">
            <BiMailSend /> : rj848jha@gmail.com
          </p>
          <p className="mt-3 cont_p">
            <BiPhoneCall /> : 8448162026
          </p>
          <p className="mt-3 cont_p">
            <SlSocialLinkedin /> : <Link to="https://www.linkedin.com/in/rajesh-jha-0aa47a205/" className="text-decoration-none" style={{color:"#617d98"}}> Rajesh Jha</Link>
          </p>
          <p className="mt-3 cont_p">
            <PiAddressBookLight /> : ABV-IIITM Gwalior, M.P.
          </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
