import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require('password-generator');
const encriptado = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) { }

  /*
   * Add service methods here
   */
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }
  CifrarClave(clave: string) {
    let claveCifrada = encriptado.MD5(clave);
    return claveCifrada;
  }
  IdentificarUsuario(user: string, password: string) {
    try {
      let us = this.usuarioRepository.findOne({where: {Correo: user, Contrasena: password}});
      if (us) {
        return us;
      }
      return false;
    } catch {
      return false;
    }
  }//Cierre de la función IdentificarUsuario
  GenerarTokenJWT(usuario: Usuario) {
    let token = jwt.sign({
      data: {
        id: usuario.Id,
        correo: usuario.Correo,
        nombre: usuario.Nombres
      }
    },
      Llaves.claveJWT);
    return token;
  }//Cierre de la función GenerarTokenJWT

  ValidarToken(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
