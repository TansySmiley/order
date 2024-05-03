<template>
  <div class="food-list" v-if="index === 0">
    <van-tree-select
      v-model:main-active-index="activeIndex"
      height="88vw"
      :items="items"
      @click-nav="navClick"
    >
      <template #content>
        <div class="item-bg" v-for="(item, index) in subItem" :key="index">
          <list-item
            :item="item"
            :handleAdd="handleAdd"
            :handleChange="handleChange"
          />
        </div>
      </template>
    </van-tree-select>
  </div>

  <div v-else>
    {{ foodData.content }}
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import ListItem from "../../../components/ListItem.vue";
export default {
  props: ["index", "foodData"],
  setup(props) {
    let data = reactive({
      activeIndex: 0,
      items: [],
      subItem: [],
    });
    const initData = () => {
      let newArray = [];
      props.foodData?.items?.forEach((item, index) => {
        newArray.push({
          text: item.text,
        });
        if (data.activeIndex === index) {
          data.subItem = item.children;
        }
      });
      data.items = newArray;
    };
    initData();

    const navClick = (i) => {
      data.activeIndex = i;
      initData();
      data.subItem = props.foodData.items[e].children;
    };

    const handleAdd = (id) => {
      data.subItem.forEach((item, index) => {
        if (item.id === id) {
          item.add = false;
          item.num += 1;
        }
      });
    };
    const handleChange = (value, detail) => {
      data.subItem.forEach((item, index) => {
        if (item.id === detail.name) {
          item.num = value;
        }
      });
    };
    return {
      ...toRefs(data),
      navClick,
      handleAdd,
      handleChange,
    };
  },
  components: {
    ListItem,
  },
};
</script>

<style lang="less" scoped>
.food-list {
  margin-top: 20px;
  .item-bg {
    padding: 10px;
  }
}
/deep/ .van-tree-select__item--active {
  color: #63ebe9;
}
/deep/ .van-sidebar-item--select::before {
  background-color: #63ebe9;
}
</style>
