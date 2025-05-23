import {Routes, Route} from "react-router-dom"
import PrivateRoute from "./PrivateRoutes"
import {AuthProvider} from "./Authentication"

//Paginas Gerais
import Login from "./pages/user/login/Login"
import Footer from "./elements/Footer"
import ImprovIncid from "./pages/user/improvIncid/ImprovIncid"
import Contacts from "./pages/user/contact/Contact"
import Reuniao from "./pages/user/reuniao/Reuniao"

//Paginas Admin
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin"
import HeaderAdmin from "./elements/admin/HeaderAdmin"
import NavbarV from "./elements/admin/NavBarV"
import AddContacts from "./pages/admin/addContacts/AddContacts"
import ContactsAdmin from "./pages/admin/contact/ContactsAdmin"
import CreateClient from "./pages/admin/createClient/createClient"
import ImprovIncidAdmin from "./pages/admin/improvIncid/ImprovIncid"
import PedidosReuniao from "./pages/admin/pedidosReuniao/PedidosReuniao"

//Paginas Cliente
import HeaderClient from "./elements/client/HeaderCliente"
import DashboardClient from "./pages/client/dashboard/DashboardClient"
import Perfil from "./pages/user/profile/Profile"
import MinhasReunioes from "./pages/user/reuniao/MinhasReunioes"

function App() {
  return (
    <AuthProvider>
      {/* Rotas Publicas */}

      <Routes>
        <Route path="/" element={<Login/>} />

        {/* Rotas privadas */}

        {/*Admin*/}
        {/*Dashboard*/}
        <Route
          path="/dashboardAdmin"
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
        
          {/*CreateClient*/}
        <Route
          path="/createClient"
          element={
            <PrivateRoute>
              <>
                <HeaderAdmin/>
                <CreateClient/>
                <NavbarV/>
                <Footer/>
              </>
            </PrivateRoute>
          } 
        />
        
        {/*Contacts*/}
        <Route
          path="/ContactsAdmin"
          element={
            <PrivateRoute>
              <>
                <HeaderAdmin/>
                <ContactsAdmin/>
                <NavbarV/>
              </>
            </PrivateRoute>
          } 
        />

        {/*AddContacts*/}
        <Route
          path="/AddContacts"
          element={
            <PrivateRoute>
              <>
                <HeaderAdmin/>
                <AddContacts/>
                <NavbarV/>
              </>
            </PrivateRoute>
          }
        />

         {/*Pedido de Reunião*/}
       <Route
         path="/PedidosReuniao"
         element={
           <PrivateRoute>
             <>
               <HeaderAdmin/>
               <PedidosReuniao/>
               <NavbarV/>
               <Footer/>
            </>
           </PrivateRoute>
       }
        />         
        {/*Improvemnt & Incidences*/}
        <Route
          path="/improvement-incidencesAdmin"
          element={
            <PrivateRoute>
              <>
                <HeaderAdmin/>
                <ImprovIncidAdmin/>
                <NavbarV/>
                <Footer/>
              </>
            </PrivateRoute>
          }
        />
        {/*Profile*/}
        <Route
          path="/profileAdmin"
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
        {/*Fim Admin*/}

        {/*Cliente*/}
        <Route
          path="/dashboard"
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
          path="/profile"
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
                <ImprovIncid/>
              </>
            </PrivateRoute>
          }
        />

        {/*Contacts*/}
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <>
                <HeaderClient/>
                <Contacts/>
              </>
            </PrivateRoute>
          }
        />

         {/*Reunião*/}
         <Route
          path="/reuniao"
          element={
            <PrivateRoute>
              <>
                <HeaderClient/>
                <Reuniao/>
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/MinhasReunioes"
          element={
            <PrivateRoute>
              <>
                <HeaderClient/>
                <MinhasReunioes/>
              </>
            </PrivateRoute>
          }
        />

        {/* Fim Cliente*/}

      </Routes>
    </AuthProvider>
  );
}
export default App;
