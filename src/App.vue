<template>
  <div id="app">
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" label-position="top">
      <template v-for="item in formFields">
        <el-form-item :key="item.id" :label="item.label" :prop="item.id">
          <template v-if="item.type === 'input'">
              <el-input v-model="userInfo[item.id]" :placeholder="item.label">
                <template v-if="item.prefix" slot="prepend">{{item.prefix}}</template>
              </el-input>
          </template>
          <template v-if="item.type === 'select'">
              <el-select v-model="userInfo[item.id]" :placeholder="item.label">
                <el-option
                  v-for="son in item.list"
                  :key="son.value"
                  :label="son.label"
                  :value="son.value">
                </el-option>
              </el-select>
          </template>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="saveDate('userInfo')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getField } from './group/index'

export default {
  name: 'APP',
  data () {
    return {
      userInfo: {},
      userGroup: '',
      formFields: [],
      rules: {}
    }
  },
  methods: {
    // 获取分组用户所需的表单字段
    async initFields () {
      this.userGroup = sessionStorage.getItem('userGroup') || 'B' // 模拟从接口获取用户分组信息
      let fields = null
      try {
        // 这里就是使用策略模式获取对应的表单字段
        fields = await getField(this.userGroup)
      } catch {
        console.log('加载失败')
      }
      this.initData(fields)
      this.formFields = fields
    },

    // 设置 userInfo 和 rules
    initData (fields) {
      const info = {}
      fields.forEach(item => {
        info[item.id] = ''
        if (item.rule) {
          /* 由于 Element UI 自定义的验证函数无法传参，所以要对验证函数进行修改
           * 能够在验证函数内部访问当前表单数据，可根据实际业务进行处理此处逻辑
          */
          if (Array.isArray(item.rule)) {
            item.rule.forEach(son => {
              if (typeof son.validator === 'function') {
                son.validator = son.validator.bind(this.userInfo)
              }
            })
          }
          this.rules[item.id] = item.rule
        }
      })
      // 对 userInfo 进行赋值，实现双向绑定
      this.userInfo = info
    },

    // 提交数据
    saveDate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.initFields()
  }
}
</script>
