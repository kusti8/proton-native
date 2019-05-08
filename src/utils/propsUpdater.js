const propsUpdater = updateMap => changes => {
  Object.entries(updateMap).forEach(([prop, updateFn]) => {
    if (prop in changes) {
      updateFn(changes[prop]);
    }
  });
};

export default propsUpdater;
