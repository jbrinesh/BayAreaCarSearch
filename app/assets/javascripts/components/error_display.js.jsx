(function(root) {
  'use strict';

  root.ErrorDisplay = React.createClass({

    getInitialState: function(){
      return { errors: [] }
    },

    componentDidMount: function (){
      ErrorStore.addErrorHandler(this._newErrors)
    },

    componentWillUnmount: function(){
      ErrorStore.removeErrorHandler(this._newErrors)
    },

    _newErrors: function(){
      this.setState({errors: ErrorStore.all()})
    },

    render: function(){
      return (
        <ul className="error-display">
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
