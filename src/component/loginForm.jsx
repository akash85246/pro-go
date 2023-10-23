function LoginForm() {
  return (
    <div className="loginContainer right">
      <div className="progress"></div>
      <div>
        <h1>Account Login</h1>
        <p className="light">
          If you are already a member, you can log in with your email address
          and password.
        </p>
      </div>
      <div className="entry">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label className="light">Email address</label>
          <a className="blue">Login with Phone number?</a>
        </div>
        <input type="text" className="input" />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="entry"
      >
        <label className="light">Password</label>
        <input type="password" className="input" />
      </div>
      <label className="light">
        <input type="checkbox" />
        Remember me
      </label>
      <input type="submit" className="button" value="Login with" />
      <div className="signUp">
        <span className="light">Dont have an account ? </span>
        <a className="blue"> Sign up here</a>
      </div>
    </div>
  );
}

export default LoginForm;
