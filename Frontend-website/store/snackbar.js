export const state = () => ({
    content: '',
    color: '',
    top: true,
  })
  
  export const mutations = {
    showMessage (state, payload) {
      state.content = payload.content
      state.color = payload.color
    }
  }