(function(root) {
  'use strict';

  root.PageButtons = React.createClass({

    render: function(){
      return(
        <div className="page-buttons-container">
          <button className="prev-button btn" onClick={this.props.handlePrev}>Privious Page</button>
          <text>( {this.props.currentPage} / {this.props.numOfPages} ) </text>
          <button className="next-button btn" onClick={this.props.handleNext}>Next Page</button>
        </div>
      )
    }
  })
}(this));
