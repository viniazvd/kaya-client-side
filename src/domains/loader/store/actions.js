import * as types from './mutations-type'

export const showLoader = context => {
  context.commit(types.SET_LOADER, true)
}

export const hideLoader = context => {
  context.commit(types.SET_LOADER, false)
}
