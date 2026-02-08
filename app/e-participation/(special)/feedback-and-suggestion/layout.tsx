"use client";

import { useState, type ReactNode } from "react";
import DgaBreadcrumbs from "@/app/components/breadcrumbs/BreadCrumbs";
import { DgaDivider, DgaLink } from "platformscode-new-react";
import Image from "next/image";
import LastModified from "@/app/components/last-modified/LastModified";

const COPY_ICON_PATH = "/assets/icons/stroke-standard/copy-01-stroke-rounded.svg";
export default function Layout({ children }: { children: ReactNode }) {
  const [showTooltip, setShowTooltip] = useState(false);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <>
      <div className="custom-container section-spacing-5xl">
        {/* full-width area */}
        <section className="w-full">
          <div className="px-4 xl:px-8 py-10">
            <div>
              <DgaBreadcrumbs
                items={[
                  { label: "الرئيسية", path: "/" },
                  { label: "عن الجهة", disabled: true },
                  { label: "عن همزة", disabled: true },
                  { label: "عن الجهة", disabled: true },
                  { label: "المشاركة الإلكترونية", path: "/e-participation" },
                  { label: " الشكاوى والمقترحات", disabled: true },
                ]}
                max={4}
              />
            </div>
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* <div> */}

              {/* </div> */}
              <div>
                <div className="!pt-6 !flex !flex-col !gap-4">
                  {/* Hero section */}
                  <h1 className="section-title">الشكاوى والمقترحات</h1>
                  <p className="text-md-regular !leading-[32px] max-w-3xl">
                    نحرص في منصة همزة على تحسين تجربتك بشكل مستمر.
                    <br />
                    من خلال هذا النموذج يمكنك إرسال شكوى، ملاحظة، أو اقتراح بكل
                    سهولة، وسيتم مراجعتها من قبل الفريق المختص في أقرب وقت ممكن.
                    <br />
                    رأيك يهمنا، ويساعدنا في تطوير اختبارات همزة والارتقاء بجودة
                    المحتوى والخدمة المقدّمة لك.
                  </p>
                </div>
                {children}
              </div>

              <aside className=" !p-6 !shadow-sm !rounded-[16px] !border !border-[#D2D6DB] !bg-white">
                <div>
                  <div className="!flex !flex-col !gap-4">
                    <h1 className="text-xl-bold">تواصل معنا</h1>
                    {/* First  */}
                    <div className="!flex !flex-row !justify-start !items-start !gap-2">
                      <Image
                        src="/assets/icons/stroke-standard/call-stroke-rounded.svg"
                        alt="call-icon"
                        width={24}
                        height={24}
                        className="icon-green"
                      />
                      <div className="!flex !flex-col !justify-start !gap-2">
                        <h3 className="text-md-bold">رقم الجوال </h3>
                        <div className="!flex !flex-row !justify-start !gap-2 ">
                          <DgaLink
                            label="9200343222"
                            size="md"
                            variant="primary"
                            // onOnClick={(e) =>copyToClipboard(e.currentTarget.textContent || "")}
                          />
                          <Image
                            src={COPY_ICON_PATH}
                            alt="copy-icon"
                            width={20}
                            height={20}
                            className="icon-green !cursor-pointer"
                            onClick={() => copyToClipboard("9200343222")}
                          />
                        </div>
                      </div>
                    </div>
                    {/* second  */}
                    <div className="!flex !flex-row !justify-start !items-start !gap-2">
                      <Image
                        src="/assets/icons/stroke-standard/message-02-stroke-rounded.svg"
                        alt="message-icon"
                        width={24}
                        height={24}
                        className="icon-green"
                      />
                      <div className="!flex !flex-col !justify-start !gap-2">
                        <h3 className="text-md-bold">رسالة قصيرة</h3>
                        <div className="!flex !flex-row !justify-start !gap-2 ">
                          <DgaLink
                            label="199099"
                            size="md"
                            variant="primary"
                            // onOnClick={(e) =>copyToClipboard(e.currentTarget.textContent || "")}
                          />
                          <Image
                            src={COPY_ICON_PATH}
                            alt="copy-icon"
                            width={20}
                            height={20}
                            className="icon-green !cursor-pointer"
                            onClick={() => copyToClipboard("199099")}
                          />
                        </div>
                      </div>
                    </div>
                    {/* third  */}
                    <div className="!flex !flex-row !justify-start !items-start !gap-2">
                      <Image
                        src="/assets/icons/stroke-standard/mail-01-stroke-rounded.svg"
                        alt="mail-icon"
                        width={24}
                        height={24}
                        className="icon-green"
                      />
                      <div className="!flex !flex-col !justify-start !gap-2">
                        <h3 className="text-md-bold">البريد الالكتروني</h3>
                        <div className="!flex !flex-row !justify-start !gap-2 ">
                          <DgaLink
                            label="help@hamza.sa"
                            size="md"
                            variant="primary"
                            // onOnClick={(e) =>copyToClipboard(e.currentTarget.textContent || "")}
                          />
                          <Image
                            src={COPY_ICON_PATH}
                            alt="copy-icon"
                            width={20}
                            height={20}
                            className="icon-green !cursor-pointer"
                            onClick={() => copyToClipboard("help@hamza.sa")}
                          />
                        </div>
                      </div>
                    </div>
                    {/* forth  */}
                    <div className="!flex !flex-row !justify-start !items-start !gap-2">
                      <Image
                        src="/assets/icons/stroke-standard/mail-01-stroke-rounded.svg"
                        alt="mail-icon"
                        width={24}
                        height={24}
                        className="icon-green"
                      />
                      <div className="!flex !flex-col !justify-start !gap-2">
                        <h3 className="text-md-bold">فاكس</h3>
                        <div className="!flex !flex-row !justify-start !gap-2 ">
                          <DgaLink
                            label="00966-11-434-6654"
                            size="md"
                            variant="primary"
                            // onOnClick={(e) =>copyToClipboard(e.currentTarget.textContent || "")}
                          />
                          <Image
                            src={COPY_ICON_PATH}
                            alt="copy-icon"
                            width={20}
                            height={20}
                            className="icon-green !cursor-pointer"
                            onClick={() => copyToClipboard("00966-11-434-6654")}
                          />
                        </div>
                      </div>
                    </div>
                    {/* fifth  */}
                    <div className="!flex !flex-row !justify-start !items-start !gap-2">
                      <Image
                        src="/assets/icons/stroke-standard/location-01-stroke-rounded.svg"
                        alt="location-icon"
                        width={24}
                        height={24}
                        className="icon-green"
                      />
                      <div className="!flex !flex-col !justify-start !gap-2">
                        <h3 className="text-md-bold">الموقع</h3>
                        <div className="!flex !flex-row !justify-start !gap-2 ">
                          <DgaLink
                            label="الرياض"
                            size="md"
                            variant="primary"
                            // onOnClick={(e) =>copyToClipboard(e.currentTarget.textContent || "")}
                          />
                          <Image
                            src="/assets/icons/stroke-standard/link-04-stroke-rounded.svg"
                            alt="link-icon"
                            width={20}
                            height={20}
                            className="icon-green"
                          />
                        </div>
                      </div>
                    </div>
                    {/* sixth  */}
                    <div className="!flex !flex-row !justify-start !items-start !gap-2">
                      {/* <Image
                        src="/assets/icons/stroke-standard/location-01-stroke-rounded.svg"
                        alt="mail-icon"
                        width={24}
                        height={24}
                        className="icon-green"
                      /> */}
                      <div className="!flex !flex-col !justify-start !gap-2">
                        <h3 className="text-md-bold">تابعنا على</h3>
                        <div className="!flex !flex-row !justify-start !gap-2 ">
                          <div className="!flex !flex-row !justify-start !gap-2 !p-1 !cursor-pointer">
                            <Image
                              src="/assets/icons/stroke-standard/instagram-stroke-rounded.svg"
                              alt="copy-icon"
                              width={20}
                              height={20}
                              // className="!p-1"
                            />
                          </div>
                          <div className="!flex !flex-row !justify-start !gap-2 !p-1 !cursor-pointer">
                            <Image
                              src="/assets/icons/stroke-standard/linkedin-02-stroke-rounded.svg"
                              alt="copy-icon"
                              width={20}
                              height={20}
                              // className="!p-1"
                            />
                          </div>
                          <div className="!flex !flex-row !justify-start !gap-2 !p-1 !!cursor-pointer">
                            <Image
                              src="/assets/icons/stroke-standard/new-twitter-stroke-rounded.svg"
                              alt="copy-icon"
                              width={20}
                              height={20}
                              // className="!p-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="!text-[#D2D6DB] !my-6" />
                    <div className="!flex !flex-col !gap-4">
                      <h1 className="text-xl-bold">اتصالات الطوارئ</h1>

                      {/* 1 */}
                      <div className="!flex !flex-row !justify-start !items-start !gap-2">
                        <div className="!flex !flex-row !justify-start !gap-2">
                          <h3 className="text-md-bold">الدفاع المدني</h3>
                          <div className="!flex !flex-row !justify-start !gap-2 ">
                            <DgaLink
                              label="998"
                              size="md"
                              variant="primary"
                              // onOnClick={(e) =>copyToClipboard(e.currentTarget.textContent || "")}
                            />
                            <Image
                              src={COPY_ICON_PATH}
                              alt="copy-icon"
                              width={20}
                              height={20}
                              className="icon-green !cursor-pointer"
                              onClick={() => copyToClipboard("998")}
                            />
                          </div>
                        </div>
                      </div>
                      {/* 2 */}
                      <div className="!flex !flex-row !justify-start !items-start !gap-2">
                        <div className="!flex !flex-row !justify-start !gap-2">
                          <h3 className="text-md-bold">الشرطة</h3>
                          <div className="!flex !flex-row !justify-start !gap-2 ">
                            <DgaLink
                              label="999"
                              size="md"
                              variant="primary"
                              // onOnClick={(e) =>copyToClipboard(e.currentTarget.textContent || "")}
                            />
                            <Image
                              src={COPY_ICON_PATH}
                              alt="copy-icon"
                              width={20}
                              height={20}
                              className="icon-green !cursor-pointer"
                              onClick={() => copyToClipboard("999")}
                            />
                          </div>
                        </div>
                      </div>
                      {/* 3 */}
                      <div className="!flex !flex-row !justify-start !items-start !gap-2">
                        <div className="!flex !flex-row !justify-start !gap-2">
                          <h3 className="text-md-bold">الإسعاف</h3>
                          <div className="!flex !flex-row !justify-start !gap-2 ">
                            <DgaLink
                              label="997"
                              size="md"
                              variant="primary"
                              // onOnClick={(e) =>copyToClipboard(e.currentTarget.textContent || "")}
                            />
                            <Image
                              src={COPY_ICON_PATH}
                              alt="copy-icon"
                              width={20}
                              height={20}
                              className="icon-green !cursor-pointer"
                              onClick={() => copyToClipboard("997")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
      {/* tooltip notification */}
      {showTooltip && (
        <div className="!fixed !bottom-10 !left-1/2 !-translate-x-1/2 !bg-[#101828] !text-white !px-4 !py-2 !rounded-lg !shadow-lg !z-[9999] !flex !items-center !gap-2 !animate-in !fade-in !slide-in-from-bottom-4 !duration-300">
          <span className="!text-sm !font-medium">تم نسخ النص بنجاح</span>
          <Image
            src="/assets/icons/stroke-standard/checkmark-circle-02-stroke-rounded.svg"
            alt="success"
            width={20}
            height={20}
            className="icon-green"
          />
        </div>
      )}
      {/* Last update Date and time */}

      <LastModified
        date="31/12/2025"
        time="2:00 م"
        className="custom-container"
      />
    </>
  );
}
