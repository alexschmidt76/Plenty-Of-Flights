# Plenty-Of-Flights #

Plenty of flights is a web application for ploting and saving flight paths for private pilots.
Providing users with tools necessary for visualizing routes and accessing information for filing flight plans.

## How to use ##

### Access ###
Users will access the page via web addess link below.
[POF](https://plenty-of-flights-frontend.vercel.app/)

Users will then input basic flight information.

Destination Airport in ident format (example KMSP)
Arrival Airport in ident format (example KDEN)
Future update will also have Aircraft manufacturer and model.

Clicking Search generates a google map and plots out the course of flight which can be saved for future reference.

### Account Generation ###
If users would like to save routes to the backend they must make an account via the sign up page acessable on the top of the page with the Sign Up button or in the hamburger menu.

Signing up requires little information.
Just Name, Email and a Password.

### Frontend ###

The Frontend is a React based website whos componets and resources are hosted server side.
This allows for a fast responsive website that feels clean and easy to use.
The Home page has a slideshow with visualling appealing instructions that help with the intuitiveness of the site for first time users.
The Map with its auto-centering allows for less user inputs to visually digest the information presented to them.
Account generation is keep simple while also using hash incription for account security.

### Backend ###

The backend is hosted seperately from the frontend.
Below is a table of CRUD Route for the backend 

| Route Name | Route Path | HTTP Method |
|------------|------------|-------------|
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |
| a | a | a |

### API Documentation ###

The follwing APIs where used.

[AirportDB API](https://airportdb.io/#howtouse)
This API is used to pull the geolocation that is placed on the Map.
It has the lat and long of airports in the US as well as other information that could be used in future updates.

[Google Maps API](https://developers.google.com/maps/documentation)
This API is used to show the map, also to place the markers and draw the polyline between the two points. There are plenty of other features of this API that would be useful in a future update.

### Potential Future Features ###

Have a look up for planes by manufaturer and model.

Add ability to make stops at in between final destination.

Add airport information to a popup on click of marker.

Add abilty to coordinate flight plans.

Ability to share flight plans.

### Known Bugs ###

No lookup for plane information at this time.

No password recovery.

