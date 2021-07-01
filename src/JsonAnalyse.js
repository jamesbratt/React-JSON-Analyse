import React from "react";
import Analyse from './Analyse';

import './css/styles.css';

const JsonAnalyse = ({ json, onSubmit }) => {
    return (
        <Analyse json={json} updateChart={onSubmit} />
    )
}

export default JsonAnalyse;