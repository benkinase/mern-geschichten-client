import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import footerLogo from "../footer.svg";

export default function Footer() {
  return (
    <Container className="mt-5 welcome">
      <Row>
        <Col>
          <img src={footerLogo} alt="footerlogo" />
        </Col>
        <Col>
          <img src={footerLogo} alt="footerlogo" />
        </Col>
        <Col>
          <img src={footerLogo} alt="footerlogo" />
        </Col>
      </Row>
    </Container>
  );
}
