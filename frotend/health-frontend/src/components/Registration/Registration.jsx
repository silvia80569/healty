const Registration = () => {
  return (
    <div className="registration">
      <h2>Registration</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
