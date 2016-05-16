import mongoose from 'mongoose';

export function parseObjectId(argument) {
  return mongoose.Types.ObjectId(argument);
}