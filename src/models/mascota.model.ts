import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Especie: string;

  @property({
    type: 'string',
    default: 'No aplica',
  })
  Raza?: string;

  @property({
    type: 'number',
    required: true,
  })
  Edad: number;

  @property({
    type: 'number',
    required: true,
  })
  Peso: number;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @belongsTo(() => Usuario, {name: 'UsuarioMascota'})
  usuarioId: string;

  @property({
    type: 'string',
  })
  planId?: string;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
