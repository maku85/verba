<template>
  <div class="d-flex flex-column align-center">
    <the-header @fetch="fetchData" />

    <div class="main-content">
      <p v-if="$fetchState.pending">Sto pensando...</p>
      <p v-else-if="$fetchState.error">Ops! qualcosa è andato storto :(</p>

      <v-row v-else>
        <masonry :cols="{ default: 5, 2000: 4, 1500: 3, 700: 2, 500: 1 }">
          <v-col v-for="item of items" :key="item.id">
            <the-item :item="item" @fetch="fetchDetails" />
          </v-col>
        </masonry>
      </v-row>

      <the-details :item="details" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      details: {},
    }
  },
  async fetch() {
    await this.fetchData()
  },
  methods: {
    async fetchDetails(selectedItem) {
      this.details = await this.$content('words', selectedItem.slug).fetch()
    },
    async fetchData(searchTerm = '') {
      const numOfItems = 40
      const ids = []
      const whereConditions = {}
      if (!searchTerm) {
        while (ids.length < numOfItems) {
          const r = Math.floor(Math.random() * numOfItems) + 1
          if (!ids.includes(r)) ids.push(r)
        }
        Object.assign(whereConditions, { id: { $in: ids } })
      }

      const items = await this.$content('words')
        .where(whereConditions)
        .search(searchTerm)
        .sortBy('date', 'desc')
        .limit(15)
        .fetch()

      this.items = !searchTerm
        ? items.sort((a, b) => {
            return ids.indexOf(a.id) - ids.indexOf(b.id)
          })
        : items
    },
  },
}
</script>

<style lang="scss" scoped>
.main-content {
  margin-top: 100px;
  margin-bottom: 60px;
}
</style>