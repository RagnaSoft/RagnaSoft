import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.Id,
  PlanRelations
> {

  public readonly PlanMascota: BelongsToAccessor<Mascota, typeof Plan.prototype.Id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Plan.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Plan, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.PlanMascota = this.createBelongsToAccessorFor('PlanMascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('PlanMascota', this.PlanMascota.inclusionResolver);
  }
}
