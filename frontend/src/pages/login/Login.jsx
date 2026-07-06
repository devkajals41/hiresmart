import api from "../../services/api";

function Login() {
  const testConnection = async () => {
    try {
      const response = await api.get("/");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={testConnection}>
        Test Backend
      </button>
    </div>
  );
}

export default Login;