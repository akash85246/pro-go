export default function Terms() {
  return (
    <div className="condition light">
      <input type="checkBox" className="T&C" required />
      <label>
        I agree to all the <span className="blue "> Terms</span> and{" "}
        <span className="blue">Privacy policy</span>
      </label>
    </div>
  );
}
