import React from "react";
import { CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem } from "@coreui/react";
<<<<<<< HEAD
<<<<<<< HEAD
import './Card.css'
=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
>>>>>>> 1e5bc91 ( api added dashboard)
=======
import './Card.css'
>>>>>>> 76eec7d (Remove error regarding key and api implementation for activities and other details in detail screen)

function Card(props) {
    return (
        <React.Fragment>
            <CCard color="light">
                <CCardHeader style={{ fontWeight: "bold" }}>
                    {props.arrData.title}
                </CCardHeader>
                <CCardBody>
<<<<<<< HEAD
<<<<<<< HEAD
                    <CListGroup flush className="camp_list_bg camp_card">
                        {props.arrData.list.map((name, index) => (
                            <CListGroupItem className="listItem" key={index}>
=======
                    <CListGroup flush className="camp_list_bg">
                        {props.arrData.list.map((name) => (
                            <CListGroupItem className="listItem">
                                {/* {i.icon ? <FontAwesomeIcon pull="left" icon={i.icon} /> : ''} */}
>>>>>>> 1e5bc91 ( api added dashboard)
=======
                    <CListGroup flush className="camp_list_bg camp_card">
                        {props.arrData.list.map((name, index) => (
                            <CListGroupItem className="listItem" key={index}>
>>>>>>> 76eec7d (Remove error regarding key and api implementation for activities and other details in detail screen)
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
