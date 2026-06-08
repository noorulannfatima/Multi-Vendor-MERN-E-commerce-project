import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          E-Commerce App
        </h1>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;