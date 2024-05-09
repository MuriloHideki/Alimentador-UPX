export class Feeder {
  _id: string = '';
  name: string = '';
  bowl: number = 0;
  stock: number = 0;
  type: string = '';
  address: string = '';
  details: string = '';
  lastUpdateDate: Date;

  constructor(_id: string, name: string, bowl: number, stock:number, type: string, details: string, lastUpdateDate: Date,){
    this._id = _id;
    this.name = name;
    this.bowl = bowl;
    this.stock = stock;
    this.type = type;
    this.details = details;
    this.lastUpdateDate = lastUpdateDate;
    }
}
