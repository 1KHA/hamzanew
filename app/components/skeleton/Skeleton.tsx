// Skeleton helpers — rendered during the brief SSR→hydration gap.
const InputSkeleton   = () => <div className="skeleton skeleton-input"   aria-hidden="true" />;
const TextareaSkeleton = () => <div className="skeleton skeleton-textarea" aria-hidden="true" />;
const TextSkeleton    = () => <div className="skeleton skeleton-text"    aria-hidden="true" />;
const AccordionSkeleton = () => <div className="skeleton skeleton-accordion" aria-hidden="true" />;

export { InputSkeleton, TextareaSkeleton, TextSkeleton, AccordionSkeleton };
