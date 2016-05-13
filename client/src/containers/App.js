import React, { Component, PropTypes } from 'react';
import './App.css'; 
var App = React.createClass({
  render:function(){
    return(
      <div className='page-wrapper'>
        {this.props.children}
     </div>
    )
  }
});
// App.propTypes = {
//   children: PropTypes.object.isRequired,
// };

export default App;
