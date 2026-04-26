"use client";

import Button from "@/app/components/button/Button";
import { useRouter } from "next/navigation";
import type { ReactElement, ReactNode } from "react";
import "./ProfileView.css";

/* ── Types ─────────────────────────────────────────────── */

interface InfoField {
  label: string;
  value: ReactNode;
}

interface InfoTableProps {
  title: string;
  rows: InfoField[][];
  editTabId: number;
}

interface ProfileViewProps {
  userProfile?: Record<string, any>;
}

/* ── Helper maps ───────────────────────────────────────── */

const nationalityMap: Record<string, string> = {
  KW: "كويتي",
  SA: "سعودي",
  US: "أمريكي",
  EG: "مصري",
  JO: "أردني",
  AE: "إماراتي",
  OTHER: "أخرى",
};

const langMap: Record<string, string> = { ar: "العربية", en: "الإنجليزية", fr: "الفرنسية", other: "أخرى" };
const identityMap: Record<string, string> = {
  national_id: "هوية وطنية",
  iqama: "إقامة",
  passport: "جواز سفر",
};
const educationMap: Record<string, string> = {
  high_school: "ثانوية عامة",
  diploma: "دبلوم",
  bachelor: "بكالوريوس",
  master: "ماجستير",
  phd: "دكتوراه",
};

/* ── Sub-components ────────────────────────────────────── */

function InfoTable({ title, rows, editTabId }: InfoTableProps): ReactElement {
  const router = useRouter();
  return (
    <div className="info-table">
      <div className="info-table__header">
        <h3 className="text-md-bold !text-neutral-900">{title}</h3>
        <Button
          label="تعديل"
          icon="edit-02"
          variant="secondary-outline"
          iconPosition="left"
          size="sm"
          onClick={() => router.push(`/profile/update?tab=${editTabId}`)}
        />
      </div>

      <div className="flex flex-col">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-6 !p-6 !border-b !border-neutral-100"
          >
            {row.map((field, colIndex) => (
              <div key={colIndex} className="info-table__field">
                <span className="text-sm-regular !text-[#6C737F]">
                  {field.label}
                </span>
                <span className="text-md-medium !text-[#1F2A37] flex items-center justify-start gap-2">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────── */

export default function ProfileView({ userProfile }: ProfileViewProps): ReactElement {
  const u = userProfile || {};

  const personalInfoRows = [
    [
      { label: "الاسم الاول بالعربي", value: u.firstName_ar || "-" },
      { label: "الاسم الثاني بالعربي", value: u.secondName_ar || u.middleName_ar || "-" },
      { label: "الاسم الثالث بالعربي", value: u.lastName_ar || "-" },
      { label: "الاسم الاول بالانجليزي", value: u.firstName_en || "-" },
      { label: "الاسم الثاني بالانجليزي", value: u.secondName_en || u.middleName_en || "-" },
      { label: "الاسم الثالث بالانجليزي", value: u.lastName_en || "-" },
      { label: "البريد الالكتروني", value: u.email || u.emailId || "-" },
      { label: "رقم الجوال", value: u.phone || u.phoneNumber || "-" },
      {
        label: "تاريخ الميلاد",
        value: (
          <>
            <img
              src="/assets/icons/stroke-standard/calendar-03-stroke-rounded.svg"
              width={20}
              height={20}
              className="gray-icon"
              alt=""
            />
            <span>{u.birthDate || "-"}</span>
          </>
        ),
      },
    ],
    [
      {
        label: "الجنسية",
        value:
          nationalityMap[u.nationality] || u.nationality || "-",
      },
      {
        label: "لغة الأم",
        value: langMap[u.motherTongue] || u.motherTongue || "-",
      },
      {
        label: "الإثبات",
        value: identityMap[u.identity] || u.identity || "-",
      },
      {
        label: "رقم الإثبات",
        value: (
          <>
            <img
              src="/assets/icons/stroke-standard/identity-card-stroke-rounded.svg"
              width={20}
              height={20}
              className="gray-icon"
              alt=""
            />
            <span>{u.identityNumber || "-"}</span>
          </>
        ),
      },
      {
        label: "نسخة من الاثبات",
        value: (
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="!flex !items-center !gap-2 !p-[8px] border! border-[#d0d5dd]! rounded-[4px]! bg-white! hover:bg-[#f9fafb]! transition-all no-underline! w-full max-w-[334px]"
          >
            <img
              src="/assets/icons/stroke-standard/document-attachment-stroke-rounded.svg"
              width={20}
              height={20}
              className="gray-icon"
              alt=""
            />
            <span className="text-[#344054] text-sm-regular truncate flex-1">
              {u.identityFile || "-"}
            </span>
          </a>
        ),
      },
    ],
  ];

  const educationInfoRows = [
    [
      {
        label: "المؤهل الدراسي",
        value: educationMap[u.education] || u.education || "-",
      },
      { label: "التخصص", value: u.specialization || "-" },
      { label: "الجامعة", value: u.institution || u.university || "-" },
      {
        label: "اللغة الأساسية في التعليم",
        value: (
          <span>
            {langMap[u.basicLanguageInEducation] || u.basicLanguageInEducation || "-"}
          </span>
        ),
      },
    ],
  ];

  const locationInfoRows = [
    [
      { label: "الدولة", value: u.country || "-" },
      { label: "المنطقة", value: u.state || "-" },
      { label: "المدينة", value: u.city || "-" },
      {
        label: "العنوان البريدي",
        value: <span>{u.postalAddress || u.street || "-"}</span>,
      },
      {
        label: "الرمز البريدي",
        value: <span>{u.zipCode || "-"}</span>,
      },
    ],
  ];

  return (
    <div className="flex flex-col gap-6">
      <InfoTable
        title="المعلومات الشخصية"
        rows={personalInfoRows}
        editTabId={1}
      />
      <InfoTable
        title="المعلومات الدراسية"
        rows={educationInfoRows}
        editTabId={2}
      />
      <InfoTable title="معلومات الموقع" rows={locationInfoRows} editTabId={3} />
    </div>
  );
}
