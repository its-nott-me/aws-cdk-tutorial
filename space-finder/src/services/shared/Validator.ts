import { SpaceEntry } from "../model/Model"


export class MissingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected!`)
  }
}

export class JsonError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export function validateAsSpaceEntry (arg: any){
  if((arg as SpaceEntry).location == undefined){
    throw new MissingFieldError('location')
  }
  if((arg as SpaceEntry).location == undefined) {
    throw new MissingFieldError('name')
  }
  if((arg as SpaceEntry).id == undefined){
    throw new MissingFieldError('id')
  }
}