import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { transactionApi } from "../../api";
import type { Transaction, TransactionDetail } from "./TransactionContext";

interface ReaderTransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactionHistory: () => Promise<void>;
}

const ReaderTransactionContext = createContext<ReaderTransactionContextType | undefined>(undefined);

export const ReaderTransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactionHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await transactionApi.getHistory();
      setTransactions(res as any);
    } catch (err: any) {
      console.error("Lỗi khi tải lịch sử giao dịch (reader):", err);
      setError(err.message || "Không thể tải dữ liệu giao dịch");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    transactions,
    loading,
    error,
    fetchTransactionHistory,
  }), [transactions, loading, error, fetchTransactionHistory]);

  return (
    <ReaderTransactionContext.Provider value={value}>
      {children}
    </ReaderTransactionContext.Provider>
  );
};

export const useReaderTransactions = () => {
  const ctx = useContext(ReaderTransactionContext);
  if (!ctx) throw new Error("useReaderTransactions must be used inside ReaderTransactionProvider");
  return ctx;
};
