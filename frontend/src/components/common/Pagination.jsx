export default function Pagination({
                                       pageData,
                                       page,
                                       setPage
                                   }) {
    if (!pageData || pageData.totalPages === 0) {
        return null;
    }

    const changePage = (newPage) => {
        setPage(newPage);

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 100);
    };

    return (
        <div className="pagination">
            <button
                disabled={page === 0}
                onClick={() => changePage(page - 1)}
            >
                Prev
            </button>

            <span>
                Page {pageData.page + 1} of {pageData.totalPages}
            </span>

            <button
                disabled={pageData.last}
                onClick={() => changePage(page + 1)}
            >
                Next
            </button>
        </div>
    );
}