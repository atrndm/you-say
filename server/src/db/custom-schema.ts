 import { Schema } from 'mongoose';
//  import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export default (schema:Schema) => {
  schema.virtual('id').get(function getVirtualId() {
    return this._id.toHexString();
  });

  schema.query.leanWithVirtuals = function leanWithVirtuals() {
    return this.lean({ virtuals: true });
  };

  schema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc:any, ret:any) => { delete ret._id }
  });
};
