import type { Stack } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";

export const useStacks = () => {
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ["stacks", "all"],
        queryFn: () => stackService.getStacks()
    });

    return { data, isPending, isError, error, refetch };
};

const stackService = {
    getStacks: async (): Promise<Stack[]> => {
        const response = await apiClient.get<Stack[]>("/api/stack/all");
        return response.data;
    }
};