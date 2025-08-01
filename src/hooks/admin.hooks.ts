import { getAllAdminsAPI, getAllUserAPi } from "@/api/admin.api";
import { IAdmin } from "@/interface/auth/admin.interface";
import { useQuery } from "@tanstack/react-query";

export const useAdmins = (
  page: number = 1,
  pageSize: number = 5
) => {
  return useQuery<{ data: IAdmin[] }>({
    queryKey: ["admins"],
    queryFn: () => getAllAdminsAPI(page, pageSize),
    staleTime: 5 * 60 * 1000, // cache 5 phút
  });
};
export const useUsers = (page: number = 1, pageSize: number = 5) => {
  return useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => getAllUserAPi(page, pageSize), 
    staleTime: 5 * 60 * 1000, 
  });
}