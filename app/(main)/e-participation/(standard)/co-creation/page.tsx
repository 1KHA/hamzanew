import { Metadata } from "next";
import Card from "@/app/components/card/Card";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  return {
    title: st("eParticipation", "coCreationTitle", locale),
  };
}

export default async function page() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  return (
    <>
      <div className="content">
        <div className="section-spacing-5xl !mb-60">
          <div className=" !grid !grid-cols-1 !gap-8">
            <p className="text-md-regular !leading-[24px]">
              {st("eParticipation", "coCreationDescription", locale)}
            </p>
            <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3">
              <Card
                title={st("eParticipation", "platformTafaolName", locale)}
                style={{
                  border: "none",
                  boxShadow:
                    "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
                }}
                linkSecondaryAction="https://eparticipation.my.gov.sa/"
                external={true}
                primaryTrailIconType="link-square-01"
                buttonIconOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
