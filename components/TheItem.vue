<template>
  <v-card @click.stop="fetch(item)">
    <v-card-title class="item-title pt-14 pb-0 text-h5 text-lowercase">
      {{ item.word }}
    </v-card-title>

    <v-card-text>
      <p class="font-italic font-weight-light text-lowercase">
        {{ item.pronunciation }}
      </p>
      <p v-html="item.meaning"></p>
      <div class="text-center text--disabled">{{ item.id }}/40</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: { item: { type: Object, default: () => ({}) } },
  methods: {
    fetch(item) {
      this.$emit('fetch', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.item-title {
  color: #444;
}
</style>
