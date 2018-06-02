# Area.Text

A (possibly styled) text to be displayed in an Area component. Nested `Area.Text` components inheirit the parent's style.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area, Box } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 400, h: 400 }} margined>
          <Box>
            <Area>
              <Area.Text style={{ fontSize: 16 }}>
                This is some text drawn onto an{' '}
                <Area.Text style={{ color: 'red' }}>Area!</Area.Text>
              </Area.Text>
            </Area>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

_Not all fonts support all possible options_

* [fontSize](#fontsize)
* [fontFamily](#fontfamily)
* [color](#color)
* [backgroundColor](#backgroundcolor)
* [fontStyle](#fontstyle)
* [fontWeight](#fontweight)
* [textStretch](#textstretch)
* [textUnderline](#textunderline)
* [textUnderlineColor](#textunderlinecolor)
* [textAlign](#textalign)
* transform (only in a top level text component, see [Area Props](area_props.md))

## Reference

### fontSize

The font size (in pt).

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| number   | false        | 14          |

### fontFamily

The font family (only if available on the system).

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| string   | false        | 'Arial'     |

### color

The text color, specified as a CSS color string.

| **Type** | **Required** |
| -------- | ------------ |
| string   | false        |

### backgroundColor

The background color, specified as a CSS color string.

| **Type** | **Required** |
| -------- | ------------ |
| string   | false        |

### fontStyle

Whether an italic font should be used.

| **Type**                            | **Required** | **Default** |
| ----------------------------------- | ------------ | ----------- |
| enum('normal', 'oblique', 'italic') | false        | 'normal'    |

### fontWeight

Whether a bold font should be used (and the amount).

| **Type**                                                                                                                                                             | **Required** | **Default** |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| enum('minimum', 'thin', 'ultraLight', 'light', 'book', 'normal', 'medium', 'semiBold', 'bold', 'ultraBold', 'heavy', 'ultraHeavy', 'maximum') &#x7c; number (0-1000) | false        | 'normal'    |

### textStretch

How wide or narrow the characters should be.

| **Type**                                                                                                                                       | **Required** | **Default** |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| enum('ultraCondensed', 'extraCondensed', 'condensed', 'semiCondensed', 'normal', 'semiExpanded', 'expanded', 'extraExpanded', 'ultraExpanded') | false        | 'normal'    |

### textUnderline

The text underline style.

| **Type**                                       | **Required** |
| ---------------------------------------------- | ------------ |
| enum('none', 'single', 'double', 'suggestion') | false        |

### textUnderlineColor

The text underline color.

| **Type**                                                      | **Required** |
| ------------------------------------------------------------- | ------------ |
| string(color) &#x7c; enum('spelling', 'grammar', 'auxiliary') | false        |

### textAlign

Wheter the text should be aligned to the left, center or right. **Works only on a top level text component, not it's children!**

| **Type**                        | **Required** |
| ------------------------------- | ------------ |
| enum('left', 'center', 'right') | false        |
