import { bankList } from './a-list'

export const formFields = [
  {
    id: 'name',
    label: '姓名',
    type: 'input'
  }, {
    id: 'phoneNumber',
    label: '手机号',
    type: 'input',
    prefix: '+86'
  }, {
    id: 'bankCode',
    label: '银行码',
    type: 'select',
    list: bankList
  }, {
    id: 'cardNumber',
    label: '银行卡号',
    type: 'input',
    rule: [
      { required: true, message: '请输入银行卡号', trigger: 'blur' },
      { validator: checkCardNumber, trigger: 'blur' }
    ]
  }
]

function checkCardNumber (rule, value, callback) {
  const code = this.bankCode
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
