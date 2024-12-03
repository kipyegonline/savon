import { useNavigate } from "@remix-run/react";
import { useAppContext } from "Providers/appProvider";
import React from "react";

export default function NotLoggedIn() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      if (user === null) navigate("/login");
    }, 1000);
  }, [user]);

  if (user === null) return null;
}
