import Axios from 'axios'
import IdentityProxy from './IdentityProxy.js'
import UsuariosProxi from './UsuariosProxi'
import ZonasProxi from './ZonasProxi'
import RegistrosProxi from './RegistrosProxi'
import GestionProxi from './GestionProxi'
import MatriculaProxi from './MatriculaProxi'
import NotasProxi from './NotasProxi'
import AulasProxi from './AulasProxi'
import MigracionProxi from './MigracionProxi'
import SettingProxi from './SettingProxi'

//axios
Axios.defaults.headers.common.Accept='application/json'
//Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('access_token');

        if(token){
            config.headers= {
                'x-access-token': `${token}`
            }
        }
        return config;
    },
    error => Promise.reject(error)
);
Axios.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
      
       alert('Espere un momento por favor ocurrió algo inesperado')
       //localStorage.removeItem('access_token');
       //window.location.reload(true);
      }
      else if(error.response.status===403||error.response.status===401||error.response.status===405) {//||error.response.status===401
        localStorage.clear();
        window.location.reload(true);
        console.log(error.response.status)
      }
      
      return Promise.reject(error);
    }
  );

let url = 'http://66.29.154.165:3000/api'; //http://localhost:3000/ https://uemah.com/api   http://66.29.154.165:3000/
// if(localStorage.getItem("config")!==null){
//     let config = JSON.parse(localStorage.getItem("config"))
//     url = config
// }

export default{
    identityProxy: new IdentityProxy(Axios, url),
    _usuarioProxi: new UsuariosProxi(Axios, url),
    _zonasProxi: new ZonasProxi(Axios, url),
    _registroProxi : new RegistrosProxi(Axios, url),
    _gestionProxi : new GestionProxi(Axios, url),
    _matriculaProxi : new MatriculaProxi(Axios, url), 
    _notasProxi : new NotasProxi(Axios, url),
    _aulaProxi : new AulasProxi(Axios, url),
    _migracionProxi : new MigracionProxi(Axios, url),
    _settingProxi : new SettingProxi(Axios, url),
}