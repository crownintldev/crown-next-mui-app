import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const ReduxFetchAndGet = (action, selector, props) => {
  const params = { limit: 20, page: 1 }
  const dispatch = useDispatch()
  const store = useSelector(selector)

  useEffect(() => {
    if (store && store.data && store.data.length < 1) {
      dispatch(action(params))
    } else if (props.params.page) {
      dispatch(action(props.params))
    }
  }, [])

  return store
}
