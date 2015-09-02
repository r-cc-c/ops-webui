/*
 * General store for interface statistics.
 * @author Frank Wood
 */

var Reflux = require('reflux'),
    InterfaceActions = require('InterfaceActions'),
    Lodash = require('lodash'),
    Calc = require('calculations');

module.exports = Reflux.createStore({

    listenables: [ InterfaceActions ],

    state: {
        timestampMillis: 0,
        interfaces: {},
        topUtilization: [],
    },

    getInitialState: function() {
        return this.state;
    },

    processInterfaces: function(interfaces) {
        var currTsMillis = new Date().getTime(),
            interMs = currTsMillis - this.state.timestampMillis,
            i, ci, pi,
            topUtls = [],
            ciMap = {};

        if (interMs === 0) {
            return; // can't determine rate 0 milliseconds between updates
        }

        // create a new array of 'up' interfaces, calculating utilization
        for (i=0; i<interfaces.length; i++) {

            if (interfaces[i].link !== 'up') {
                continue;
            }

            ci = Lodash.cloneDeep(interfaces[i]); // keep immutable
            ciMap[ci.name] = ci;

            pi = this.state.interfaces[ci.name];

            if (!pi || pi.duplex !== ci.duplex || pi.speed !== ci.speed) {
                continue;
            }

            if (ci.duplex === 'full') {
                ci.rxUtl = Calc.calcUtil(
                    pi.rxBytes, ci.rxBytes, ci.speed, interMs
                );
                topUtls.push({ utl: ci.rxUtl, dir: 'rx', ci: ci });

                ci.txUtl = Calc.calcUtil(
                    pi.txBytes, ci.txBytes, ci.speed, interMs
                );
                topUtls.push({ utl: ci.txUtl, dir: 'tx', ci: ci });

            } else if (ci.duplex === 'half') {

                ci.txUtl = ci.rxUtl = Calc.calcUtil(
                    pi.txBytes + pi.rxBytes,
                    ci.txBytes + ci.rxBytes,
                    ci.speed,
                    interMs);
                topUtls.push({ utl: ci.txUtl, dir: 'txRx', ci: ci });
            }

        };

        topUtls = topUtls.sort(function(top1, top2) {
            return top2.utl - top1.utl;
        });

        this.state.timestampMillis = currTsMillis;
        this.state.topUtilization = topUtls.slice(0, 5);
        this.state.interfaces = ciMap;
    },

    onLoadCompleted: function(interfaces) {
        this.processInterfaces(interfaces);
        this.trigger(this.state);
    }

});
