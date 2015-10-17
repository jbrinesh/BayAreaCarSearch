(function(root) {
  'use strict';

  root.NewClassifiedForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return {
        form_params: {
          title: "",
          body: "",
          make: "",
          model: "",
          year: "",
          price: "",
          odometer: ""
        },
        image_paths: []
      }
    },

    handleSubmit: function (){
      AccountUtil.post(this.state);
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
        <div className="new-user-container">
          <ErrorDisplay/>
          <form className="new-user-form" onSubmit={this.handleSubmit}>
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
            <button className="image-upload-button" onClick={this.launch_widget}>Upload Image</button>
            <input type="submit" value="Post Ad"/>
          </form>

        </div>
      )
    }
  })
}(this));
