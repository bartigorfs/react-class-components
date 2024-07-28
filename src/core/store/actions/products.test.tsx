import { describe, it, expect } from 'vitest'
import {
  ADD_SELECTED_ID,
  REMOVE_SELECTED_ID,
  addSelectedId,
  removeSelectedId,
} from './products.actions.ts' // Замените на путь к вашим действиям

describe('actions', () => {
  it('should create an action to add a selected ID', () => {
    const id = 1
    const expectedAction = {
      type: ADD_SELECTED_ID,
      payload: id,
    }
    expect(addSelectedId(id)).toEqual(expectedAction)
  })

  it('should create an action to remove a selected ID', () => {
    const id = 2
    const expectedAction = {
      type: REMOVE_SELECTED_ID,
      payload: id,
    }
    expect(removeSelectedId(id)).toEqual(expectedAction)
  })

  it('should handle undefined ID correctly', () => {
    const id: number | undefined = undefined

    // Проверяем действия с неопределённым ID
    const expectedAddAction = {
      type: ADD_SELECTED_ID,
      payload: id,
    }
    const expectedRemoveAction = {
      type: REMOVE_SELECTED_ID,
      payload: id,
    }

    expect(addSelectedId(id)).toEqual(expectedAddAction)
    expect(removeSelectedId(id)).toEqual(expectedRemoveAction)
  })
})
