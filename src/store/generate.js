// reuse.js
import generateSlice from './apps/sliceGenerator'

const generate = (name, fetchData) => {
  return generateSlice({ name, fetchData })
}

export default generate
