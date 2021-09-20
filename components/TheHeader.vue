<template>
  <div>
    <v-app-bar
      class="d-flex flex-column align-center pa-5 mt-4"
      color="transparent"
      flat
      dense
      fixed
    >
      <div class="d-flex">
        <v-text-field
          v-model="searchQuery"
          class="flex-grow-1"
          type="search"
          autocomplete="off"
          label="Cerca"
          prepend-inner-icon="mdi-magnify"
          single-line
          clearable
          filled
        />

        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" @click="fetchData()" v-on="on">
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </template>
          <span>Mescola</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" @click="info = true" v-on="on">
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
          </template>
          <span>About</span>
        </v-tooltip>
      </div>
    </v-app-bar>

    <v-dialog v-model="info" width="800">
      <v-card>
        <v-card-title class="item-title text-h4 pt-10"
          >A proposito di...</v-card-title
        >

        <v-card-text class="pt-6">
          <p v-html="content"></p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="info = false">chiudi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: false,
      searchQuery: '',
      content: `
        <p>
          Secondo il <em><a href="https://it.wikipedia.org/wiki/Grande_dizionario_italiano_dell%27uso" target="_blank">
          Grande dizionario italiano dell'uso</a></em> il numero di vocabili della lingua italiana è costituita da circa 
          260.000 elementi, a cui nel tempo si sono aggiunte nuove parole con la pubblicazione di appendinci. Tra queste 
          parole molto sono tecniche, rare o di ambiti speciali e quindi quelle di lessico comune si riducono a circa 
          47.000 vocaboli. A sua volta di questo sottogruppo le parole utilizzate abitualmente sono molto meno, circa 
          6.500, definite come " di base" e coprono il 98% dei nostri discorsi. Questa gruppo si può suddividere in tre sottoinsiemi:
        </p>
        <p>
          <ul>
            <li>
              <em>lessico fondamentale</em> (o di <em>massima frequenza</em>), poco più di 2.000 vocaboli, che costituisce 
              il vocabolario di base composto da parole di uso frequentissimo e che copre circa il 90% dei nostri discorsi
            </li>
            <li>
              <em>lessico di alto uso</em>, poco più di 2.500 vocaboli, composto da parole molto usate ma meno frequenti 
              di quelle fondamentali e copre circa il 6% dei nostri discorsi
            </li>
            <li>
              <em>lessico di alta disponibilità</em>, circa 2.000 vocaboli, composto da parole ancora meno frequenti, 
              usate poco nella lingua scritta ma molto in quella parlata e usati in circa l'1-2% dei discorsi.
            </li>
          </ul>
        </p>
        Scopo di questo portale è quello di provare a dare la possibilità a chiunque di conoscere in modo semplice nuovi termini 
        arricchendo così il proprio vocabolario con parole meno frequenti da poter utilizzare nei discorsi di tutti i giorni.
      `,
    }
  },
  watch: {
    searchQuery(searchQuery) {
      if (!searchQuery) return this.$emit('fetch', null)

      if (searchQuery.length >= 3) this.$emit('fetch', searchQuery)
    },
  },
  methods: {
    fetchData() {
      this.$emit('fetch', null)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-text-field {
  max-width: 100vw;
  min-width: 55vw;
}
</style>