import { useTechnologies } from "@/api/queries/technologies";
import { LOGO_REGISTRY } from "@/constants/logoRegistry";
import { EllipsisHorizontalCircleIcon, HeartIcon } from "@heroicons/react/16/solid";

const Technologies = () => {
  const {
    data: technologies,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useTechnologies();

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {technologies && technologies && technologies.map((technology) => (
        <li
          key={technology.id} 
          className="col-span-1 flex flex-col divide-y divide-white/10 rounded-lg bg-gray-800/50 text-center outline -outline-offset-1 outline-white/10"
        >
          <div className="flex flex-1 flex-col p-8">
            <img
              alt={`${technology.slug} icon`}
              src={LOGO_REGISTRY[technology.slug].dark || LOGO_REGISTRY[technology.slug].image || ''} 
              className="mx-auto size-32 shrink-0 rounded-xl object-contain bg-gray-700 outline -outline-offset-1 outline-white/10" 
            /> 
            <h3 className="mt-6 text-sm font-medium text-white">{technology.name}</h3>
            <dl className="mt-1 flex grow flex-col justify-between"> 
              <dt className="sr-only">Title</dt> 
              <dd className="text-sm text-gray-400">{technology.shortDescription}</dd> 
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                {technology.categories?.map((category) => 
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 inset-ring inset-ring-green-500/10">
                    {category.name}
                  </span>
                )}
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-white/10">
              <div className="flex w-0 flex-1">
                <a
                  href={``}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-white"
                >
                  <HeartIcon aria-hidden="true" className="size-5 text-gray-500" />
                  Like
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={``}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-white"
                >
                  <EllipsisHorizontalCircleIcon aria-hidden="true" className="size-5 text-gray-500" />
                  Details
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Technologies;