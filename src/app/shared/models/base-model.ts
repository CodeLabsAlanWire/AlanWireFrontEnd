export class BaseModel {
  success: boolean
  payload: any
  errors: any
  constructor({
    success = false,
    ...rest
  }) {
    Object.assign(this, rest)
    this.success = success
    this.payload = rest.payload ? rest.payload : null
    this.errors = rest.errors ? rest.errors : null
  }
}
