## API Consumption 
# Project Summary 
A code test for fetching data from the Metro Transit API. <br/>
The program should be able to retrieve the following data about a bus route: <br/>
- bus *route* that the person is *leaving from* 
- bus *stop* that the person is *going to*
- in which *direction* will the bus stop be heading 

    - __EXAMPLE__: 
        - If you wanted to know when the next bus is leaving __from__ Target's Brooklyn Park campus __to__ Target's downtown campus: <br/>
        - $ go run nextbus.go and get the following: 
        - “Express -Target -Hwy 252 and 73rd Av P&R -Mpls” 
        - “Target North Campus Building F” 
        -  SOUTHBOUND in 2 Minutes

# Tech required to install this project
- React 
- Node (Comes with NPM and NPX, which is needed for a create-react-app project)
- Command Line Tools
- Git (Command Line Tools may already have Git installed along with it) 

# Instructions for local development
1. Fork/Download/Clone this repo 
2. cd into the metro-transit directory 
    - open the terminal in your project. 
    - type ls and enter
    - if you see "metro transit", type cd metro-transit 
    - if you don't see metro-transit, skip to step 3. 
3. in your terminal, type npm install to get all of the dependencies 
4. open localhost:3000 in your terminal if it doesn't automatically pop up. 
5. start developing it to your own taste or demo! 

# Folder strucutre 
- There are 4 different API get requests. 
- Each request is located in it's own folder found in src/components/
- __Below is the order of the requests__: 
1. __GetRoutes component__
- This is to to retrieve all of the routes that are in service for the current day. 
- The user will select a route which triggers a fetch for getting all the __directions__ available for that selected route. 
2. __GetDirections component__ 
- This is to retrieve the directions of the selected route. 
- The user will select a direction for the route which triggers a fetch for getting all the __stop__ available for the selected route. 
3. __GetStops component__ 
- This is to retrive all of the stops available for the selected route and direction that it is going in. 
- The user will then select a bus stop which triggers a fetch for getting the __next departure times available__. 
4.__GetTimePointDepartures component__
- This will retrieve the selected bus'
    -- route (leaving from)
    -- direction 
    -- stop (going to)
    -- time departure 
- User will then be prompted to refresh and search for different routes. 



