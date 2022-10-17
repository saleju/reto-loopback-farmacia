import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Proveedor, Pedido} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {PedidoRepository} from './pedido.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly producto: BelongsToAccessor<Proveedor, typeof Producto.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongoodb') dataSource: MongoodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Producto, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.producto = this.createBelongsToAccessorFor('producto', proveedorRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
