# Packaging

Currently, the easiest way to package a Proton Native v2 application is to use `nexe`.
This will create a binary for your platform. Unfortunately due to how `nexe` works,
you will have to distribute a small folder next to that binary. This contains the
Qt libraries, as well as the Node.js bindings for Qt.

## Creating the binary

```bash
npm run build # Transpile our code. If you have any extra files other than
              # app.js and index.js, make sure they are included in the build
              # script in package.json, so that they get transpiled also.

mkdir out
npx nexe bin/index.js -o out/my-app # Create our binary
```

## Distributing

To distribute, we need to create a folder structure with our bindings and Qt libraries.
Here's how your app should be distributed:

```bash
- my-app # Binary
- node_modules # A folder named node_modules alongside
    - node-qt-napi # We only need to include this package, not any others
        - bindings # The bindings folder is the only required folder
            - ...
```

### Linux and Mac

```bash
cd project-root # We're in the project root
mkdir -p out/node_modules/node-qt-napi # Create our directory structure
cp -r node_modules/node-qt-napi/bindings out/node_modules/node-qt-napi/ # Copy our bindings folder over
```

### Windows

```bat
cd project-root # We're in the project root
mkdir out\node_modules\node-qt-napi
xcopy node_modules\node-qt-napi\bindings out\node_modules\node-qt-napi\bindings\ /s /e
```
