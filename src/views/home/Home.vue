<template>
  <div class="home">
    <div class="content">
      <!-- 头部 -->
      <div class="header">
        <div class="text">外卖</div>
        <div class="location">
          <van-icon name="location-o" />
          <span>jason课程</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 主要的内容区域 -->
      <div class="main">
        <div class="main-bg">
          <div class="search">
            <input type="text" />
            <div class="search-text">搜索</div>
          </div>
          <div class="sort">
            <div class="big-sort">
              <div v-for="(item, index) in big_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                {{ item.name }}
              </div>
            </div>
            <div class="small-sort">
              <div v-for="(item, index) in small_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <van-tabs v-model="active" class="van-tabs">
          <van-tab
            v-for="(item, index) in centent_nav_list"
            :title="item.tab"
            :key="index"
          >
            <nav-list :navList="item.data"></nav-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import Footer from "../../components/Footer.vue";
import NavList from "./components/NavList.vue";
// import axios from "axios";
import {getApiHomeData} from '../../api/api'
export default {
  components: {
    Footer,
    NavList,
  },
  setup() {
    let data = reactive({
      big_sort: [],
      small_sort: [],
      centent_nav_list: [],
    });
    const active = ref(0);
    const getHomeData = ()=>{
      getApiHomeData().then((res => {
          data.small_sort = res.small_sort;
          data.big_sort = res.big_sort;
          data.centent_nav_list = res.centent_nav_list;
      }))
      // axios.get('/home/getHomeData').then(res=>{
      //   console.log(res);
      //   const {code,data} = res.data;
      //   if(code == 200){
      //     data.small_sort = homeData.small_sort;
      //     data.big_sort = homeData.big_sort;
      //     data.centent_nav_list = homeData.centent_nav_list;
      //   }
      // })
    }
    onMounted(()=>{
      getHomeData();
    })
    return {
      ...toRefs(data),
      active,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-flow: column;
  font-size: 12px;
  .content {
    flex: 1;
    overflow-y: auto;
    .header {
      background-image: linear-gradient(#63ebe9, #fff);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 40px 20px;
      .text {
        font-size: 20px;
        font-weight: 600;
      }
      .location {
        font-size: 14px;
        span {
          margin: 0 5px;
        }
      }
    }
    .main {
      margin-top: -30px;
      .main-bg {
        background-image: linear-gradient(#fff, #f5f5f5);
        padding: 10px 20px 0px 20px;
        border-radius: 30px 30px 0 0;
        .search {
          position: relative;
          input {
            width: 100%;
            height: 30px;
            border: 1px solid #63ebe9;
            border-radius: 20px;
          }
          .search-text {
            position: absolute;
            right: -6px;
            top: 1px;
            font-size: 14px;
            background: #63ebe9;
            border-radius: 16px;
            width: 50px;
            height: 32px;
            line-height: 32px;
            text-align: center;
          }
        }
        .sort {
          padding: 20px 0;
          .big-sort {
            display: flex;
            div {
              flex: 1;
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;
              .icon {
                width: 50px;
                height: 50px;
                margin-bottom: 5px;
              }
            }
          }
          .small-sort {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            div {
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;
              width: 20%;
              .icon {
                width: 30px;
                height: 30px;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
      .van-tabs {
        padding: 0 20px 10px;
      }
    }
  }
}

::v-deep .van-tabs__wrap {
  border-radius: 10px;
}
</style>
