import PropTypes from 'prop-types'
import React from 'react'
import {Header, Footer } from '../../../components'

export default function AppLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <main className="mx-auto min-h-[85vh]">{children}</main>
      <Footer />
    </React.Fragment>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}