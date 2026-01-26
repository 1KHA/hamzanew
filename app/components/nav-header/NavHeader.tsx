"use client";
import { useState } from "react";
import Link from "next/link";
import DigitalSignature from "../digital-signature/DigitalSignature";
import "./NavHeader.css";

function NavHeader() {
  const [activeLink, setActiveLink] = useState("link-1");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  return (
    <>
      <DigitalSignature />
      {/* desktop header */}
      <div className="header header--divider">
        <nav className="header-nav--full  custom-container">
          {/* <!-- Header main --> */}
          <div className="header-nav__main">
            {/* <!-- Menu button --> */}
            <div className="header-menu__btn">
              <button
                type="button"
                className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                aria-label="Button with icon"
                role="button"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="dga-btn-icon" aria-hidden="true">
                  <img
                    src="/assets/icons/stroke-standard/menu-01-stroke-rounded.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="inline-block transform rtl:rotate-0 ltr:rotate-180"
                  />
                </span>
              </button>
            </div>

            {/* <!-- Logo --> */}
            <div className="header-nav__branding">
              <Link href="/" className="header__logo">
                <img
                  width={120}
                  src="/assets/image/Hamza_Logo.png"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* <!-- Main menu --> */}
            <ul className="header-nav__menu">
              <li>
                <Link
                  href="/"
                  className="header-menu__item header-menu__item--active"
                >
                  <span className="header-menu__item-label">الرئيسية</span>
                </Link>
              </li>

              <li className="group">
                <Link href="#" className="header-menu__item">
                  <span className="header-menu__item-label">عن الجهة</span>
                  <span className="header-menu__item-arrow">
                    <img
                      src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="inline-block"
                    />
                  </span>
                </Link>
                {/* submenu */}
                <div
                  className="sub-navs sub-navs-fixed grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[24px] hidden group-hover:grid"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0px",
                    zIndex: 9998,
                  }}
                >
                  {/* ===== Column 1 ===== */}
                  <div className="sub-nav-title">
                    <div className="p-[12px]">عن همزة</div>

                    <ul className="grid gap-[4px]">
                      <li>
                        <Link href="/about" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/user-group-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>عن الجهة</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/message-question-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>لماذا تختار همزة؟</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/file-star-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>فوائد اختبارات همزة</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/checkmark-badge-02-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>المؤسسات والدول التي تقبل همزة</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/school-01-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>اللجنة الاستشارية الدولية</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* ===== Column 2 ===== */}
                  <div className="sub-nav-title">
                    <div className="p-[12px]">الاختبارات</div>

                    <ul className="grid gap-[4px]">
                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/right-to-left-list-bullet-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>أنواع اختبارات همزة</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/mortarboard-01-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>همزة الأكاديمي</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/glasses-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>همزة العام</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/star-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>همزة لتحديد المستوى</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/book-02-stroke-rounded.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>همزة للمفردات</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className="group">
                <Link href="#" className="header-menu__item">
                  <span className="header-menu__item-label">
                    المتقدمون للإختبار
                  </span>
                  <span className="header-menu__item-arrow">
                    <img
                      src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="inline-block"
                    />
                  </span>
                </Link>
                <div
                  className="sub-navs sub-navs-fixed grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[24px] hidden group-hover:grid"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0px",
                    zIndex: 9998,
                  }}
                >
                  {/* ===== Column 1 ===== */}
                  <div className="sub-nav-title-w-auto">
                    <div className="p-[12px]">الإستعداد للإختبار</div>

                    <ul className="grid gap-[4px]">
                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/book-04-stroke-standard.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span> مصادر التحضير</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/course-stroke-standard.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>دورة مران همزة</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/task-daily-02-stroke-standard.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>
                              آلية الإختبار (محوسب حضوري، محوسب عن بعد)
                            </span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <Link href="#" className="header-menu__item">
                  <span className="header-menu__item-label">المنظمات </span>
                  <span className="header-menu__item-arrow"></span>
                </Link>
              </li>

              <li className="group">
                <Link href="#" className="header-menu__item">
                  <span className="header-menu__item-label">الأبحاث</span>
                  <span className="header-menu__item-arrow">
                    <img
                      src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="inline-block"
                    />
                  </span>
                </Link>
                {/* submenu */}
                <div
                  className="sub-navs sub-navs-fixed grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[24px] hidden group-hover:grid"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0px",
                    zIndex: 9998,
                  }}
                >
                  {/* ===== Column 1 ===== */}
                  <div className="sub-nav-title">
                    <div className="p-[12px]">الأبحاث</div>

                    <ul className="grid gap-[4px]">
                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/book-04-stroke-standard.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>مكتبة الأبحاث</span>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link href="#" className="sub-link sub-menu__link">
                          <div className="flex gap-[16px] items-center">
                            <img
                              src="/assets/icons/stroke-standard/chart-bar-line-stroke-standard.svg"
                              alt=""
                              width={24}
                              height={24}
                            />
                            <span>الإحصائيات</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <Link href="#" className="header-menu__item">
                  <span className="header-menu__item-label">الاخبار</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* <!-- Actions --> */}
          <div className="header-nav__actions">
            <div className="header-menu__btn">
              <button
                type="button"
                className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                aria-label="More actions"
              >
                <span className="dga-btn-icon">
                  <i
                    className="hgi-solid hgi-rounded hgi-more-horizontal-circle-01"
                    style={{ fontSize: "24px" }}
                  ></i>
                </span>
              </button>
            </div>

            <ul className="header-nav__actions">
              <li className="action-btn-reversed">
                <Link href="#" className="header-menu__item">
                  <span className="header-menu__item-label">الترجمة</span>
                  <span className="header-menu__item-arrow">
                    <img
                      src="/assets/icons/stroke-standard/translation-stroke-rounded.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="inline-block"
                    />
                  </span>
                </Link>
              </li>

            
              <li className="action-btn-reversed">
                <Link href="#" className="header-menu__item">
                  <span className="header-menu__item-label">تسجيل الدخول</span>
                  <span className="header-menu__item-arrow">
                    <img
                      src="/assets/icons/stroke-standard/user-03-stroke-standard.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="inline-block"
                    />{" "}
                  </span>
                </Link>
              </li>



                <li className="action-btn-reversed translate-btn">
                <Link href="#" className="header-menu__item">
                  {/* <span className="header-menu__item-label">البحث</span> */}
                  <span className="header-menu__item-arrow">
                    <img
                      src="/assets/icons/stroke-standard/search-01-stroke-standard.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="inline-block"
                    />{" "}
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
export default NavHeader;
