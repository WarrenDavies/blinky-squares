export function NumberInput(props) {

    return (
        <>
            <label>
                {props.labelText}
                <input 
                    type="number" 
                    id={props.id}
                    min={props.min}
                    max={props.max}
                    value={props.value}
                    onChange={(e) => props.onInputChange(e.target.value)}
                />
            </label>
        </>
    )
}