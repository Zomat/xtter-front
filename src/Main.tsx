import { useContext, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import getRoutes, { RouteConfigType } from "./routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext, UserContextProvider } from "./auth/context/UserContext";
import { Notifications } from "./dashboard/components/Notifications";
import { Me } from "./auth/components/Me";
import { Trends } from "./dashboard/components/Trends";

export default function Main() {
  const routes: RouteConfigType[] = getRoutes();
  const navigate = useNavigate();
  const isWelcomePage = location.pathname === "/welcome"

  useEffect(() => {
    const pageName = routes.find(
      (item) => item.path == location.pathname
    )?.title;
    document.title = !pageName ? "Xtter" : "Xtter | " + pageName;
    window.scrollTo(0, 0);
  }, [location]);

  const goToHome = () => {
    navigate('/');
  }

  return (
    <UserContextProvider>
      <div className="min-h-cover w-full overflow-y-auto overflow-x-hidden font-main bg-[#262626]">
        <SkeletonTheme baseColor="#fffff" highlightColor="#fffff">
          <div
            id="scroller"
            className="flex min-h-cover w-full overflow-y-auto overflow-x-hidden"
          >
            {/* <Nav links={[
              {
                name: 'Home',
                link: '/news'
              },
            ]} */}

            { ! isWelcomePage && (
              <div className="flex flex-col fixed top-0 left-0 z-50 h-screen w-96 text-white md:text-left bg-[#262626] p-4">
                <div className="h-fit cursor-pointer hover:scale-105 font-major text-[64px] font-bold  transition" onClick={goToHome}>Xtter</div>
                <div>
                  <Notifications />
                  <Trends />
                </div>
                <div>
                  
                </div>
                <div className="flex-1">
                </div>
                <Me />
              </div>
            ) }
            

            <Routes>
              {routes.map((route) => (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={route.name}
                />
              ))}
              {/* <Route path="*" element={HomePage()} /> */}
            </Routes>
          </div>
        </SkeletonTheme>
      </div>
    </UserContextProvider>
  );
}
