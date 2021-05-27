/**
 * 通过用户的分组获取对应的表单字段
 * @param {String} userGroup 用户分组
 * @returns Array
 */
export const getField = async function (userGroup) {
  const group = userGroup.toLocaleLowerCase()
  const file = await require(`./${group}`)
  const { formFields } = file
  return formFields
}
