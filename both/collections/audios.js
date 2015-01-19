Audios = new FS.Collection("audios", {
  stores: [new FS.Store.GridFS("audios", {})],
  filter: {
    allow: {
      contentTypes: ['audio/*'] //allow only audio files in this FS.Collection
    }
  }
});
