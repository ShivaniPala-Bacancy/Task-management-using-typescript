import React from 'react';


const tasks :React.FC = (Props) =>{
    return(
        <div>
            <strong><p style={{fontSize : "50px", color: "red"}}>Task List</p></strong>
            {Props.children}
        </div>
    )
}

export default tasks;