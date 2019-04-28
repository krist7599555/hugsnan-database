<template lang="pug">
div.section(align='center' style='background-color: #fff5e96b')
  .box
    b-field(type='is-white')
      b-taginput(expanded type="is-warning" label="Search some tags" v-model='searchtags' :allow-new='true' icon="label" placeholder="Add a tag")
      b-button(type='is-info' @click='search')
        b-icon(icon='search' pack='fas')
      nuxt-link(to='/post/create')
        b-button(type='is-success')
          b-icon(icon='plus' pack='fas')
  no-ssr
    .box.has-text-left(v-for='{title, date, url, tags, html} in posts')
      .content
        .title-color
          h1
            nuxt-link(:to='"/post/" + url') {{title}}
            .help.is-size-7 {{date}}
          .tags
            nuxt-link.tag(v-for='tag in tags' :key='tag' :to='"/post/tags/" + tag')
              | {{tag}}
      .markdown-body
        span(v-html='html')
  no-ssr

</template>

<script>
export default {
  name: "post",
  scrollToTop: true,
  watchQuery: ["tags"],
  key: to => to.fullPath,
  async asyncData({ $axios, query }) {
    const posts = await $axios({
      methods: "GET",
      url: "/api/post/all",
      params: query
    })
      .then(res =>
        res.data.map(p => {
          p.date = new Date(p.date)
          return p
        })
      )
      .catch(err => [])
    console.log("Posts =", posts)
    return {
      posts
    }
  },
  created() {
    const tags = this.$route.query.tags
    const arr = !tags ? [] : Array.isArray(tags) ? tags : [tags]
    console.log(arr)
    this.searchtags = JSON.parse(JSON.stringify(arr))
  },
  data() {
    return {
      searchtags: []
    }
  },
  methods: {
    search() {
      this.$router.replace({
        query: {
          tags: this.searchtags
        }
      })
    }
  }
}
</script>

<style>
.box {
  max-width: 500px;
  border-color: #e61055e0;
  border-width: 2px 0 0 0;
  border-style: solid;
}
.title-color {
  padding-left: 10px;
  border-width: 0px 0px 0px 7px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #da518a, #fff0) 1 100%;
}
</style>
