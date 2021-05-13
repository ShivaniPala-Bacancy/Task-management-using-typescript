import React from 'react';
import styles from './Task.module.css'

interface Props {
    checkedFunction: React.MouseEventHandler<HTMLInputElement>;
    disabled: boolean;
    tName: string;
    editFunction: React.MouseEventHandler<HTMLButtonElement>;
    deleteFunction: React.MouseEventHandler<HTMLButtonElement>;
}

const task :React.FC<Props> = ({checkedFunction, disabled, editFunction, tName, deleteFunction}) =>{
    return(
        <div className={styles.BuildControl}>
            <input style={{width: "20px"}} 
            type="checkbox" 
            onClick={checkedFunction} />

            {disabled ? 
            <s><p className={styles.Label}>{tName}</p></s>
             : <p className={styles.Label}>{tName}</p>}
            
            
            <button onClick={editFunction} disabled={disabled}>EDIT</button>
            <button onClick={deleteFunction} disabled={disabled}>DELETE</button>
        </div>
    )
}

export default task;