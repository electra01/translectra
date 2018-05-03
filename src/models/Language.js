import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

import Country from './Country'

const languageSchema = new mongoose.Schema({
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: [true, `The language country is a required field.`],
  },
  name: {
    type: String,
    required: [true, `The language name is a required field.`],
    unique: true,
  },
  code: {
    type: String,
    required: [true, `The language code is a required field.`],
    unique: true,
    validate: {
      validator: v => v.length === 0 || /^[a-z]{2}-[A-Z]{2}$/.test(v),
      message: `The language code must be of form "xx-XX".`,
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
})

languageSchema.plugin(mongooseUniqueValidator, { message: `This language {PATH} already exists.` })

export default mongoose.model('Language', languageSchema)
