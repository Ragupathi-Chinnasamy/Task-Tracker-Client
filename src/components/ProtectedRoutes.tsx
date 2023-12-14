import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedChildren({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authContext?.isUserAuthenticated) {
      navigate("/");
    } else {
      setIsLoading(!isLoading);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center font-extrabold text-3xl min-h-screen">
        Please wait. . .
      </div>
    );
  }

  return children;
}

export default ProtectedChildren;
