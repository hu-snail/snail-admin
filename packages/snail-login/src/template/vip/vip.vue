<script lang="ts" setup>
import { SnLoginForm, SnRegisterForm } from '../../components'

defineOptions({
  name: 'SnVipLogin',
})
</script>

<template>
  <div class="vip-login-wrap">
    vip登录页
    <sn-login-form></sn-login-form>
    <sn-register-form></sn-register-form>
  </div>
</template>

<style scoped>
.vip-login-wrap {
  width: 100vw;
}
</style>
