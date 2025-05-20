Ext.define('app.custom.ActiveAdminController', {
    extend: "Ext.app.ViewController",
    alias: "controller.active-grid-ctrl",

    runner: null,
    timerCounter: 0,
    refreshInterval: 60,
    initTimer: function (refreshInterval,init) {
        let me=this;
        let timerButton = me.getView().down('toolbar').getComponent('timerButton');

        if (init) {
            me.runner = new Ext.util.TaskRunner();
        }
        me.refreshInterval=refreshInterval;
        me.runner.start({
            run: function () {
                timerButton.setText("Refresh in "+(refreshInterval-me.timerCounter));
                me.timerCounter++;
                if (me.timerCounter>refreshInterval) {
                    me.getView().getStore().load();
                    me.timerCounter=0;
                }
            },
            interval: 1000
        });

    },
    // startStopTimer: function () {
    //     let me=this;
    //     let timerButton = me.getView().down('toolbar').getComponent('timerButton');

    //     if (me.runner.timerId!==null) {
    //         me.runner.stopAll();
    //         timerButton.setText("Refresh Paused");
    //     } else {
    //         me.timerCounter=0;
    //         me.getView().getStore().load();
    //         me.initTimer(me.refreshInterval,false)
    //     }

    // },
})