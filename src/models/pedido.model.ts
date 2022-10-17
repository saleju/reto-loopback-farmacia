import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Producto} from './producto.model';
import {Vendedor} from './vendedor.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cant_producto: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo_pago: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_pedido: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Producto)
  productoId: string;

  @belongsTo(() => Vendedor)
  vendedorId: string;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
