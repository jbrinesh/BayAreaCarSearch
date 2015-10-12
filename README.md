# FresherNote

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

BayAreaCarSearch is a simple automotive classifieds aggregator, inspired by
craigslist, with additional search features and a user friendly interface.
The most basic MVP is Phase one and two bellow.
<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Basic Search features  
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete classifieds
- [ ] Additional result views
- [ ] Favorite and follow ads
- [ ] Save Drafts of ads

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Classifieds Model with basic API to respond to searches

Phase 1 sets up the basic back end to make Api requests for the data to respond
to different searches. There is no user interface in this phase so request will
be made with ajax request and will simply display Json representing the Results
of the query.

[Details][phase-one]

### Phase 2: Flux Architecture for Search Area.

Phase 2 will set up the most basic front end for the site. At the end of this
phase anonymous user will be able to make searches using the search Field and
see the results as a list of links. They can then click on the link and see the
view for that ad.  

[Details][phase-two]

### Phase 3: User Model, Session Control, more CRUD for Classifieds

Phase 3 sets up basic user authentication including a new data base table and
session controller using secure methods including BCrypt. After we have users
we will add new and create CRUD actions for the Api::ClassifiedsController.
There will also be two new views in rails to handle sign up and log in. By the
end of this phase a user can sign in and make a new classified using and ajax
request from the terminal.  

[Details][phase-three]

### Phase 4: Remaining Flux interface for Account

Phase 4 will set up the rest of the front end of phase 3. There will be a new
section on the site for user accounts where the user can post classifieds and
view there post history.

[Details][phase-four]

### Phase 5: Add Gallery and Details Views for Search Results

Phase 5 will add additional feature to how the user can view search results.
First a Gallery view will be added so the user can see a mosaic of images
instead of just a list. The second feature will be a Details view that will be a
more detailed list with a smaller thumbnail and more details about the ad.
Both fetures will require modifications to the Api controller.

[Details][phase-five]

### Phase 6: Allow Draft editing and Favorites for Users

Phase 6 will expand what a user can do in the Accounts page. In addition to
posting classifieds a logged in user will be able to follow other classifieds by
Favoriting them and see them in there account. A user will also be able to
save drafts of classifieds without posting them publicly for later review and
editing. This phase will require adding the rest of the CRUD actions to the
Api::ClassifiedsController.

[Details][phase-six]

### Phase 7: Integrate Google maps API (possible bonus)

Phase 5 Will integrate google maps into the user interface. First for the view
of a single classified, there will be a small map showing the location if
possible. The second feature will be a new search view so the user can see the
results of a query plotted on a map. A user will then see a list of posts that
area in the bounds of the maps to they and view the classified ad.

[Details][phase-seven]


### Phase 8: Styling Cleanup and Seeding (1 day)

There will be basic styling through out the project, but a day will be set aside
mostly for improvements to the CSS for better usability and style.

### Bonus Features (TBD)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
