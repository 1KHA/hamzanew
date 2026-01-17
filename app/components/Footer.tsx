import "../styles/footer.css"
// import { DgaSearchBox, DgaTextInput } from "platformscode-new-react";
function Footer() {
  return (
   

    <div style={{backgroundColor:"#074D31"}}>
  <div className="c-ontent">
    <div className="cw-full">
      <div className="grid gap-12 pt-10 pb-6">
{/* 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-7 md:gap-[24px] pt-4 pb-10 border-2">

          <div className="footer-item">
            <div>
              <h4 className="footer-title">ملخص</h4>
            </div>
            <div className="flex justify-between">
              <img src="" alt="" />
              <div>
                <h1>
                  سجل اهتمامك
                </h1>
                <p>انضم لنشرتنا البريدية لتصلك اخر اخبار همزة</p>
              </div>
             
              
            </div>
          </div>

       

          <div className="footer-item">
            <div className="grid gap-[32px]">

              <div>
                <div className="footer-contnet grid gap-[8px]">
              
      
                  
                </div>
              </div>

              <div>
                <div className="line-title">
                  <h4 className="footer-title">أدوات الإتاحة والوصول</h4>
                </div>
                <div className="footer-contnet flex gap-[8px]">
                  <button className="border-green">تغيير وضع العرض</button>
                  <button className="border-green">تكبير</button>
                  <button className="border-green">تصغير</button>
                </div>
              </div>

            </div>
          </div>

        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] py-4 gap-[24px] text-center md:text-right">

          <div className="grid gap-[24px]">
            <div className="flex gap-[16px] justify-center md:justify-start">
              <a href="#" className="footer-link underline">الشروط و الأحكام </a>
              <a href="#" className="footer-link underline">سياسة المنصة</a>
              <a href="#" className="footer-link underline">خريطة الموقع </a>
            </div>

            <div className="grid gap-[8px]">
              <div className="footer-link font-bold">
                جميع الحقوق محفوظة لمجمع الملك سلمان العالمي للغة العربية © 2026
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
             <img
            src="/assets/image/kingSlamanGlobalAcademyLogo_white.png"
            alt=""
            className="w-[100px]"
          />
            <img
            src="/assets/image/kingSlamanGlobalAcademyLogo_white.png"
            alt=""
            className="w-[100px]"
          />
          </div>

        </div>

      </div>
    </div>
  </div>
</div>
  );
}

export default Footer;
