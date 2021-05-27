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

const bankListA = [
  { label: '(001)中国人民银行', value: '001' },
  { label: '(002)中国工商银行', value: '002' }
]
const bankListB = [
  { label: '(003)中国建设银行', value: '003' },
  { label: '(004)中国商业银行', value: '004' }
]

export default {
  name: 'APP',
  data () {
    var checkCardNumber = (rule, value, callback) => {
      const code = this.userInfo.bankCode
      if (!code) return
      // 这里只做简单的正则校验，实际的校验规则可能更复杂
      const regs = {
        '001': /^\d{12}$/, // 12位长度
        '002': /^\d{14}$/, // 14位长度
        '003': /^\d{8,12}$/, // 8-12位长度
        '004': /^\d{10}$/ // 10位长度
      }
      const reg = regs[code]
      if (!reg.test(value)) {
        callback(new Error('请输入正确的银行卡号'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        name: '',
        address: '',
        cardNumber: ''
      },
      userGroup: '',
      formFields: [
        {
          id: 'name',
          label: '姓名',
          type: 'input'
        }, {
          id: 'phoneNumber',
          label: '手机号',
          type: 'input',
          prefix: '+86'
        },
        {
          id: 'address',
          label: '地址',
          type: 'input'
        },
        {
          id: 'bankCode',
          label: '银行码',
          type: 'select',
          list: []
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
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        bankCode: [
          { required: true, message: '请选择银行码', trigger: 'change' }
        ],
        cardNumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { validator: checkCardNumber, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    initFields () {
      this.userGroup = sessionStorage.getItem('userGroup') || 'B' // 模拟从接口获取用户分组信息
      const indexBankCode = this.formFields.findIndex(item => item.id === 'bankCode')
      const indexPhone = this.formFields.findIndex(item => item.id === 'phoneNumber')
      // 对银行码列表和手机事情前缀做处理
      if (this.userGroup === 'A') {
        this.formFields[indexBankCode].list = bankListA
        this.formFields[indexPhone].prefix = '+86'
      } else {
        this.formFields[indexBankCode].list = bankListB
        this.formFields[indexPhone].prefix = '+57'
      }
    },
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
