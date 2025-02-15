const Login = () => {
  return (
    <div className="login">
      <h2>Log in</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
