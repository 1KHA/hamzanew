"use client"
import Button from "./components/button/Button";
import { useRouter } from "next/navigation";
export default function notFound() {
  const router = useRouter();
  return (
    <div className="content">
      <div className="section-spacing-5xl !flex !flex-col !items-center !justify-center !gap-16">
        <img
          src="/assets/image/404.png"
          width={450}
          height={324}
          alt="404 Not Found"
        />
        <div className="!flex !flex-col !gap-8 !items-center !justify-center">
          <div className="!flex !flex-col !gap-4 !items-center !justify-center">
            <h1 className="display-xs-semibold">حدث خطأ</h1>
            <p className="text-lg-medium !font-normal">عذراً، لم نستطع إيجاد الصفحة التي تبحث عنها</p>
          </div>
          <Button
            label="الرجوع للرئيسية"
            variant="primary-brand"
            size="lg"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    </div>
  );
}
