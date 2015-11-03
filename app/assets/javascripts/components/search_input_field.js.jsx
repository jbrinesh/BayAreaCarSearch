(function(root) {
  'use strict';

  root.SearchInputField = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function (){
      return {expanded: false}
    },

    toggle_expanded: function (e){
      e.preventDefault;
      this.setState({expanded: !this.state.expanded});
    },

    render: function(){
      return (
        <div className="search-input-field">
          <CarForm/>
          <PriceForm/>
          { this.state.expanded ? <OdometerForm/> : null}
          { this.state.expanded ? <LocationForm/> : null}
          <button onClick={this.toggle_expanded}>
            { this.state.expanded ? "Less" : "More"}
          </button>
          <SearchButton/>
        </div>

      )

    }

  });
}(this));
