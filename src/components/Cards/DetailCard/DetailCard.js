import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailCard.css";

function DetailCard(props) {
  const arrObj = [
    {
      title: "Amenities",
      list: [
          {
          icon: Icon.faFaucet,
          name: "Potable water available",
        },
        {
          icon: Icon.faShower,
          name: "Showers available",
        },
        {
          icon: Icon.faTree,
          name: "Picnic table",
        },
      ],
    },
    {
      title: "Essentials",
      list: [
        {
          icon: Icon.faDog,
          name: "Pets allowed",
        },
        {
          icon: Icon.faFire,
          name: "campfires",
        },
        {
          icon: Icon.faToilet,
          name: "toilet",
        },
      ],
    },
  ];

  return (
    <div className="main">
      {arrObj.map((data) => (
        <Card bg="light" text="dark" className="mb-2">
          <Card.Header style={{ fontWeight: "bold" }}>{data.title}</Card.Header>
          <Card.Body>
            <ListGroup className="list-group-flush">
              {data.list.map((i) => (
                <ListGroupItem className="listItem">
                  {<FontAwesomeIcon pull="left" icon={i.icon} />}
                  {i.name}
                </ListGroupItem>
              ))}
                  </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default DetailCard;
