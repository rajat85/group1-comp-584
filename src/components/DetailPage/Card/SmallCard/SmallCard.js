import { CCol, CContainer, CRow } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './SmallCard.css'

export default function SmallCard(props) {
    return (
        <React.Fragment>
            <CContainer>
                <CRow>
                    <CCol md={8} className="camp_border">
                        <CRow>
                            <h3 className="camp_title">Activities</h3>
                        </CRow>
                        <CRow>
                            {props.arrActivities.list.map((activites, index) => (
                                <div className="camp_tile_main " key={index}>
                                    <div className="camp_tile">
                                        <FontAwesomeIcon pull="left" icon={activites.icon} style={{ fontSize: '2rem' }} />
                                    </div>
                                    <span className="camp_tile_name">{activites.name}</span>
                                </div>
                            ))}
                        </CRow>
                    </CCol>
                </CRow>
            </CContainer>
        </React.Fragment>
    )
}