import React from 'react'
import MainNavigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import store from '../cc_patient_app/src/redux/store/Store'
export default function App() {

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}
