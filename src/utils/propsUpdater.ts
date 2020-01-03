const propsUpdater = (...updateMaps: any[]) => (changes: object) =>
  updateMaps.forEach(updateMap => {
    /** updateMap can be any of:
     * A) { [prop]: (newValue) => void }
     * B) [ mutableObject, ...prop | { [prop]: [string objectKey] }]
     **/

    if (!Array.isArray(updateMap)) {
      // A
      return Object.entries(updateMap).forEach(([prop, updateFn]: any) => {
        if (prop in changes) {
          updateFn((changes as any)[prop]);
        }
      });
    }

    // B
    const mutableObject = updateMap[0];
    updateMap.slice(1).forEach(p => {
      if (typeof p === "object") {
        Object.entries(p).forEach(([prop, objectKey]: any) => {
          if (prop in changes) {
            mutableObject[objectKey] = (changes as any)[prop];
          }
        });
      } else {
        if (p in changes) {
          mutableObject[p] = (changes as any)[p];
        }
      }
    });
  });

export default propsUpdater;
