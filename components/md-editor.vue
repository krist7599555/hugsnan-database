<template>
  <no-ssr>
    <div class="mavonEditor">
      <mavon-editor
        ref="mavon"
        name="markdown"
        :value="markdown"
        language="en"
        :toolbars="markdownOption"
        :ishljs="true"
        :navigation="false"
        @imgAdd="imgAdd"
        @change="(a, b) => {
          $emit('update:markdown', a)
          $emit('update:html', b)
        }"
      />
    </div>
  </no-ssr>
</template>

<script lang='js'>
import Vue, { VueConstructor } from 'vue';
import axios from "axios";
import * as _ from 'lodash'
const mavonIcon = [
  ["fa-mavon-bold", "fa-bold"],
  ["fa-mavon-italic", "fa-italic"],
  ["fa-mavon-thumb-tack", "fa-thumbtack"],
  ["fa-mavon-link", "fa-link"],
  ["fa-mavon-picture-o", "fa-image"],
  ["fa-mavon-repeat", "fa-redo"],
  ["fa-mavon-undo", "fa-undo"],
  ["fa-mavon-trash-o", "fa-trash-o"],
  ["fa-mavon-floppy-o", "fa-floppy-o"],
  ["fa-mavon-compress", "fa-compress"],
  ["fa-mavon-eye", "fa-eye"],
  ["fa-mavon-eye-slash", "fa-eye-slash"],
  ["fa-mavon-question-circle", "fa-question-circle"],
  ["fa-mavon-times", "fa-times"],
  ["fa-mavon-align-left", "fa-align-left"],
  ["fa-mavon-align-center", "fa-align-center"],
  ["fa-mavon-align-right", "fa-align-right"],
  ["fa-mavon-arrows-alt", "fa-arrows-alt"],
  ["fa-mavon-bars", "fa-bars"],
  ["fa-mavon-list-ul", "fa-list-ul"],
  ["fa-mavon-list-ol", "fa-list-ol"],
  ["fa-mavon-strikethrough", "fa-strikethrough"],
  ["fa-mavon-underline", "fa-underline"],
  ["fa-mavon-table", "fa-table"],
  ["fa-mavon-columns", "fa-columns"],
  ["fa-mavon-quote-left", "fa-quote-left"],
  ["fa-mavon-code", "fa-code"],
  ["fa-mavon-superscript", "fa-superscript"],
  ["fa-mavon-subscript", "fa-subscript"],
  ["fa-mavon-header", "fa-heading"],
  ["fa-mavon-window-maximize", "fa-window-maximize"],
]

export default Vue.extend({
  name: "md-editor",
  props: ["markdown", "html"],
  mounted() {
    this.$nextTick(() => {
      // update icon to fortawesome 5
      const mavon = this.$refs.mavon.$el
      for (const [iconfrom, iconto] of []) {
        const e = mavon.getElementsByClassName(iconfrom)[0]
        if (e && e.classList) {
          e.classList.add(iconto);
          e.classList.remove(iconfrom)
        } else {
          console.log(iconfrom, iconto)
        }
      }
    });
  },
  data() {
    return {
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
        code: true,
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
      }
    };
  },
  methods: {
    async imgAdd(pos, $file) {
      const loadingComponent = this.$loading.open({
        container: null
      });
      var formdata = new FormData();
      formdata.append("file", $file);
      this.$nuxt.$loading.start();
      await axios({
        method: "post",
        url: "/api/upload",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(result => {
          const url = result.data;
          this.$refs["mavon-editor"].$img2Url(pos, url);
          this.$toast.open({
            type: "is-success",
            message: "upload image success"
          });
          loadingComponent.close();
        })
        .catch(err => {
          this.$toast.open({
            type: "is-danger",
            message: _.get(err.response, "data") || "error when upload"
          });
        });
      this.$nuxt.$loading.finish();
    }
  }
});
</script>

<style scoped src='../node_modules/mavon-editor/dist/css/index.css'>
</style>

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
