import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import popularTags from "@/store/modules/popularTags"
import article from '@/store/modules/article'
import editArticle from "./modules/editArticle";
import createArticle from "@/store/modules/editArticle"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle
  }
})
