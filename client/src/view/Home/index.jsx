import React from 'react';
import Header from './Header';
import HomeContent from './HomeContent';
import Footer from './Footer';
import './Home.css';

var Home = React.createClass({
  render: function(){
    return(
      <div>
        <Header />
        <HomeContent />
        <Footer />
     </div>
    )
  }
});
export default Home;