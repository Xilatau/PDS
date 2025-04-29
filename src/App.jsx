import {Routes, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

import {AuthProvider} from "./Authentication";
import Login from "./pages/login/Login";
import Footer from "./elements/Footer"

import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin";
import HeaderAdmin from "./elements/admin/HeaderAdmin"
import NavbarV from "./elements/admin/NavBarV"

import HeaderClient from "./elements/client/HeaderCliente";
import DashboardClient from "./pages/client/dashboard/DashboardClient";
import Perfil from "./pages/perfil/perfil";

function App() {
  return (
    <AuthProvider>
      {/* Rotas Publicas */}

      <Routes>
        <Route path="/login" element={<Login/>} />

        {/* Rotas privadas */}
        

        
        {/*Admin*/}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <HeaderAdmin/>
                <DashboardAdmin/>
                <NavbarV/>
                <Footer/>
              </>
            </PrivateRoute>
          }  
        />

        {/*Cliente*/}
        <Route
          path="/dashboardClient"
          element={
            <PrivateRoute>
              <>
                <HeaderAdmin/>
                <DashboardAdmin/>
                <NavbarV/>
                <Footer/>
              </>
            </PrivateRoute>
          }
        />

        {/*Perfil*/}
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <>
                <HeaderAdmin/>
                <Perfil/>
                <NavbarV/>
                <Footer/>
              </>
            </PrivateRoute>
          }
        />

      </Routes>
    </AuthProvider>
  );
}
export default App;