import React from "react";
import ReactDOM from "react-dom";
import JsonAnalyse from './JsonAnalyse';

const json = [{
    "items": [
        { "distance": 5, "time": 50, "target": 10, "date": { "month": "Jan" } },
        { "distance": 8, "time": 60, "target": 10, "date": { "month": "Jan" } },
        { "distance": 87, "time": 70, "target": 10, "date": { "month": "Jan" } },
        { "distance": 43, "time": 10, "target": 10, "date": { "month": "Feb" } },
        { "distance": 54, "time": 4, "target": 10, "date": { "month": "Feb" } },
        { "distance": 15, "time": 5, "target": 10, "date": { "month": "Feb" } },
        { "distance": 8, "time": 8, "target": 10, "date": { "month": "Mar" } },
        { "distance": 8, "time": 9, "target": 10, "date": { "month": "Mar" } },
        { "distance": 8, "time": 74, "target": 10, "date": { "month": "Mar" } }
    ],
    "page": 1
}];

const config = {
    categories: 'items.date.month',
    series: 'items.distance',
    timeSpan: 'RECURRING',
    measure: 'ACTUAL',
    range: 'BY',
    clauses: [
        {
            leftOperand: 'items.distance',
            rightOperand: 'items.target',
            operator: 'GREATER_THAN',
            measure: 'TOTAL',
            id: 1
        }
    ]
};

var mountNode = document.getElementById("root");
ReactDOM.render(<JsonAnalyse json={json} onSubmit={() => {}} config={config} />, mountNode);