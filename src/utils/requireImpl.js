import Module from 'module';
import fileType from 'file-type';
import readChunk from 'read-chunk';
import fs from 'fs';
import sizeOf from 'image-size';

const originalLoader = Module._load;

Module._load = function(request, parent) {
  let buffer;
  try {
    buffer = readChunk.sync(request, 0, fileType.minimumBytes);
  } catch {
    return originalLoader.apply(this, arguments);
  }
  const type = fileType(buffer).mime;
  if (type.split('/')[0] != 'image')
    return originalLoader.apply(this, arguments);

  const size = sizeOf(request);
  return { uri: request, width: size.width, height: size.height };
};
