# BayAreaCarSearch

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: www.bayareacarsearch.com

## Overview

BayAreaCarSearch is a simple automotive classifieds aggregator, inspired by
craigslist, with additional search features and a user friendly interface. The
site is build on a Rails back-end and React.js and Flux front-end.
<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Basic Search features
- [X] Basic UI
- [X] Log in / Log out
- [X] User Accounts
- [X] Image support
- [X] Additional result views
- [X] Integrate Google Maps API
- [X] CSS Styling
- [X] Real world data scraped from Craigslist
- [X] Search Optimization

<!-- ## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md -->


## Major Design Points

### Flux and React.js for fast and reliable user interface

The front end of the site was written in React.js following the flux pattern to
allow a fast and responsive user interface with a reliable modular code base. The
design of the front end is based around four stores, a classifieds store, query
store, filter store and and error store. The search input fields are made up of
different individuals React components. Each component keeps its state in sync with
the query store. When a user hits search, the query parameters are pulled from
the query store and sent up to the server via an Ajax request, the response is a
list of matching classifieds that are kept in the classified store so they can be
requested by different components. The filter store keeps track of the state of the
filter bar and is responsible for the order in classifieds are displayed and
what view (i.e. list, gallery ...) the user sees. Finally the error store keeps
track of any error messages send down from the server so appropriate component can
display them to the user.

In the interest of having a more responsive user experience. I decided to handle
all sorting without needing to make a request to the server. When a user selects
a different sorting option. The filter bar keeps track of the current sorting in
its state. When the search index component makes a request to the Classifieds
store for results to populate its list. The classifieds store gets the current
state from the filter bar component. The builds a comparator function to pass to
the build in JavaScript sort function. This has led to very responsive sorting.

### User Authentication with BCrypt

Most of the sites functionality is available to all anonymous users to the site.
Users can make an account if they choose. At this point in time, a registered
user can create classifieds of there own and manage the post they have already
made. In order to maintain a secure site, user passwords are not stored in the
database, instead a hashing of the password is stored using BCrypt. Then when a
user signs in, they are issued a random 16 digit base 64 number as a session
token to be stored in the cookies.

### Database Schema

The site uses a PostgreSQL database with a normalized schema for efficiency of
both look up time and space.

https://github.com/jbrinesh/BayAreaCarSearch/blob/master/db/schema.rb

### Optimized Searches

Once I had real world data on my site, it became very obvious that loading my
entire database of classifieds into the DOM would not scale as I add classifieds
to the site. The first thing I did to address this was to implement pagery for my
index page. Instead of loading all matching classifieds onto the DOM, the front
end just stores the in the Classified Store and request them 100 at a time to
build the individual pages.

After I had pagery working I wanted to optimize the time it take for the initial
load of my site. As it was, when you make you initial get request, the server sends
down all its assets. Once the main index component mounts, it makes a get request
for all of the classifieds in the database. The time it takes to build the JSON
views for each classified take linearly more time as the number of classifieds
increased. I wanted to initial load of my site to happen in constant time. To
fix this, I now load the classifieds to the client side in two stages. First
the Client side makes a request for only the first 100 classifieds from the server,
enough to build the first page of results. Upon success of the Ajax request,
the client makes a second request for the rest of the classifieds. Since only the
first 100 classifieds are loaded into the DOM, the user sees no difference between
loading all the classifieds in two steps instead of one expect it loads much
faster.

The final issue of scaling i wanted to address is, my server send as many matching
classifieds as it can down to the client. While my database is small, this was
not a problem, however if I had a database with 100,000 classifieds, the
client side would have to store all those classifieds on the initial load. This
starts to become very memory intensive for the browser. Now when the client
request classifieds from the server, the server is limited to only 2500
results, or 25 page, the same as what craigslist will give access to the client.

### Web Scraper

The majority of the classifieds on the site are collected during a daily
scheduled rake tasks that runs a custom web scraper to pull the most recent
ads posted on craigslist. The scraper uses the Mechanize gem for ruby to make
get requests to the server and make the files that the craigslist server response
with available to me. The scraper systematically makes request for pages starting
with the most recent and moving backward in time. For each page, it uses
Regex to find key patterns and pull out the required information to build a classified
in the sites database. Once the scrapper finds too many ads it has seen before it
stops its collection for the night.

### Integrated 3rd party API's, Google Maps and Cloudinary

The first thing that was required was having some way of turning Addresses into
GPS coordinates so they can be plotted on the map. In order to accomplish this I
used Google's Geocoder API to look up the Latitude and Longitude of an optional
address a user can provide when creating a new classified. Once I had the
coordinates I store the information along with the plain text of the address in
the classifieds table.

Once Classifieds had GPS coordinates associated with them it was easy to build
another component to be added to the show page that is just a static google map
with a single marker for the ad that is being shown.

After each individual show page had a map on it. I wanted to add the last view
for search results to the index page. I made a new React component to be the map
display. When the component mounts, it iterates through each of the classifieds and
places a marker on the map for each. When a user hovers over a marker. The map
opens an information window with basic information about the classified. The on a
click event, the user is routed to the show page using the react router. If the
Map View is selected in the filter bar. Instead of mounting the search results
index and the respective list items, the browser just mounts the Map View
component.

In order to implement image support, a new table in our
database is required to keep track of the source of each image. A foreign key
column that reference the classifieds table keeps track which images belong to
which classified. We then implement Cloudinary's API to store the actual image
on another server. When a user creates a new Classified, they upload the images to
Cloudinary's using the JavaScript plugin, then upon success of creating the
classified, the server inserts new rows into the images table with a reference to
the newly created Classified and the source url from the cloud server.










<!-- ## Implementation Timeline

### Phase 1: Classifieds Model with basic API to respond to searches (1 day)

Phase 1 sets up the basic back end to make Api requests for the data to respond
to different searches. There is no user interface in this phase so request will
be made with ajax request and will simply display Json representing the Results
of the query.


### Phase 2: Flux Architecture for Search Area. (1 day)

Phase 2 will set up the most basic front end for the site. At the end of this
phase anonymous user will be able to make searches using the search Field and
see the results as a list of links. The entiar front end will be build using
React and the Flux patern. When a search is executed the results are stored in
the Classifieds Store. When the classifieds change, the store emits an event to
notify all the other componets that there is new iformation to display.

### Phase 3: User Model, Session Control, more CRUD for Classifieds, Flux for Accounts (2 days)

Phase 3 sets up basic user authentication including a new data base table and
session controller using secure methods including BCrypt. After we have users
we will add new and create CRUD actions for the Api::ClassifiedsController.
There will also be two new views in rails to handle sign up and log in. This
will also set up the flux front end for the user account page.


###  Phase 4: Add Images, Gallery View and Details View for Search Results

Phase 4 will enable images site wide and  add additional two new ways a user  
can view search results. In addition to the list view a Gallery view will be
added so the user can see a mosaic of images instead of just a list. A Details
view that will be a more detailed list with a smaller thumbnail and more details
about the ad.

In order to implement image support, a new table in our
database is required to keep track of the source of each image. A foreign key
column that reference the classifieds table keeps track which images belong to
which classified. We then implement Cloudinary's API to store the actual image
on another server. When a user creates a new Classified, they upload the images to
Cloudinary's using the JavaScript plugin, then upon success of creating the
classified, the server insets new rows into the images table with a reference to
the newly created Classified and the source url from the cloud server.

Implementing the addition result views is fairly straight forwards in React.
When the server responds to a search. It sends down JSON repersentation of all
the information to build each show page for every matching result. Adding the
additional views just required making a couple new components to repearsent the
details index item and the galllery index items to be new list items in the
search results index.  

We also added a filter bar component with radio buttons to select the diffrent
index views. The current view is stored as State on the search results index
component. When the Classifieds store emits a change event. The index simple
renders the correct list item depending on the selected view

### Phase 5: Client side sorting and filtering

In addition to the view options for the search results index. The filter bar
component also has a drop down to select an order to display the results. In
the intrest of having a more responsive user exsperence. We decided to handle
all sorting without needing to make a request to the server. When a user selects
a diffrent sorting option. The filter bar keeps track of the current sorting in
its state. When the search index componet makes a request to the Classifieds
store for results to populate its list. The classifieds store gets the current
state from the filter bar componet. The builds a comparitor function to pass to
the build in JavaScript sort function. This has led to very responsive sorting.

### Phase 6: Styling Cleanup and Seeding (1 day)

There will be basic styling through out the project, but a day will be set aside
mostly for improvements to the CSS for better usability and style.

### Phase 7: Integrate Google maps API (2 day)

Phase 5 Will integrate google maps into the user interface. First for the view
of a single classified, there will be a small map showing the location if
possible. The second feature will be a new search view so the user can see the
results of a query plotted on a map. A user will then see a list of posts that
area in the bounds of the maps to they and view the classified ad.

The first thing that was required was having some way of turning Addresses into
GPS cordanats so they can be ploted on the map. In order to acoplish this I
used Googles Geocoder API to look up the Latitude and Logitude of an optional
address a user can provide when creating a new classified. Once I had the
cordantes I store the information along with the plain text of the address in
the classifieds table.

Once Classifieds had GPS coordanates associated with them it was easy to build
another component to be added to the show page that is just a static google map
with a single marker for the add that is being shown.

After each individual show page had a map on it. I wanted to add the last view
for search results to the index page. I made a new React component to be the map
display. When the componet mounts, it iterates through each of the classifieds and
places a marker on the map for each. When a user hovers over a marker. The map
opens an information widow with basic information about the classified. The on a
click even, the user is routed to the show page using the react router. If the
Map View is selected in the filter bar. Instead of mounting the search results
index and the respective list items, the broswer just mounts the Map View
component.



### Phase 7: Real world data, proof of concept

Once the basic functionality of the site was working. I wanted to start building
some more relistice seed data to see how the site scalse and handles real world
posts. I began by writing a rake task that i could run by hand in the termanal.
The task took in a url of a craigslist page as an argument and creates a new
classified in my database. I used the Ruby gem Mechinize to do the actual get
requests to the craigslist server and to hook diffrent DOM element. Then I
figured out where in the DOM the information I needed was to build a classified.
Finally I could use RegEx to extract the correct information from the string
repersenting the  correct DOM element. Then once the scrapper had collected all
the information it needs. It builds an instence of a Classified and persistes it
to the database.

The first version of the scrapper allowed me to extract information from one page
at a time. This allowed me to build my database to about 300 classifieds.

### Phase 8: Optimaztions for scalling

Once I had real world data on my site, it became very obious that loading my
entiar database of classifieds into the DOM would not scale as I add classifieds
to the site. The first thing I did to address this was to implement pagery for my
index page. Instead of loading all matching classifieds onto the DOM, the front
end just stores the in the Clsssified Store and request them 100 at a time to
build the individual pages.

After I had pagery working I wanted to optimize the time it take for the inital
load of my site. As it was, when you make you inital get request, the server sends
down all its assets. Once the mian index component mounts, it makes a get request
for all of the classifieds in the database. The time it takes to build the JSON
views for each classified take linarly more time as the number of classifieds
incressed. I wanted to intial load of my site to happen in constent time. To
fix this, I now load the classifieds to the clinent side in two stages. First
the Clint side makes a request for only the first 100 classifieds from the server,
enough to build the first page of results. Appon succsess of the Ajax request,
the clint makes a secound request for the rest of the classifieds. Since only the
first 100 classifieds are loaded into the DOM, the user sees no diffrence between
loading all the classifieds in two steps instead of one exspest it loads much
faster

The fianl issue of scalling i wanted to address is, my server send as may matching
classifieds as it can down to the cilnt. While my database is small, this was
not a problem yet, however if I had a database with 100,000 classifieds, the
clint side would have to store all those classifieds on the inital load. This
starts to become very memory intensive for the browser. Now when the clint
request classifieds from the server, the server is limited to only 2500
results, or 25 page, the same as what craigslist will give accsess to the clint.


### Phase 9: Rake Tasks to Gather new Classifieds

My first version of the web scrapper was ment as just a proof of concept. What
I really wanted is a durable web scrapper that can run as a schedual rake task.
I started by refactoring my code from the

created schedualed rake Tasks
refactored scraper to run automaticly
added error correction to scraper (reliable)

### Bonus Features (TBD)
* value based search filtering -->
