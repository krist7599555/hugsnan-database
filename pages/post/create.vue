<template>
  <div>
    <!-- <no-ssr> -->
    <section class="section" style="max-width: 400px">
      <title-editor :title.sync="title" :url.sync="url" :tags.sync="tags" :date.sync="date"></title-editor>
    </section>
    <br>
    <md-editor :markdown.sync="markdown" :html.sync="html"></md-editor>
    <br>
    <section class="section" style="max-width: 400px">
      <b-button type="is-info" @click="submit">submit</b-button>
    </section>
    <!-- </no-ssr> -->
  </div>
</template>
<script>
import axios from "axios"
import * as _ from "lodash"
import titleEditor from "../../components/title-editor.vue"
import mdEditor from "../../components/md-editor.vue"

export default {
  name: "post-create",
  components: {
    "md-editor": mdEditor,
    "title-editor": titleEditor
  },
  data() {
    return {
      title: "",
      url: "",
      tags: [],
      date: new Date(),
      html: "",
      markdown: "#### how to use mavonEditor in nuxt.js"
    }
  },
  methods: {
    submit() {
      this.$nuxt.$router.push("/post")
      axios
        .post("/api/post/create", this.submitData)
        .then(res => res.data)
        .then(url => {
          this.$toast.open({
            type: "is-success",
            message: url
          })
          const newpath = "/post/" + url
          console.log("router push")
          // console.log(this.$nuxt.$router.p);
          this.$router.push(newpath)
          // this.$router.push({
          //   path: newpath
          // })
          // this.$router.push({
          //   name: "post-id",
          //   params: {
          //     id: url
          //   },
          //   path: newpath
          // })
          // this.$nuxt.$router.push({
          //   name: "post-id",
          //   params: {
          //     id: url
          //   },
          //   path: newpath
          // })
          // this.$nuxt.$router.push(newpath)
          // this.$nuxt.$router.push({
          //   path: newpath
          // })
          // this.$nuxt._router.push(newpath)
          // this.$nuxt._router.push({
          //   path: newpath
          // })
        })
        .catch(err => {
          console.error(err)
          this.$toast.open({
            type: "is-danger",
            message: _.get(err.response, "data") || "error is occur"
          })
        })
    }
  },
  computed: {
    submitData() {
      return {
        title: this.title,
        tags: this.tags,
        data: this.date,
        markdown: this.markdown,
        html: this.html,
        url: this.url,
        date: this.date
      }
    }
  }
}
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 200%;
}
.v-note-wrapper.markdown-body {
  z-index: 5;
  min-height: 500px;
}
</style>
