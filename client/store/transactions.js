import axios from 'axios'

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

/**
 * THUNK CREATORS
 */
export const fetchTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/transactions')
    dispatch(getTransactions([res.data.transactions]))
  } catch (err) {
    console.error(err)
  }
}
export const yearly = () => async dispatch => {
  try {
    const res = await axios.get('/yearlyTransaction')
    dispatch(getTransactions([res.data.transactions]))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}
