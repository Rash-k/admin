<template>
  <div class="index">
    <LeftMean></LeftMean>
    <div class="rightContainer">
      <HeadNav></HeadNav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadNav from '@/components/HeadNav'
import LeftMean from '@/components/LeftMean'

export default {
  name: 'home',
  components: {
    HeadNav,
    LeftMean
  }
}
</script>

<style lang="scss" scoped>
.index{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .rightContainer{
    position: relative;
    top:0;
    left: 180px;
    width: calc(100% - 180px);
    height: 100%;
    overflow: auto;
  }
}
</style>
