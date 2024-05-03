<template>
 <div class="login">
    <Header title="登录" />
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
            <van-button round block type="info" native-type="submit" color="#ffc440">
                登录
            </van-button>
            <van-button round block type="info" color="#ffc440" class="register" @click="toRegister">
                注册
            </van-button>
        </div>

    </van-form>

 </div>
</template>

<script>
import Header from '../../components/Header.vue';
import {useRouter} from 'vue-router';
import { reactive, toRefs } from 'vue';
import { Toast } from 'vant';
 export default {
   setup () {
    const router = useRouter();
    const onSubmit = (values) => {
        if(!localStorage.userInfo){
            Toast('账号未注册');
            return;
        }else{
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if(userInfo['user'] === values['user']){
                if(userInfo['pass'] === values['pass']){
                    Toast('登录成功');
                    localStorage.setItem('isLogin','login');
                    router.push('/mine');
                }else{
                    Toast('密码错误');
                }
            }else{
                Toast('账号不存在');
            }
        }
    };
    const toRegister = () => {
        router.push('/register');
    }
    const data = reactive({
        username: '',
        password: '',
    });

     return {
        onSubmit,
        toRegister,
        ...toRefs(data),
     }
   },
   components: {
    Header,
   }
 }
</script>

<style lang="less" scoped>
.login {
    .img {
      width: 200px;
      height: 200px;
      background-color: #63EBE9;
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
