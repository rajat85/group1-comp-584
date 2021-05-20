import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={true}>
      <div>

        <span className="ml-1">&copy; 2021 <a href="/" target="_blank" rel="noopener noreferrer">CampX</a>, Inc. All rights reserved.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="/about" target="_blank" rel="noopener noreferrer">CampX</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
