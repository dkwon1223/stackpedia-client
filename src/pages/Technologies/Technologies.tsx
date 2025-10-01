import { useTechnologies } from "@/api/queries/technologies";
import Loader from "@/components/custom/Loader/Loader";
import TechnologyCard from "@/components/custom/TechnologyCard/TechnologyCard";
import { AxiosError } from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useNavigate } from "react-router";
import { Input, InputGroup } from "@/components/catalyst/input";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/catalyst/dropdown";
import { useCategories } from "@/api/queries/categories";
import { useState } from "react";

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
  /*
  Redis 
  Rails 
  Auth0
  
  Filters:
    Dropdown
      -Multiple selections
      -Selected filters appear in boxes
      -Boxes have x marks to remove easily without using dropdown
    Checkbox
      -Checkbox with things to filter by (bad if you cant fit all categories in one row)
  */

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
    )
  }

  if (isPending) {
    return (
      <section className="w-full h-full flex justify-center">
        <Loader width={100} height={100} scale={5.5} />
      </section>
    )
  }

  return (
    <main className="w-full h-full">
      <nav className="w-full mb-4 flex">
        <div className="flex-1 mr-4">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input onChange={(e) => setSearch(e.target.value)} name="search" placeholder="Search&hellip;" aria-label="Search" />
          </InputGroup>
        </div>
        <Dropdown>
          <DropdownButton outline>
            Categories
          <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu>
            <DropdownItem onClick={() => setCategoryId('')}>All</DropdownItem>
            {categories?.map((category) => 
              <DropdownItem onClick={() => setCategoryId(category.id)} value={search}>{category.name}</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
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