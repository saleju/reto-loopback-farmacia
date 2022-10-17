import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoodbDataSource} from '../datasources';
import {Vendedor, VendedorRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.mongoodb') dataSource: MongoodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Vendedor, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
