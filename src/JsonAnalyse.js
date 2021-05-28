import React, { useEffect, useRef, useState } from "react";
import Analyse from './Analyse';
import JSONTree from 'react-json-tree';
import Chart from 'chart.js/auto';

const style = {
    display: 'flex',
    width: '100%',
    height: '100%',
}

const JsonAnalyse = ({ json }) => {

    const chartRef = useRef(null);
    const [chart, updateChart] = useState(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: {},
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            updateChart(chartInstance);
        }
    }, [chartRef])

    const updateDataset = (data) => {
        const newChartData = {
            labels: data.categories,
            datasets: [
                {
                    label: 'Dataset',
                    data: data.series,
                },
            ]
          };

        chart.data = newChartData;
        chart.update();
    };

    return (
        <div style={style}>
            <div style={{ width: '50%', height: '100%', padding: '1em' }}>
                <div style={{ width: '100%', minHeight: '50%', position: 'relative' }}>
                    <canvas ref={chartRef} width="400" height="200" />
                </div>
                <Analyse json={json} updateChart={updateDataset} />
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