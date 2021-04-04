 import { Schema } from 'mongoose';
//  import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

 export default class CustomSchema extends Schema {
  constructor(schema:any, options:any) {
    super(schema, options);

    this.virtual('id').get(function getVirtualId() {
      return this._id.toHexString();
    });

    this.query.leanWithVirtuals = function leanWithVirtuals() {
      return this.lean({ virtuals: true });
    };

    this.set('toJSON', {
      virtuals: true,
      versionKey:false,
      transform: (doc:any, ret:any) => { delete ret._id }
    });
    // this.plugin(mongooseLeanVirtuals);
  }
 }
