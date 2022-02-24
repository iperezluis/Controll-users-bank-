import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useHiddeMenu } from "../hooks/useHiddeMenu";
import { getUserStorage } from "../helpers/getUserStorage";

function Login() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [agente, setAgente] = useState<string>();
  const [escritorio, setEscritorio] = useState<string>();
  const [usuario] = useState(getUserStorage());
  const { Title, Text } = Typography;
  useHiddeMenu(false);
  console.log(usuario);
  //este es el hook del react-roter para navegar  aotras pantallas como useNavigation en react-native
  const navigate = useNavigate();

  const onFinish = (agente: string, escritorio: string) => {
    localStorage.setItem("agente", agente);
    localStorage.setItem("escritorio", escritorio);
    console.log(agente, escritorio);
    navigate("/desktop");
  };
  useEffect(() => {
    if (usuario.agente && usuario.escritorio) {
      return navigate("/desktop");
    }
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y numero de escritorio</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(value) => onFinish(agente!, escritorio!)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            onChange={(e) => {
              setIsDisabled(false);
              setAgente(e.target.value);
            }}
            value={agente}
          />
        </Form.Item>

        <Form.Item
          label="escritorio"
          name="escritorio"
          rules={[
            { required: true, message: "Ingrese el numero de escritorio" },
          ]}
        >
          <Input
            type="number"
            value={escritorio}
            onChange={(e) => setEscritorio(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          {/* <Checkbox>Remember me</Checkbox> */}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ borderRadius: 10 }}
            disabled={isDisabled}
          >
            <SaveOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
