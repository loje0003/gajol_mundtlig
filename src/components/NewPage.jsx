import Link from "next/link";

const NewPage = ({ currentPage, totalPages }) => {
  return (
    <div className="flex justify-center items-center gap-8 mt-10 text-lg">
      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <Link key={i} href={`?page=${page}`} className={`transition pb-1 ${currentPage === page ? "border-b border-white" : ""}`}>
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages && <Link href={`?page=${currentPage + 1}`}>næste &gt;</Link>}
    </div>
  );
};

export default NewPage;
