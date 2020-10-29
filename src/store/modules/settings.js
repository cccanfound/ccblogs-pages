import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo, defaultSkin } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  skin: defaultSkin
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_SKIN: (state, skin) => {
    state.skin=skin
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeSkin({ commit }, skin) {
    commit('CHANGE_SKIN', skin)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

