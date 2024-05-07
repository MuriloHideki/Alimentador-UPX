export class Feeder {
  _id: string = '';
  name: string = '';
  weight: number = 0;
  type: string = '';
  address: string = '';
  details: string = '';
  lastUpdateDate: Date;

  constructor(_id: string, name: string, weight: number, type: string, lastUpdateDate: Date,){
    this._id = _id;
    this.name = name;
    this.weight = weight;
    this.type = type;
    this.lastUpdateDate = lastUpdateDate;
    }
}
