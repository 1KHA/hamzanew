// import React from "react";
// import "./ScrollFrame.css";

// export interface HamzaSlide {
//   number: string;
//   content: string;
//   icon: string;
// }

// interface ScrollFrameProps {
//   slides: HamzaSlide[];
// }

// const ScrollFrame: React.FC<ScrollFrameProps> = ({ slides }) => {
//   return (
//     <div className="frame-container">
//       {/* 1. FIXED HEADER LABELS (Absolute so they stay on top) */}
//       <div className="fixed-labels-overlay">
//         <span className="subtitle">كيفية الاستفادة من همزة</span>
//         <h2 className="main-title">فوائد اختبارات همزة للجهات</h2>
//       </div>

//       {/* 2. THE SCROLLABLE TRACK */}
//       <div className="scroll-frame">
//         {slides.map((slide) => (
//           <section className="slide" key={slide.number}>
//             {/* The Card: Sticky makes it stay in place while next one overlays */}
//             <div className="sticky-card !border-2">
//               <div className="card-inner">
//                 <div
//                   className="icon-wrapper"
//                   style={
//                     {
//                       "--bg-image": `url(${slide.icon})`,
//                     } as React.CSSProperties
//                   }
//                 >
//                   <img src={slide.icon} alt="icon" className="icon-img" />
//                 </div>
//                 <div className="card-content">
//                   <p className="card-bg-id">{slide.number}</p>
//                   <p className="card-text">{slide.content}</p>
//                 </div>
//               </div>
//             </div>

//             {/* The Number: Not sticky, so it scrolls smoothly with the content */}
//             <div className="number-container">
//               <h1 className="moving-number">{slide.number}</h1>
//             </div>
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ScrollFrame;
