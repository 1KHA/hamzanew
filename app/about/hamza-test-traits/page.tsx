"use client";
import Card from "@/app/components/card/Card";
import bg from "@/public/assets/image/bg-image.png";
import "../about.css";
export default function page() {
  const traits = [
    {
      number: "1",
      title: "مصممة بأفضل معايير الأمان",
      description:
        "تضمن حماية البيانات، والتحقق من هوية المختبرين باستخدام تقنيات حديثة.",
    },
    {
      number: "2",
      title: "مُحوسبة وسهلة التطبيق",
      description:
        "يمكن تطبيقها في المراكز التعليمية أو عن بُعد، مع تجربة استخدام سلسة للمتقدمين والمشرفين.",
    },
    {
      number: "3",
      title: "شاملة وتقيس مختلف المهارات اللغوية",
      description:
        "تغطي مهارات القراءة، الكتابة، الاستماع، والتراكيب اللغوية، لتقديم صورة متكاملة عن مستوى المتقدم.",
    },
    {
      number: "4",
      title: "معيارية وموثوقة",
      description:
        "تعتمد همزة على أسس علمية ومعايير قياس معتمدة لضمان دقة النتائج وعدالتها بين جميع المتقدمين.",
    },
  ];

  const traitsCards = traits.map((trait) => (
    <Card
      key={trait.number}
      style={{

        alignSelf: "stretch",
        flex: "1 0 0",
        border: "none"
      }}
      number={trait.number}
      title={trait.title}
      description={trait.description}
    />
  ));
  return (
    <>
      <div className="block-padding-10xl bg-color-grey-50"
 style={{
  backgroundColor: "#f9fafb",
  backgroundImage: `url(${bg.src})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "1233.365px 0px",
 
}}

      >
        <div className="stack-xl custom-container">
          <h1 className="section-header">السمات</h1>
          <div className="grid-cols-4-gap-24">
            {traitsCards}
          </div>
        </div>
      </div>
    </>
  );
}
