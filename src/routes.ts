import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { LogoutPage } from "./pages/LogoutPage";
import { UserPage } from "./pages/UserPage";
import { UpdateProfilePage } from "./pages/UpdateProfilePage";

export type RouteConfigType = {
  path: string;
  name: string;
  component: any;
  title: string;
};

export function getRoute(name: string): RouteConfigType | null {
  return getRoutes().find(
    (item) => item.path == name
  ) ?? null;
}

export default function getRoutes(): RouteConfigType[] {

  return [
      // home page
      {
        path: "/welcome",
        name: "home",
        component: HomePage,
        title: "Main Page",
      },
      // dashboard page
      {
        path: "/",
        name: "dashboard",
        component: DashboardPage,
        title: "Dashboard",
      },
      // logout page
      {
        path: "/logout",
        name: "logout",
        component: LogoutPage,
        title: "Logout",
      },
      // logout page
      {
        path: "/profile/:userId",
        name: "profile",
        component: UserPage,
        title: "User",
      },
      // update profile
      {
        path: "/update-profile",
        name: "update-profile",
        component: UpdateProfilePage,
        title: "Update profile",
      },
    ]
}