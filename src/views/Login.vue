<template>
  <div>
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler"
    />
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      model: {
        username: '',
        password: ''
      },
      schema: {
        fields: [
          // 用户名配置
          {
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              placeholder: '请输入用户名'
            },
            rules: {
              // 校验规则
              required: true,
              type: 'string',
              min: 3,
              max: 15
            },
            trigger: 'blur',
            messages: {
              required: '用户名不能为空',
              min: '用户名不能少于三个字符',
              max: '用户名不能大于十五个字符'
            }
          },
          // 密码配置
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              placeholder: '请输入密码',
              type: 'password',
              eye: {
                open: false
              }
            },
            rules: {
              // 校验规则
              required: true
            },
            trigger: 'blur'
          },
          {
            type: 'submit',
            label: '登录'
          }
        ]
      }
    }
  },
  methods: {
    async submitHandler (e) {
      e.preventDefault()
      try {
        const result = await this.$http.get('/api/login', { params: this.model })
        if (result.code === 0) {
          console.log(result.token)
          this.$store.commit('settoken', result.token)
          window.localStorage.setItem('token', result.token)
          this.$router.replace({ path: '/botnav/index' })
          // 判断路由时候带参数,带参数就去到重定向参数地址,否则渠道首页
          if (this.$route.query.redirect) {
            this.$router.replace({ path: this.$route.query.redirect })
          } else {
            this.$router.replace({ path: '/botnav/index' })
          }
        } else {
          alert(result.message)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    height:150px
    width 100%
</style>
