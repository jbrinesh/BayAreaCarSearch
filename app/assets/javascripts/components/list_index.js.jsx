(function(root) {
  'use strict';

  root.ListIndex = React.createClass({

    getInitialState: function (){
      return { classifieds: ClassifiedStore.all() };
    },

    componentDidMount: function(){
      ClassifiedStore.addChangeHandler(this._classifiedsChanged)
    },

    _classifiedsChanged: function (){
      this.setState({classifieds: ClassifiedStore.all()});
    },

    render: function (){
      return (
        <ul className="list-index">
          {
            this.state.classifieds.map(function(classified){
              return <ListIndexItem
                      key={classified.id}
                      classified={classified}
                      clickHandler={this.props.clickHandler}/>
            }.bind(this))
          }
        </ul>
      )
    }
  })

}(this));
