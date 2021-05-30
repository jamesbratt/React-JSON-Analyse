import React, { useEffect, useRef, useState } from "react";
import Analyse from './Analyse';
import JSONTree from 'react-json-tree';
import Chart from 'chart.js/auto';

import './css/styles.css';

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
                    responsive: true,
                    maintainAspectRatio: false,
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
        <div className="json-analyse">
            <div className="analyse-wrapper column">
                <Analyse json={json} updateChart={updateDataset} />
            </div>
            <div className="data-wrapper column">
                <div className="chart-wrapper">
                    <canvas ref={chartRef} />
                </div>
                <JSONTree
                    data={json}
                    shouldExpandNode={() => true}
                    theme={{
                        extend: "google",
                        tree: ({ style }) => ({
                            style: { ...style, padding: "1em", height: '100%', margin: 0, fontFamily: 'arial' },
                        }),
                    }}
                    invertTheme={true}
                />
            </div>
        </div>
    )
}

export default JsonAnalyse;