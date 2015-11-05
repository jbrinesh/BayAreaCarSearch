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
            <li>Make: {classified.make}</li>
            <li>Model: {classified.model}</li>
            <li>Year: {classified.year}</li>
            <li>Millage: {classified.odometer}</li>
            <li>Location: {classified.address}</li>
            <li>Posted: {classified.created_at.slice(0,10)}</li>
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
