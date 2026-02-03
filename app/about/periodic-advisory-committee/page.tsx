"use client";
import Card from "@/app/components/card/Card";
import "../about.css";
export default function page() {
  const mainTasks = [
    {
      Number: "1",
      content:
        "مراجعة الأطر المنهجية والمعايير المرجعية لاخـــــــــــــــتبــــــــــــــارات هــــــــــــمــــــــزة.",
    },
    {
      Number: "2",
      content:
        "تقديـــــــم التوصيــــــــــــــات العلميـــــــــــــــــــة لدعـــــم السياسات التطويرية وضمان الجودة.",
    },
    {
      Number: "3",
      content:
        "تغطي مهارات القراءة، الكتابة، الاستماع، والتراكيب اللغوية، لتقديم صورة متكاملة عن مستوى المتقدم.",
    },
    {
      Number: "4",
      content:
        "تقييم تقارير الصلاحية والموثوقية وتقديم الملاحظات العلمية حولها.",
    },
    {
      Number: "5",
      content:
        "الإسهام في ربط المشروع بخبرات وممارسات عالمية في مجال تعليم اللغات وقياسها.",
    },
    {
      Number: "6",
      content:
        "دعم استدامة الاختبارات من خلال المشورة في القضايا العلمية والأكاديمية المستجدة.",
    },
  ];

  const committeeMemebers = [
    {
      id: "1",
      image: "/assets/image/member2.png",
      name: "د. زايد العمري",
      content: "المعهد الوطني للتعلم الرقمي",
    },
    {
      id: "2",
      image: "/assets/image/member1.png",
      name: "د. زايد العمري",
      content: "المعهد الوطني للتعلم الرقمي",
    },
    {
      id: "3",
      image: "/assets/image/member.png",
      name: "د. زايد العمري",
      content: "المعهد الوطني للتعلم الرقمي",
    },
    {
      id: "4",
      image: "/assets/image/member2.png",
      name: "د. زايد العمري",
      content: "المعهد الوطني للتعلم الرقمي",
    },
    {
      id: "5",
      image: "/assets/image/member2.png",
      name: "د. زايد العمري",
      content: "المعهد الوطني للتعلم الرقمي",
    },
    {
      id: "6",
      image: "/assets/image/member2.png",
      name: "د. زايد العمري",
      content: "المعهد الوطني للتعلم الرقمي",
    },
    {
      id: "7",
      image: "/assets/image/member2.png",
      name: "د. زايد العمري",
      content: "المعهد الوطني للتعلم الرقمي",
    },
    {
      id: "8",
      image: "/assets/image/member2.png",
      name: "د. زايد العمري",
      content: "المعهد الوطني للتعلم الرقمي",
    },
  ];

  const mainTaksCards = mainTasks.map((task, index) => {
    return (
      <Card
        style={{
          //   display: "flex",
          //   padding: "var(--Global-spacing-xl, 16px)",
          //   flexDirection: "column",
          //   alignItems: "flex-end",
        //   gap: "var(--Card-card-lg-gap, 24px)",
          //   flex: "1 0 0",
          //   alignSelf: "stretch",
          borderRadius: "var(--radius-lg, 16px)",
          background: "#F9FAFB",
          border: "none",
          lineHeight: "var(--Line-Height-Text-line-heights-text-lg, 28px)",
        }}
        key={index}
        title={task.content}
        number={task.Number}
        isImgCenter={true}
      />
    );
  });

  const committeeMembersCards = committeeMemebers.map((member) => {
    return (
      <Card
        key={member.id}
        style={{
          padding: "var(--Global-spacing-xl, 16px)",
        //   gap: "var(--Card-card-lg-gap, 24px)",
          borderRadius: "var(--radius-lg, 16px)",
          border: "1px solid var(--Border-border-neutral-primary, #D2D6DB)",
          //   background: "var(--Background-background-card, #FFF)",
        }}
        title={member.name}
        description={member.content}
        image={member.image}
      />
    );
  });
  return (
    <>
      {/* upper section */}
      <div className=" stack upper-section custom-container ">
        <div className="content-stack">
          <h1 className="section-header">المهام الرئيسة</h1>
          <div className="tasks-cards-container">{mainTaksCards}</div>
        </div>

        {/* bottom section */}
        <div className="">
          <div className="content-stack">
            <h1 className="section-header">أعضاء اللجنة الاستشارية الدورية</h1>
            <div className="members-cards-container">
              {committeeMembersCards}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
