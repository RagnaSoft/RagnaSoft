import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.Id,
  MascotaRelations
> {

  public readonly UsuarioMascota: BelongsToAccessor<Usuario, typeof Mascota.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Mascota, dataSource);
    this.UsuarioMascota = this.createBelongsToAccessorFor('UsuarioMascota', usuarioRepositoryGetter,);
    this.registerInclusionResolver('UsuarioMascota', this.UsuarioMascota.inclusionResolver);
  }
}
