# Components

The advantage of Proton Native is that all components are the same as React Native. Currently
many props are not implemented, but many important ones are. As time progresses this will change.

## App

The root wrapper around your entire code.

## Window

Takes the same props as View. Each window instance corresponds to a new window on the
desktop. More detailed information can be seen [here](components/Window.md)

## Other components

| Component                | Implemented Props                                         |
| ------------------------ | --------------------------------------------------------- |
| Button                   | style, onPress, title                                     |
| Image                    | style, resizeMode, source                                 |
| Picker                   | style, onValueChange, selectedValue                       |
| Picker.Item              | label, value                                              |
| Text                     | style                                                     |
| TouchableHighlight       | activeOpacity, underlayColor, style, onPress, onLongPress |
| TouchableOpacity         | activeOpacity, style, onPress, onLongPress                |
| TouchableWithoutFeedback | onPress, onLongPress                                      |
| View                     | style, onMouseMove, onMouseEnter, onMouseLeave            |
