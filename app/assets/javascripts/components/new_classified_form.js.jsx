(function(root) {
  'use strict';

  root.NewClassifiedForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return {
        title: "",
        body: "",
        make: "",
        model: "",
        year: "",
        price: "",
        odometer: ""
      }

    },

    handleSubmit: function (){
      AccountUtil.post(this.state);
    },

    render: function (){
      return (
        <div>
          <ErrorDisplay/>
          <br/>
          <form className="new-user-form" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" valueLink={this.linkState('title')}/>
            <br/>
            <br/>
            <label htmlFor="body">Body</label>
            <textarea id="body" valueLink={this.linkState('body')}></textarea>
            <br/>
            <br/>
            <label htmlFor="price">Price</label>
            <input type="text" id="price" valueLink={this.linkState('price')}/>
            <br/>
            <br/>
            <label htmlFor="make"> Make </label>
            <input type="text" id="make" valueLink={this.linkState('make')}/>
            <br/>
            <br/>
            <label htmlFor="model"> Model </label>
            <input type="text" id="model" valueLink={this.linkState('model')}/>
            <br/>
            <br/>
            <label htmlFor="year">Year</label>
            <input type="text" id="year" valueLink={this.linkState('year')}/>
            <br/>
            <br/>
            <label htmlFor="odometer">Current Millage</label>
            <input type="text" id="odometer" valueLink={this.linkState('odometer')}/>
            <br/>
            <br/>
            <input type="submit" value="Post Ad"/>
          </form>
        </div>
      )
    }
  })
}(this));
