import './App.css';

import { Header } from './componentes/Header/Header';
import { Footer } from './componentes/Footer/Footer';
import { Contacto } from './componentes/Contacto/Contacto';
import { Institucional } from './componentes/Institucional/Institucional';
import { Cuerpo } from './componentes/Cuerpo/Cuerpo';
import { Futbolista } from './componentes/Futbolista/Futbolista';


import { Convocatoria } from './componentes/Convocatoria/Convocatoria';
import { Convocar } from './componentes/Convocatoria/Convocar';
import { Convocados } from './componentes/Convocatoria/Convocados';
import { Login } from './componentes/Login/Login';    
import { Dashboard } from './componentes/Dashboard/Dashboard';


import { UserProvider } from './componentes/UserContext/UserContext';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import { ProtectedRoute } from './componentes/ProtectedRoute/ProtectedRoute';
import { Inicio } from './componentes/Inicio/Inicio';




function App() {

  return (
    <>
    <BrowserRouter>
      <UserProvider> 
        <Header/>      
        <Routes>
          <Route path='/' element={<Cuerpo/>}/>
          <Route path='/inicio' element={<Inicio/>}/>
          <Route path='/institucional' element={<Institucional/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/login' element={<Login/>}/>
          
          <Route path='/privado/dashboard' 
            element={
              // ruta protegida para usuarios logueados, presidente o entrendor
              <ProtectedRoute mustBeEntrenador={false}>
                {<Dashboard/>}
              </ProtectedRoute>
          }/>
  
          <Route path='/privado/futbolista' 
            element={
              // ruta protegida para usuarios logueados de tipo entrenador
              <ProtectedRoute mustBeEntrenador={true}>
                {<Futbolista/>}
              </ProtectedRoute>
          }/>
          
          
          <Route path='/privado/convocatoria' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocatoria/>
              </ProtectedRoute>
          }/>

          <Route path='/privado/convocar/:parametro' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocar/>
              </ProtectedRoute>
          }/>

          <Route path='/privado/convocados/:idConvocatoria/:rival' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocados/>
              </ProtectedRoute>
          }/>
        </Routes>
      </UserProvider>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;