import articleApi from '@/api/article'

const state = {
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null
}

export const mutationTypes = {
    getArticleStart: '[getArticle] Get article start',
    getArticleSuccess: '[getArticle] Get article success',
    getArticleFailure: '[getArticle] Get article failure',

    updateArticleStart: '[updateArticle] Update article start',
    updateArticleSuccess: '[updateArticle] Update article success',
    updateArticleFailure: '[updateArticle] Update article failure'
}

export const actionTypes = {
    updateArticle: '[update Article] Update article',
    getArticle: '[get Article] Get article',
}

const mutations = {
    [mutationTypes.getArticleStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false
        state.article = payload
    },
    [mutationTypes.getArticleFailure](state) {
        state.isLoading = false
    },
    // update part
    [mutationTypes.updateArticleStart](state) {
        state.isSubmitting = true
    },
    [mutationTypes.updateArticleSuccess](state) {
        state.isSubmitting = false
    },
    [mutationTypes.updateArticleFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

const actions = {
    [actionTypes.getArticle](context, {slug}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getArticleStart)
            articleApi
                .getArticle(slug)
                .then(article => {
                    context.commit(mutationTypes.getArticleSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationTypes.getArticleFailure)
                })
        })
    },


    [actionTypes.updateArticle](context, {slug, articleInput}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.updateArticleStart)
            articleApi
                .updateArticle(slug, articleInput)
                .then(article => {
                    context.commit(mutationTypes.updateArticleSuccess, article)
                    resolve(article)
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.updateArticleFailure,
                        result.response.data.errors
                    )
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}