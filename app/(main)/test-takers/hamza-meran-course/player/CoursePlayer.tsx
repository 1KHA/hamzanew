"use client";

import { useState, useRef, useCallback } from "react";
import AccordionItem from "@/app/components/accordion/Accordion";
import "./course-player.css";

/* ── Types ──────────────────────────────────────────────────────────────── */

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

/* ── Static course data ─────────────────────────────────────────────────── */

const CHAPTERS: Chapter[] = [
  {
    id: "ch1",
    title: "الوحدة الأولى: الفهم المسموع",
    lessons: [
      {
        id: "l1-1",
        title: "مقدمة في الاستماع",
        duration: "5:20",
        videoUrl: "",
      },
      {
        id: "l1-2",
        title: "استراتيجيات الاستماع الفعّال",
        duration: "7:45",
        videoUrl: "",
      },
      {
        id: "l1-3",
        title: "أنواع نصوص الاستماع",
        duration: "6:30",
        videoUrl: "",
      },
    ],
  },
  {
    id: "ch2",
    title: "الوحدة الثانية: استيعاب المقروء",
    lessons: [
      {
        id: "l2-1",
        title: "مهارات القراءة الأكاديمية",
        duration: "8:10",
        videoUrl: "",
      },
      {
        id: "l2-2",
        title: "تحليل النصوص التحليلية",
        duration: "9:00",
        videoUrl: "",
      },
      {
        id: "l2-3",
        title: "فهم المفردات في السياق",
        duration: "5:50",
        videoUrl: "",
      },
    ],
  },
  {
    id: "ch3",
    title: "الوحدة الثالثة: الكتابة",
    lessons: [
      {
        id: "l3-1",
        title: "بناء الفقرة الأكاديمية",
        duration: "10:15",
        videoUrl: "",
      },
      {
        id: "l3-2",
        title: "أنواع المقالات الأكاديمية",
        duration: "7:30",
        videoUrl: "",
      },
      {
        id: "l3-3",
        title: "مراجعة الأخطاء الشائعة",
        duration: "6:00",
        videoUrl: "",
      },
    ],
  },
  {
    id: "ch4",
    title: "الوحدة الرابعة: التحدث",
    lessons: [
      {
        id: "l4-1",
        title: "مهارات التحدث والطلاقة",
        duration: "6:45",
        videoUrl: "",
      },
      {
        id: "l4-2",
        title: "أنشطة التحدث التفاعلية",
        duration: "8:20",
        videoUrl: "",
      },
      {
        id: "l4-3",
        title: "التقييم والتحسين الذاتي",
        duration: "5:10",
        videoUrl: "",
      },
    ],
  },
];

const ALL_LESSONS: Lesson[] = CHAPTERS.flatMap((ch) => ch.lessons);
const TOTAL_LESSONS = ALL_LESSONS.length;

function findNextLesson(currentId: string): Lesson | null {
  const idx = ALL_LESSONS.findIndex((l) => l.id === currentId);
  if (idx === -1 || idx === TOTAL_LESSONS - 1) return null;
  return ALL_LESSONS[idx + 1];
}

function getChapterOf(lessonId: string): Chapter | undefined {
  return CHAPTERS.find((ch) => ch.lessons.some((l) => l.id === lessonId));
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6l3 3 5-5"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */

export default function CoursePlayer() {
  const [currentLessonId, setCurrentLessonId] = useState(ALL_LESSONS[0].id);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(),
  );
  const [openChapters, setOpenChapters] = useState<Set<string>>(
    new Set(["ch1"]),
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentLesson =
    ALL_LESSONS.find((l) => l.id === currentLessonId) ?? ALL_LESSONS[0];
  const completedCount = completedLessons.size;
  const progress = Math.round((completedCount / TOTAL_LESSONS) * 100);

  const openChapterOf = useCallback((lessonId: string) => {
    const chapter = getChapterOf(lessonId);
    if (chapter) {
      setOpenChapters((prev) => new Set([...prev, chapter.id]));
    }
  }, []);

  const selectLesson = useCallback(
    (lesson: Lesson) => {
      setCurrentLessonId(lesson.id);
      openChapterOf(lesson.id);
      if (videoRef.current) {
        videoRef.current.load();
      }
    },
    [openChapterOf],
  );

  const handleVideoEnd = useCallback(() => {
    setCompletedLessons((prev) => new Set([...prev, currentLessonId]));
    const next = findNextLesson(currentLessonId);
    if (next) {
      setCurrentLessonId(next.id);
      openChapterOf(next.id);
    }
  }, [currentLessonId, openChapterOf]);

  const toggleChapter = useCallback((chapterId: string) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  }, []);

  return (
    <div className="course-player custom-container">
      {/* ── Video area ───────────────────────────────────────────────────── */}
      <div className="course-player__video-area">
        <div className="course-player__video-wrapper">
          <video
            ref={videoRef}
            key={currentLessonId}
            className="course-player__video"
            controls
            onEnded={handleVideoEnd}
            src={currentLesson.videoUrl || undefined}
          >
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>
        <h1 className="course-player__lesson-title">{currentLesson.title}</h1>
      </div>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="course-player__sidebar" aria-label="محتوى الدورة">
        {/* Progress card */}
        <div className="course-player__progress-card">
          <div className="course-player__progress-label">
            <span className="course-player__progress-text">نسبة الإنجاز</span>
            <span className="course-player__progress-pct">{progress}%</span>
          </div>
          <div
            className="course-player__progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="نسبة إنجاز الدورة"
          >
            <div
              className="course-player__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="course-player__progress-count">
            {completedCount} / {TOTAL_LESSONS} درس مكتمل
          </p>
        </div>

        {/* Chapter accordion */}
        <div className="course-player__chapters">
          <h2 className="course-player__chapters-title">محتوى الدورة</h2>

          {CHAPTERS.map((chapter) => {
            const isOpen = openChapters.has(chapter.id);
            const completedInChapter = chapter.lessons.filter((l) =>
              completedLessons.has(l.id),
            ).length;

            return (
              <AccordionItem
                key={chapter.id}
                title={chapter.title}
                size="md"
                isOpen={isOpen}
                onToggle={() => toggleChapter(chapter.id)}
                headerSuffix={
                  <span className="course-player__chapter-meta">
                    {completedInChapter}/{chapter.lessons.length}
                  </span>
                }
              >
                <ul className="course-player__lesson-list" role="list">
                  {chapter.lessons.map((lesson) => {
                    const isDone = completedLessons.has(lesson.id);
                    const isActive = currentLessonId === lesson.id;

                    return (
                      <li key={lesson.id} role="listitem">
                        <button
                          type="button"
                          className={[
                            "lesson-item",
                            isActive ? "lesson-item--active" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => selectLesson(lesson)}
                          aria-current={isActive ? "true" : undefined}
                        >
                          <span
                            className={[
                              "lesson-item__check",
                              isDone ? "lesson-item__check--done" : "",
                              isActive && !isDone
                                ? "lesson-item__check--active"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            aria-label={isDone ? "مكتمل" : "غير مكتمل"}
                          >
                            {isDone && <CheckIcon />}
                          </span>
                          <span className="lesson-item__info">
                            <span
                              className={`lesson-item__title${isActive ? " lesson-item__title--active" : ""}`}
                            >
                              {lesson.title}
                            </span>
                            <span className="lesson-item__duration">
                              {lesson.duration}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </AccordionItem>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
