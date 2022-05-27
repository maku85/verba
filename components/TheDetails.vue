<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title class="pt-15 item-title pb-0 text-h4 text-capitalize">
        {{ item.word }}
        <v-btn fab small plain @click="startTxtToSpeech(item.pronunciation)">
          <v-icon>mdi-volume-medium</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <p class="font-italic font-weight-light text-lowercase">
          {{ item.pronunciation }}
        </p>

        <blockquote>
          <p class="etimology-bck">
            <strong>Etimologia:</strong>
            <span v-html="item.etimology"></span>
          </p>
        </blockquote>

        <p v-html="item.meaning"></p>

        <p v-if="item.examples">
          <div v-for="example of item.examples" :key="example.id" class="example ml-4 font-italic">"{{example}}"</div>
        </p>

        <v-divider
          v-if="item.details || item.synonyms || item.antonyms"
          class="pb-4"
        ></v-divider>

        <blockquote v-if="item.details">
          <p class="curiosity-bck">
            <strong>Curiosità!</strong><br /><span v-html="item.details"></span>
          </p>
        </blockquote>

        <blockquote v-if="item.synonyms || item.antonyms">
          <p v-if="item.synonyms" class="synonyms-bck">
            <strong>Sinonimi:</strong> {{ item.synonyms }}
          </p>
          <p v-if="item.antonyms" class="antonyms-bck">
            <strong>Contrari:</strong> {{ item.antonyms }}
          </p>
        </blockquote>
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
  methods: {
    startTxtToSpeech(text) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'it-IT'
      window.speechSynthesis.speak(utterance)
    },
  },
}
</script>

<style lang="scss" scoped>
.item-title {
  color: #444;
}


blockquote {
  margin: 0;

  p {
    padding: 15px;
    background: #ddd;
    border-radius: 5px;
  }
}

.etimology-bck {
  border-left: 10px solid #ccc;
}
.curiosity-bck {
  background: #c9dcb3;
}
.synonyms-bck {
  background: #ebebd3;
}
.antonyms-bck {
  background: #e5d4c0;
}
</style>
