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
          odometer: "",

          address: "",
          city: "",
          state: "",
          zip: "",

        image_paths: []
      }
    },

    handleSubmit: function (e){
      e.preventDefault();
      var params = {
        title: this.state['title'],
        body: this.state['body'],
        make: this.state['make'],
        model: this.state['model'],
        year: this.state['year'],
        price: this.state['price'],
        odometer: this.state['odometer'],
        image_paths: this.state['image_paths']
      };

      var location_params = {
        address: this.state['address'],
        city: this.state['city'],
        state: this.state['state'],
        zip: this.state['zip']
      };

      var callback = function(response){
        params['address'] = response.address;
        params['lat'] = response.lat
        params['lng'] = response.lng

        AccountUtil.post(params);

      }.bind(this)
      // AccountUtil.post(params);

      ApiUtil.parseLocationParams(location_params, callback);
    },

    launch_widget: function (e){
      e.preventDefault();
      cloudinary.openUploadWidget({ cloud_name: 'dfb4gjjt4', upload_preset: 'hbhindyk'},
        function(error, result) {
          var paths;
          paths = result.map(function(obj){
            return obj.url
          });
          this.setState({ image_paths: paths });
        }.bind(this));
    },

    render: function (){
      return (
        <div className="new-classified-container clearfix">
          <ErrorDisplay/>
          <form className="new-classified-form clearfix">

            <input
              type="text"
              id="title"
              placeholder="Title"
              valueLink={this.linkState('title')}
            />

            <input
              type="text"
              id="price"
              placeholder="Price"
              valueLink={this.linkState('price')}
            />

          <textarea
            id="body"
            placeholder="Description"
            valueLink={this.linkState('body')}
            />

            <div className="car-info clearfix">
              <input
                type="text"
                id="make"
                placeholder="Make"
                valueLink={this.linkState('make')}
              />

              <input
                type="text"
                id="model"
                placeholder="model"
                valueLink={this.linkState('model')}
              />

              <input
                type="text"
                id="year"
                placeholder="Year"
                valueLink={this.linkState('year')}
              />

              <input
                type="text"
                id="odometer"
                placeholder="Mileage"
                valueLink={this.linkState('odometer')}
              />
            </div>

            <div className="location-info clearfix">
              <input
                type="text"
                id="address"
                placeholder="Address"
                valueLink={this.linkState('address')}
              />

              <input
                type="text"
                id="city"
                placeholder="City"
                valueLink={this.linkState('city')}
              />

              <input
                type="text"
                id="state"
                placeholder="State"
                valueLink={this.linkState('state')}
              />

              <input
                type="text"
                id="zip"
                placeholder="Zip"
                valueLink={this.linkState('zip')}
              />
            </div>

            <button id="submit" className="btn" onClick={this.handleSubmit}>Post Ad</button>
            <button
              className="image-upload-button btn"
              onClick={this.launch_widget}
            >Upload Images</button>

          </form>

        </div>
      )
    }
  })
}(this));
