import { Header } from "../organisms/Header";
import { Outlet, useLocation, useNavigate } from "react-router";

export function HeaderLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.pathname !== "/";

  return (
    <>
      <Header showBack={showBack} onBack={() => navigate(-1)}/>
      <Outlet />
    </>
  );
}