'use client'

import React from 'react'
import SideBar from '../sidebar/page'
import StepOne from '../rightsidebar/page'
import { Provider } from 'react-redux/es/exports'
import { store } from '../rightsidebar/store'
import StepTwo from '../rightsidebar/steptwo/page'
import StepThree from '../rightsidebar/stepthree/page'

export default function page() {
  return (
    <Provider store={store}>
      <SideBar />
      <StepOne />
    </Provider>
  )
}
