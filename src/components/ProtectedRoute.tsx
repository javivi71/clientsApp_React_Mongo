import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router";
// import { AuthService } from "../services/AuthService";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}
export default function ProtectedRoute({
  component: Component,
  ...rest
}: ProtectedRouteProps) {

 const [loading, setLoading] = useState(true);
 const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const logged = !!localStorage.getItem('token');

      setIsAuthenticated(logged);
      setLoading(false);
    };
    checkAuth();   
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {

       if (loading) {
          return <div>Cargando...</div>;
        } 
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}