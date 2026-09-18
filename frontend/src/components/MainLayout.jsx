import { Link, Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      name: "Resume Analyzer",
      path: "/resume",
      icon: "📄",
    },
    {
      name: "Interview",
      path: "/interview",
      icon: "🎤",
    },
  ];

  const pageTitle =
    location.pathname === "/dashboard"
      ? "Dashboard"
      : location.pathname === "/resume"
      ? "Resume Analyzer"
      : "Interview";

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#172536]">

      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[#283345] bg-[#172536] px-4 py-7 text-white lg:flex lg:flex-col">

        {/* Logo */}
        <div className="px-3 pb-8">

          <div className="text-xl font-bold tracking-tight text-white">
            Intervu
            <span className="text-[#60A5FA]">AI</span>
          </div>

          <p className="mt-1 text-xs text-[#7F8CA0]">
            AI Career Assistant
          </p>

        </div>


        {/* Navigation */}
        <nav className="flex flex-col gap-2">

          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#60A5FA] text-[#0F172A] shadow-md shadow-[#60A5FA]/10"
                    : "text-[#AEB8C7] hover:bg-[#24364A] hover:text-white"
                }`}
              >

                <span
                  className={`flex w-6 justify-center text-lg transition-transform duration-200 ${
                    !active ? "group-hover:scale-110" : ""
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.name}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#0F172A]" />
                )}

              </Link>
            );
          })}

        </nav>


        {/* Sidebar Bottom */}
        <div className="mt-auto border-t border-[#2D3A4D] px-3 pt-5">

          <p className="text-xs leading-5 text-[#66758A]">
            Your preparation workspace
          </p>

        </div>

      </aside>


      {/* =========================================================
          MAIN AREA
      ========================================================= */}

      <div className="min-h-screen lg:ml-64">


        {/* =========================================================
            DESKTOP PAGE HEADER
        ========================================================= */}

        <header className="sticky top-0 z-30 hidden h-[76px] items-center justify-between border-b border-[#DDD7CA] bg-[#F5F1E8]/95 px-6 backdrop-blur-xl lg:flex xl:px-8">

          {/* Page Information */}
          <div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A78335]">
              Workspace
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-tight text-[#172536]">
              {pageTitle}
            </h2>

          </div>


          {/* User */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#172536] text-sm font-bold text-[#F5F1E8]">
              A
            </div>

            <div className="hidden xl:block">

              <p className="text-sm font-semibold text-[#172536]">
                Ayush
              </p>

              <p className="text-xs text-[#7A817A]">
                Candidate
              </p>

            </div>

          </div>

        </header>


        {/* =========================================================
            MOBILE PAGE HEADER
        ========================================================= */}

        <header className="border-b border-[#DDD7CA] bg-[#F5F1E8] px-4 py-5 sm:px-6 lg:hidden">

          <div className="flex items-center justify-between">

            {/* Page Information */}
            <div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A78335]">
                Workspace
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-[#172536]">
                {pageTitle}
              </h2>

            </div>


            {/* Mobile User */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#172536] text-sm font-bold text-[#F5F1E8]">
              A
            </div>

          </div>

        </header>


        {/* =========================================================
            PAGE CONTENT
        ========================================================= */}

        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default MainLayout;