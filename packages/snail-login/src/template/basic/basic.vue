<script lang="ts" setup>
import { SnLoginForm, SnRegisterForm } from '../../components'

defineOptions({
  name: 'SnBasicLogin',
})
</script>

<template>
  <div class="basic-login-wrap">
    普通的登录页
    <sn-login-form></sn-login-form>
    <sn-register-form></sn-register-form>
  </div>
</template>

<style scoped>
.basic-login-wrap {
  width: 100vw;
}
</style>
