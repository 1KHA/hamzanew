"use client";
import { useState, useEffect } from "react";
import { DgaListItem } from "platformscode-new-react";
import { DgaTabs } from "@/app/components/tabs/DgaTabs";
export default function page() {
  const [activeTab, setActiveTab] = useState(1); //  default tab 1

  //  Automatically add "active" class to first tab on mount
  useEffect(() => {
    const activateFirstTab = () => {
      const firstTab = document.querySelector(
        ".dga-tabs-list__item:first-child",
      );
      if (firstTab) firstTab.classList.add("dga-tabs-list__item--active");
    };
    setTimeout(activateFirstTab, 300); // short delay for DOM render
  }, []);

  //  Handle tab switching (manually manage DGA active class)
  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
    const allTabs = document.querySelectorAll(".dga-tabs-list__item");
    allTabs.forEach((t) => t.classList.remove("dga-tabs-list__item--active"));
    const active = allTabs[tabId - 1]; // tabId starts from 1
    if (active) active.classList.add("dga-tabs-list__item--active");
  };

  return (
    <>
      <div className="content">
        <section className="section-spacing-5xl !mb-40">
          <DgaTabs
            className="!mb-[32px] max-md:!overflow-auto"
            orientation="horizontal"
            divider
            size="lg"
            tabsList={[
              {
                label: "البيانات المفتوحة",
                // iconProps: { variant: "stroke" },
                onClick: () => handleTabChange(1),
              },
              {
                label: "ساسية البيانات المفتوحة",
                // iconProps: { variant: "stroke" },
                onClick: () => handleTabChange(2),
              },
              {
                label: "مكتبة البيانات المفتوحة",
                // iconProps: { variant: "stroke" },
                onClick: () => handleTabChange(3),
              },
              {
                label: "حالات الاستخدام للبيانات المفتوحة",
                // iconProps: { variant: "stroke" },
                onClick: () => handleTabChange(4),
              },
              {
                label: "البيانات الجيومكانية",
                // iconProps: { variant: "stroke" },
                onClick: () => handleTabChange(5),
              },
              {
                label: "البيانات اللحظية",
                // iconProps: { variant: "stroke" },
                onClick: () => handleTabChange(6),
              },
              {
                label: "احداث البيانات المفتوحة",
                // iconProps: { variant: "stroke" },
                onClick: () => handleTabChange(7),
              },
            ]}
          />

          <div className="mb-[40px] head">
            <div className="!space-y-[16px]">
              {/* ✅ Tab 1 */}
              {activeTab === 1 && (
                <div className="!grid !gap-[16px]">
                  <p className="text-md-regular mb-0">
                    البيانات المفتوحة في منصة اختبار همزة هي بيانات متاحة
                    للاستخدام العام بما يتيح الاطلاع عليها والاستفادة منها
                    لأغراض تعليمية وبحثية، وفق الأطر النظامية المعتمدة. وتهدف
                    المنصة من خلال إتاحة هذه البيانات إلى دعم الشفافية، وتحسين
                    جودة الخدمات، وتعزيز الاستفادة من البيانات في تطوير تجربة
                    الاختبارات اللغوية.
                  </p>
                  <DgaListItem
                    itemText="تعزيز الشفافية ومشاركة المستفيدين في تطوير منصة اختبار همزة."
                    level="one"
                    type="unordered"
                    className="text-md-regular"
                  />
                  <DgaListItem
                    itemText="تحسين كفاءة الخدمات التعليمية وجودة الاختبارات المقدّمة."
                    level="one"
                    type="unordered"
                    className="text-md-regular"
                  />
                  <DgaListItem
                    itemText="إتاحة الفرص لتطوير خدمات وأدوات تعليمية جديدة تعتمد على تحليل البيانات."
                    level="one"
                    type="unordered"
                    className="text-md-regular"
                  />
                </div>
              )}

              {/* ✅ Tab 2 */}
              {activeTab === 2 && (
                <div className="!grid !gap-[16px]">
                  <p className="text-md-regular !mb-0">
                    ستتوفر البيانات قريبــــــاً
                  </p>
                </div>
              )}

              {/* ✅ Tab 3 */}
              {activeTab === 3 && (
                <div className="!grid !gap-[16px]">
                  <p className="text-md-regular !mb-0">
                    ستتوفر البيانات قريبــــــاً
                  </p>
                </div>
              )}

              {/* ✅ Tab 4 */}
              {activeTab === 4 && (
                <div className="!grid !gap-[16px]">
                  <p className="text-md-regular !mb-0">
                    ستتوفر البيانات قريبــــــاً
                  </p>
                </div>
              )}
              {/* ✅ Tab 5 */}
              {activeTab === 5 && (
                <div className="!grid !gap-[16px]">
                  <p className="text-md-regular !mb-0">
                    ستتوفر البيانات قريبــــــاً
                  </p>
                </div>
              )}
              {/* ✅ Tab 6 */}
              {activeTab === 6 && (
                <div className="!grid !gap-[16px]">
                  <p className="text-md-regular !mb-0">
                    {" "}
                    ستتوفر البيانات قريبــــــاً
                  </p>
                </div>
              )}
              {/* ✅ Tab 7 */}
              {activeTab === 7 && (
                <div className="!grid !gap-[16px]">
                  <p className="text-md-regular !mb-0">
                    {" "}
                    ستتوفر البيانات قريبــــــاً
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
