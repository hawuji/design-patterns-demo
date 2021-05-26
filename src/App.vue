<template>
  <div id="app">
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" label-position="top">
      <template v-for="item in formFields">
        <el-form-item :key="item.id" :label="item.label" :prop="item.id">
          <el-input v-model="userInfo[item.id]" :placeholder="item.label"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="saveDate('userInfo')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'APP',
  data () {
    return {
      userInfo: {
        name: '',
        address: '',
        cardNumber: ''
      },
      formFields: [
        {
          id: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          id: 'address',
          label: '地址',
          type: 'input'
        },
        {
          id: 'cardNumber',
          label: '银行卡号',
          type: 'input'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        cardNumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
  }
}
</script>
