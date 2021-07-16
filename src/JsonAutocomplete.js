import React, { useState, useEffect, useRef } from "react";
import useDocumentClick from './useDocumentClick';

const JsonAutocomplete = ({ data, onSelect, defaultPath = "" }) => {

    const inputRef = useRef(null);
    const selectorRef = useRef(null);
    
    const [ selectedProperties, updateProperties ] = useState([{ selectedKey: null, values: data }]);
    const [ availableProperties, updateAvailableProperties ] = useState([]);
    const [ inputValue, updateInputValue ] = useState("");
    const [ defaultPathArr, defaultPathArrUpdate ] = useState((defaultPath && typeof defaultPath === 'string') ? defaultPath.split('.') : []);

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

    useEffect(() => {
        if (defaultPathArr.length > 0) {
            const prop = defaultPathArr[0];
            const updatedDefaultPath = defaultPathArr.filter(dpa => dpa !== prop);
            defaultPathArrUpdate(updatedDefaultPath);

            const currentProperty =  selectedProperties[selectedProperties.length - 1];
            filterData(currentProperty.values, prop, selectedProperties.length - 1);
        }
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
            <input placeholder="Select a data point" className="form-control" ref={inputRef} value={inputValue} onClick={(e) => getProperties(e.target.value, currentProperty.values)} onChange={(e) => getProperties(e.target.value, currentProperty.values)} type="text" />
            {
                currentProperty && currentProperty.values && availableProperties.length > 0 ?
                <ul className="properties">
                    {availableProperties.map(property => <li key={property}
                        onClick={() => filterData(
                            currentProperty.values,
                            property,
                            selectedProperties.length - 1
                        )}>
                            {property}
                    </li>)}
                </ul> :
                null
            }
        </div>
    );
};

export default JsonAutocomplete;
