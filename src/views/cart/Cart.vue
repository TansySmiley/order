<template>
  <div class="cart">
    <div class="content">
      <Header title="购物车" edit="true" />
      <CartDetailVue v-if="isShow" :changeShow="changeShow"/>
      <Empty v-else />
    </div>
      <Footer />
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue';
import Empty from '../../components/Empty.vue';
import Header from '../../components/Header.vue';
import CartDetailVue from './components/CartDetail.vue';
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue';


 export default {
   data () {
     return {

     }
   },
   components: {
      Footer,
      Empty,
      Header,
      CartDetailVue
   },
   setup() {
    const isShow = ref(true);
    const store = useStore();

    const init = () => {
      if (store.state.cartList.length === 0) {
        isShow.value = false;
      }
    };

    const changeShow = () => {
      isShow.value = false;
    };
    
    onMounted(() => {
      init();
    });
    

    return {
      isShow,
      changeShow,
    };
   }
 }
</script>

<style lang="less" scoped>
.cart {
  height: 100%;
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    overflow-y: auto;
  }
}


 
</style>
