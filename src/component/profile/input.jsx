import "./input.css";
export default function Input(props) {
  return (
    <>
      <div className="inputContainerProfile">
        <label>{props.label}</label>
        <input type={props.type} className="inputProfile"></input>
      </div>
      <div className="errorContainer1">
        <p className="error">hiwqdqddhi</p>
      </div>
    </>
  );
}
