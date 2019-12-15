# About

Proton Native is a small project created by kusti8 to try and create a React interface for desktop app building.
Proton Native was designed as an alternative to Electron. Rather than building apps that use the overhead of Electron and web
technologies, Proton Native allows you to use native widgets cross platform, all in a React environment that you would get with
Electron.

**Advantages**

- No large web browser running your app
- Better system compatibility
- Simple React components that are the same as React Native components
- Constantly being improved and added to

**Disadvantages**

- Currently smaller than Electron
- Smaller community since Proton Native is newer

If you've been using Qt or frameworks like that successfully, then you may do so. But if you love working with React like I do,
then Proton Native may be your best alternate to a full Electron app.

## By the numbers

The electron quickstart averages at about 6% CPU and 0.6% memory on a i7-8550U with 16GB memory laptop, running Linux.

The Proton Native example uses 1% CPU and 0.8% memory.

As your projects get bigger and bigger, you're going to notice more memory usage in Electron due to the fact that its going to render more if you don't put significant effort into making it more efficient. Because Proton Native uses your native OS library, it's going to be more efficient in the long run.

(These are my unbiased numbers that I got from a quick run. Your numbers are going to vary depending on size of project and computer.)

## How it Works

Under the hood, there are two main libraries that are being used.

- [node-qt-napi](https://github.com/kusti8/node-qt-napi)
  - Bindings for QT to create the components
- [React-reconciler](https://github.com/facebook/react/tree/master/packages/react-reconciler)
  - Manages state, rerendering, etc.

Each component is defined in `src/components`. All of these are composed of other functions which you will find in the folder,
which defines many common functions such as adding children, removing them, updating props, etc. Then, in `src/index.js`, we give
each component a string identifier, so that you import the string, rather than the class itself. Then in `src/createElement.js.`,
when the reconciler tells us to create the class, we look it up in a map, and return the corresponding instance of the class.

Some components are extended in `src/react-components`. This is to merge widgets together that we need to do in React.

The reconciler lives in `src/reconciler`. This defines functions that manage all functions, mostly adding/removing children, and updating
props.

Finally, in `src/render`, we finally render it, by creating a root component that sets up Qt, creates a container, and then renders it.

## Future plans

Proton Native is going to be maintained and added to for the foreseeable future. A small community has developed to try and improve it, and if you have an interest in helping contribute, you're always welcome.

Currently, this is being run by one person, kusti8. All contributions are welcome!
