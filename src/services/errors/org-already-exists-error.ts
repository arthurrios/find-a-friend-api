export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('A org with the same e-email already exists.')
  }
}
