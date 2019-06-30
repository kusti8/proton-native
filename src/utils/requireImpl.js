import Module from 'module';
import fileType from 'file-type';
import readChunk from 'read-chunk';
import fs from 'fs';

const originalLoader = Module._load;

Module._load = function(request, parent) {
  const buffer = readChunk.sync(request, 0, fileType.minimumBytes);
  const type = fileType(buffer).mime;
  if (type.split('/')[0] != 'image')
    return originalLoader.apply(this, arguments);

  return fs.readFileSync(request);
};
