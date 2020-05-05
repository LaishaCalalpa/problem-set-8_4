import React from 'react';

function Cells(props) {
	return <button onClick={props.click} className='button'>{props.value}</button>
}

export default Cells;
