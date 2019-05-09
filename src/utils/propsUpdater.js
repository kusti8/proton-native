const propsUpdater = (...updateMaps) => changes =>
  updateMaps.forEach(updateMap => {
    /** updateMap can be any of:
     * A) { [prop]: (newValue) => void }
     * B) [ mutableObject, ...prop | { [prop]: [string objectKey] }]
     **/

    if (!Array.isArray(updateMap)) {
      // A
      return Object.entries(updateMap).forEach(([prop, updateFn]) => {
        if (prop in changes) {
          updateFn(changes[prop]);
        }
      });
    }

    // B
    const mutableObject = updateMap[0];
    updateMap.slice(1).forEach(p => {
      if (typeof p === 'object') {
        Object.entries(p).forEach(([prop, objectKey]) => {
          if (prop in changes) {
            mutableObject[objectKey] = changes[prop];
          }
        });
      } else {
        if (p in changes) {
          mutableObject[p] = changes[p];
        }
      }
    });
  });

export default propsUpdater;
