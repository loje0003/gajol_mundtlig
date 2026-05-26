import Link from "next/link";

export default function Pagination({ currentPage, totalPages }) {
  return (
    <div className="flex justify-center items-center gap-8 mt-10 text-lg">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <Link key={page} href={`/events?page=${page}`} className={`transition pb-1 ${currentPage === page ? "border-b border-white" : ""}`}>
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages && <Link href={`/events?page=${currentPage + 1}`}>næste &gt;</Link>}
    </div>
  );
}
