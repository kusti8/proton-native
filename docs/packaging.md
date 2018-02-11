# Packaging

Currently, the node packaging/compiling world has gotten a lot more complicated if you want to generate a single binary. Creating a NPM package is easy and you can easily upload it. But what if you don't want your users to install node and use the command line to install your package?

## Bundle node (easiest)

Currently, the easiest way is to simply download a [node binary](https://nodejs.org/en/download/) for your platform, copy it into your project root. Then create a shortcut/script to execute that.

### Linux + Mac
```
root
    - bin
        - index.js
    - package.json
    - node
    - start
```

And then script contains:

```bash
#!/bin/sh
./node bin/index.js
```

### Windows

On Windows, you can make a shortcut to `node.exe`, and 