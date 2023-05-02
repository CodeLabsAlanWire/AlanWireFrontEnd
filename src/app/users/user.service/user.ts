export class User {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string
  constructor({
    id = 0,
    email = '',
    first_name = '',
    last_name = '',
    phone = '',
    ...rest
  }) {
    Object.assign(this, rest)
    this.id = id;
    this.email = email;
    this.first_name = first_name
    this.last_name = last_name
    this.phone = phone
  }

}
