Ext.define('"ReExt.view.sumaMobile.List"', {
  extend: "Ext.panel.Panel",
  xtype: "sumaMobile-list",
  controller: "grid-ctrl",

  // title: "Card Lists",
  style: { borderRadius: "4px !important" },
  layout: {
    type: "vbox",
    align: "stretch",
  },
  width: "100%",
  // padding: 10,
  scrollable: true,
  // Panel items
  items: [],
  tbar: [
    {
      xtype: "container",
      layout: {
        type: "vbox",
        align: "stretch",
      },
      cls: "mobileContainer",
      width: "100%",
      margin: "10 10 10 0",
      items: [
        {
          xtype: "container",
          layout: {
            type: "hbox",
            align: "stretch",
          },
          width: "100%",

          items: [
            {
              xtype: "textfield",
              itemId: "searchField",
              emptyText: "Search by  Name...",
              flex: 2,
              margin: "0 5 0 0",
            },
            {
              xtype: "button",
              text: "Search",
              iconCls: "x-fa fa-search",
              cls: "search-btn",
              overCls: "hover-btn",
              margin: "0 5 0 0",
              handler: function (btn) {
                const grid = btn.up("panel");
                const searchValue = grid.down("#searchField").getValue().trim();
                if (searchValue) {
                  grid.searchData(searchValue);
                }
              },
            },
            {
              xtype: "button",
              text: "Clear",
              iconCls: "x-fa fa-times",
              innerCls: "clear-btn",
              cls: "clear-btn",
              overCls: "hover-btn",
              handler: function (btn) {
                const grid = btn.up("panel");
                grid.down("#searchField").setValue("");
                grid.refreshData(); // Reload the full dataset
              },
            },
          ],
        },
        {
          xtype: "container",
          layout: {
            type: "hbox",
            pack: "space-between",
            align: "middle",
          },
          width: "100%",
          margin: "10 0 0 0",
          items: [
            {
              xtype: "button",
              text: "Refresh",
              iconCls: "fa fa-sync",
              cls: "refresh-btn",
              overCls: "hover-btn",
              //   flex: 1,
              width: 100,
              // margin: "0 5 0 0",
              handler: function (btn) {
                const grid = btn.up("panel");
                grid.refreshData();
              },
            },
            {
              xtype: "displayfield",
              flex: 1,
            },
            {
              xtype: "splitbutton",
              text: "Options",
              innerCls: "options-btn",
              cls: "options-btn",
              overCls: "hover-btn",
              //   itemId: "options",
              // floating: false,
              //   flex: 1,
              width: 100,
              menu: [
                {
                  text: "Add New",
                  iconCls: "x-fa fa-plus",
                  handler: "addNew",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  bbar: [
    {
      xtype: "button",
      text: "Previous",
      itemId: "prevBtn",
      iconCls: "x-fa fa-chevron-circle-left",
      disabled: true,
      handler: function (btn) {
        const panel = btn.up("panel");
        // panel.currentIndex--;
        panel.fetchData("prev");
      },
    },
    "->",
    {
      xtype: "button",
      text: "Next",
      itemId: "nextBtn",
      iconCls: "x-fa fa-chevron-circle-right",

      handler: function (btn) {
        const panel = btn.up("panel");
        // panel.currentIndex++;
        panel.fetchData("next");
      },
    },
  ],

  initComponent: function () {
    this.callParent();

    this.pageStack = [];
    this.lastDoc = null;
    this.pageSize = 8;
    this.currentIndex = 0;
    this.sortField = "";

    this.type = "";
    // University | student
    if (this?.gridType === "university") {
      this.type = "university";
      this.sortField = "rank"; // Default sort field
    } else if (this?.gridType === "students") {
      this.type = "students";
      this.sortField = "name";
    } else if (this?.gridType === "referral") {
      this.type = "referral";
      this.sortField = "name";
    }
    // Load initial data
    this.fetchTotalCount().then(() => {
      this.fetchData();
    });
  },

  fetchData: async function (direction = "next") {
    const me = this;

    const { db, collection, query, orderBy, limit, startAfter, getDocs } =
      await import("../../firebase/firebaseConfig"); // Firebase config file

    try {
      let q;
      if (direction === "next" && this.lastDoc) {
        q = query(
          collection(db, this.type),
          orderBy(this.sortField),
          startAfter(this.lastDoc),
          limit(this.pageSize)
        );
      } else if (direction === "prev" && this.pageStack.length > 1) {
        const prevDoc = this.pageStack[this.pageStack.length - 2];
        q = query(
          collection(db, this.type),
          orderBy(this.sortField),
          startAfter(prevDoc),
          limit(this.pageSize)
        );
      } else {
        q = query(
          collection(db, this.type),
          orderBy(this.sortField),
          limit(this.pageSize)
        );
      }

      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Update panel items
      me?.removeAll();
      if (this.type == "university") {
        results.forEach((university) => {
          me.add({
            xtype: "panel",
            title: university.name || "Unknown University",
            //   bodyPadding: 10,
            margin: 10,
            width: "100%",
            //   padding: 10,
            layout: {
              type: "vbox",
              align: "stretch",
            },
            style: {
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 10px 5px rgba(0,0,0,0.1)",
              minHeight: "250px",
            },
            items: [
              {
                xtype: "fieldcontainer",
                layout: "hbox",
                width: "100%",
                padding: 10,
                items: [
                  {
                    xtype: "image",
                    src:
                      university?.logo ||
                      "https://placehold.co/100x100?text=No%20Image&font=roboto",
                    width: 100,
                    height: 100,
                    alt: "University Logo",
                    cls: "profile-img",
                  },
                  {
                    xtype: "fieldcontainer",
                    layout: "vbox",
                    margin: "0 0 0 10px",
                    // width: "80%",
                    flex: 1,
                    items: [
                      {
                        xtype: "displayfield",
                        fieldLabel: "Rank",
                        value: university?.rank || "N/A",
                        cls: "label-width",
                        labelWidth: 50,
                      },
                      {
                        xtype: "displayfield",
                        fieldLabel: "Status",
                        // value: university.status || "N/A",
                        value: university?.status
                          ? '<div class="active-text">Active</div>'
                          : '<div class="inactive-text">InActive</div>',
                        cell: {
                          encodeHtml: false,
                        },
                        labelWidth: 50,

                        width: "80%",
                      },
                      {},
                    ],
                  },
                ],
              },
              {
                xtype: "fieldcontainer",
                layout: "vbox",
                width: "100%",
                padding: 10,

                items: [
                  {
                    xtype: "displayfield",
                    fieldLabel: "Location",
                    value: university?.location || "Unknown",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Seats",
                    value: university.seats_available || "N/A",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Visa Requirements",
                    value: university.visa_req
                      ? '<div class="active-text">Yes</div>'
                      : '<div class="inactive-text">No</div>',
                    width: "100%",
                    cell: {
                      encodeHtml: false,
                    },
                  },
                ],
              },

              {
                xtype: "toolbar",
                docked: "bottom",
                width: "100%",
                items: [
                  {
                    // text: "View",
                    flex: 1,
                    iconCls: "x-fa fa-eye",
                    overCls: "hover-btn",
                    style:
                      "background-color: #46f33c; border: 1px solid rgb(0, 111, 20); color: #212529;",
                    handler: function () {
                      me.mobileView(university);
                    },
                  },
                  {
                    // text: "Edit",
                    flex: 1,
                    iconCls: "x-fa fa-pencil-alt",
                    overCls: "hover-btn",

                    style:
                      "background-color: #fef357; border: 1px solid #d39e00; color: #212529;",
                    handler: function () {
                      me.mobileEdit(university);
                    },
                  },
                  {
                    // text: "Delete",
                    flex: 1,
                    iconCls: " x-fa fa-times",
                    overCls: "hover-btn",

                    style:
                      "background-color: #ef4444; border: 1px solid rgb(144, 0, 0); color: #212529;",
                    handler: function () {
                      me.mobileDelete(university);
                    },
                  },
                ],
              },
            ],
          });
        });
      } else if (this.type == "students") {
        results.forEach((university) => {
          me.add({
            xtype: "panel",
            title: university.name || "Unknown",
            //   bodyPadding: 10,
            margin: 10,
            width: "100%",
            //   padding: 10,
            layout: {
              type: "vbox",
              align: "stretch",
            },
            style: {
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 10px 5px rgba(0,0,0,0.1)",
              minHeight: "250px",
            },
            items: [
              {
                xtype: "fieldcontainer",
                layout: "hbox",
                width: "100%",
                padding: 10,
                items: [
                  {
                    xtype: "image",
                    src:
                      university?.logo ||
                      "https://placehold.co/100x100?text=No%20Image&font=roboto",
                    width: 100,
                    height: 100,
                    alt: "Applicant Logo",
                    cls: "profile-img",
                  },
                  {
                    xtype: "fieldcontainer",
                    layout: "vbox",
                    margin: "0 0 0 10px",
                    // width: "80%",
                    flex: 1,
                    items: [
                      {
                        xtype: "displayfield",
                        fieldLabel: "Gender",
                        value: university?.gender || "Unknown",
                        cls: "label-width",
                        labelWidth: 50,
                      },
                      {
                        xtype: "displayfield",
                        fieldLabel: "Status",
                        value:
                          university?.status == "Success"
                            ? '<div class="active-text">Active</div>'
                            : university?.status == "Inprogress"
                            ? '<div class="progress-text">InProgress</div>'
                            : '<div class="inactive-text">InActive</div>',
                        cell: {
                          encodeHtml: false,
                        },
                        labelWidth: 50,

                        width: "80%",
                      },
                    ],
                  },
                ],
              },
              {
                xtype: "fieldcontainer",
                layout: "vbox",
                width: "100%",
                padding: 10,

                items: [
                  {
                    xtype: "displayfield",
                    fieldLabel: "Phone Number",
                    value: university?.phone || "Unknown",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Marks",
                    value: university.marks || "N/A",
                    width: "100%",
                  },
                ],
              },

              {
                xtype: "toolbar",
                docked: "bottom",
                width: "100%",
                items: [
                  {
                    // text: "View",
                    flex: 1,
                    iconCls: "x-fa fa-eye",
                    overCls: "hover-btn",

                    style:
                      "background-color: #0eff00; border: 1px solid rgb(0, 111, 20); color: #212529;",
                    handler: function () {
                      me.mobileView(university);
                    },
                  },
                  {
                    // text: "Edit",
                    flex: 1,
                    iconCls: "x-fa fa-pencil-alt",
                    overCls: "hover-btn",

                    style:
                      "background-color: #fef357; border: 1px solid #d39e00; color: #212529;",
                    handler: function () {
                      me.mobileEdit(university);
                    },
                  },
                  {
                    // text: "Delete",
                    flex: 1,
                    iconCls: " x-fa fa-times",
                    overCls: "hover-btn",

                    style:
                      "background-color: rgb(248 58 58); border: 1px solid rgb(144, 0, 0); color: #212529;",
                    handler: function () {
                      me.mobileDelete(university);
                    },
                  },
                ],
              },
            ],
          });
        });
      } else if (this.type == "referral") {
        results.forEach((referral) => {
          me.add({
            xtype: "panel",
            title: referral.name || "Unknown",
            //   bodyPadding: 10,
            margin: 10,
            width: "100%",
            //   padding: 10,
            layout: {
              type: "vbox",
              align: "stretch",
            },
            style: {
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 10px 5px rgba(0,0,0,0.1)",
              minHeight: "250px",
            },
            items: [
              {
                xtype: "fieldcontainer",
                layout: "hbox",
                width: "100%",
                padding: 10,
                items: [
                  {
                    xtype: "fieldcontainer",
                    layout: "vbox",
                    // margin: "0 0 0 10px",
                    // width: "80%",
                    flex: 1,
                    items: [
                      {
                        xtype: "displayfield",
                        fieldLabel: "ID",
                        value: referral?.id || "Unknown",
                        cls: "label-width",
                        labelWidth: 50,
                      },
                      {
                        xtype: "displayfield",
                        fieldLabel: "Credit Status",
                        value:
                          referral?.credit_status == "Completed"
                            ? `<div class="active-text">Completed</div>`
                            : referral?.credit_status == "Inprogress"
                            ? '<div class="progress-text">InProgress</div>'
                            : '<div class="inactive-text">Rejected</div>',
                        cell: {
                          encodeHtml: false,
                        },
                        labelWidth: 50,

                        width: "100%",
                      },
                    ],
                  },
                ],
              },
              {
                xtype: "fieldcontainer",
                layout: "vbox",
                width: "100%",
                padding: 10,

                items: [
                  {
                    xtype: "displayfield",
                    fieldLabel: "Account Id",
                    value: referral?.account_id || "Unknown",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Referral Count",
                    value: referral.count || "N/A",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Credit Balance",
                    value: referral?.credit_balance || "Unknown",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Total Amount Credited",
                    value: referral.total_amount_credited || "N/A",
                    width: "100%",
                  },
                ],
              },

              {
                xtype: "toolbar",
                docked: "bottom",
                width: "100%",
                items: [
                  {
                    // text: "Edit",
                    flex: 1,
                    iconCls: "x-fa fa-pencil-alt",
                    overCls: "hover-btn",

                    style:
                      "background-color: #fef357; border: 1px solid #d39e00; color: #212529;",
                    handler: function () {
                      me.mobileEdit(referral);
                    },
                  },
                  {
                    // text: "Delete",
                    flex: 1,
                    iconCls: " x-fa fa-times",
                    overCls: "hover-btn",

                    style:
                      "background-color: rgb(248 58 58); border: 1px solid rgb(144, 0, 0); color: #212529;",
                    handler: function () {
                      me.mobileDelete(referral);
                    },
                  },
                ],
              },
            ],
          });
        });
      }
      if (snapshot.docs.length > 0) {
        const first = snapshot.docs[0];
        const last = snapshot.docs[snapshot.docs.length - 1];
        this.lastDoc = last;

        if (direction === "next") {
          this.pageStack.push(first);
        } else if (direction === "prev") {
          this.pageStack.pop();
        }

        this.down("#prevBtn").setDisabled(this.pageStack.length <= 1);
        this.down("#nextBtn").setDisabled(
          this.totalCount <= this.pageStack.length * this.pageSize
        );
      }
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  },

  // TotalCount Function
  fetchTotalCount: async function () {
    const { db, collection, getCountFromServer } = await import(
      "../../firebase/firebaseConfig"
    );
    const colRef = collection(db, this.type);
    const snapshot = await getCountFromServer(colRef);
    this.totalCount = snapshot.data().count;
  },

  // Search function
  searchData: async function (searchValue) {
    const me = this;
    const { db, collection, query, where, getDocs } = await import(
      "../../firebase/firebaseConfig"
    );

    try {
      // Create a query to filter universities by name
      const q = query(
        collection(db, this.type), //University | student
        where("name", ">=", searchValue),
        where("name", "<=", searchValue + "\uf8ff") // Ensures partial search works
      );

      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Update the displayed universities
      me.removeAll();
      if (results.length === 0) {
        // toast if no results found
        Ext.toast({
          html: "No Data Found",
          closable: false,
          align: "t",
          slideInDuration: 400,
          minWidth: 200,
          bodyCls: "bg-toastred",
        });

        me.add({
          xtype: "panel",
          html: "<p style='text-align:center; padding: 20px;'>No Data Found</p>",
          style: {
            width: "100%",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            minHeight: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        });

        return;
      }
      if (this.type == "university") {
        results.forEach((university) => {
          me.add({
            xtype: "panel",
            title: university.name || "Unknown University",
            //   bodyPadding: 10,
            margin: 10,
            width: "100%",
            //   padding: 10,
            layout: {
              type: "vbox",
              align: "stretch",
            },
            style: {
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 10px 5px rgba(0,0,0,0.1)",
              minHeight: "250px",
            },
            items: [
              {
                xtype: "fieldcontainer",
                layout: "hbox",
                width: "100%",
                padding: 10,
                items: [
                  {
                    xtype: "image",
                    src:
                      university?.logo ||
                      "https://placehold.co/100x100?text=No%20Image&font=roboto",
                    width: 100,
                    height: 100,
                    alt: "University Logo",
                    cls: "profile-img",
                  },
                  {
                    xtype: "fieldcontainer",
                    layout: "vbox",
                    margin: "0 0 0 10px",
                    // width: "80%",
                    flex: 1,
                    items: [
                      {
                        xtype: "displayfield",
                        fieldLabel: "Rank",
                        value: university?.rank || "N/A",
                        cls: "label-width",
                        labelWidth: 50,
                      },
                      {
                        xtype: "displayfield",
                        fieldLabel: "Status",
                        // value: university.status || "N/A",
                        value: university?.status
                          ? '<div class="active-text">Active</div>'
                          : '<div class="inactive-text">InActive</div>',
                        cell: {
                          encodeHtml: false,
                        },
                        labelWidth: 50,

                        width: "80%",
                      },
                    ],
                  },
                ],
              },
              {
                xtype: "fieldcontainer",
                layout: "vbox",
                width: "100%",
                padding: 10,

                items: [
                  {
                    xtype: "displayfield",
                    fieldLabel: "Location",
                    value: university?.location || "Unknown",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Seats",
                    value: university.seats_available || "N/A",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Visa Requirements",
                    value: university.visa_req
                      ? '<div class="active-text">Yes</div>'
                      : '<div class="inactive-text">No</div>',
                    width: "100%",
                    cell: {
                      encodeHtml: false,
                    },
                  },
                ],
              },

              {
                xtype: "toolbar",
                docked: "bottom",
                width: "100%",
                items: [
                  {
                    // text: "View",
                    flex: 1,
                    iconCls: "x-fa fa-eye",
                    overCls: "hover-btn",

                    style:
                      "background-color: #0eff00; border: 1px solid rgb(0, 111, 20); color: #212529;",
                    handler: function () {
                      me.mobileView(university);
                    },
                  },
                  {
                    // text: "Edit",
                    flex: 1,
                    iconCls: "x-fa fa-pencil-alt",
                    overCls: "hover-btn",

                    style:
                      "background-color: #fef357; border: 1px solid #d39e00; color: #212529;",
                    handler: function () {
                      me.mobileEdit(university);
                    },
                  },
                  {
                    // text: "Delete",
                    flex: 1,
                    iconCls: " x-fa fa-times",
                    overCls: "hover-btn",

                    style:
                      "background-color: rgb(248 58 58); border: 1px solid rgb(144, 0, 0); color: #212529;",
                    handler: function () {
                      me.mobileDelete(university);
                    },
                  },
                ],
              },
            ],
          });
        });
      } else if (this.type == "students") {
        results.forEach((university) => {
          me.add({
            xtype: "panel",
            title: university.name || "Unknown",
            //   bodyPadding: 10,
            margin: 10,
            width: "100%",
            //   padding: 10,
            layout: {
              type: "vbox",
              align: "stretch",
            },
            style: {
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 10px 5px rgba(0,0,0,0.1)",
              minHeight: "250px",
            },
            items: [
              {
                xtype: "fieldcontainer",
                layout: "hbox",
                width: "100%",
                padding: 10,
                items: [
                  {
                    xtype: "image",
                    src:
                      university?.logo ||
                      "https://placehold.co/100x100?text=No%20Image&font=roboto",
                    width: 100,
                    height: 100,
                    alt: "Applicant Logo",
                    cls: "profile-img",
                  },
                  {
                    xtype: "fieldcontainer",
                    layout: "vbox",
                    margin: "0 0 0 10px",
                    // width: "80%",
                    flex: 1,
                    items: [
                      {
                        xtype: "displayfield",
                        fieldLabel: "Gender",
                        value: university?.gender || "Unknown",
                        cls: "label-width",
                        labelWidth: 50,
                      },
                      {
                        xtype: "displayfield",
                        fieldLabel: "Status",
                        value:
                          university?.status == "Success"
                            ? '<div class="active-text">Active</div>'
                            : university?.status == "Inprogress"
                            ? '<div class="progress-text">InProgress</div>'
                            : '<div class="inactive-text">InActive</div>',
                        cell: {
                          encodeHtml: false,
                        },
                        labelWidth: 50,

                        width: "80%",
                      },
                    ],
                  },
                ],
              },
              {
                xtype: "fieldcontainer",
                layout: "vbox",
                width: "100%",
                padding: 10,

                items: [
                  {
                    xtype: "displayfield",
                    fieldLabel: "Phone Number",
                    value: university?.phone || "Unknown",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Marks",
                    value: university.marks || "N/A",
                    width: "100%",
                  },
                ],
              },

              {
                xtype: "toolbar",
                docked: "bottom",
                width: "100%",
                items: [
                  {
                    // text: "View",
                    flex: 1,
                    iconCls: "x-fa fa-eye",
                    overCls: "hover-btn",

                    style:
                      "background-color: #0eff00; border: 1px solid rgb(0, 111, 20); color: #212529;",
                    handler: function () {
                      me.mobileView(university);
                    },
                  },
                  {
                    // text: "Edit",
                    flex: 1,
                    iconCls: "x-fa fa-pencil-alt",
                    overCls: "hover-btn",

                    style:
                      "background-color: #fef357; border: 1px solid #d39e00; color: #212529;",
                    handler: function () {
                      me.mobileEdit(university);
                    },
                  },
                  {
                    // text: "Delete",
                    flex: 1,
                    iconCls: " x-fa fa-times",
                    overCls: "hover-btn",

                    style:
                      "background-color: rgb(248 58 58); border: 1px solid rgb(144, 0, 0); color: #212529;",
                    handler: function () {
                      me.mobileDelete(university);
                    },
                  },
                ],
              },
            ],
          });
        });
      } else if (this.type == "referral") {
        results.forEach((referral) => {
          me.add({
            xtype: "panel",
            title: referral.name || "Unknown",
            //   bodyPadding: 10,
            margin: 10,
            width: "100%",
            //   padding: 10,
            layout: {
              type: "vbox",
              align: "stretch",
            },
            style: {
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 10px 5px rgba(0,0,0,0.1)",
              minHeight: "250px",
            },
            items: [
              {
                xtype: "fieldcontainer",
                layout: "hbox",
                width: "100%",
                padding: 10,
                items: [
                  {
                    xtype: "fieldcontainer",
                    layout: "vbox",
                    // margin: "0 0 0 10px",
                    // width: "80%",
                    flex: 1,
                    items: [
                      {
                        xtype: "displayfield",
                        fieldLabel: "ID",
                        value: referral?.id || "Unknown",
                        cls: "label-width",
                        labelWidth: 50,
                      },
                      {
                        xtype: "displayfield",
                        fieldLabel: "Credit Status",
                        value:
                          referral?.credit_status == "Completed"
                            ? `<div class="active-text">Completed</div>`
                            : referral?.credit_status == "Inprogress"
                            ? '<div class="progress-text">InProgress</div>'
                            : '<div class="inactive-text">Rejected</div>',
                        cell: {
                          encodeHtml: false,
                        },
                        labelWidth: 50,

                        width: "100%",
                      },
                    ],
                  },
                ],
              },
              {
                xtype: "fieldcontainer",
                layout: "vbox",
                width: "100%",
                padding: 10,

                items: [
                  {
                    xtype: "displayfield",
                    fieldLabel: "Account Id",
                    value: referral?.account_id || "Unknown",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Referral Count",
                    value: referral.count || "N/A",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Credit Balance",
                    value: referral?.credit_balance || "Unknown",
                    width: "100%",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "Total Amount Credited",
                    value: referral.total_amount_credited || "N/A",
                    width: "100%",
                  },
                ],
              },

              {
                xtype: "toolbar",
                docked: "bottom",
                width: "100%",
                items: [
                  {
                    // text: "Edit",
                    flex: 1,
                    iconCls: "x-fa fa-pencil-alt",
                    overCls: "hover-btn",

                    style:
                      "background-color: #fef357; border: 1px solid #d39e00; color: #212529;",
                    handler: function () {
                      me.mobileEdit(referral);
                    },
                  },
                  {
                    // text: "Delete",
                    flex: 1,
                    iconCls: " x-fa fa-times",
                    overCls: "hover-btn",

                    style:
                      "background-color: rgb(248 58 58); border: 1px solid rgb(144, 0, 0); color: #212529;",
                    handler: function () {
                      me.mobileDelete(referral);
                    },
                  },
                ],
              },
            ],
          });
        });
      }
    } catch (error) {
      console.error("Error searching universities:", error);
    }
  },

  refreshData: function () {
    this.pageStack = [];
    this.lastDoc = null;
    this.fetchData();
  },
});
