import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-Hans',
  head: [['link', { rel: 'icon', href: '/snail-logo.png' }]],
  title: 'Snail-Admin',
  description: 'Snail-Admin开源教程',
  lastUpdated: true,
  themeConfig: {
    logo: '/snail-logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/intro' },
      {
        text: '教程',
        items: [
          {
            text: '基础篇',
            items: [
              {
                text: '环境准备',
                link: '/guide/env',
              },
              {
                text: '工程构建',
                link: '/guide/start',
              },
            ],
          },
          {
            text: '进阶篇',
            items: [
              {
                text: '如何搭建文档？',
                link: '/tutorial/create-docs',
              },
              {
                text: '工程构建',
                link: '/guide/start',
              },
            ],
          },
        ],
      },
      {
        text: '生态系统',
        items: [
          {
            // Title for the section.
            text: '项目',
            items: [
              {
                text: 'snail-admin/cli',
                link: 'https://hu-snail.github.io/vue3-resource/',
                target: '_self',
                rel: 'sponsored',
              },
              {
                text: 'snail-admin/eslint-config',
                link: 'https://hu-snail.github.io/vue3-resource/',
                target: '_self',
                rel: 'sponsored',
              },
            ],
          },
          {
            // Title for the section.
            text: '资源',
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' },
            ],
          },
        ],
      },
      {
        text: '链接',
        items: [
          {
            text: 'vue3-resource',
            link: 'https://hu-snail.github.io/vue3-resource/',
            target: '_self',
            rel: 'sponsored',
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: [
          {
            text: '指南',
            items: [
              { text: '介绍', link: 'intro' },
              { text: '快速上手', link: '/guide/start' },
              { text: '更新日志', link: '/guide/changelog' },
              {
                text: '默认主题',
                base: '/zh/reference/default-theme-',
                items: [
                  { text: '概览', link: 'config' },
                  { text: '导航栏', link: 'nav' },
                  { text: '侧边栏', link: 'sidebar' },
                  { text: '主页', link: 'home-page' },
                  { text: '页脚', link: 'footer' },
                  { text: '布局', link: 'layout' },
                  { text: '徽章', link: 'badge' },
                  { text: '团队页', link: 'team-page' },
                  { text: '上下页链接', link: 'prev-next-links' },
                  { text: '编辑链接', link: 'edit-link' },
                  { text: '最后更新时间戳', link: 'last-updated' },
                  { text: '搜索', link: 'search' },
                  { text: 'Carbon Ads', link: 'carbon-ads' },
                ],
              },
            ],
          },
        ],
      },
      '/tutorial/': {
        base: '/tutorial/',
        items: [
          {
            text: '如何构建文档？',
            items: [
              {
                text: '默认主题',
                base: '/zh/reference/default-theme-',
                items: [
                  { text: '概览', link: 'config' },
                  { text: '导航栏', link: 'nav' },
                  { text: '侧边栏', link: 'sidebar' },
                  { text: '主页', link: 'home-page' },
                  { text: '页脚', link: 'footer' },
                  { text: '布局', link: 'layout' },
                  { text: '徽章', link: 'badge' },
                  { text: '团队页', link: 'team-page' },
                  { text: '上下页链接', link: 'prev-next-links' },
                  { text: '编辑链接', link: 'edit-link' },
                  { text: '最后更新时间戳', link: 'last-updated' },
                  { text: '搜索', link: 'search' },
                  { text: 'Carbon Ads', link: 'carbon-ads' },
                ],
              },
            ],
          },
        ],
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      {
        icon: {
          svg: `<svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z" fill="#1E80FF"/>
          </svg>
          `,
        },
        link: 'https://juejin.cn/user/1662117310637757',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: '掘金',
      },
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © ${new Date().getFullYear() !== 2024 ? '2024 - ' + new Date().getFullYear() : new Date().getFullYear()} hu-snail(蜗牛前端)`,
    },

    outline: {
      label: '页面导航',
      level: 'deep',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    search: {
      provider: 'local',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
