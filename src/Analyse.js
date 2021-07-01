import React, { useState } from "react";
import JsonAutocomplete from './JsonAutocomplete';
import WhereClause from './WhereClause';

import { append } from 'ramda';

const API_URL = 'https://json-analyse-api.herokuapp.com';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const Analyse = ({json, updateChart}) => {

    const [xAxisPath, updateXaxisPath] = useState([]);
    const [yAxisPath, updateYaxisPath] = useState([]);
    const [timeSpan, updateTimespan] = useState("RECURRING");
    const [measure, updateMeasure] = useState("ACTUAL");
    const [range, updateRange] = useState("BY");
    const [clauses, updateClauses] = useState([]);

    const addWhereClause = () => {
        updateClauses(append({
            id: uuidv4(),
            measure: 'ACTUAL',
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
        const data = {
            data: json,
            config: {
                categories: xAxisPath,
                series: yAxisPath,
                timeSpan,
                measure,
                range,
                clauses
            }
        };

        fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            return res.json();
        }).then((j) => {
            if (!j.error) {
                updateChart(j);
            } else {
                throw Error(j.error)
            }
        }).catch(({ message }) => alert(message));
    }

    return (
        <div>
            <p>Show me the...</p>
            <div className="form-block">
                <div className="inline-form-container">
                    <select className="form-control" onChange={(e) => updateTimespan(e.target.value)}>
                        <option value="RECURRING">Recurring</option>
                        <option value="DAILY">Daily</option>
                        <option value="MONTHLY">Monthly</option>
                    </select> 
                    <select className="form-control" onChange={(e) => updateMeasure(e.target.value)}>
                        <option value="ACTUAL">Actual</option>
                        <option value="AVERAGE">Average</option>
                        <option value="TOTAL">Total</option>
                    </select>
                </div>
                <JsonAutocomplete data={json} onSelect={updateYaxisPath} />
            </div>
            <div className="form-block">
                <select className="form-control" onChange={(e) => updateRange(e.target.value)}>
                    <option value="BY">By</option>
                    <option value="GROUPED_BY">Grouped By</option>
                </select> 
                <JsonAutocomplete data={json} onSelect={updateXaxisPath} />
            </div>
            <div className="clauses">
                <button className="add-clause" onClick={addWhereClause}>Add Clause</button>
                <div className="clause-container">
                    {clauses.map((config, index) => <WhereClause key={config.id} remove={removeWhereClause} config={config} index={index} json={json} update={updateWhereClause} />)}
                </div>
            </div>
            <button className="primary-button" onClick={visualise}>Visualize</button>
        </div>
    )
};

export default Analyse;