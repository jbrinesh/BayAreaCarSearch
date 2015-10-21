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
            return obj.path
          });
          this.setState({ image_paths: paths });
        }.bind(this));
    },

    render: function (){
      return (
        <div className="new-classified-container">
          <ErrorDisplay/>
          <form className="new-classified-form" onSubmit={this.handleSubmit}>

            <label htmlFor="title">Title</label>
            <input type="text" id="title" valueLink={this.linkState('title')}/>

            <label htmlFor="body">Body</label>
            <textarea id="body" valueLink={this.linkState('body')}></textarea>

            <label htmlFor="price">Price</label>
            <input type="text" id="price" valueLink={this.linkState('price')}/>

            <label htmlFor="make"> Make </label>
            <input type="text" id="make" valueLink={this.linkState('make')}/>

            <label htmlFor="model"> Model </label>
            <input type="text" id="model" valueLink={this.linkState('model')}/>

            <label htmlFor="year">Year</label>
            <input type="text" id="year" valueLink={this.linkState('year')}/>

            <label htmlFor="odometer">Current Millage</label>
            <input type="text" id="odometer" valueLink={this.linkState('odometer')}/>

            <label htmlFor="address">Address</label>
            <input type="text" id="address" valueLink={this.linkState('address')}/>

            <label htmlFor="city">City</label>
            <input type="text" id="city" valueLink={this.linkState('city')}/>

            <label htmlFor="state">State</label>
            <input type="text" id="state" valueLink={this.linkState('state')}/>

            <label htmlFor="zip">Zip Code</label>
            <input type="text" id="zip" valueLink={this.linkState('zip')}/>

            <button className="image-upload-button" onClick={this.launch_widget}>Upload Image</button>
            <input type="submit" value="Post Ad"/>
          </form>

        </div>
      )
    }
  })
}(this));
