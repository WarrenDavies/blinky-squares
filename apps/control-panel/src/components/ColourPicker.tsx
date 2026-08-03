export function ColourPicker(props) {

    return (
        <>
            <label>
                {props.labelText}
                <input 
                    type="color"
                    id={props.id}
                    className="colour-picker"
                    value={props.value}
                    onChange={(e) => props.onColourChange(e.target.value)}
                />
            </label>  
        </>
    )
}