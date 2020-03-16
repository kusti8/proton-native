# View

`View` is a generic view component similar to `<div>` on the web. Views should be used to construct the layout.

The following example creates a generic button component that implements _mouse hover_ effect.

```jsx
import React from 'react';
import { View } from 'proton-native';

function Button({ children, onPress }) {
  const [isHover, setHover] = React.useState(false);
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{ backgroundColor: isHover ? 'red' : 'blue' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
```

## Props

- [style](#style)
- [onMouseMove](#onMouseMove)
- [onMouseEnter](#onMouseEnter)
- [onMouseLeave](#onMouseLeave)

## Reference

### style

Height and width can be specified as integers, where they are treated
as pixel counts, or percentages, where they are treated as percentages of the entire desktop size.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| object   | No           | {}          |

### onMouseMove

Called when mouse cursor is moving above the view. An event object is passed into the handler function.

| **Type**                        | **Required** | **Default** |
| ------------------------------- | ------------ | ----------- |
| (event: MouseMoveEvent) => void | No           | () => {}    |

```typescript
interface Point {
  x: number;
  y: number;
}

interface MouseMoveEvent {
  point: Point;
}
```

### onMouseEnter

Called every time mouse cursor enters the view.

| **Type**   | **Required** | **Default** |
| ---------- | ------------ | ----------- |
| () => void | No           | () => {}    |

### onMouseLeave

Called every time mouse cursor goes out of the view.

| **Type**   | **Required** | **Default** |
| ---------- | ------------ | ----------- |
| () => void | No           | () => {}    |
