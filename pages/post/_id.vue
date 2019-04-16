<template>
  <section class="section" style="display: flex; justify-content: center;">
    <div class="markdown-body" style="max-width: 600px">
      <h1>{{title}}</h1>
      <p>
        <b-tag v-for="tag in tags" :key="tag">
          <a @click="$router.push('/tags/' + tag)">{{tag}}</a>
        </b-tag>
      </p>
      <br>
      <p>{{date}}</p>
      <span v-html="html"></span>
    </div>
  </section>
</template>
<script>
import axios from "axios";

export default {
  name: "post-id",
  async asyncData({ params }) {
    const data = await axios
      .get("/api/post/" + params.id)
      .then(res => res.data);
    const { title, tags, date, markdown, html } = data;
    return {
      title,
      tags,
      date,
      markdown,
      html
    };
  }
};
</script>
