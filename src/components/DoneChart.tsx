import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import TodoContainer from '../containers/TodoContainer'
import { PieChart, Pie, Cell } from 'recharts'

class DoneChart extends Component {
    data(container: TodoContainer) {
        if (container.state.todos.length === 0) {
            return {
                data: [],
                ratio: 'No data'
            }
        }
        const done = container.state.todos.filter(t => t.isDone).length
        return {
            data: [
                {
                    "name": "UnDone",
                    "value": container.state.todos.length - done,
                    "color": "#0088FE"
                },
                {
                    "name": "Done",
                    "value": done,
                    "color": "#00C49F"
                }
            ],
            ratio: `${done} / ${container.state.todos.length}`
        }
    }
    render() {
        return (
            <Subscribe to={[TodoContainer]}>
                {(container: TodoContainer) =>
                    <PieChart width={200} height={200}>
                        <Pie data={this.data(container).data} dataKey="value" innerRadius={60} outerRadius={80}>
                            {
                                this.data(container).data.map(d => <Cell fill={d.color} />)
                            }
                        </Pie>
                        <text x={100} y={105} textAnchor="middle">{this.data(container).ratio}</text>
                    </PieChart>
                }
            </Subscribe>
        );
    }
}

export default DoneChart;
