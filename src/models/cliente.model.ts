import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedido} from './pedido.model';

@model()
export class Cliente extends Entity {
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
  tipo_documento: string;

  @property({
    type: 'string',
    required: true,
  })
  num_documento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  dir_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  tel_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  email_cliente: string;

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
