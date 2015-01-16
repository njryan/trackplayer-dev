Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {})]
});

/*Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});*/