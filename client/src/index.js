import ReactDOM from 'react-dom';
import React from 'react';
import { DatePicker } from 'antd';


var Hello = React.createClass({
  render() {
    return <div style={{margin: 10}}>
      <DatePicker />
    </div>;
  }
});

ReactDOM.render(<Hello />,
  document.getElementById('app')
);