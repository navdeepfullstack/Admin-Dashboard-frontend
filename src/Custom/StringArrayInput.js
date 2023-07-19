function StringArrayInput({ values, onChange,placeholder }) {
    function addValue(index) {
        onChange([...values, ""]);
    }
    function removeValue(index) {
        onChange([...values.slice(0, index), ...values.slice(index + 1)]);
    }
    function changeValue(index, value) {
        onChange([...values.slice(0, index), value, ...values.slice(index + 1)]);
    }

    const checkKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            if (e.target.value != '') {
                e.preventDefault()
                addValue()
                // const form = document.getElementById("multipleInputs").children
                // console.log(form)
                // for(let i = 0; i< form.length; i++){
                //     if(i == index + 1){
                //         console.log(form[i])
                //     }
                // }
            }
        }
    };


    return (
        <div className="close-addtag " id="multipleInputs">
            {values.map((value, index) => (
                <div key={index} className="inpt-fld-tag d-flex">
                    <input
                        placeholder={placeholder}
                        className="form-control"
                        value={value}
                        onChange={({ target }) => changeValue(index, target.value)}
                        onKeyDown={(e)=> checkKeyDown(e, index)}
                    />
                    <button type="button" className="close-tags" onClick={() => removeValue(index)}>X</button>
                </div>
            ))}
            <button type="button" className="add-tags" onClick={addValue}>+</button>
        </div>
    );
}

export default StringArrayInput