export const getUserStorage = () => {
  return {
    agente: localStorage.getItem("agente"),
    escritorio: localStorage.getItem("escritorio"),
  };
};
