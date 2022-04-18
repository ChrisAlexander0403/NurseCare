import React, { useState } from 'react';
import { Arrow, DropdownContent, DropdownListContainer } from './DropdownListStyles';

const DropdownList = (options, values, setValues) => {

    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleClick = (option) => {
        setSelected(option);
        setIsActive(false);
        setValues({ ...values, category: option });
    }

    return (
        <DropdownListContainer>
            <button onClick={setIsActive(!isActive)}>{selected ? selected : "Categorías"}<Arrow /></button>
            {isActive && (
                <DropdownContent>
                    {options.length === 0 ? "Aún no hay categorías" : (
                        options.map((option, index) => {
                            return (
                                <div className="item" key={index} onClick={handleClick(option)}>
                                    {option}
                                </div>
                            )
                        })
                    )}
                </DropdownContent>
            )}
        </DropdownListContainer>
    );
}

export default DropdownList;