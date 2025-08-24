import { LIMIT } from "../constants/callback.constants"

export class PaginatiorHelper {
  private _offset: number = 0
  private _total: number
  private _limit: number

  constructor(total: number, limit: number = LIMIT) {
    this._total = total
    this._limit = limit
  }

  get offset(): number {
    return this._offset
  }

  get pages(): number {
    return Math.ceil(this._total / this._limit)
  }

  offsetReset() {
    this._offset = 0
  }

  offsetIncrement() {
    this._offset += LIMIT
  }

  offsetDecrement() {
    this._offset -= LIMIT
  }

  offsetEnd() {
    if (this._total % 2) {
      this._offset = this._total - 1
    } else {
      this._offset = this._total - LIMIT
    }
  }
}
