<template>
  <Header title="地址管理" />
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
  />
</template>

<script>
import Header from "../../components/Header.vue";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import type from "postcss-pxtorem/lib/type";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      list: [],
    });
    const onAdd = () => {
      router.push({
        path: "/addressedit",
        query: {
          type: "add",
        },
      });
    };
    const onEdit = (item) => {
      router.push({
        path: "/addressedit",
        query: {
          id: item.id,
          type: "edit",
        },
      });
    };
    const init = () => {
      data.list = store.state.userAddress.map((item) => {
        return {
          id: item.id,
          name: item.name,
          tel: item.tel,
          address: `${item.province} ${item.city} ${item.county} ${item.addressDetail}`,
          isDefault: item.isDefault,
        };
      });
    };
    onMounted(() => {
      init();
    });
    return {
      ...toRefs(data),
      onAdd,
      onEdit,
    };
  },
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
::v-deep .van-button {
  background-color: #63ebe9;
  border-color: #63ebe9;
}
::v-deep .van-button--danger {
  background-color: #63ebe9;
  border-color: #63ebe9;
}
::v-deep .van-switch--on {
  background-color: #63ebe9;
}
::v-deep .van-radio__icon {
  display: none;
}
</style>
