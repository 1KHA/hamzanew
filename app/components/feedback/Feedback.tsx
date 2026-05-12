"use client";

import Image from "next/image";
import Textarea from "@/app/components/textarea/Textarea";
import RadioButton from "@/app/components/radio-button/RadioButton";
import CheckBox from "@/app/components/checkbox/CheckBox";
import Notification from "../notification/Notification";
import { useState, useRef, useCallback, useId, useMemo } from "react";
import { usePathname } from "next/navigation";
import { st } from "@/app/_lib/static-text";
import "./Feedback.css";
import "@/app/components/button/Button.css";

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

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function getYesOptions() {
  return [
    { id: "relevant", text: st("feedback", "yesOptionRelevant") },
    { id: "well-written", text: st("feedback", "yesOptionWellWritten") },
    { id: "easy-format", text: st("feedback", "yesOptionEasyFormat") },
    { id: "other-yes", text: st("feedback", "yesOptionOther") },
  ] as const;
}

function getNoOptions() {
  return [
    { id: "not-relevant", text: st("feedback", "noOptionNotRelevant") },
    { id: "not-accurate", text: st("feedback", "noOptionNotAccurate") },
    { id: "too-long", text: st("feedback", "noOptionTooLong") },
    { id: "other-no", text: st("feedback", "noOptionOther") },
  ] as const;
}

function interpolate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}

/* ── Constants ────────────────────────────────────────────────────────────── */

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

  const surveyPanelId = useId();
  const questionId = useId();
  const reasonsErrorId = useId();
  const genderErrorId = useId();

  const [answer, setAnswer] = useState<FeedbackAnswer>(INITIAL_ANSWER);
  const [errors, setErrors] = useState<FeedbackErrors>(INITIAL_ERRORS);
  const [openQuestions, setOpenQuestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [stats] = useState({ yesPercentage: 100, totalCount: 100 });

  const pageName = useMemo(() => pathname?.slice(1) || "/", [pathname]);

  const currentOptions = useMemo(() => {
    if (!answer.isUseful) return [];
    const map = { yes: getYesOptions(), no: getNoOptions() } as const;
    return map[answer.isUseful];
  }, [answer.isUseful]);

  const hasErrors = errors.reasons || errors.gender;

  const statsText = useMemo(() => {
    return interpolate(st("feedback", "statsText"), {
      percent: stats.yesPercentage,
      count: stats.totalCount,
    });
  }, [stats.yesPercentage, stats.totalCount]);

  const statsAria = useMemo(() => {
    return interpolate(st("feedback", "statsAria"), {
      percent: stats.yesPercentage,
      count: stats.totalCount,
    });
  }, [stats.yesPercentage, stats.totalCount]);

  const activeLang = useMemo(() => {
    if (typeof document === "undefined") return "ar";
    return document.documentElement.lang?.startsWith("en") ? "en" : "ar";
  }, []);

  /* ── Handlers ─────────────────────────────────────────────────────────── */

  const handleUsefulChange = useCallback((value: UsefulAnswer) => {
    setAnswer((prev) => ({ ...prev, isUseful: value, reasons: [] }));
    setOpenQuestions(true);
  }, []);

  const handleReasonChange = useCallback((reasonId: string) => {
    setAnswer((prev) => ({
      ...prev,
      reasons: prev.reasons.includes(reasonId)
        ? prev.reasons.filter((id) => id !== reasonId)
        : [...prev.reasons, reasonId],
    }));
    setErrors((prev) => (prev.reasons ? { ...prev, reasons: false } : prev));
  }, []);

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
    if (newErrors.reasons || newErrors.gender) return;

    setSubmitted(true);
    console.log("Feedback submitted:", { page: pageName, ...answer });
  }, [answer, pageName]);

  /* ── Render ───────────────────────────────────────────────────────────── */

  return (
    <>
      <hr aria-hidden="true" />

      <div className="content">
        <section className="feedback-section" aria-label={st("feedback", "sectionAria")}>
          {/* Top row: question + buttons | stats or close */}
          <div className="feedback-row">
            <div className="feedback-left">
              {submitted ? (
                <p
                  className="text-md-regular"
                  role="status"
                  aria-live="polite"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    color: "#161616",
                  }}
                >
                  <Image
                    src="/assets/icons/stroke-standard/checkmark-circle-04-stroke-rounded.svg"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="green-icon"
                  />
                  {st("feedback", "submittedMessage")}
                </p>
              ) : (
                <>
                  <p
                    id={questionId}
                    className="text-md-regular feedback-question"
                  >
                    {st("feedback", "question")}
                  </p>

                  <div className="flex flex-1 flex-row justify-between items-center  ">
                    <div
                      role="group"
                      aria-labelledby={questionId}
                      className="feedback-actions"
                    >
                      <button
                        type="button"
                        className="dga-btn dga-btn--lg dga-btn--primary-brand flex-1"
                        onClick={() => handleUsefulChange("yes")}
                        aria-pressed={answer.isUseful === "yes"}
                        aria-controls={surveyPanelId}
                        aria-expanded={
                          openQuestions && answer.isUseful === "yes"
                        }
                      >
                        <span className="dga-btn-label">{st("feedback", "yes")}</span>
                      </button>
                      <button
                        type="button"
                        className="dga-btn dga-btn--lg dga-btn--primary-brand flex-1"
                        onClick={() => handleUsefulChange("no")}
                        aria-pressed={answer.isUseful === "no"}
                        aria-controls={surveyPanelId}
                        aria-expanded={
                          openQuestions && answer.isUseful === "no"
                        }
                      >
                        <span className="dga-btn-label">{st("feedback", "no")}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="dga-btn dga-btn--lg dga-btn--subtle"
                      onClick={handleClose}
                      aria-label={st("feedback", "closeAria")}
                      aria-controls={surveyPanelId}
                      aria-expanded={openQuestions}
                      style={{
                        gridArea: "1/1",
                        display: openQuestions && !submitted ? "flex" : "none",
                        pointerEvents:
                          openQuestions && !submitted ? "auto" : "none",
                      }}
                    >
                      <span className="dga-btn-label" aria-hidden="true">
                        {st("feedback", "close")}
                      </span>
                      <Image
                        src="/assets/icons/stroke-standard/cancel-circle-stroke-rounded.svg"
                        alt=""
                        aria-hidden="true"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Stats + close share the same grid cell — no layout shift */}
            <div>
              {stats.totalCount > 0 && (
                <p
                  className="text-sm-regular feedback-stats"
                  style={{
                    gridArea: "1/1",
                    display: !openQuestions || submitted ? "block" : "none",
                  }}
                  aria-label={statsAria}
                >
                  {statsText}
                </p>
              )}
            </div>
          </div>

          {/* Collapsible survey panel */}
          <div
            id={surveyPanelId}
            role="region"
            aria-label={st("feedback", "surveyPanelAria")}
            aria-hidden={!openQuestions || submitted ? true : undefined}
            className={`feedback-survey-panel${openQuestions && !submitted ? " feedback-survey-panel--open" : ""}`}
          >
            <div className="feedback-survey-panel__inner">
              <div className="feedback-form">
                {answer.isUseful && (
                  <>
                    {hasErrors && (
                      <Notification
                        className="!mt-4"
                        variant="critical"
                        leadText={st("feedback", "notificationLead")}
                        content={st("feedback", "notificationContent")}
                      />
                    )}

                    {/* Reasons + Notes */}
                    <div className="feedback-reasons-row">
                      <fieldset
                        style={{ border: "none", padding: 0, margin: 0 }}
                        aria-describedby={
                          errors.reasons ? reasonsErrorId : undefined
                        }
                      >
                        <legend
                          className="text-md-semibold"
                          style={{ color: "#161616", marginBottom: 16 }}
                        >
                          {st("feedback", "reasonLegend")}{" "}
                          <span
                            className="text-sm-regular"
                            style={{ color: "#6C737F" }}
                          >
                            {st("feedback", "reasonHint")}
                          </span>
                        </legend>
                        <div className="feedback-checkboxes">
                          {currentOptions.map((option) => (
                            <CheckBox
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
                              className="feedback-error"
                            >
                              <Image
                                src="/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg"
                                alt=""
                                aria-hidden="true"
                                width={16}
                                height={16}
                                className="icon-critical"
                              />
                              {st("feedback", "reasonError")}
                            </div>
                          )}
                        </div>
                      </fieldset>

                      <Textarea
                        ref={textareaRef}
                        label={st("feedback", "notesLabel")}
                        name="notes"
                        value={answer.notes}
                        scrollbar
                        resize
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setAnswer((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        variant="default"
                        translate="yes"
                        lang={activeLang}
                        extraClass="max-w-[400px]"
                      />
                    </div>

                    {/* Gender */}
                    <fieldset
                      className="feedback-gender"
                      aria-describedby={
                        errors.gender ? genderErrorId : undefined
                      }
                    >
                      <legend
                        className="text-md-semibold"
                        style={{ color: "#161616", marginBottom: 8 }}
                      >
                        {st("feedback", "genderLegend")}
                      </legend>
                      <div className="feedback-gender-options">
                        <RadioButton
                          name="gender"
                          label={st("feedback", "genderMale")}
                          value="male"
                          checked={answer.gender === "male"}
                          onChange={() => handleGenderChange("male")}
                        />
                        <RadioButton
                          name="gender"
                          label={st("feedback", "genderFemale")}
                          value="female"
                          checked={answer.gender === "female"}
                          onChange={() => handleGenderChange("female")}
                        />
                      </div>
                      {errors.gender && (
                        <div
                          id={genderErrorId}
                          role="alert"
                          className="feedback-error"
                        >
                          <Image
                            src="/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg"
                            alt=""
                            aria-hidden="true"
                            width={16}
                            height={16}
                            className="icon-critical"
                          />
                          {st("feedback", "genderError")}
                        </div>
                      )}
                    </fieldset>

                    {/* Footer */}
                    <div className="feedback-footer">
                      <div className="text-md-regular feedback-footer-text">
                        {st("feedback", "footerInfo")}
                        <div className="flex ">
                          <a
                            href="https://my.gov.sa/ar/content/e-participation#section-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link--primary feedback-link"
                            aria-label={`${st("feedback", "eParticipationLabel")} (${st("footer", "opensInNewWindow")})`}
                          >
                            {st("feedback", "eParticipationLabel")}
                            <Image
                              src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
                              alt=""
                              aria-hidden="true"
                              width={16}
                              height={16}
                              className="green-icon"
                            />
                          </a>
                          <span aria-hidden="true">&nbsp;و&nbsp;</span>
                          <a
                            href="https://my.gov.sa/ar/content/subscribe#section-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link--primary feedback-link"
                            aria-label={`${st("feedback", "subscriptionRulesLabel")} (${st("footer", "opensInNewWindow")})`}
                          >
                            {st("feedback", "subscriptionRulesLabel")}
                            <Image
                              src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
                              alt=""
                              aria-hidden="true"
                              width={16}
                              height={16}
                              className="green-icon"
                            />
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="dga-btn dga-btn--lg dga-btn--primary-brand"
                        onClick={handleSubmit}
                        aria-label={st("feedback", "submitAria")}
                      >
                        <span className="dga-btn-label">{st("feedback", "submit")}</span>
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
