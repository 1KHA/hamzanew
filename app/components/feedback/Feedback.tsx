"use client";

/**
 * Feedback — page-level widget asking "Was this page helpful?"
 * Expands an animated survey panel on Yes / No selection.
 *
 * Accessibility: WCAG 2.1 AA — aria-pressed, aria-controls, fieldset/legend,
 *   role="alert" for errors, role="status" for submission, aria-hidden on collapse.
 * Performance: constants at module level, handlers in useCallback, derived
 *   values in useMemo, stable ARIA IDs via useId.
 */

import Image from "next/image";
import {
  DgaTextarea as Textarea,
  DgaCheckbox,
  DgaRadioButton,
} from "platformscode-new-react";
import Notification from "../notification/Notification";
import { useState, useRef, useCallback, useId, useMemo } from "react";
import { usePathname } from "next/navigation";

/* ── Types ────────────────────────────────────────────────────────────────── */

type UsefulAnswer = "yes" | "no";

interface FeedbackAnswer {
  isUseful: UsefulAnswer | null;
  reasons: string[];
  notes: string;
  gender: string;
}

interface FeedbackErrors {
  reasons: boolean;
  gender: boolean;
}

/* ── Constants (module-level to avoid re-allocation on every render) ─────── */

const YES_OPTIONS = [
  { id: "relevant", text: "المحتوى ذو صلة" },
  { id: "well-written", text: "كان مكتوبًا بشكل جيد" },
  { id: "easy-format", text: "التنسيق سهَّل القراءة" },
  { id: "other-yes", text: "شيء آخر" },
] as const;

const NO_OPTIONS = [
  { id: "not-relevant", text: "المحتوى غير ذو صلة" },
  { id: "not-accurate", text: "المحتوى غير دقيق" },
  { id: "too-long", text: "المحتوى طويل جدًا" },
  { id: "other-no", text: "شيء آخر" },
] as const;

const OPTIONS_MAP = { yes: YES_OPTIONS, no: NO_OPTIONS } as const;

const INITIAL_ANSWER: FeedbackAnswer = {
  isUseful: null,
  reasons: [],
  notes: "",
  gender: "",
};

const INITIAL_ERRORS: FeedbackErrors = { reasons: false, gender: false };

/* ── Component ────────────────────────────────────────────────────────────── */

export default function Feedback() {
  const pathname = usePathname();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Stable IDs for ARIA relationships — useId avoids SSR hydration mismatches
  const surveyPanelId = useId();
  const questionId = useId();
  const reasonsErrorId = useId();
  const genderErrorId = useId();

  const [answer, setAnswer] = useState<FeedbackAnswer>(INITIAL_ANSWER);
  const [errors, setErrors] = useState<FeedbackErrors>(INITIAL_ERRORS);
  const [openQuestions, setOpenQuestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // TODO: replace with real API data when endpoint is available
  const [stats] = useState({ yesPercentage: 100, totalCount: 100 });

  const pageName = useMemo(() => {
    const name = pathname ? pathname.slice(1) : "";
    return name || "/";
  }, [pathname]);

  const currentOptions = useMemo(
    () => (answer.isUseful ? OPTIONS_MAP[answer.isUseful] : []),
    [answer.isUseful],
  );

  const hasErrors = errors.reasons || errors.gender;

  /* ── Handlers ─────────────────────────────────────────────────────────── */

  // Reset reasons when switching Yes ↔ No so stale selections don't carry over
  const handleUsefulChange = useCallback((value: UsefulAnswer) => {
    setAnswer((prev) => ({ ...prev, isUseful: value, reasons: [] }));
    setOpenQuestions(true);
  }, []);

  // Toggle a checkbox and eagerly clear the reasons error
  const handleReasonChange = useCallback((reasonId: string) => {
    setAnswer((prev) => ({
      ...prev,
      reasons: prev.reasons.includes(reasonId)
        ? prev.reasons.filter((id) => id !== reasonId)
        : [...prev.reasons, reasonId],
    }));
    setErrors((prev) => (prev.reasons ? { ...prev, reasons: false } : prev));
  }, []);

  // Set gender and eagerly clear the gender error
  const handleGenderChange = useCallback((value: string) => {
    setAnswer((prev) => ({ ...prev, gender: value }));
    setErrors((prev) => (prev.gender ? { ...prev, gender: false } : prev));
  }, []);

  const handleClose = useCallback(() => setOpenQuestions(false), []);

  const handleSubmit = useCallback(async () => {
    const newErrors: FeedbackErrors = {
      reasons: answer.reasons.length === 0,
      gender: !answer.gender,
    };
    setErrors(newErrors);
    if (newErrors.reasons || newErrors.gender) return; // live regions announce errors

    setSubmitted(true);
    // TODO: await fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ page: pageName, ...answer }) });
    console.log("Feedback submitted:", { page: pageName, ...answer });
  }, [answer, pageName]);

  /* ── Render ───────────────────────────────────────────────────────────── */

  return (
    <>
      <hr aria-hidden="true" />

      <div className="content">
        <section
          className="!flex !flex-col !items-center !w-full !py-6"
          aria-label="تقييم الصفحة"
        >
          {/* Top row: question + Yes/No (right in RTL) | stats or close (left in RTL) */}
          <div className="flex md:flex-row flex-col w-full gap-4 justify-between items-center">

            {/* RTL right side: question + Yes/No buttons */}
            <div className="flex md:items-center flex-col md:flex-row gap-4 md:gap-6">
              {submitted ? (
                <p
                  className="text-md-regular text-[#161616] flex items-center gap-4"
                  role="status"
                  aria-live="polite"
                >
                  <Image
                    src="/assets/icons/stroke-standard/checkmark-circle-04-stroke-rounded.svg"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="inline-block green-icon"
                  />
                  تم إرسال ملاحظاتك!
                </p>
              ) : (
                <>
                  <p id={questionId} className="text-md-regular text-[#161616]">
                    هل كانت هذه الصفحة مفيدة؟
                  </p>
                  <div role="group" aria-labelledby={questionId} className="flex gap-4">
                    <button
                      type="button"
                      className="dga-btn dga-btn--lg dga-btn--primary-brand"
                      onClick={() => handleUsefulChange("yes")}
                      aria-pressed={answer.isUseful === "yes"}
                      aria-controls={surveyPanelId}
                      aria-expanded={openQuestions && answer.isUseful === "yes"}
                    >
                      <span className="dga-btn-label">نعم</span>
                    </button>
                    <button
                      type="button"
                      className="dga-btn dga-btn--lg dga-btn--primary-brand"
                      onClick={() => handleUsefulChange("no")}
                      aria-pressed={answer.isUseful === "no"}
                      aria-controls={surveyPanelId}
                      aria-expanded={openQuestions && answer.isUseful === "no"}
                    >
                      <span className="dga-btn-label">لا</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* RTL left side: stats and close button share the same grid cell — no layout shift */}
            <div style={{ display: "grid", flexShrink: 0 }}>
              {stats.totalCount > 0 && (
                <p
                  className="text-sm-regular text-[#161616] text-start md:text-end content-center"
                  style={{ gridArea: "1/1", visibility: !openQuestions || submitted ? "visible" : "hidden" }}
                  aria-label={`${stats.yesPercentage} بالمئة من المستخدمين قالوا نعم، من أصل ${stats.totalCount} تعليق`}
                >
                  {stats.yesPercentage}% من المستخدمين قالوا نعم من{" "}
                  {stats.totalCount} تعليقًا
                </p>
              )}
              <button
                type="button"
                className="dga-btn dga-btn--lg dga-btn--subtle"
                onClick={handleClose}
                aria-label="إغلاق نموذج التقييم"
                aria-controls={surveyPanelId}
                aria-expanded={openQuestions}
                style={{
                  gridArea: "1/1",
                  visibility: openQuestions && !submitted ? "visible" : "hidden",
                  pointerEvents: openQuestions && !submitted ? "auto" : "none",
                }}
              >
                <span className="dga-btn-label" aria-hidden="true">إغلاق</span>
                <Image
                  src="/assets/icons/stroke-standard/cancel-circle-stroke-rounded.svg"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="inline-block"
                />
              </button>
            </div>

          </div>

          <div
            id={surveyPanelId}
            role="region"
            aria-label="نموذج التقييم التفصيلي"
            aria-hidden={!openQuestions || submitted ? true : undefined}
            className={`feedback-survey-panel${openQuestions && !submitted ? " feedback-survey-panel--open" : ""}`}
          >
            <div className="feedback-survey-panel__inner">
            <div className="!px-4 gap-[24px] flex flex-col pb-4">
              {answer.isUseful && (
                <>
                  {/* Error summary — Notification carries role="alert" internally */}
                  {hasErrors && (
                    <Notification
                      className="!mt-4"
                      variant="critical"
                      leadText="مهم"
                      content="نرجو منك استكمال الاستبيان لإرسال التقييم"
                    />
                  )}

                  {/* Reasons + Notes */}
                  <div className="!w-full !flex !justify-between max-md:!flex-col max-md:!gap-8 pt-4">
                    {/* fieldset + legend is the correct semantic for grouped checkboxes */}
                    <fieldset
                      className="border-none p-0 m-0"
                      aria-describedby={errors.reasons ? reasonsErrorId : undefined}
                    >
                      <legend className="!text-md-semibold !text-[#161616] !mb-4">
                        يرجى إخبارنا بالسبب
                        <span className="!text-sm-regular !text-[#6C737F]">
                          &nbsp;(يمكنك تحديد خيارات متعددة)
                        </span>
                      </legend>

                      <div className="flex flex-col gap-4">
                        {currentOptions.map((option) => (
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
                            id={reasonsErrorId}
                            role="alert"
                            className="invalid-feedback !flex !justify-start !gap-2 !mt-1"
                          >
                            <Image
                              src="/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg"
                              alt=""
                              aria-hidden="true"
                              width={16}
                              height={16}
                              className="inline-block icon-critical"
                            />
                            يرجى اختيار سبب واحد على الأقل
                          </div>
                        )}
                      </div>
                    </fieldset>

                    <Textarea
                      ref={textareaRef}
                      label="الملاحظات"
                      name="notes"
                      value={answer.notes}
                      scrollbar
                      resize
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setAnswer((prev) => ({ ...prev, notes: e.target.value }));
                      }}
                      variant="default"
                      translate="yes"
                      lang="ar"
                    />
                  </div>

                  {/* Gender radio group */}
                  <fieldset
                    className="grid gap-2 border-none p-0 m-0"
                    aria-describedby={errors.gender ? genderErrorId : undefined}
                  >
                    <legend className="text-md-semibold text-[#161616] mb-2">أنا</legend>

                    <div className="flex md:items-center gap-4 max-md:flex-col">
                      <DgaRadioButton
                        name="gender"
                        label="ذكر"
                        value="male"
                        checked={answer.gender === "male"}
                        onChange={() => handleGenderChange("male")}
                      />
                      <DgaRadioButton
                        name="gender"
                        label="أنثى"
                        value="female"
                        checked={answer.gender === "female"}
                        onChange={() => handleGenderChange("female")}
                      />
                    </div>

                    {errors.gender && (
                      <div
                        id={genderErrorId}
                        role="alert"
                        className="invalid-feedback !flex !justify-start !gap-2 !mt-1"
                      >
                        <Image
                          src="/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg"
                          alt=""
                          aria-hidden="true"
                          width={16}
                          height={16}
                          className="inline-block icon-critical"
                        />
                        يرجى تحديد الجنس
                      </div>
                    )}
                  </fieldset>

                  {/* Footer: external links + submit */}
                  <div className="w-full flex justify-between md:items-center max-md:flex-col gap-[24px]">
                    <p className="text-md-regular text-[#161616] flex flex-col md:flex-row gap-2 py-2">
                      لمزيد من المعلومات، يمكنك مراجعة&nbsp;
                      <span className="flex flex-wrap gap-1">
                        {/* aria-label warns AT users the link opens in a new tab */}
                        <a
                          href="https://my.gov.sa/ar/content/e-participation#section-1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link--primary flex items-center gap-[2px]"
                          aria-label="بيان المشاركة الإلكترونية (يفتح في نافذة جديدة)"
                        >
                          بيان المشاركة الإلكترونية
                          <Image
                            src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
                            alt=""
                            aria-hidden="true"
                            width={16}
                            height={16}
                            className="inline-block green-icon"
                          />
                        </a>

                        <span aria-hidden="true">&nbsp;و&nbsp;</span>

                        <a
                          href="https://my.gov.sa/ar/content/subscribe#section-1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link--primary flex items-center gap-[2px]"
                          aria-label="قواعد الاشتراك (يفتح في نافذة جديدة)"
                        >
                          قواعد الاشتراك
                          <Image
                            src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
                            alt=""
                            aria-hidden="true"
                            width={16}
                            height={16}
                            className="inline-block green-icon"
                          />
                        </a>
                      </span>
                    </p>

                    <button
                      type="button"
                      className="dga-btn dga-btn--lg dga-btn--primary-brand"
                      onClick={handleSubmit}
                      aria-label="إرسال التقييم"
                    >
                      <span className="dga-btn-label">إرسال</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
