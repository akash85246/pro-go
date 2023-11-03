export default function Cards(props){
    return (
        <>
            <div className="card">
                <h1>
                {props.title}
                </h1>
                <img src={props.img}></img>
                <p>
                    {props.text}
                </p>
            </div>
        </>
    )
}