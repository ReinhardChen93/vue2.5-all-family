<template>
  <div id="index">
    <cube-slide
      ref="slide"
      :data="items"
      @change="changePage"
    >
      <cube-slide-item
        v-for="(item, index) in items"
        :key="index"
        @click.native="clickHandler(item, index)"
      >
        <a :href="item.url">
          <img class="banner" :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
    <!--  滚动分类 -->
    <cube-slide
      ref="slidelists"
      :auto-play="false"
      :data="lists"
      @change="changePage"
    >
      <cube-slide-item
        v-for="(list, index) in lists"
        :key="index"
      >
        <ul class="listul">
          <li v-for="(item,index1) in list" :key="index1" class="listli">
            <a :href="item.url">
              <img :src="item.image">
              <p>{{item.label}}</p>
            </a>
          </li>
        </ul>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      items: [],
      lists: []
    }
  },
  methods: {
    changePage (current) {
    },
    clickHandler (item, index) {
    }
  },
  async created () {
    try {
      // 获取轮播图数据
      const items = await this.$http.get('/api/banner')
      this.items = items.data
      // 获取滚动分类数据
      const lists = await this.$http.get('/api/rollinglist')
      this.lists = lists.data
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="stylus" scoped>
#index
  a
    .banner
      display block
      width 100%
      height 175px
  .listul
    display flex
    flex-wrap wrap
  .listli
    width 20%
    justify-content content
    img
      width 35px
      height 35px
      border-radius 50%
      padding 5px 0
    p
      font-size 14px
      padding-bottom 10px

</style>
