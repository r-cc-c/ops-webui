/*
 * The store for the system monitor view.
 * @author Frank Wood
 */

var Reflux = require('reflux'),
    SystemStatsActions = require('SystemStatsActions');

var DATA_SIZE = 25;

function mkDataEntry() {
    return { max: 0, data: [] };
}

function mkTempEntry() {
    return { max: 0, min: 0, name: '', data: [] };
}

function pushTrim(arr, elm) {
    arr.push(elm);
    if (arr.length > DATA_SIZE) {
        arr.shift();
    }
}

module.exports = Reflux.createStore({

    listenables: [ SystemStatsActions ],

    state: {
        dates: [],
        cpu: mkDataEntry(),
        memory: mkDataEntry(),
        temps: []
    },

    getInitialState: function() {
        return this.state;
    },

    onLoadCompleted: function(stats) {
        var s = this.state,
            i, t;

        // optimization here - if there was a change in the temperature
        // hardware we throw out all the data because the timestamps are
        // global to all arrays

        if (s.temps.length !== stats.temps.length) {
            s.ts = [];
            s.cpu = mkDataEntry();
            s.mem = mkDataEntry();
            s.temps = [];
            for (i=0; i<stats.temps.length; i++) {
                s.temps.push(mkTempEntry());
            }
        }

        pushTrim(s.dates, stats.date);

        s.cpu.max = stats.cpuMax;
        pushTrim(s.cpu.data, stats.cpuVal);

        s.memory.max = stats.memMax;
        pushTrim(s.memory.data, stats.memVal);

        for (i=0; i<s.temps.length; i++) {
            t = stats.temps[i];
            s.temps[i].max = t.max;
            s.temps[i].min = t.min;
            s.temps[i].name = t.name;
            pushTrim(s.temps[i].data, t.val);
        }

        this.trigger(this.state);
    }

});
