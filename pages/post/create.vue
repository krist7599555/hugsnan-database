<template>
  <div>
    <no-ssr>
      <section class="section" style="max-width: 400px">
        <b-field label="Title" horizontal>
          <b-input v-model="title"></b-input>
        </b-field>
        <b-field label="Tags" horizontal>
          <b-taginput
            name="tags"
            v-model="tags"
            :data="filteredTags"
            autocomplete
            :allow-new="true"
            field="user.first_name"
            icon="label"
            placeholder="Add a tag"
            @typing="getFilteredTags"
          ></b-taginput>
        </b-field>
        <b-field label="Date" horizontal>
          <b-datepicker
            name="data-picker"
            :inline="false"
            :date-formatter="Intl.DateTimeFormat('en-GB').format"
            placeholder="Click to select..."
            icon="calendar-today"
          ></b-datepicker>
        </b-field>
      </section>
      <br>
      <div class="mavonEditor">
        <mavon-editor
          ref="mavon-editor"
          @change="(a, b) => html = b"
          name="markdown"
          language="en"
          :toolbars="markdownOption"
          v-model="handbook"
          :ishljs="true"
          :navigation="false"
          @imgAdd="imgAdd"
        />
      </div>
      <br>
      <div>{{html}}</div>
      <br>
      <div>{{submitData}}</div>
      <b-button type="is-info" @click="submit">submit</b-button>
    </no-ssr>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "markdown",
  data() {
    return {
      html: "sfvsdfv",
      title: "",
      tags: [],
      alltags: ["a", "b", "bbbbbb", "cbb"],
      filteredTags: ["a", "b", "bbbbbb", "cbb"],
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: false,
        subscript: false,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: false,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        /* 1.3.5 */
        undo: true,
        redo: true,
        trash: false,
        save: false,
        /* 1.4.2 */
        navigation: false,
        /* 2.1.8 */
        alignleft: true,
        aligncenter: true,
        alignright: false,
        /* 2.2.1 */
        subfield: true,
        preview: true
      },
      handbook: "#### how to use mavonEditor in nuxt.js"
    };
  },
  methods: {
    getFilteredTags() {
      console.log(this.filteredTags);
      this.filteredTags = this.alltags.filter(option => {
        console.log(option);
        return true;
      });
    },
    imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      axios({
        method: "post",
        url: "/api/upload",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(result => {
        const url = result.data;
        this.$refs["mavon-editor"].$img2Url(pos, url);
      });
    },
    submit() {
      axios
        .post("/api/post/create", this.submitData)
        .then(res => res.data)
        .then(({ _id }) => {
          this.$router.push("/post/" + _id);
        });
    }
  },
  computed: {
    submitData() {
      return {
        title: this.title,
        tags: this.tags,
        data: this.date,
        markdown: this.handbook,
        html: this.html
      };
    }
  }
};
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
.v-note-wrapper.markdown-body {
  z-index: 5;
}
</style>
