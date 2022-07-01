export default function SubmitForm(props) {
    return (
    <form onSubmit={props.submitScore}>
        <h3>How many pushups did you do?</h3>
        <input className="input-number" type="number" min="0" onChange={props.handleChange}></input>
        <button className="submit-btn" disabled={props.submittedScore}>Submit</button>
        {props.submittedScore && <button className="submit-btn" onClick={props.resetGame}>START AGAIN</button>}
      </form>
    )
}