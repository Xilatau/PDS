import {Routes, Route} from "react-router-dom"
import PrivateRoute from "./PrivateRoutes"
import {AuthProvider} from "./Authentication"

//Paginas Gerais
import Login from "./pages/login/Login"
import Footer from "./elements/Footer"

//Paginas Admin
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin"
import HeaderAdmin from "./elements/admin/HeaderAdmin"
import NavbarV from "./elements/admin/NavBarV"
import AddContactos from "./pages/admin/addContacts/AddContacts"


//Paginas Cliente
import HeaderClient from "./elements/client/HeaderCliente"
import DashboardClient from "./pages/client/dashboard/DashboardClient"
import Perfil from "./pages/perfil/perfil"
import Pedidos from "./pages/improvement/pedidos"


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
                <HeaderClient/>
                <DashboardClient/>
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
                <HeaderClient/>
                <Perfil/>
              </>
            </PrivateRoute>
          }
        />

          {/*improvement & incidences*/}
        <Route
          path="/improvement-incidences"
          element={
            <PrivateRoute>
              <>
                <HeaderClient/>
                <Pedidos/>
              </>
            </PrivateRoute>
          }
        />

        {/* Fim Cliente*/}

        {/*Contactos*/}
        <Route
          path="/contactos"
          element={
            <PrivateRoute>
              <>
                <HeaderClient/>
                <Contactos/>
              </>
            </PrivateRoute>
          }
        />

      </Routes>
    </AuthProvider>
  );
}
export default App;