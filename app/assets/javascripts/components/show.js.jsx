(function(root) {
  'use strict';
  root.Show = React.createClass({
    render: function(){
      var classified = ClassifiedStore.find(this.props.params.id);
      return (
        <div className="show">
          <h2>{classified.title} ---- $ {classified.price}</h2>
          <ImageDisplay classified={classified}/>
          <ul className="show-details">
            <li>Make: {classified.make.capitalize}</li>
            <li>Model: {classified.model.capitalize}</li>
            <li>Year: {classified.year}</li>
            <li>Millage: {classified.odometer}</li>
            <li>Location: {classified.address}</li>
            <li>Source:</li>
            <li><a href={classified.source}>{classified.source}</a></li>
          </ul>
          <ShowMap classified={classified}/>
        <div className="show-body">{classified.body}</div>

        </div>
      )
    }
  })
}(this));
