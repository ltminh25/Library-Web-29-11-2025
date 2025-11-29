import { useEffect, useMemo, useState } from 'react';
import { useBooks } from '../components/context/BookContext';
export interface UsePaginationResult<T> {
  page: number;
  rowsPerPage: number;
  total: number;
  data: T[];
  handleChangePage: (_event: unknown, newPage: number) => void;
  setPage: (page: number) => void;
}

export default function usePagination<T>(items: T[], rows = 10): UsePaginationResult<T> {
  const {totalPages, totalItems} = useBooks();
  const [page, setPage] = useState(0);
  const rowsPerPage = rows;
  const total = totalItems;

  // Ensure page is valid when items change (e.g., filters applied)
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(total / rowsPerPage) - 1);
    if (page > maxPage) setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, rowsPerPage]);

  const data = useMemo(() => {
    const start = page * rowsPerPage;
    return items.slice(start, start + rowsPerPage);
  }, [items, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);

  return { page, rowsPerPage, total, data, handleChangePage, setPage };
}
