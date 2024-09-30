import React from 'react'
import MainNavigation from './src/navigation/Navigation'
import MainStack from './src1/navigations/MainStack'
import { Provider } from 'react-redux'
// import { store } from './src1/redux/store'
import store from '../cc_patient_app/src/redux/store/Store'

export default function App() {

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}
