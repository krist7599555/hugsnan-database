<template>
  <section class="section" style="display: flex; justify-content: center;">
    <div class="markdown-body" style="max-width: 600px; min-width: 270px">
      <nuxt-link :to="'/post/edit/' + url" style="float: right">
        <button class="button">edit</button>
      </nuxt-link>
      <nuxt-link to="/post" style="float: right">
        <button class="button">back</button>
      </nuxt-link>
      <h1>{{title}}</h1>
      <div class="tags">
        <nuxt-link class="tag" v-for="tag in tags" :key="tag" :to="'/tags/' + tag">{{tag}}</nuxt-link>
      </div>
      <br>
      <p>{{date}}</p>
      <span v-html="html"></span>
    </div>
  </section>
</template>
<script>
import axios from "axios"

export default {
  name: "post-id",
  async asyncData({ $axios, params }) {
    console.log(params.id)
    const data = await $axios
      .get("/api/post/" + params.id)
      .then(res => res.data)
      .then(post => {
        console.log(post.date)
        post.date = new Date(post.date)
        return post
      })

    const { title, tags, date, markdown, html, url } = data
    return {
      title,
      tags,
      date,
      markdown,
      html,
      url
    }
  }
}
</script>
