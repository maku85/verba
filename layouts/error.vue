<template>
  <v-container class="d-flex align-center">
    <v-card class="page">
      <div
        class="
          fill-height
          content
          d-flex
          flex-column
          align-center
          justify-center
        "
      >
        <h1>{{ error.statusCode }}</h1>
        <h2 v-if="error.statusCode === 404">{{ pageNotFound }}</h2>
        <h2 v-else>{{ otherError }}</h2>
        <p>{{ error.message }}</p>

        <v-btn class="mt-10" outlined plain raised to="/">
          torna indietro
        </v-btn>
      </div>
      <img src="https://source.unsplash.com/random/800x600?topics=nature" />
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 800px;
  z-index: 1;
  border-radius: 10px;
  overflow: hidden;
}

.content {
  text-align: center;
  color: #444;

  h1 {
    font-weight: 900;
    font-size: 165px;
    line-height: 1;
    margin-bottom: -10px;
    opacity: 0.8;
  }

  h2 {
    font-weight: 700;
    font-size: 42px;
    margin-bottom: 6px;
    opacity: 0.8;
  }

  p {
    font-weight: 300;
    font-size: 18px;
    opacity: 0.9;
  }

  a {
    font-weight: 300;
    font-size: 14px;
  }
}

img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  opacity: 0.5;
  transform: scale(1.1);
}
</style>
