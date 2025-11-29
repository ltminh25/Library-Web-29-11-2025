import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import staffCommentApi from "../../api/staffCommentApi";
import type { StaffCommentPage } from "../../api/staffCommentApi";

// UI-facing comment shape for staff moderation view
export interface StaffComment {
  id: number;
  user: string;
  content: string;
  commentStatus: "pending" | "approved" | "flagged";
  owner?: boolean;
}

interface SocialContextType {
  comments: StaffComment[];
  page: number;
  size: number;
  total: number;
  loading: boolean;
  error?: string;
  setPage: (page: number) => void;
  refresh: () => void;
  deleteComment: (id: number) => Promise<void>;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<StaffComment[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10); // fixed as per UI for now
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const mapItems = (res: StaffCommentPage): StaffComment[] => {
    try {
      console.log("🗺️ mapItems called with:", res);
      console.log("🗺️ res.items:", res?.items);
      console.log("🗺️ res.items type:", typeof res?.items);
      console.log("🗺️ res.items isArray:", Array.isArray(res?.items));
      
      if (!res) {
        console.warn("⚠️ mapItems: res is null or undefined");
        return [];
      }
      
      if (!res.items) {
        console.warn("⚠️ mapItems: res.items is null or undefined");
        return [];
      }
      
      if (!Array.isArray(res.items)) {
        console.warn("⚠️ mapItems: res.items is not an array, got:", typeof res.items);
        return [];
      }
      
      console.log("✅ mapItems: Mapping", res.items.length, "items");
      const mapped = res.items.map((c, index) => {
        console.log(`  📝 Mapping item ${index}:`, c);
        return {
          id: c.id,
          user: c.userName,
          content: c.comment,
          commentStatus: "approved" as const,
          owner: c.owner,
        };
      });
      console.log("✅ mapItems: Result:", mapped);
      return mapped;
    } catch (err) {
      console.error("❌ Error in mapItems:", err);
      console.error("❌ Input was:", res);
      return [];
    }
  };

  // Loader function
  const load = async (p = page) => {
    setLoading(true);
    setError(undefined);
    try {
      console.log("📊 Fetching comments with page:", p, "size:", size);
      const res: StaffCommentPage = await staffCommentApi.getComments(p, size);
      console.log("📊 Raw comments response:", res);
      console.log("📊 Response type:", typeof res, "has items:", res?.items !== undefined);
      console.log("📊 Comments items:", res?.items);
      console.log("📊 Items is array:", Array.isArray(res?.items));
      
      if (res && res.items && Array.isArray(res.items)) {
        console.log("✅ Mapping", res.items.length, "comments");
        const mapped = mapItems(res);
        console.log("✅ Mapped comments:", mapped);
        setComments(mapped);
        setTotal(res.totalItems || 0);
        setError(undefined); // Clear any previous errors
        console.log("✅ Comments loaded successfully");
      } else {
        console.warn("⚠️ Unexpected comments response format:", res);
        setComments([]);
        setTotal(0);
        setError(undefined); // No error, just unexpected format
      }
    } catch (err) {
      console.error("❌ Failed to load staff comments:", err);
      console.error("❌ Error response:", (err as any).response);
      console.error("❌ Error details:", (err as any).response?.data, (err as any).response?.status);
      setError("Không thể tải danh sách bình luận");
      setComments([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and when page changes or authentication status changes
  useEffect(() => {
    // Only load if user is authenticated
    const token = sessionStorage.getItem("token");
    if (token) {
      console.log("🔐 Authenticated, loading comments for page:", page);
      load(page);
    } else {
      console.log("⚠️ Not authenticated, skipping comments load");
      setComments([]);
      setTotal(0);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refreshTrigger]);

  const deleteComment = async (id: number) => {
    setLoading(true);
    setError(undefined);
    try {
      console.log("🗑️ Deleting comment:", id);
      await staffCommentApi.deleteComment(id);
      console.log("✅ Comment deleted, reloading page...");
      // Reload current page. If current page becomes empty and page>0, go to previous page
      const res = await staffCommentApi.getComments(page, size);
      console.log("📊 Response after delete:", res);
      
      if (res && res.items && Array.isArray(res.items)) {
        if (res.items.length === 0 && page > 0) {
          console.log("📄 Page is empty, going to previous page");
          setPage(page - 1); // effect will trigger load
        } else {
          const mapped = mapItems(res);
          setComments(mapped);
          setTotal(res.totalItems || 0);
          setError(undefined);
        }
      } else {
        console.warn("⚠️ Unexpected response after delete:", res);
        setComments([]);
        setTotal(0);
      }
    } catch (err) {
      console.error("❌ Failed to delete comment:", err);
      console.error("❌ Error details:", (err as any).response?.data, (err as any).response?.status);
      setError("Không thể xóa bình luận");
    } finally {
      setLoading(false);
    }
  };

  const refresh = useCallback(() => {
    console.log("🔄 Manual refresh triggered");
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <SocialContext.Provider value={{ comments, page, size, total, loading, error, setPage, refresh, deleteComment }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const ctx = useContext(SocialContext);
  if (!ctx) throw new Error("useSocial must be used inside SocialProvider");
  return ctx;
};
