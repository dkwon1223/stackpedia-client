import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { Category } from "@/types/category";

export const useCategories = () => {
    const { data, isPending, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["categories", "all"],
        queryFn: categoryService.getCategories
    });

    return { data, isPending, isError, error, isFetching, refetch };
};

const categoryService = {
    getCategories: async (): Promise<Category[]> => {
        const response = await apiClient.get<Category[]>("/category/all");
        return response.data;
    }
};