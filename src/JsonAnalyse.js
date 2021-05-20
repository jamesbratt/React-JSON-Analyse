import React from "react";
import Analyse from './Analyse';
import JSONTree from 'react-json-tree';

const style = {
    display: 'flex',
    width: '100%',
    height: '100%',
}

const JsonAnalyse = ({ json }) => {
    return (
        <div style={style}>
            <div style={{ width: '50%', height: '100%', padding: '1em' }}>
                <div style={{ width: '100%', minHeight: '50%', position: 'relative' }}>
                    <div style={{ position: 'absolute', height: '100%', width: '100%' }}></div>
                </div>
                <Analyse json={json} />
            </div>
            <div style={{ width: '50%', height: '100%' }}>
                <JSONTree
                    data={json}
                    shouldExpandNode={() => true}
                    theme={{
                        extend: "google",
                        tree: ({ style }) => ({
                            style: { ...style, padding: "1em", height: '100%', margin: 0 },
                        }),
                    }}
                    invertTheme={true}
                />
            </div>
        </div>
    )
}

export default JsonAnalyse;