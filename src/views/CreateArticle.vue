<template>
  <div>
    <mcv-article-form
        :initial-values="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from "@/components/ArticleForm"

export default {
  name: "McvCreateArticle",
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      validationErrors: null,
      isSubmitting: false
    }
  },
  components: {
    McvArticleForm
  },
  methods: {
    onSubmit: function(form) {
      console.log(form)
    }
  }
}
</script>

<style scoped>

</style>