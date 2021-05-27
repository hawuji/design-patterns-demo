
export const formFields = [
  {
    id: 'name',
    label: '姓名',
    type: 'input'
  }, {
    id: 'phoneNumber',
    label: '手机号',
    type: 'input',
    prefix: '+86',
    rule: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { min: 9, max: 11, message: '手机号长度在 9 到 11 个字符', trigger: 'blur' }
    ]
  }, {
    id: 'cardNumber',
    label: '银行卡号',
    type: 'input',
    rule: [
      { required: true, message: '请输入银行卡号', trigger: 'blur' }
    ]
  }
]
