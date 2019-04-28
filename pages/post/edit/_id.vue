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
import axios from "axios";
import titleEditor from "@/components/title-editor.vue";
import mdEditor from "@/components/md-editor.vue";

export default {
  name: "post-edit-id",
  components: {
    "md-editor": mdEditor,
    "title-editor": titleEditor
  },
  async asyncData({ $axios, params }) {
    const url = params.id;
    const post = await $axios
      .get(`/api/post/${url}`)
      .then(res => res.data)
      .then(data => {
        data.date = new Date(data.date);
        return data;
      });
    return post;
  },
  mounted() {
    console.log(this.date);
  },
  data() {
    return {
      // title: "",
      // url: "",
      // tags: [],
      // date: new Date(),
      // html: "",
      // markdown: "#### how to use mavonEditor in nuxt.js"
    };
  },
  methods: {
    submit() {
      axios
        .post(`/api/post/edit/${this.$route.params.id}`, this.submitData)
        .then(res => res.data)
        .then(url => {
          this.$toast.open({
            type: "is-success",
            message: url
          });
          this.$router.push("/post/" + url);
        })
        .catch(err => {
          this.$toast.open({
            type: "is-success",
            message: _.get(err.response, "data") || "error is occur"
          });
        });
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
      };
    }
  }
};
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
