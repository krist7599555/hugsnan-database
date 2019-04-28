<template>
  <div class="hero is-fullheight is-info">
    <div class="hero-body">
      <div class="container">
        <div class="title">Hugsnan Database</div>

        <div class="buttons">
          <button class="button is-warning is-rounded">
            <nuxt-link to="/post/create">create</nuxt-link>
          </button>
          <button class="button is-warning is-rounded">
            <nuxt-link to="/post">content</nuxt-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home"
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
