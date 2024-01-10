export const renderAddRecord = (oldData, newData) => {
  console.log('=====rec addrecord oldData', oldData)
  console.log('=====rec addrecord newData', newData)
  oldData = oldData.tableData
  if (oldData && oldData.length > 0) {
    return [...oldData, newData]
  } else {
    return [newData]
  }
}
