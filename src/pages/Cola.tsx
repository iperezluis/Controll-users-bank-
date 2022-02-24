import React, { useContext, useEffect, useState } from "react";
import { Typography, Row, Col, List, Card, Tag, Divider } from "antd";
import { useHiddeMenu } from "../hooks/useHiddeMenu";
import { SocketContext } from "../context/SocketContext";
import { getTicket } from "../api/getTickets";
import { LastTickets, Ticket } from "../interfaces/TicketsResponse";

function Cola() {
  const { Title, Text } = Typography;
  useHiddeMenu(true);
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const getLastTickets = async (): Promise<void> => {
    // const xhr= new XMLHttpRequest();
    try {
      const res = await getTicket.get<LastTickets>("/ultimos");
      console.log(res.data.ultimos);
      setTickets(res.data.ultimos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLastTickets();
  }, []);

  useEffect(() => {
    socket.on("tickets-asignados", (ticket: Ticket[]) => {
      setTickets(ticket);
      console.log(ticket);
      return () => {
        socket.off("tickets-asignados");
      };
    });
  }, [tickets]);

  return (
    <>
      <Title level={3}>Atendiendo al cliente</Title>
      <Row style={{ overflow: "scroll", height: "80vh" }}>
        {/* Aqui le estoy dando al container un scroll para que no se salga y un viewport heigh para que ese container tome solo el 80% de la pnatalla y no se desborde */}
        <Col
          span={12}
          style={{
            // backgroundColor: "red",
            marginBottom: 30,
          }}
        >
          <List
            dataSource={tickets.slice(0, 3)} //mostramos solo los ultimos 3
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 350 }}
                  actions={[
                    <Tag color="success">{item.agente}</Tag>,
                    <Tag color="volcano">{item.escritorio}</Tag>,
                  ]}
                >
                  <Title level={2}>N°.{item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket N° ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio:</Text>
                      <Tag color="magenta">{item.number}</Tag>
                      <Text type="secondary">Con el agente:</Text>
                      <Tag color="magenta">{item.agente}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

export default Cola;
