import React, { useState } from "react";
import JsonAutocomplete from './JsonAutocomplete';
import WhereClause from './WhereClause';

import { append } from 'ramda';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const Analyse = ({json}) => {

    const [xAxisPath, updateXaxisPath] = useState([]);
    const [yAxisData, updateYaxisPath] = useState([]);
    const [timeSpan, updateTimespan] = useState("RECURRING");
    const [measure, updateMeasure] = useState("ACTUAL");
    const [range, updateRange] = useState("BY");
    const [clauses, updateClauses] = useState([]);

    const addWhereClause = () => {
        updateClauses(append({
            id: uuidv4(),
            leftOperand: null,
            operator: 'EQUAL_TO',
            rightOperand: null
        }, clauses));
    };

    const removeWhereClause = (index) => {
        updateClauses(clauses.filter((clause, i) => i !== index));
    };

    const updateWhereClause = (index, clause) => {
        const updatedClauses = clauses.map((c, i) => i === index ? clause : c);
        updateClauses(updatedClauses);
    };

    const visualise = () => {
        return {
            xAxisPath,
            yAxisData,
            timeSpan,
            measure,
            range,
            clauses
        };
    }

    return (
        <div style={{ width: '75%', minHeight: '50%', padding: '1em' }}>
            <p>Show me the...</p>
            <div className="form-field">
               <select onChange={(e) => updateTimespan(e.target.value)}>
                    <option value="RECURRING">Recurring</option>
                    <option value="DAILY">Daily</option>
                    <option value="MONTHLY">Monthly</option>
                </select> 
            </div>
            <div className="form-field">
               <select onChange={(e) => updateMeasure(e.target.value)}>
                    <option value="ACTUAL">Actual</option>
                    <option value="AVERAGE">Average</option>
                    <option value="TOTAL">Total</option>
                </select> 
            </div>
            <div className="form-field">
                <JsonAutocomplete data={json} onSelect={updateYaxisPath} />
            </div>
            <div className="form-field">
               <select onChange={(e) => updateRange(e.target.value)}>
                    <option value="BY">By</option>
                    <option value="GROUPED_BY">Grouped By</option>
                </select> 
            </div>
            <div className="form-field">
                <JsonAutocomplete data={json} onSelect={updateXaxisPath} />
            </div>
            <div className="clauses">
                <button className="add-clause" onClick={addWhereClause}>Add Clause</button>
                {clauses.map((config, index) => <WhereClause key={config.id} remove={removeWhereClause} config={config} index={index} json={json} update={updateWhereClause} />)}
            </div>
            <button className="visualise" onClick={visualise}>Visualize</button>
        </div>
    )
};

export default Analyse;