import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';
export class EstrategiaAsesor implements AuthenticationStrategy {
  name: string = 'asesor';

  constructor(
    @service(AutenticacionService)
    public ServicioAutenticacion: AutenticacionService
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.ServicioAutenticacion.ValidarToken(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.Nombres,
          apellidos: datos.data.Apellidos
        });
        return perfil;//retorno el perfil
      } else {
        throw new HttpErrors[401]('Token Incongruente');
      }
    } else {
      throw new HttpErrors[401]('No vino el token incluido');
    }
  }
}
