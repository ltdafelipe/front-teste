<template>
  <v-app class="main-background">
    <v-main>
      <Developers />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Developers from './views/Developers'
import Footer from '@/components/footer'
export default {
  name: 'App',

  components: {
    Developers,
    Footer
  },

  data: () => ({
    //
  })
}
</script>

<style lang="scss">
.main-background {
  background-color: #eeeeee !important;
}
</style>
