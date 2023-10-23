import LoginForm from "./loginForm";
const MainContainer = () => {
  return (
    <>
      <div className="loginContainer">
        <img src="../src/assets/login.png" alt="Login" />
      </div>
      <div>
        <LoginForm />
      </div>
    </>
  );
};

export default MainContainer;
