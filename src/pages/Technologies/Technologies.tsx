import { useTechnologies } from "@/api/queries/technologies";
import Loader from "@/components/custom/Loader/Loader";
import TechnologyCard from "@/components/custom/TechnologyCard/TechnologyCard";
import { AxiosError } from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useNavigate } from "react-router";
import { Input, InputGroup } from "@/components/catalyst/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useCategories } from "@/api/queries/categories";
import { useState } from "react";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/catalyst/listbox";

const Technologies = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const {
    data: technologies,
    isPending,
    isError,
    error,
    refetch,
  } = useTechnologies(categoryId);

  const {
    data: categories
  } = useCategories();

  const getErrorStatusCode = () => {
    if (error && error instanceof AxiosError) {
      return error.response?.status || 500;
    }
    return 500;
  };

  const getErrorMessage = () => {
    if (error && error instanceof AxiosError) {
      return (
        error.response?.data?.message ||
        error.message ||
        "Failed to load technologies"
      );
    }
    return "Failed to load technologies";
  };

  const filteredTechnologies = technologies?.filter((tech) => {
    return tech.name.toLowerCase().includes(search.toLocaleLowerCase());
  });

  if (isError) {
    return (
      <section className="w-full h-full flex justify-center">
        <ErrorPage 
          code={getErrorStatusCode().toString()} 
          message={`There was an error fetching technologies.`}
          subText={getErrorMessage()}
          primaryButtonText='Go Home'
          primaryButtonAction={() => navigate("/")}
          secondaryButtonText='Try again'
          secondaryButtonAction={refetch}
        />
      </section>
    );
  }

  if (isPending) {
    return (
      <section className="w-full h-full flex justify-center">
        <Loader width={100} height={100} scale={5.5} />
      </section>
    );
  }

  return (
    <main className="w-full h-full">
      <nav className="w-full mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input onChange={(e) => setSearch(e.target.value)} name="search" placeholder="Search&hellip;" aria-label="Search" />
          </InputGroup>
        </div>
        <div role="listbox" className="w-full sm:w-52 shrink-0">
          <Listbox name="categories" placeholder={"Categories"} aria-label="technology category">
            <ListboxOption value={"All"}>
              <ListboxLabel>All</ListboxLabel>
            </ListboxOption>
            {categories?.map((category) =>
              <ListboxOption value={category.name} onClick={() => setCategoryId(category.id)}>
                <ListboxLabel>{category.name}</ListboxLabel>
              </ListboxOption>
            )}
          </Listbox>
        </div>
      </nav>
      <section role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <>
          {filteredTechnologies 
          ?
          filteredTechnologies.map((technology) => <TechnologyCard technology={technology} />)
          :
          technologies && technologies.map((technology) => <TechnologyCard technology={technology} />)
          }
        </>
      </section>
    </main>
  );
};

export default Technologies;