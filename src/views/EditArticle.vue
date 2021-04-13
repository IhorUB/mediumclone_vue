<template>
  <div>
    <mcv-loading v-if="isLoading"/>
    <mcv-article-form
        v-if="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvLoading from "@/components/Loading"
import McvArticleForm from "@/components/ArticleForm"
import {actionTypes} from "@/store/modules/editArticle"

export default {
  name: "McvEditArticle",

  components: {
    McvArticleForm,
    McvLoading
  },
  computed: {
    ...mapState({
      isLoading: state => state.editArticle.isLoading,
      isSubmitting: state => state.editArticle.isSubmitting,
      article: state => state.editArticle.article,
      validationErrors: state => state.editArticle.validationErrors
    }),
    initialValues() {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    onSubmit: function (articleInput) {
      const slug = this.$route.params.slug;
      this.$store.dispatch(actionTypes.updateArticle, {slug, articleInput})
          .then(article => {
            this.$router.push({name: 'article', params: {slug: article.slug}})
          })
    }
  }
}
</script>

<style scoped>

</style>