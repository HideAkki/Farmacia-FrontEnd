import { Route, Routes } from "react-router-dom"
import { LoginForm } from "./components/loginForm" 
import { HomeEmpleado } from "./components/homeEmpleado"
import { HomeDirectivo } from "./components/homeDirectivo"
import { HomeAdmin } from "./components/homeAdmin"
import { RegisterForm } from "./components/register"
import { UsuariosLista } from "./components/admin/usuariosList"
import { EmpleadoList } from "./components/admin/empleadoList"
import { AdminList } from "./components/admin/adminList"
import { DirectivoList } from "./components/admin/directivoList"
import { MedicamentosList } from "./components/medicamentos/medicamentosList"
import { CrearMedicamentoForm } from "./components/medicamentos/crearMedicamento"
import { FacturasTable } from "./components/factura"
import { DirectivoUsuarioList } from "./components/directivo/UsuariosListasDirectivo"
import { EmpleadoListDirectivo } from "./components/directivo/empleadoListDirectivo"
import { AdminListDirectivo } from "./components/directivo/AdminListDirectivo"
import { DirectivoListDirectivo } from "./components/directivo/DirectivoListDirectivo"
import { MedicamentosListDirectivo } from "./components/directivo/MedicamentosListDirectivo"
import { CrearFactura } from "./components/facturas/crearFactura"


const App = function() {

  //RUTAS

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm/>}>
        </Route>

        <Route path="/register" element={<RegisterForm/>}>
        </Route>

        <Route path="/empleado" element={<HomeEmpleado/>}>
        </Route>

        <Route path="/directivo" element={<HomeDirectivo/>}>
        </Route>

        <Route path="/admin" element={<HomeAdmin/>}>
        </Route>

        <Route path="/admin/usuarios" element={<UsuariosLista/>}>
        </Route>

        <Route path="/admin/usuarios/empleado" element={<EmpleadoList/>}>
        </Route>

        <Route path="/admin/usuarios/administrador" element={<AdminList/>}>
        </Route>

        <Route path="/admin/usuarios/directivos" element={<DirectivoList/>}>
        </Route>

        <Route path="/admin/medicamentos" element={<MedicamentosList/>}>
        </Route>

        <Route path="/admin/facturas" element={<FacturasTable/>}>
        </Route>

        <Route path="/admin/medicamentos/crear" element={<CrearMedicamentoForm/>}>
        </Route>



        <Route path="/directivo/usuarios" element={<DirectivoUsuarioList/>}>
        </Route>

        <Route path="/directivo/usuarios/empleado" element={<EmpleadoListDirectivo/>}>
        </Route>

        <Route path="/directivo/usuarios/administrador" element={<AdminListDirectivo/>}>
        </Route>

        <Route path="/directivo/usuarios/directivos" element={<DirectivoListDirectivo/>}>
        </Route>

        <Route path="/directivo/medicamentos" element={<MedicamentosListDirectivo/>}>
        </Route>

        <Route path="/directivo/facturas" element={<FacturasTable/>}>
        </Route>



        <Route path="/empleado/medicamentos" element={<MedicamentosListDirectivo/>}>
        </Route>

        <Route path="/empleado/facturas" element={<FacturasTable/>}>
        </Route>

        <Route path="/empleado/facturas/crear" element={<CrearFactura/>}>
        </Route>
      </Routes>
    </>
  )
}

export default App
