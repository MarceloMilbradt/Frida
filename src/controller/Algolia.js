
const al = require("algoliasearch");

const client = al(
  "0AMQ3RWXQS", "dedc497f0397bbdc6778e5f538d2cce8"
  );
const index = client.initIndex("frida_denuncias");

client.clearCache()

const doRefresh = (client) =>{
  client.clearCache()
}

const doSearch = async (term) => { 
  doRefresh();
  await index.search(term) 
};

const addToIndex = (data,objectID) => {
      return index.saveObject({...data, objectID});
};

const updateIndex = (data,objectID) => {
      return index.saveObject({...data, objectID});
};

const deleteFromIndex = (objectID) => index.deleteObject(objectID);

export {
    addToIndex,
    deleteFromIndex,
    updateIndex,
    client,
    index,
    doSearch,
    doRefresh
  }