import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { staffFinesApi } from "../../api";

export interface Fine {
  id: number;
  amount: number;
  transactionId: number;
  issuedDate: number[]; // [YYYY, MM, DD, HH, mm]
  paidDate: number[] | null;
  reason: string;
  paidStatus: "PAID" | "UNPAID";
}

export type FineCreate = Omit<Fine, "id">;

interface FineContextType {
  fines: Fine[];
  loading: boolean;
  error: string | null;
  refreshFines: () => Promise<void>;
  addFine: (data: FineCreate) => Promise<void>;
  updateFine: (id: number, data: Partial<FineCreate>) => Promise<void>;
  deleteFine: (id: number) => Promise<void>;
  markFineAsPaid: (id: number) => Promise<void>
}

const FineContext = createContext<FineContextType | undefined>(undefined);

export const FineProvider = ({ children }: { children: ReactNode }) => {
  const [fines, setFines] = useState<Fine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFines = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await staffFinesApi.getAllFines();
      console.log("📊 Raw fines response:", res);
      console.log("📊 Response type:", typeof res, "isArray:", Array.isArray(res));
      
      // Handle both array and object responses
      if (Array.isArray(res)) {
        console.log("✅ Setting fines array, length:", res.length);
        setFines(res as any);
        setError(null); // Clear any previous errors
      } else if (res && typeof res === 'object' && 'items' in res) {
        // Handle paginated response
        console.log("✅ Setting fines from paginated response, items:", (res as any).items?.length);
        setFines((res as any).items || []);
        setError(null); // Clear any previous errors
      } else if (res === null || res === undefined) {
        console.log("⚠️ Response is null/undefined, setting empty array");
        setFines([]);
        setError(null); // No error, just empty
      } else {
        console.warn("⚠️ Unexpected response format:", res);
        setFines([]);
        setError(null); // No error, just unexpected format
      }
    } catch (err: any) {
      console.error("❌ Lỗi khi tải fines:", err);
      console.error("❌ Error details:", err.response?.data, err.response?.status);
      setError("Không thể tải danh sách tiền phạt.");
      setFines([]); // Clear fines on error
    } finally {
      setLoading(false);
    }
  };

  const addFine = async (data: FineCreate) => {
    try {
      await staffFinesApi.createFine(data as any);
      await fetchFines();
    } catch (err) {
      console.error("Lỗi khi thêm fine:", err);
    }
  };

  const updateFine = async (id: number, data: Partial<FineCreate>) => {
    try {
      await staffFinesApi.updateFine(id, data as any);
      await fetchFines();
    } catch (err) {
      console.error("Lỗi khi cập nhật fine:", err);
    }
  };

  const deleteFine = async (id: number) => {
    try {
      await staffFinesApi.deleteFine(id);
      await fetchFines();
    } catch (err) {
      console.error("Lỗi khi xóa fine:", err);
    }
  };

  const refreshFines = async () => {
    await fetchFines();
  };

  const markFineAsPaid = async (fineId: number) => {
    try {
      await staffFinesApi.markAsPaid(fineId);
      setFines((prev) =>
        prev.map((fine) =>
          fine.id === fineId ? { ...fine, paidStatus: "PAID" as const } : fine
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
    }
  };


  useEffect(() => {
    fetchFines();
  }, []);

  return (
    <FineContext.Provider
      value={{ fines, loading, error, refreshFines, addFine, updateFine, deleteFine, markFineAsPaid }}
    >
      {children}
    </FineContext.Provider>
  );
};

export const useFines = (): FineContextType => {
  const context = useContext(FineContext);
  if (!context) {
    throw new Error("useFines phải được dùng trong <FineProvider>");
  }
  return context;
};