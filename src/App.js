import React from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div>
      <h1>Job Portal</h1>
      <LoginForm />
      <hr />
      <RegisterForm />
    </div>
  );
}

export default App;
