import React, { useContext, useState } from "react";
import { Col, Button, Row, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useHiddeMenu } from "../hooks/useHiddeMenu";
import { SocketContext } from "../context/SocketContext";
import { Ticket } from "../interfaces/TicketsResponse";

function CreateTicket() {
  const { Title, Text } = Typography;
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState<Ticket>();

  useHiddeMenu(true);
  const newTicket = () => {
    socket.emit("solicitar-ticket", null, (ticket: Ticket) => {
      setTicket(ticket);
      console.log(ticket);
    });
  };

  return (
    <>
      <Row
        style={{
          // backgroundColor: "red",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Col span={14} offset={0}>
          <Title level={4} style={{ fontWeight: "bold" }}>
            Presione aqui para crear un nuevo ticket
          </Title>
          <Button
            onClick={newTicket}
            icon={<DownloadOutlined />}
            size="large"
            type="primary"
            style={{ borderRadius: 10 }}
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>
      {ticket && (
        <Row
          style={{
            marginTop: 100,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Col span={14} offset={0}>
            <Text>Su numero es: </Text>
            <br />
            <Text style={{ fontSize: 55, fontWeight: "bold", color: "green" }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CreateTicket;
