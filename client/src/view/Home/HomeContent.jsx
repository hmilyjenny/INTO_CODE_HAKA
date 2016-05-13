import React  from 'react';
import Link from './Link';
import Banner from './Banner';
import Features from './Features';
import Contact from './Contact';

var HomeContent = React.createClass({
  render:function(){
    return(

      <div className="main-wrapper">
        <Link />
        <Banner />
        <Features />
        <Contact />
      </div>
      )
  }
});

export default HomeContent;