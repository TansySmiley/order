<template>
  <div class="cartDetail">
    <div class="content">
      <van-checkbox-group
        v-model="checked"
        ref="checkboxGroup"
        @change="groupChange"
      >
        <div v-for="(item, index) in store.state.cartList" :key="index">
          <ListItem
            :item="item"
            :handleChange="handleChange"
            :showCheckBox="true"
          />
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="allPrice"
      button-text="结算"
      @submit="onSubmit"
      class="submit-all"
      button-color="#63EBE9"
      v-if="store.state.isDelete"
    >
      <van-checkbox
        v-model="submitChecked"
        checked-color="#63EBE9"
        @click="choseAll"
        >全选</van-checkbox
      >
    </van-submit-bar>
    <div class="buy" v-else>
      <div class="left">
        <van-checkbox
          v-model="submitChecked"
          checked-color="#63EBE9"
          @click="choseAll"
          >全选</van-checkbox
        >
      </div>
      <div class="delete" @click="handleDelete">删除</div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ListItem from "../../../components/ListItem.vue";
import { Toast } from "vant";
export default {
  props: ["changeShow"],
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      checked: [],
      submitChecked: true,
    });
    const handleChange = (value, detail) => {
      store.state.cartList.map((item) => {
        if (item.id === detail.id) {
          item.num = value;
        }
      });
    };
    const init = () => {
      data.checked = store.state.cartList.map((item) => item.id);
    };
    onMounted(() => {
      init();
    });
    const onSubmit = () => {
      if (data.checked.length) {
        store.commit("pay", updateData());
        router.push({
          path: "/createorder",
          query: {
            list: data.checked,
          },
        });
      } else {
        Toast.fail("请选择商品!");
      }
    };
    const choseAll = () => {
      if (data.checked.length !== store.state.cartList.length) {
        init();
      } else {
        data.checked = [];
      }
    };
    const groupChange = (result) => {
      if (result.length === store.state.cartList.length) {
        data.submitChecked = true;
      } else {
        data.submitChecked = false;
      }
      data.checked = result;
    };
    const allPrice = computed(() => {
      let countList = updateData();
      let sum = 0;
      countList.forEach((item) => {
        sum += item.price * item.num;
      });
      return sum * 100;
    });
    const updateData = (type) => {
      return store.state.cartList.filter((item) => {
        return type === "delete"
          ? !data.checked.includes(item.id)
          : data.checked.includes(item.id);
      });
    };
    const handleDelete = () => {
      //判断data.checked是否有值
      if (data.checked.length) {
        store.commit("delete", updateData("delete"));
        data.checked = [];
        //购物车没有数据的时候，要出现兜底样式
        if (store.state.cartList.length === 0) {
          props.changeShow();
          store.commit("edit", "delete");
        }
      }
    };
    return {
      ...toRefs(data),
      store,
      handleChange,
      onSubmit,
      choseAll,
      groupChange,
      allPrice,
      handleDelete,
    };
  },
  components: {
    ListItem,
  },
};
</script>

<style lang="less" scoped>
.cartDetail {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 20px 55px;
  .submit-all {
    position: fixed;
    bottom: 46px;
  }

  .buy {
    position: fixed;
    bottom: 48px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    height: 50px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
    }
    .delete {
      color: #fff;
      background-color: #63ebe9;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }

  .content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>
