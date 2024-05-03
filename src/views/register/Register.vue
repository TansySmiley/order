<template>
  <div class="login">
    <Header title="注册" />
    <div class="img">外卖</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="user"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请输入用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="pass"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#ffc440"
        >
          注册
        </van-button>
        <van-button
          round
          block
          type="info"
          color="#ffc440"
          class="register"
          @click="toLogin"
        >
          去登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { Toast } from "vant";
export default {
  setup() {
    const router = useRouter();
    const onSubmit = (value) => {
      if (localStorage.userInfo) {
        let userInfo = JSON.parse(localStorage.getItem("userInfo")); //JSON.parse() 方法将这个字符串解析为 JavaScript 对象
        if (userInfo["user"] === value["user"]) {
          Toast("用户名已存在");
          return;
        }
      } else {
        register(value);
      }
    };
    const register = (value) => {
      localStorage.setItem("userInfo", JSON.stringify(value)); //localStorage只能存储字符串
      Toast("注册成功");
      router.push("/login");
    };
    const toLogin = () => {
      router.push("/login");
    };
    const data = reactive({
      username: "",
      password: "",
    });

    return {
      onSubmit,
      toLogin,
      ...toRefs(data),
    };
  },
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
.login {
  .img {
    width: 200px;
    height: 200px;
    background-color: #63ebe9;
    font-size: 80px;
    line-height: 200px;
    text-align: center;
    border-radius: 40px;
    margin: 20px auto;
  }
  .register {
    margin-top: 20px;
  }
}
</style>
