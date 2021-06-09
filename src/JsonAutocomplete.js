import React, { useState, useEffect } from "react";

const JsonAutocomplete = ({ data, onSelect }) => {

    const [ options, updateOptions ] = useState([]);

    const getOptions = (props, path) => {
        if (Array.isArray(props)) {
            Object.keys(props[0]).forEach(propKey => {
                let routeToProperty = JSON.parse(JSON.stringify(path));
                routeToProperty.push(propKey);
                updateOptions(prevOptions => [...prevOptions, { label: propKey, value: routeToProperty.join('.') }]);
                if (typeof props[0][propKey] !== "number" && typeof props[0][propKey] !== "string") {
                    getOptions(props[0][propKey], routeToProperty)
                }
            });
        } else {
            Object.keys(props).forEach(propKey => {
                let routeToProperty = JSON.parse(JSON.stringify(path));
                routeToProperty.push(propKey);
                updateOptions(prevOptions => [...prevOptions, { label: propKey, value: routeToProperty.join('.') }]);
                if (typeof props[propKey] !== 'number' && typeof props[propKey] !== 'string') {
                    getOptions(props[propKey], routeToProperty)
                }
            });
        }
    }

    useEffect(() => {
        getOptions(data, []);
    }, []);

    return (
        <select className="form-control" onChange={(e) => onSelect(e.target.value)}>
            {options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)}
        </select>
    );
};

export default JsonAutocomplete;
