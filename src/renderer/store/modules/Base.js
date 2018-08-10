const state = {
  main: 0,
  evlType: 0,
  evlData: '',
  projectName: '',
  userName: '',
  evlMethod: '',
  introBack: '',
  descriptionBack: '',
  certificationBack: ''
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  setEvlType (state, type) {
    state.evlType = type
  },
  setProjectName (state, name) {
    state.projectName = name
  },
  setUserName (state, name) {
    state.userName = name
  },
  setEvlMethod (state, evlMethod) {
    state.evlMethod = evlMethod
  },
  setEvlData (state, evlData) {
    state.evlData = evlData
  },
  setIntroBack (state, introBack) {
    state.introBack = introBack
  },
  setDescriptionBack (state, descriptionBack) {
    state.descriptionBack = descriptionBack
  },
  setCertificationBack (state, certificationBack) {
    state.certificationBack = certificationBack
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
