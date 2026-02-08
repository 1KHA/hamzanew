import {
  DgaButton as Button,
  DgaTextarea as Textarea,
  DgaCheckbox,
  DgaRadioButton,
  DgaIcon,
  DgaNotification,
} from "platformscode-new-react";
import Notification from "../notification/Notification";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Feedback() {
  const location = usePathname();
  const textareaRef = useRef(null);

  console.log(location);

  const [answer, setAnswer] = useState<{
    isUseful: null | "yes" | "no";
    reasons: string[];
    notes: string;
    gender: string;
  }>({
    isUseful: null,
    reasons: [],
    notes: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    reasons: false,
    gender: false,
  });

  const [openQuestions, setOpenQuestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [options] = useState({
    yes: [
      { id: "relevant", text: "المحتوى ذو صلة" },
      { id: "well-written", text: "كان مكتوبًا بشكل جيد" },
      { id: "easy-format", text: "التنسيق سهَّل القراءة" },
      { id: "other-yes", text: "شيء آخر" },
    ],
    no: [
      { id: "not-relevant", text: "المحتوى غير ذو صلة" },
      { id: "not-accurate", text: "المحتوى غير دقيق" },
      { id: "too-long", text: "المحتوى طويل جدًا" },
      { id: "other-no", text: "شيء آخر" },
    ],
  });

  const [stats, setStats] = useState({
    yesPercentage: 100,
    totalCount: 100,
  });

  const getPageName = () => {
    const hash = window.location.hash;

    if (hash && hash.startsWith("#/")) {
      let pageName = hash.substring(2);
      pageName = pageName.split("?")[0];
      return pageName;
    }

    return window.location.pathname.substring(1) || "home";
  };

  const handleReasonChange = (reasonId: string) => {
    setAnswer((prev) => ({
      ...prev,
      reasons: prev.reasons.includes(reasonId)
        ? prev.reasons.filter((id) => id !== reasonId)
        : [...prev.reasons, reasonId],
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      reasons: answer.reasons.length === 0,
      gender: !answer.gender,
    };

    setErrors(newErrors);

    if (!newErrors.reasons && !newErrors.gender) {
      setSubmitted(true);
      // TODO: Add API call here
    }
  };

  return (
    <>
      <hr className="" />
      <div className=" content">
        <section className="!flex !flex-col !items-center !w-full   !py-6">
          <div className="flex md:flex-row flex-col w-full gap-4 justify-between">
            <div className="!w-full !flex  !flex-row !justify-between !items-center max-!gap-4">
              <div className="!flex md:!items-center !flex-col md:!flex-row !gap-4 md:!gap-6  ">
                {/* {submitted && (
                // <DgaIcon
                //   icon="checkmark-circle-04"
                //   variant="stroke"
                //   type="rounded"
                //   color="#1B8354"
                //   size="24px"
                // />
              )} */}
                <p className="text-md-regular text-[#161616] flex items-center gap-4">
                  {!submitted ? (
                    "هل كانت هذه الصفحة مفيدة؟"
                  ) : (
                    <>

<img
                        alt=""
                        width={24}
                        height={24}
                        className="inline-block green-icon"
                        src={`/assets/icons/stroke-standard/checkmark-circle-04-stroke-rounded.svg`}
                      />

                      تم إرسال ملاحظاتك!
                      
                    </>
                  )}
                </p>
                {!submitted && (
                  <div className="flex gap-4">
                    <Button
                      label="نعم"
                      variant="primary-brand"
                      size="lg"
                      onClick={() => {
                        setAnswer((prev) => ({
                          ...prev,
                          isUseful: "yes",
                          reasons: [],
                        }));
                        setOpenQuestions(true);
                      }}
                    />
                    <Button
                      label="لا"
                      variant="primary-brand"
                      size="lg"
                      onClick={() => {
                        setAnswer((prev) => ({
                          ...prev,
                          isUseful: "no",
                          reasons: [],
                        }));
                        setOpenQuestions(true);
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                {openQuestions && !submitted && (
                  <button
                    className="dga-btn dga-btn--lg dga-btn--subtle   !flex !justify-center !items-center !p-4 !cursor-pointer"
                    onClick={() => {
                      setOpenQuestions(false);
                    }}
                  >
                    <span>إغلاق</span>
                    <img
                      alt=""
                      width={24}
                      height={24}
                      className="inline-block"
                      src={`/assets/icons/stroke-standard/cancel-circle-stroke-rounded.svg`}
                    />
                  </button>
                )}
              </div>
            </div>

            {(!openQuestions || submitted) && stats.totalCount > 0 && (
              <p className="text-sm-regular text-[#161616] text-start md:text-end !w-full content-center">
                {stats.yesPercentage}% من المستخدمين قالوا نعم من
                {stats.totalCount} تعليقًا
              </p>
            )}
          </div>

          <div
            className={`grid transition-[grid-template-rows,opacity,margin,transform] duration-300 ease-in-out !w-full ${openQuestions && !submitted
                ? "grid-rows-[1fr] opacity-100 mt-8 translate-y-0"
                : "grid-rows-[0fr] opacity-0 mt-0 translate-y-8"
              }`}
          >
            <div className="overflow-hidden !px-4 min-h-0 gap-[24px] flex flex-col ">
              {answer.isUseful && (
                <>
                  {(errors.gender || errors.reasons) && (


                    <Notification
                    className="!mt-4"
                      variant="critical"
                      leadText="مهم"
                      content="نرجو منك  استكمال الاستبيان لإرسال التقييم"
                    />

                  )}

                  <div className="!w-full !flex !justify-between max-md:!flex-col max-md:!gap-8 pt-4">
                    <div>
                      <div className="!flex !flex-col !gap-4">
                        <h4 className="!text-md-semibold !text-[#161616]">
                          يرجى إخبارنا بالسبب
                          <span className="!text-sm-regular !text-[#6C737F]">
                            &nbsp; (يمكنك تحديد خيارات متعددة)
                          </span>
                        </h4>
                        {options[answer.isUseful] &&
                          options[answer.isUseful].map((option) => (
                            <DgaCheckbox
                              key={option.id}
                              label={option.text}
                              value={option.id}
                              checked={answer.reasons.includes(option.id)}
                              onChange={() => handleReasonChange(option.id)}
                            />
                          ))}
                        {errors.reasons && (
                          <div
                            className="invalid-feedback !flex !justify-start !gap-2 !mt-1"
                            translate="yes"
                            lang="ar"
                          >
                           
                            <img
                              alt=""
                              width={16}
                              height={16}
                              className="inline-block icon-critical"
                              src={`/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg`}
                            />
                            يرجى اختيار سبب واحد على الأقل
                          </div>
                        )}
                      </div>
                    </div>

                    <Textarea
                      ref={textareaRef}
                      label="الملاحظات"
                      name="notes"
                      value={answer.notes}
                      scrollbar
                      resize
                      onChange={(e) => {
                        setAnswer((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }));
                      }}
                      variant="default"
                      translate="yes"
                      lang="ar"
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex md:items-center gap-4 max-md:flex-col">
                      <h4 className="text-md-semibold text-[#161616]">أنا</h4>
                      <DgaRadioButton
                        name="gender"
                        label="ذكر"
                        value="male"
                        checked={answer.gender === "male"}
                        onChange={() =>
                          setAnswer((prev) => ({ ...prev, gender: "male" }))
                        }
                      />
                      <DgaRadioButton
                        name="gender"
                        label="أنثى"
                        value="female"
                        checked={answer.gender === "female"}
                        onChange={() =>
                          setAnswer((prev) => ({ ...prev, gender: "female" }))
                        }
                      />
                    </div>

                    {errors.gender && (
                      <div
                        className={`${errors.gender ? "block" : "hidden"} invalid-feedback !flex !justify-start !gap-2 !mt-1 `}
                      >
                        <img
                          alt=""
                          width={16}
                          height={16}
                          className="inline-block icon-critical"
                          src={`/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg`}
                        />
                        يرجى تحديد الجنس
                      </div>
                    )}
                  </div>

                  <div className="w-full flex justify-between md:items-center max-md:flex-col gap-[24px]">
                    <div className="flex text-md-regular text-[#161616]gap-[2px]  flex-col md:flex-row gap-2">
                      <p className="text-md-regular text-[#161616] py-2">
                        لمزيد من المعلومات، يمكنك مراجعة&nbsp;
                      </p>

                      <div className="flex">
                        <div className="flex justify-start gap-[2px]">
                          <a
                            href="https://my.gov.sa/ar/content/e-participation#section-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link--primary"
                          >
                            بيان المشاركة الإلكترونية
                          </a>

                          <img
                            alt=""
                            width={16}
                            height={16}
                            className="inline-block green-icon"
                            src={`/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg`}
                          />
                        </div>

                        <div className="flex justify-start gap-[2px]">
                          &nbsp;و&nbsp;
                          <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link--primary"
                          >
                            قواعد الاشتراك
                          </a>
                          <img
                            alt=""
                            width={16}
                            height={16}
                            className="inline-block green-icon"
                            src={`/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg`}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      label="إرسال"
                      size="lg"
                      variant="primary-brand"
                      onClick={handleSubmit}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
