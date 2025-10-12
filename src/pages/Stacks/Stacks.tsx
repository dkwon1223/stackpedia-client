import { useStacks } from "@/api/queries/stacks";
import { AxiosError } from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useNavigate } from "react-router";
import Loader from "@/components/custom/Loader/Loader";
import StackCard from "@/components/custom/StackCard/StackCard";

const Stacks = () => {
  const { data: stacks, isPending, isError, error, refetch } = useStacks();
  const navigate = useNavigate();

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
        "Failed to load stacks"
      );
    }
    return "Failed to load stacks";
  };

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
      <section role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <>
          {stacks?.map((stack) => 
            <StackCard stack={stack} />
          )}
        </>
      </section>
    </main>
  );
};

export default Stacks;