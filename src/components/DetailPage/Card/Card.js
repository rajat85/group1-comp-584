import React from "react";
import { CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem } from "@coreui/react";
import './Card.css'

function Card(props) {
  return (
    <React.Fragment>
      <CCard color="light">
        <CCardHeader style={{ fontWeight: "bold" }}>
          {props.arrData.title}
        </CCardHeader>
        <CCardBody>
          <CListGroup flush className="camp_list_bg camp_card">
            {props.arrData.list.map((name, index) => (
              <CListGroupItem className="listItem" key={index}>
                {name}
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
}

export default Card;
