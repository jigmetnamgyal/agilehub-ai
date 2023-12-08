"use client";

const SideNavigation = () => {
  return (
    <>
      <aside className="group/sidebar bg-[#F7F7F5] z-[99999] w-60 h-full overflow-y-auto relative flex flex-col">
        <div>
          <p>Action Items</p>
        </div>

        <div className="mt-4">
          <p>Documents</p>
        </div>

        <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-gray-500/10 right-0 top-0"></div>
      </aside>
    </>
  );
};

export default SideNavigation;
