<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <UploadExcel></UploadExcel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadExcel from '@/components/UploadExcel/index.vue'
export default {
  components: {
    UploadExcel
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
