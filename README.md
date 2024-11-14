# SOFTWARE DEVELOPER 2 – ASSIGNMENT
This is my take-home assignment for TV Ontario, to build a simple weather app using the OpenWeather API.

For organization, I will use a story map (below) to track what functionality I wish to see in the finished product, as well as what assumptions I'm making.

## User Story Map

### Major stories

| id  | *As a user, I can...*              | _So that..._                                 | Status |
| --- | ---------------------------------- | -------------------------------------------- | ------ |
| 1   | Input a city name.                 | I can control which report I see.            |        |
| 2   | See the weather report for a city. | I can make appropriate decisions for my day. |        |
### Minor stories and other outcomes
### 1. Inputting a city
Assumptions:
- For ease of computation, I will assume that users can only search for Canadian cities.
- In early development, I will be using an extremely reduced shortlist of cities, but will design the code in such a way that replacing it with a proper geocoding API request would be trivial.

| id  | *As a user, I can...*                               | _So that..._                                                 | Status |
| --- | --------------------------------------------------- | ------------------------------------------------------------ | ------ |
| 1.1 | See and select relevant suggestions for city names. | I can select the desired city without typing its whole name. |        |
| 1.2 | Enter arbitrary Canadian cities.                    | I can see weather for anywhere in Canada.                    |        |


### 2. Viewing the weather report
Assumptions:
- `temp_min` and `temp_max` are not relevant data to display for current weather (see [docs](https://openweathermap.org/current#min)).

| id    | *As a user, I can...*                                                                              | _So that..._                                                                                   | Status |
| ----- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| 2.1   | See an informative overall summary of the weather conditions in my selected city.                  | I can get the most important information at-a-glance.                                          |        |
| 2.1.1 | See temperature data, in Celsius, including:<br>- real temperature.<br>- "feels like" temperature. | I can access more information that is crucial for decision-making, like deciding what to wear. |        |
| 2.1.x | See more detailed weather information.                                                             | I can access it if I so desire, and don't mind having additional data on screen.               |        |
