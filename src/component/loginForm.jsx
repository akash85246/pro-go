function LoginForm () {
  return (
    <div className="loginContainer">
      <div className="progress"></div>
      <h1>Account Login</h1>
      <p>
        If you are already a member, you can log in with your email address and
        password.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label>Email address</label>
        <a style={{ color: "blue" }}>Login with Phone number?</a>
      </div>
      <input type="text" placeholder="Email address" />
      <label>Password</label>
      <input type="password" placeholder="Password" />
      <label>
        <input type="checkbox" />
        Remember me
      </label>
      <input type="submit" className="button" />
      <div>
        <span>Dont have an account? </span>
        <a>Sign up here</a>
      </div>
    </div>
  );
}

export default LoginForm;
