import Loading from "@/app/components/loading/Loading";

export default function PageLoading() {
  return (
    <div className="flex flex-1 justify-center items-center min-h-[60vh]">
      <Loading size="huge" variant="brand" />
    </div>
  );
}
