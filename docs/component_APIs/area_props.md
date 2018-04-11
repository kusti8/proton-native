# Area Props

Some props can be applied to Area itself and all Area components (for those the normal [universal props](universal_props.md) don't work). They get inherited to all corresponding children. The [AreaGroup](area_group.md) component can be used to apply these to multiple children.

All color properties use the CSS color syntax. Examples: "red", "#070707", "#222", "rgba(255, 255, 0, 1)", "hsl(0, 100%, 50%)".

* [fill](#fill)
* [fillOpacity](#fillopacity)
* [stroke](#stroke)
* [strokeOpacity](#strokeopacity)
* [strokeWidth](#strokewidth)
* [strokeLinecap](#strokelinecap)
* [strokeLinejoin](#strokelinejoin)
* [strokeMiterlimit](#strokemiterlimit)
* [transform](#transform)

## fill

The fill color for the component.

| **Type**       | **Required** | **Default** |
| -------------- | ------------ | ----------- |
| string (Color) | false        | 'none'      |

## fillOpacity

The opacity of the fill (between 0 and 1). Gets multiplied with the fill colors alpha value.

| **Type**                  | **Required** | **Default** |
| ------------------------- | ------------ | ----------- |
| number \| string (number) | false        | 1           |

## stroke

The stroke (line) color for the component.

| **Type**       | **Required** | **Default** |
| -------------- | ------------ | ----------- |
| string (Color) | false        | 'none'      |

## strokeOpacity

The opacity of the stroke (between 0 and 1). Gets multiplied with the stroke colors alpha value.

| **Type**                  | **Required** | **Default** |
| ------------------------- | ------------ | ----------- |
| number \| string (number) | false        | 1           |

## strokeWidth

| **Type**                  | **Required** | **Default** |
| ------------------------- | ------------ | ----------- |
| number \| string (number) | false        | 1           |

## strokeLinecap

| **Type**                        | **Required** | **Default** |
| ------------------------------- | ------------ | ----------- |
| enum('flat', 'round', 'square') | false        | 'flat'      |

## strokeLinejoin

| **Type**                        | **Required** | **Default** |
| ------------------------------- | ------------ | ----------- |
| enum('miter', 'round', 'bevel') | false        | 'miter'     |

## strokeMiterlimit

How far to extend the stroke at a sharp corner when using `strokeLinejoin='miter'`, see [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit) for a more detailed explanation.

| **Type**                  | **Required** | **Default** |
| ------------------------- | ------------ | ----------- |
| number \| string (number) | false        | 10          |

## transform

List of transformations to apply to the component (are quite similar to SVG transformations). Example for multiple transformations: `transform="translate(100, 100) rotate(90)"`.
All x and y coordinates specified in a transformation are relative _to the component itself_, meaning that `translate(-50%, 0)` will translate the component by 50% of it's own width to left.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| string   | false        | ''          |

### rotate

Rotates the component `a` degrees around the center `(xCenter, yCenter)`.

Syntax:

```
rotate(a)
rotate(a, xCenter, yCenter)
```

| **Variable** | **Required** | **Default** |
| ------------ | ------------ | ----------- |
| xCenter      | false        | 50%         |
| yCenter      | false        | 50%         |

### translate

Moves the component `x` to the right and `t` down.

Syntax:

```
translate(x)
translate(x, y)
```

| **Variable** | **Required** | **Default** |
| ------------ | ------------ | ----------- |
| x            | true         |             |
| y            | false        | x           |

### scale

Scales the component by `x` in the horizontal axis and by `y` in the vertical axis. The scale center is specified by `(xCenter, yCenter)`.

Syntax:

```
scale(x)
scale(x, y)
scale(x, xCenter, yCenter)
scale(x, y, xCenter, yCenter)
```

| **Variable** | **Required** | **Default** |
| ------------ | ------------ | ----------- |
| x            | true         | 50%         |
| y            | false        | y           |
| xCenter      | false        | 50%         |
| yCenter      | false        | 50%         |

### skew

Skews the component by `x` degrees in the horizontal axis and by `y` degrees in the vertical axis. The center is specified by `(xCenter, yCenter)`.

Syntax:

```
skew(x, y)
skew(x, y, xCenter, yCenter)
```

| **Variable** | **Required** | **Default** |
| ------------ | ------------ | ----------- |
| x            | true         |             |
| y            | true         |             |
| xCenter      | false        | 50%         |
| yCenter      | false        | 50%         |

### matrix

Applies a matrix transformation. (Overwrites all other transformations.)

Syntax:

```
matrix(a, b, c, d, e, f)
```

Applies the matrix:

```
/ a b 0 \
| c d 0 |
\ e f 1 /
```
