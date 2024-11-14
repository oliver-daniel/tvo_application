# SOFTWARE DEVELOPER 2 – TECHNICAL ASSIGNMENT
This is my take-home assignment for TV Ontario, to build a simple weather app using the OpenWeather API.

Please find the latest version of the application [here](https://oliver-daniel-tvo-application.surge.sh).

For organization, I will use a story map (below) to track what functionality I wish to see in the finished product, as well as what assumptions I'm making.

## Running locally
To run this application locally, make sure to supply an OpenWeather API key in a `.env` file, with the name `NEXT_PUBLIC_OW_API_KEY`.

## User Story Map

### Major stories

| id  | *As a user, I can...*              | _So that..._                                 | Status |
| --- | ---------------------------------- | -------------------------------------------- | ------ |
| 1   | Input a city name.                 | I can control which report I see.            | ✅      |
| 2   | See the weather report for a city. | I can make appropriate decisions for my day. | ✅      |
### Minor stories and other outcomes
### 1. Inputting a city
Assumptions:
- For ease of computation, I will assume that users can only search for Canadian cities.
- (*) In early development, I will be using an extremely reduced shortlist of cities, but will design the code in such a way that replacing it with a proper geocoding API request would be trivial.

| id  | *As a user, I can...*                               | _So that..._                                                 | Status |
| --- | --------------------------------------------------- | ------------------------------------------------------------ | ------ |
| 1.1 | See and select relevant suggestions for city names. | I can select the desired city without typing its whole name. | ✅*     |
| 1.2 | Enter arbitrary Canadian cities.                    | I can see weather for anywhere in Canada.                    | ✅      |


### 2. Viewing the weather report
Assumptions:
- `temp_min` and `temp_max` are not relevant data to display for current weather (see [docs](https://openweathermap.org/current#min)).
- (*) I made some editorial decisions not to show _every_ statistic returned by the API.

| id    | *As a user, I can...*                                                                              | _So that..._                                                                                   | Status |
| ----- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| 2.1   | See an informative overall summary of the weather conditions in my selected city.                  | I can get the most important information at-a-glance.                                          | ✅      |
| 2.1.1 | See temperature data, in Celsius, including:<br>- real temperature.<br>- "feels like" temperature. | I can access more information that is crucial for decision-making, like deciding what to wear. | ✅      |
| 2.1.x | See more detailed weather information.                                                             | I can access it if I so desire, and don't mind having additional data on screen.               | 🟨*     |
| 2.2   | See an error message when things go wrong.                                                         | I can understand and troubleshoot the issue without causing a fatal page error.                | ✅      |
