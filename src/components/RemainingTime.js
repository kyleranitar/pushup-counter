export default function RemainingTime(props) {
 return (
    <div className="time-remaining">
        <h1 className="time-remaining-text">
            {props.timeRemaining}
        </h1>
    </div>
 )
}