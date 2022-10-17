import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Vendedor,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoVendedorController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Vendedor belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedor)},
          },
        },
      },
    },
  })
  async getVendedor(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<Vendedor> {
    return this.pedidoRepository.vendedor(id);
  }
}
