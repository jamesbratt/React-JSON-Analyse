import React, { useState, useEffect, useRef } from "react";
import useDocumentClick from './useDocumentClick';

const JsonAutocomplete = ({ data, onSelect }) => {

    const inputRef = useRef(null);
    const selectorRef = useRef(null);
    
    const [ selectedProperties, updateProperties ] = useState([{ selectedKey: null, values: data }]);
    const [ availableProperties, updateAvailableProperties ] = useState([]);
    const [ inputValue, updateInputValue ] = useState("");

    useDocumentClick(selectorRef, () => {
        updateAvailableProperties([])
    });
    
    /**
     * Every time a property is selected...
     */
    useEffect(() => {
        const inputValue = constructValue();
        updateInputValue(inputValue);
        onSelect(inputValue)
        
    }, [selectedProperties]);

    /**
     * 
     * @param {*} data Either an object or an array
     * @param {String} dataKey The key to find
     * @param {Number} index
     * @description Finds the value of a specified key
     * from within a multidimensional data structure
     */
    const filterData = (data, dataKey, index) => {

        const extractDataSegment = (data) => (Array.isArray(data) && data.length > 0) ?
            data[0] : data;

        const findProperty = (data, key) => {
            if(Array.isArray(data) && data.length > 0)  {
                return findProperty(extractDataSegment(data), key);
            }
    
            if(data.hasOwnProperty(key)) {
                return extractDataSegment(data[key]);
            }
        }

        const propertyValue = findProperty(extractDataSegment(data), dataKey);
        const updatedSelections = selectedProperties.map((sp, i) => i === index ? { ...sp, selectedKey: dataKey } : sp);

        if(!dataKey || dataKey !== selectedProperties[index].selectedKey) {
            updatedSelections.splice(index + 1);
        }
        
        if ((propertyValue === Object(propertyValue))) {
            updateProperties([
                ...updatedSelections,
                { selectedKey: null, values: propertyValue },
            ]);

        } else {
            updateProperties(updatedSelections);
        }

        updateAvailableProperties([]);
        inputRef.current.focus();
    }

    /**
     * 
     * @param {String} value 
     * @param {*} currentPropertyValues
     * @description Sets an array of available properties to be displayed
     */
    const getProperties = (value, currentPropertyValues) => {
        const valueArr = value.split('.');
        const searchQuery = valueArr[valueArr.length - 1];

        try {
            valueArr.forEach((va, index) => {
                if (
                    selectedProperties[index] &&
                    selectedProperties[index].selectedKey !== null &&
                    selectedProperties[index].selectedKey !== va
                ) {
                    throw index;
                }
            });

            const availableProperties = (currentProperty.selectedKey === null) ?
                Object.keys(currentPropertyValues).filter(property => property.includes(searchQuery)) :
                [];

            if (Array.isArray(currentPropertyValues)) {
                getProperties(value, currentPropertyValues[0])
            } else {
                updateAvailableProperties(availableProperties);
                updateInputValue(value);
            }

        } catch(mismatchedIndex) {
            filterData(selectedProperties[mismatchedIndex].values, null, mismatchedIndex);
        }
    }

    /**
     * @description Returns a dot delimitted string of properties
     */
    const constructValue = () => {
        return selectedProperties.filter(sp => sp.selectedKey).map(sp => sp.selectedKey).join('.');
    }

    const currentProperty =  selectedProperties[selectedProperties.length - 1];
    
    return (
        <div className="route-selector" ref={selectorRef}>
            <input ref={inputRef} value={inputValue} onClick={(e) => getProperties(e.target.value, currentProperty.values)} onChange={(e) => getProperties(e.target.value, currentProperty.values)} type="text" />
            {
                currentProperty && currentProperty.values && availableProperties.length > 0 ?
                <ul className="properties">
                    {availableProperties.map(property => <li key={property}>
                        <button onClick={() => filterData(
                            currentProperty.values,
                            property,
                            selectedProperties.length - 1
                        )}>
                            {property}
                        </button>
                    </li>)}
                </ul> :
                null
            }
        </div>
    );
};

export default JsonAutocomplete;
