"use client";
import { DgaButton, DgaRadioButton,DgaCheckbox } from "platformscode-new-react";
import "./footer.css";
import { useState } from "react";
import Feedback from "../feedback/Feedback";
// import { DgaSearchBox, DgaTextInput } from "platformscode-new-react";

function Footer() {

  return (
    <>
    <Feedback/>


      <div style={{ backgroundColor: "#074D31" }}>
        <div className="">
          <div className="">
            <div className="grid gap-12 pt-10 pb-6 custom-container">
             
              <div className="footer-bottom ">
                <div className="footer-bottom-content">
                  <div className="footer-legal-links">
                    <a href="#" className="footer-link">
                      الشروط و الأحكام{" "}
                    </a>
                    <a href="#" className="footer-link">
                      سياسة المنصة
                    </a>
                    <a href="#" className="footer-link">
                      خريطة الموقع{" "}
                    </a>
                  </div>

                  <div className="footer-copyright">
                    <div className="footer-link footer-copyright-text">
                      جميع الحقوق محفوظة لمجمع الملك سلمان العالمي للغة العربية
                      © 2026
                    </div>
                  </div>
                </div>

                <div className="footer_logos">
                  <img
                    src="/assets/image/king-salman-global.svg"
                    alt=""
                    className="w-[100px]"
                  />
                  <img
                    src="/assets/image/footer-logo.svg"
                    alt=""
                    className="w-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
