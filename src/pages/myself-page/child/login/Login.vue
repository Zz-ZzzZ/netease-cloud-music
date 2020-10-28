<template>
  <van-dialog
    v-model="show"
    title="手机号登录"
    show-cancel-button
    theme="round-button"
    confirm-button-color="#ff4757"
    cancel-button-color="#767575"
  >
    <template v-slot:default>
      <div class="login-main">
        <div class="login-item">
          <div class="item-title">手机号</div>
          :
          <van-field
            v-model="loginForm.phone"
            maxlength="11"
            type="tel"
            clearable
          ></van-field>
        </div>
        <div class="login-item">
          <div class="item-title">密码</div>
          <div>:</div>
          <van-field
            v-model="loginForm.password"
            type="password"
            clearable
          ></van-field>
        </div>
      </div>
    </template>
  </van-dialog>
</template>

<script>
import { Notify } from "vant";
export default {
  props: {
    showLogin: {
      type: Boolean,
      default: false
    }
  },
  name: "Login",
  data() {
    return {
      show: this.showLogin,
      loginForm: {
        phone: "",
        password: ""
      },
      isGetCode: false,
      time: 60
    };
  },
  methods: {
    isMobile(mobile) {
      return /^1[3-9]\d{9}$/.test(mobile);
    },
    getCode() {
      if (this.isMobile(this.loginForm.phone)) {
        Notify({
          type: "success",
          message: "验证码已成功发出"
        });
        this.isGetCode = true;
        this.startInterval();
      }
    },
    startInterval() {
      let timer = setInterval(() => {
        if (this.time !== 0) {
          this.time--;
        } else {
          this.isGetCode = false;
          clearInterval(timer);
        }
      }, 1000);
    }
  },
  watch: {
    showLogin(val) {
      this.show = val;
    }
  }
};
</script>

<style scoped lang="scss">
.login-main {
  width: 75%;
  height: 2rem;
  margin: 0 auto 0 auto;
  font-size: 0.24rem;

  .login-item {
    color: $gray;
    margin: 0.4rem 0;
    padding-bottom: 0.1rem;
    border-bottom: 0.1px solid $divider;
    @include flex-box(row, flex-start, center);

    .van-cell {
      flex: 1;
      position: static;
      padding: 0 16px;
      margin-top: 0.05rem;
    }

    .get-code {
      width: 1.1rem;
      color: #fafafa;
      font-size: 0.21rem;
      line-height: 0.3rem;
      background-color: $red;
      border-radius: 20px;
      text-align: center;
      padding: 0.1rem 0.13rem;
    }

    .item-title {
      width: 0.9rem;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
    }
  }
}
/deep/.van-dialog__header {
  color: $title;
}
</style>
