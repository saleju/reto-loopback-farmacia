import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {Pedido} from './pedido.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nom_producto: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_presentacion: string;

  @property({
    type: 'number',
    required: true,
  })
  prec_venta: number;

  @property({
    type: 'number',
    required: true,
  })
  prec_compra: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_vto: string;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @belongsTo(() => Proveedor, {name: 'producto'})
  proveedorId: string;

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
