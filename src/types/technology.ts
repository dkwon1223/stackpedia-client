export type Technology = {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    slug: string;
    websiteUrl: string;
    githubUrl: string;
    documentationUrl: string;
    categories?: { id: string; name: string }[];
    updatedAt: string;
}