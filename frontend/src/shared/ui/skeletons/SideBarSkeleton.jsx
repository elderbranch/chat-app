import Burger from "../burger";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-[240px] border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      <div className="border-b border-base-300 w-[240px] p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <Burger className="mr-3"/> Chats
        </div>
      </div>


      <div className="overflow-y-auto w-[240px] py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">

            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;