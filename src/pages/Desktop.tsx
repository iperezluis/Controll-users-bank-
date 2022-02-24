import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Divider, Row, Col } from "antd";
import {
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  LogoutOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUserStorage } from "../helpers/getUserStorage";
import { SocketContext } from "../context/SocketContext";
import { Ticket } from "../interfaces/TicketsResponse";

export default function Desktop() {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const [usuario] = useState(getUserStorage());
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState<Ticket>();

  const logout = () => {
    localStorage.removeItem("agente");
    localStorage.removeItem("escritorio");
    return navigate("/login");
  };
  const checkAgente = () => {
    if (!usuario.agente || !usuario.escritorio) {
      return navigate("/login");
    }
  };
  useEffect(() => {
    checkAgente();
  }, []);

  const nextTicket = () => {
    socket.emit("siguiente-ticket", usuario, (ticket: Ticket) => {
      setTicket(ticket);
      console.log(ticket);
    });
  };
  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <Col>
          <Title level={2}>{usuario.agente}</Title>
          <Text style={{ fontSize: 20 }}>
            Usted esta trabajando en el escritorio:
          </Text>
          <Text
            type="success"
            style={{ fontSize: 20, marginLeft: 10, fontWeight: "bold" }}
          >
            {usuario.escritorio}
          </Text>
        </Col>

        <Col
          span={4}
          style={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            onClick={logout}
            style={{ width: 100, height: 50, borderRadius: 15 }}
          >
            <LogoutOutlined size={15} />
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 13 }}>
              Logout
            </Text>
          </Button>
        </Col>
      </Row>
      <Divider />

      <Row style={{ justifyContent: "space-between" }}>
        {ticket ? (
          <Col>
            <Text style={{ fontSize: 20 }}>
              Usted esta atiendo el ticket numero:
            </Text>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}
              type="danger"
            >
              {ticket?.number}
            </Text>
          </Col>
        ) : (
          <>
            <Text style={{ fontSize: 20 }}>
              No hay tickets en cola
              <ExclamationCircleOutlined
                style={{ marginLeft: 10, fontSize: 25 }}
              />
            </Text>
          </>
        )}

        <Col
          span={4}
          style={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={nextTicket}
            type="primary"
            style={{
              width: 130,
              height: 50,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RightOutlined />
            <Text style={{ fontWeight: "bold", fontSize: 11, color: "white" }}>
              Siguiente Ticket
            </Text>
          </Button>
        </Col>
      </Row>
    </>
  );
}
