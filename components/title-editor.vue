<template>
  <div>
    <b-field label="Title" horizontal>
      <b-input
        :value="title"
        @input="$emit('update:title', $event)"
        placeholder="สรุปเซอร์เวย์ เมษา 2019"
      ></b-input>
    </b-field>
    <b-field label="URL" horizontal>
      <b-input :value="url" @input="$emit('update:url', $event)" placeholder="servey-april-2019"></b-input>
    </b-field>
    <b-field label="Tags" horizontal>
      <b-taginput
        name="tags"
        icon="label"
        placeholder="Add a tag"
        autocomplete
        :value="tags"
        :allow-new="true"
        :data="filteredTags"
        @typing="getFilteredTags"
        @input="$emit('update:tags', $event)"
      ></b-taginput>
    </b-field>
    <no-ssr>
      <b-field label="Date" horizontal>
        <b-datepicker
          :value="date"
          @input="$emit('update:date', $event)"
          name="data-picker"
          :inline="false"
          :date-formatter="dateFormat"
          :date-parser="dateParse"
          placeholder="Click to select..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>
    </no-ssr>
  </div>
</template>
<script>
import axios from "axios"
import moment from "moment"

export default {
  name: "title-editor",
  props: ["title", "url", "tags", "date"],
  data() {
    return {
      alltags: [],
      filteredTags: []
    }
  },
  created() {
    axios.get("/api/post/tags/list").then(res => {
      this.alltags = res.data
    })
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.alltags.filter(tag => {
        return tag.includes(text)
      })
    },
    dateFormat(date) {
      console.log("format")
      return moment(date).format("l")
    },
    dateParse(str) {
      console.log("parse")
      return moment(str, "l").toDate()
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
