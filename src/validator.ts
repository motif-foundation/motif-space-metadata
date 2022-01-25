import { Validator as JsonValidator } from 'jsonschema'
import { validateVersion } from './versions'

export class Validator {
  public name: string
  public calVer: string

  constructor(version: string) {

    validateVersion(version)
    const [name, calVer] = version.split('-')
    this.name = name
    this.calVer = calVer
  }

  public validate(json: { [key: string]: any }): boolean {
    const jsonValidator = new JsonValidator()
    const schema = require(`../schemas/${this.name}/${this.calVer}.json`)
    return jsonValidator.validate(json, schema).valid
  }
}
