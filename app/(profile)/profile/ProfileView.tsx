"use client";

import Button from "@/app/components/button/Button";
import { useRouter } from "next/navigation";
import type { ReactElement, ReactNode } from "react";
import { st } from "@/app/_lib/static-text";
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

function getNationalityMap(): Record<string, string> {
  return {
    KW: st("profile", "valueNationalityKW"),
    SA: st("profile", "valueNationalitySA"),
    US: st("profile", "valueNationalityUS"),
    EG: st("profile", "valueNationalityEG"),
    JO: st("profile", "valueNationalityJO"),
    AE: st("profile", "valueNationalityAE"),
    OTHER: st("profile", "valueNationalityOther"),
  };
}

function getLangMap(): Record<string, string> {
  return {
    ar: st("profile", "valueLangAr"),
    en: st("profile", "valueLangEn"),
    fr: st("profile", "valueLangFr"),
    other: st("profile", "valueLangOther"),
  };
}

function getIdentityMap(): Record<string, string> {
  return {
    national_id: st("profile", "valueIdentityNationalId"),
    iqama: st("profile", "valueIdentityIqama"),
    passport: st("profile", "valueIdentityPassport"),
  };
}

function getEducationMap(): Record<string, string> {
  return {
    high_school: st("profile", "valueEducationHighSchool"),
    diploma: st("profile", "valueEducationDiploma"),
    bachelor: st("profile", "valueEducationBachelor"),
    master: st("profile", "valueEducationMaster"),
    phd: st("profile", "valueEducationPhd"),
  };
}

/* ── Sub-components ────────────────────────────────────── */

function InfoTable({ title, rows, editTabId }: InfoTableProps): ReactElement {
  const router = useRouter();
  return (
    <div className="info-table">
      <div className="info-table__header">
        <h3 className="text-md-bold !text-neutral-900">{title}</h3>
        <Button
          label={st("profile", "editBtn")}
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
  const nationalityMap = getNationalityMap();
  const langMap = getLangMap();
  const identityMap = getIdentityMap();
  const educationMap = getEducationMap();
  const dash = st("profile", "placeholderDash");

  const personalInfoRows = [
    [
      { label: st("profile", "labelFirstNameAr"), value: u.firstName_ar || dash },
      { label: st("profile", "labelSecondNameAr"), value: u.secondName_ar || u.middleName_ar || dash },
      { label: st("profile", "labelLastNameAr"), value: u.lastName_ar || dash },
      { label: st("profile", "labelFirstNameEn"), value: u.firstName_en || dash },
      { label: st("profile", "labelSecondNameEn"), value: u.secondName_en || u.middleName_en || dash },
      { label: st("profile", "labelLastNameEn"), value: u.lastName_en || dash },
      { label: st("profile", "labelEmail"), value: u.email || u.emailId || dash },
      { label: st("profile", "labelPhone"), value: u.phone || u.phoneNumber || dash },
      {
        label: st("profile", "labelBirthDate"),
        value: (
          <>
            <img
              src="/assets/icons/stroke-standard/calendar-03-stroke-rounded.svg"
              width={20}
              height={20}
              className="gray-icon"
              alt=""
            />
            <span>{u.birthDate || dash}</span>
          </>
        ),
      },
    ],
    [
      {
        label: st("profile", "labelNationality"),
        value:
          nationalityMap[u.nationality] || u.nationality || dash,
      },
      {
        label: st("profile", "labelMotherTongue"),
        value: langMap[u.motherTongue] || u.motherTongue || dash,
      },
      {
        label: st("profile", "labelIdentity"),
        value: identityMap[u.identity] || u.identity || dash,
      },
      {
        label: st("profile", "labelIdentityNumber"),
        value: (
          <>
            <img
              src="/assets/icons/stroke-standard/identity-card-stroke-rounded.svg"
              width={20}
              height={20}
              className="gray-icon"
              alt=""
            />
            <span>{u.identityNumber || dash}</span>
          </>
        ),
      },
      {
        label: st("profile", "labelIdentityFile"),
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
              {u.identityFile || dash}
            </span>
          </a>
        ),
      },
    ],
  ];

  const educationInfoRows = [
    [
      {
        label: st("profile", "labelEducation"),
        value: educationMap[u.education] || u.education || dash,
      },
      { label: st("profile", "labelSpecialization"), value: u.specialization || dash },
      { label: st("profile", "labelInstitution"), value: u.institution || u.university || dash },
      {
        label: st("profile", "labelBasicLanguageInEducation"),
        value: (
          <span>
            {langMap[u.basicLanguageInEducation] || u.basicLanguageInEducation || dash}
          </span>
        ),
      },
    ],
  ];

  const locationInfoRows = [
    [
      { label: st("profile", "labelCountry"), value: u.country || dash },
      { label: st("profile", "labelState"), value: u.state || dash },
      { label: st("profile", "labelCity"), value: u.city || dash },
      {
        label: st("profile", "labelPostalAddress"),
        value: <span>{u.postalAddress || u.street || dash}</span>,
      },
      {
        label: st("profile", "labelZipCode"),
        value: <span>{u.zipCode || dash}</span>,
      },
    ],
  ];

  return (
    <div className="flex flex-col gap-6">
      <InfoTable
        title={st("profile", "sectionPersonalInfo")}
        rows={personalInfoRows}
        editTabId={1}
      />
      <InfoTable
        title={st("profile", "sectionEducation")}
        rows={educationInfoRows}
        editTabId={2}
      />
      <InfoTable title={st("profile", "sectionLocation")} rows={locationInfoRows} editTabId={3} />
    </div>
  );
}
