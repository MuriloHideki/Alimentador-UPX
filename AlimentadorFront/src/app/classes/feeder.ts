export class Feeder {
  _id: string = '';
  name: string = '';
  bowl: number = 0;
  stock: number = 0;
  type: string = '';
  details: string = '';
  lastUpdateDate!: Date;

  address: {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: string;
  } = {
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: ''
  };
}
