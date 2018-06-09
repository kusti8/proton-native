# About

Proton Native is a small project created by kusti8 to try and create a React interface for desktop app building.
Proton Native was designed as an alternative to Electron. Rather than building apps that use the overhead of Electron and web
technologies, Proton Native allows you to use native widgets cross platform, all in a React environment that you would get with
Electron.

**Advantages**

* Use native OS widgets
* All widgets are created and handled in C, making for generally better performance (YMMV, especially in smaller apps)
* Simple React components very similar to React Native components
* Constantly being improved and added to

**Disadvantages**

* Smaller selection of widgets than Electron
* Smaller community since Proton Native is newer

If you've been using Qt or frameworks like that successfully, then you may do so. But if you love working with React like I do,
then Proton Native may be your best alternate to a full Electron app.

## By the numbers

The electron quickstart averages at about 6% CPU and 0.6% memory on a i7-8550U with 16GB memory laptop, running Linux.

The Proton Native example uses 1% CPU and 0.8% memory.

As your projects get bigger and bigger, you're going to notice more memory usage in Electron due to the fact that its going to render more if you don't put significant effort into making it more efficient. Because Proton Native uses your native OS library, it's going to be more efficient in the long run.

(These are my unbiased numbers that I got from a quick run. Your numbers are going to vary depending on size of project and computer.)

## How it Works

Under the hood, there are two main libraries that are being used.

* [Libui](https://github.com/andlabs/libui)/[Libui-node](https://github.com/parro-it/libui-node)
  * Creates the native widgets using GTK3, Cocoa, or Windows API
* [React-reconciler](https://github.com/facebook/react/tree/master/packages/react-reconciler)
  * Manages state, rerendering, etc.

Each libui widget has a corresponding component in `src/components`. All of these are classes, which extend `DesktopComponent`,
which defines many common functions such as adding children, removing them, updating props, etc. Then, in `src/index.js`, we give
each component a string identifier, so that you import the string, rather than the class itself. Then in `src/createElement.js.`,
when the reconciler tells us to create the class, we look it up in a map, and return the corresponding instance of the class.

Some components are extended in `src/react-components`. This is to merge widgets together, such as VerticalBox and HorizontalBox,
into one. We need to use React for this, so these are React components.

The reconciler lives in `src/reconciler`. This defines functions that manage all functions, mostly adding/removing children, and updating
props.

Finally, in `src/render`, we finally render it, by creating a root component that sets up libui, create a container, and then render it.

### Components in detail

Take for example the `Button.js` component. Here, we declare `eventParameter` and `childName`. `eventParameter` tells the `update` function in `DesktopComponent` to pass in the libui text property when the libui onClicked event occurs, to the user specified callback. `childName` defines what libui property should get the text defined as children of `Button`.

Then, the constructor copies the props, and runs `setDefaults`. This takes the `defaultProps` and adds them to the props that we got. Then, we create the libui element, and set the libui widget props using `initialProps`.

In render, we attach ourself to our parent using the `addParent` function. If our parent is say a `Box`, we append `this.element` to that box. Then, we render the children that we got.

All the children are automatically in an array `children`, that the React reconciler adds and deletes for us.

This is a simple example and many components have exceptions due to the different workflows of libui and React. `Window` for example, overrides some methods since the element has to be created in the render so that it is created in the correct order.

## Future plans

Proton Native is going to be maintained and added to for the foreseeable future. A small community has developed to try and improve it, and if you have an interest in helping contribute, you're always welcome.

Currently, this is being run by one person, kusti8.

Any future improvements are going to small, just extra widgets or yoga support currently. The workflow will stay the same.
