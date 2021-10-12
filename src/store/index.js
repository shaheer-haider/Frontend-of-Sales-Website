import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    dataForReport: {}
  },
  mutations: {
    dataForReport: (state, data) => {
      state.dataForReport = data
    }
  },
  getters: {
    getReportsData: state => {
      return state.dataForReport
    }
  }
})