# V2 Changes

V2 was a complete overhaul of this project to bring it closer and more in line with
React Native, so it is easier to get started, and easier to make more complicated
applications.

Below is a list of changes, as well as their justification and implementation.

## List of Changes

- Flexbox
  - Allows much easier styling and arrangement, that is the same as React Native
  - Uses yoga-layout
- Styling
  - Styling is now supported through Qt. This allows you to make your app look however you want.
- Qt instead of libui
  - Libui was moving slowly, new, and did not support many of the features needed
  - In the future, I will be moving towards true native components with wxWidgets, but it will take some time.
- Composition instead of inheritance
  - The code was remodeled to be less confusing and easier to change in the future
- Same components as React Native
  - We use the same components with the same props and the same look
  - This means that if you copy and paste your code, it should look the same

## Examples

Here's an excerpt from our CatApi demo. The code is the same as React Native, except for
the fact that it is wrapped with an App and Window component. An important part of V2 is that
we keep as close to React Native as possible, but will still make changes so as not to make the API
too convoluted. Mobile and desktop are still slightly different.
![CatApi](catapi_v2.png)

[main.js](main.js ':include :type=code jsx')
