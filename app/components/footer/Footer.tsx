import "./footer.css";
import LastModified from "../last-modified/LastModified";
import Image from "next/image";
import Feedback from "../feedback/Feedback";
import ClientOnly from "../ClientOnly";
import Link from "next/link";

function Footer() {
  return (
    <>
      <div className="content !flex !items-start !gap-2 !py-4 !mt-4 !h-[52px] ">
        <LastModified date="31/12/2026" time="2:00 م" variant="light" />
      </div>
      {/* <ClientOnly> */}
        <Feedback />
      {/* </ClientOnly> */}

      <div style={{ backgroundColor: "#074D31" }}>
        <div className="">
          <div className="">
            <div className="grid gap-12 pt-10 pb-6 custom-container">
              <div className="footer-bottom ">
                <div className="footer-bottom-content">
                  <div className="footer-legal-links">
                    <Link href="/terms-and-conditions" className="footer-link">
                      الشروط و الأحكام
                    </Link>
                    <Link href="#" className="footer-link">
                   الاسئلة الشائعة
                    </Link>
                    <a href="/sitemap-page" className="footer-link">
                      خريطة الموقع
                    </a>
                  </div>

                  <div className="footer-copyright text-center md:text-start">
                    <div className="footer-link footer-copyright-text">
                      جميع الحقوق محفوظة لمجمع الملك سلمان العالمي للغة العربية
                      © 2026
                    </div>
                    <LastModified
                      label="آخر تعديل للموقع"
                      date="31/12/2026"
                      time="2:00 م"
                      variant="dark"
                    />
                  </div>
                </div>

                <div className="footer_logos justify-center md:justify-end">
                  <Image
                    src="/assets/image/king-salman-global.svg"
                    alt=""
                    width={100}
                    height={100}
                    loading="lazy"
                  />
                  <Image
                    src="/assets/image/footer-logo.svg"
                    alt=""
                    width={100}
                    height={100}
                    loading="lazy"
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
