(function(root) {
  'use strict';

  root.ErrorDisplay = React.createClass({

    getInitialState: function(){
      return { errors: ["test error"] }
    },

    componentDidMount: function (){
      ErrorStore.addErrorHandler(this._newErrors)
    },

    _newErrors: function(){
      this.setState({errors: ErrorStore.all()})
    },

    render: function(){
      return (
        <ul>
          {
            this.state.errors.map(function(error, idx){
              return <li key={idx}>{error}</li>
            })
          }
        </ul>
      )
    }

  })
}(this));
