import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { authApi, staffTransactionApi, transactionApi } from "../../api";
import { getRoleFromToken } from "../../utils/jwtUtils";

export interface TransactionDetail {
  bookTitle: string;
  conditionNote: string;
  status: "BORROWED" | "RETURNED";
}

export interface Transaction {
  id: number;
  borrowDate: number[];
  dueDate: number[];
  returnDate: number[] | null;
  fineAmount: number | null;
  note?: string;
  status: "BORROWED" | "RETURNED";
  readerName: string;
  staffName: string;
  details: TransactionDetail[];
}

interface TransactionDetailRequest {
  bookId: number;
  conditionNote: string;
}

interface TransactionRequest {
  readerId: number;
  transactionDetails: TransactionDetailRequest[];
  note?: string;
  dueDate: string; // ISO format
}

interface TransactionContextType {
  transaction: Transaction[];
  createTransaction: (data: TransactionRequest) => Promise<void>;
  returnTransaction: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
  fetchTransactionHistory: () => Promise<void>;
  calcFineDays: (t: Transaction) => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load history (reader uses /transaction/history, staff/admin uses staff endpoint)
  const fetchTransactionHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const role = authApi.getRole();

      const res =
        role === "READER"
          ? await transactionApi.getHistory()
          : await staffTransactionApi.getBorrowedTransactions();

      setTransaction(res as any);
    } catch (err: any) {
      console.error("Lỗi khi tải lịch sử giao dịch:", err);
      setError(err.message || "Không thể tải dữ liệu giao dịch");
    } finally {
      setLoading(false);
    }
  }, []);

  const calcFineDays = useCallback((t: Transaction): number => {
    if (!t.returnDate) return 0;

    const due = new Date(t.dueDate[0], (t.dueDate[1] || 1) - 1, t.dueDate[2] || 1);
    const returned = new Date(t.returnDate[0], (t.returnDate[1] || 1) - 1, t.returnDate[2] || 1);

    const diffMs = returned.getTime() - due.getTime();
    return Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24)), 0);
  }, []);

  const createTransaction = useCallback(async (data: TransactionRequest) => {
    setLoading(true);
    setError(null);
    try {
      await staffTransactionApi.createTransaction(data as any);
      await fetchTransactionHistory();
    } catch (err: any) {console.error("Lỗi khi tạo giao dịch:", err);
      setError(err.response?.data || err.message);
      alert("Không thể tạo giao dịch!");
    } finally {
      setLoading(false);
    }
  }, [fetchTransactionHistory]);

  const returnTransaction = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await staffTransactionApi.returnTransaction(id);
      await fetchTransactionHistory();
    } catch (err: any) {
      console.error("Lỗi khi trả sách:", err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactionHistory]);

  const value = useMemo(() => ({
    transaction,
    createTransaction,
    returnTransaction,
    loading,
    error,
    fetchTransactionHistory,
    calcFineDays,
  }), [transaction, createTransaction, returnTransaction, loading, error, fetchTransactionHistory, calcFineDays]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransaction must be used inside TransactionProvider");
  return ctx;
};

export const useTransactions = useTransaction;

