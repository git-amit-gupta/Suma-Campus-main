Ext.define("ReExt.store.States", {
  extend: "Ext.data.ArrayStore",
  alias: "store.states",

  storeId: "states",
  // fields: ['id', 'name'],
  data: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ],
});

Ext.define("ReExt.store.Grid", {
  extend: "Ext.data.Store",
  alias: "store.Grid",
  autoLoad: true,
  pageSize: 5, // Number of records per page

  config: {
    lastVisible: null, // Track last document for pagination
  },

  proxy: {
    type: "memory", // Custom data loading
    enablePaging: true,
  },

  loadPage: async function (page) {
    const pageSize = this.getPageSize();
    const collectionRef = collection(db, "university");

    // Create Firebase query
    let q = query(collectionRef, orderBy("name"), limit(pageSize));

    // Apply pagination with lastVisible
    if (this.lastVisible && page > 1) {
      q = query(
        collectionRef,
        orderBy("name"),
        startAfter(this.lastVisible),
        limit(pageSize)
      );
    }

    try {
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update last visible document for next page
      if (snapshot.docs.length > 0) {
        this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
      }

      this.loadData(items); // Load data into the store
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },

  listeners: {
    load: function (store, records, successful) {
      if (successful) {
        console.log("Firebase data loaded:", records.length, "records");
      } else {
        console.error("Failed to load data from Firebase.");
      }
    },
  },
});
