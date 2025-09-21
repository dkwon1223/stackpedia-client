import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
import { Technology } from "../../model/types";

export const useTechnologies = (categoryId?: string) => {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: categoryId ? ["technologies", "category", categoryId] : ["technologies", "all"],
    queryFn: () => categoryId ? technologyService.getTechnologiesByCategory(categoryId) : technologyService.getTechnologies(),
  });

  return { data, isPending, isError, error, isFetching, refetch };
};

export const useTechnology = (technologySlug: string | undefined) => {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["technology", technologySlug],
    queryFn: () => technologyService.getTechnology(technologySlug!),
    enabled: !!technologySlug
  });

  return { data, isPending, isError, error, isFetching, refetch };
};

const technologyService = {
  getTechnology: async (technologySlug: string): Promise<Technology> => {
    const response = await apiClient.get<Technology>(`/technology?slug=${technologySlug}`);
    return response.data;
  },
  getTechnologies: async (): Promise<Technology[]> => {
    const response = await apiClient.get<Technology[]>("/technology/all");
    return response.data;
  },
  getTechnologiesByCategory: async (
    categoryId: string
  ): Promise<Technology[]> => {
    const response = await apiClient.get<Technology[]>(
      `/technology/technologiesByCategory/${categoryId}`
    );
    return response.data;
  },
};
