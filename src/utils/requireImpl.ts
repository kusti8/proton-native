//@ts-ignore
import * as Module from "module";
import * as fileType from "file-type";
import readChunk from "read-chunk";
//@ts-ignore
import sizeOf from "image-size";

//@ts-ignore
const originalLoader = Module._load;

//@ts-ignore
Module._load = function (request, parent) {
  let buffer;
  try {
    buffer = readChunk.sync(request, 0, fileType.minimumBytes);
  } catch {
    return originalLoader.apply(this, arguments);
  }
  const fullType = fileType(buffer)
  if (!fullType) return originalLoader.apply(this, arguments);
  const type = fullType.mime
  if (type.split("/")[0] != "image")
    return originalLoader.apply(this, arguments);

  const size = sizeOf(request);
  return { uri: request, width: size.width, height: size.height };
};
