import React from "react";
import { CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card(props) {
    return (
        <React.Fragment>
            <CCard color="light">
                <CCardHeader style={{ fontWeight: "bold" }}>
                    {props.arrData.title}
                </CCardHeader>
                <CCardBody>
                    <CListGroup flush className="camp_list_bg">
                        {props.arrData.list.map((name) => (
                            <CListGroupItem className="listItem">
                                {/* {i.icon ? <FontAwesomeIcon pull="left" icon={i.icon} /> : ''} */}
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
