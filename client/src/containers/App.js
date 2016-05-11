import React, { Component, PropTypes } from 'react';

var App = React.createClass({
  render:function(){
    return(
      <div>
        {this.props.children}
     </div>
    )
  }
});
App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
