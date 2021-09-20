<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title class="item-title text-h4 text-lowercase pt-10">
        {{ item.word }}
      </v-card-title>

      <v-card-text>
        <p class="font-italic font-weight-light text-lowercase">
          [{{ item.pronunciation }}]
        </p>
        <p v-html="item.etimology"></p>
        <p v-html="item.meaning"></p>
        <p v-if="item.details">
          <v-divider class="pb-4"></v-divider>
          <strong>Curiosità!</strong><br /><span v-html="item.details"></span>
        </p>
        <div v-if="item.synonyms">
          <v-divider class="pb-4"></v-divider>
          <strong>Sinonimi:</strong> {{ item.synonyms }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">chiudi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: { item: { type: Object, default: () => ({}) } },
  data() {
    return { dialog: false }
  },
  watch: {
    item() {
      this.dialog = this.item != null && !!this.item.word
    },
  },
}
</script>

<style lang="scss" scoped>
.item-title {
  color: #444;
}
</style>