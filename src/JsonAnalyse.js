import React from "react";
import Analyse from './Analyse';

import './css/styles.css';

const JsonAnalyse = ({ json, onSubmit, config }) => {
    return (
        <Analyse json={json} updateChart={onSubmit} config={config} />
    )
}

export default JsonAnalyse;