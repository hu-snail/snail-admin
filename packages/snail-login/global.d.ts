// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SnBasicLogin: (typeof import('@admin/snail-login'))['SnBasicLogin']
    SnVipLogin: (typeof import('@admin/snail-login'))['SnVipLogin']
  }
}

export {}
