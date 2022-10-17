import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vendedor,
  Pedido,
} from '../models';
import {VendedorRepository} from '../repositories';

export class VendedorPedidoController {
  constructor(
    @repository(VendedorRepository) protected vendedorRepository: VendedorRepository,
  ) { }

  @get('/vendedors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Vendedor has many Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.vendedorRepository.pedidos(id).find(filter);
  }

  @post('/vendedors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vendedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vendedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInVendedor',
            exclude: ['id'],
            optional: ['vendedorId']
          }),
        },
      },
    }) pedido: Omit<Pedido, 'id'>,
  ): Promise<Pedido> {
    return this.vendedorRepository.pedidos(id).create(pedido);
  }

  @patch('/vendedors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vendedor.Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.vendedorRepository.pedidos(id).patch(pedido, where);
  }

  @del('/vendedors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vendedor.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.vendedorRepository.pedidos(id).delete(where);
  }
}
