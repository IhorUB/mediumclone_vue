<template>
  <div class="editor-page">
    <div class="container-page container">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <mcv-validation-errors v-if="errors" :validation-errors="errors"/>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input type="text"
                     class="form-control form-control-lg"
                     placeholder="title"
                     v-model="title">
            </fieldset>
            <fieldset class="form-group">
              <input type="text"
                     class="form-control form-control-lg"
                     placeholder="description"
                     v-model="description">
            </fieldset>
            <fieldset class="form-group">
              <textarea class="form-control form-control-lg"
                        placeholder="body"
                        v-model="body"></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input type="text"
                     class="form-control form-control-lg"
                     placeholder="enter tags"
                     v-model="tagList">
            </fieldset>
            <fieldset class="form-group">
              <button type="submit" class="btn btn-lg pull-xs-right btn-primary"
                      :disabled="isSubmitting">
                  Publish
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors"
export default {
  name: "McvArticleForm",
  components: {McvValidationErrors},
  props: {
    initialValues: {
      type: Object,
      required: true
    }, errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' ')
    }
  },

  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      }
      this.$emit('articleSubmit', form)
    }
  }
}
</script>

<style scoped>

</style>