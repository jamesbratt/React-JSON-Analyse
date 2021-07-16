import React from 'react';
import JsonAutocomplete from './JsonAutocomplete';

const WhereClause = ({ config, index, json, update, remove }) => {

    const updateLeftOperand = (leftOperand) => {
        update(index, { ...config, leftOperand });
    }

    const updateOperator = (operator) => {
        update(index, { ...config, operator });
    }

    const updateMeasure = (measure) => {
        update(index, { ...config, measure });
    }

    const updateRightOperand = (rightOperand) => {
        update(index, { ...config, rightOperand });
    }

    return (
        <div className="form-block">
            <div className="clause">
                <div className="clause-header"><span>Where...</span><button onClick={() => remove(index)} className="remove-clause">Remove Clause</button></div>
                <select value={config.measure} className="form-control" onChange={(e) => updateMeasure(e.target.value)}>
                    <option value="ACTUAL">Actual</option>
                    <option value="AVERAGE">Average</option>
                    <option value="TOTAL">Total</option>
                </select>
                <JsonAutocomplete data={json} onSelect={updateLeftOperand} defaultPath={config.leftOperand} />
                <select className="form-control" value={config.operator} onChange={(e) => updateOperator(e.target.value)}>
                    <option value="EQUAL_TO">Is Equal To</option>
                    <option value="NOT_EQUAL_TO">Is not Equal To</option>
                    <option value="GREATER_THAN">Is greater Than</option>
                    <option value="LESS_THAN">Is Less Than</option>
                    <option value="GREATER_THAN_EQUAL_TO">Is greater Than Or Equal To</option>
                    <option value="LESS_THAN_EQUAL_TO">Is Less Than Or Equal To</option>
                </select> 
                <JsonAutocomplete data={json} onSelect={updateRightOperand} defaultPath={config.rightOperand} />
            </div>
        </div>
    )
}

export default WhereClause;