/*
 * Port monitor view.
 * @author Kelsey Dedoshka
 */

var React = require('react'),
    Reflux = require('reflux'),
    PropTypes = React.PropTypes,
    ActionIcon = require('ActionIcon'),
    ViewBoxHeader = require('ViewBoxHeader'),
    GMeter = require('grommet/components/Meter'),
    GMenu = require('grommet/components/Menu'),
    GDropCaret = require('grommet/components/icons/DropCaret'),
    I18n = require('i18n'),
    PortsMonitorActions = require('PortsMonitorActions'),
    PortsMonitorStore = require('PortsMonitorStore'),
    Chart = require('chart.js/Chart'),
    INTERVAL = 5000;


//Creates the canvas componenet for the utilization chart
//and sets the canvas context in the store
var ChartInstance = React.createClass({

    displayName: 'ChartInstance',

    mixins: [ Reflux.connect(PortsMonitorStore, 'data') ],

    componentDidMount: function() {

        var data = this.state.data;

        //initialize the canvas context
        var graphData = {
            'labels': [],
            'datasets': [
                data.dataSets.rxData.graphData,
                data.dataSets.txData.graphData,
                data.dataSets.errorData.graphData,
                data.dataSets.droppedData.graphData
            ]
        };

        var ctx = document.getElementById('portStatsChart').getContext('2d');
        var portChart = new Chart(ctx).Line(graphData, this.state.data.options);

        //set the context to 'chart' in the store
        PortsMonitorActions.setChartContext(portChart);
    },

    // stop the interval and reset graph when component unmounts
    componentWillUnmount: function() {
        PortsMonitorActions.resetGraph();
    },

    // start retreiving port stats
    getPortData: function(port) {
        PortsMonitorActions.loadPortStats(port);
    },

    render: function() {
        return (
            <div id="canvasWrapper">
                <canvas id="portStatsChart" height="350"></canvas>
            </div>
        );
    }
});


/*var BarChartInstance = React.createClass({

    displayName: 'BarChartInstance',

    mixins: [ Reflux.connect(PortsMonitorStore, 'data') ],

    componentDidMount: function() {

        var data = this.state.data;

        //initialize the canvas context
        var graphData = {
            'labels': [],
            'datasets': [
                data.dataSets.rxData.graphData,
                data.dataSets.txData.graphData,
                data.dataSets.errorData.graphData,
                data.dataSets.droppedData.graphData
            ]
        };

        var barCtx = document.getElementById('barStatsChart').getContext('2d');
        var barChart = new Chart(barCtx).Bar(graphData, this.state.data.barOptions);
        //set the context to 'chart' in the store
        PortsMonitorActions.setBarChartContext(barChart);

    },

    componentDidUnmount: function() {
        PortsMonitorActions.resetGraph();
    },

    // start retreiving port stats
    getPortData: function(port) {
        PortsMonitorActions.loadPortStats(port);
    },

    render: function() {
        return (
            <canvas id="barStatsChart" height="150"></canvas>
        );
    }
});*/

//Component to create a key and toggle button for each data line
//on the utillization chart
var GraphToggleButton = React.createClass({

    displayName: 'GraphToggleButton',

    propTypes: {
        color: PropTypes.string,
        text: PropTypes.string,
        click: PropTypes.func,
        index: PropTypes.number,
        show: PropTypes.bool
    },

    render: function() {

        //determing the icon color
        var classes = null;
        if (this.props.show) {
            classes = 'color' + this.props.index;
        }

        return (
            <span className="graphToggleWrapper">
                <ActionIcon fa="area-chart"
                    onClick={this.props.click}
                    color={this.props.color}
                    className={classes}/>
                <span className="toggleText">{this.props.text}</span>
            </span>
        );
    }
});

//Component to create a details tile panel displayed below the
//utilization graph. This includes: utilization average, and
//a breakdown between high, low and medium utilization
var PortDetails = React.createClass({

    displayName: 'PortDetails',

    propTypes: {
        color: PropTypes.string,
        data: PropTypes.object
    },

    render: function() {
        var color = { color: this.props.color },
            data = this.props.data;

        return (
            <div className="innerContainer">
                <table className="portDetails">
                    <tr>
                        <td className="average">
                            <div className="title">Average</div>
                            <div className="details"
                                style={color}>
                                    {data.stats.average + '%'}
                            </div>
                        </td>
                        <td>
                            <GMeter type='circle'
                                legend={true}
                                series={[
                                    { 'label': 'Low',
                                        'value': data.stats.low,
                                        'colorIndex': 'ok' },
                                    { 'label': 'Med',
                                        'value': data.stats.med,
                                        'colorIndex': 'warning' },
                                    { 'label': 'High',
                                        'value': data.stats.high,
                                        'colorIndex': 'error' }
                                ]} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
});

module.exports = React.createClass({

    displayName: 'PortsMonitorView',

    //set data as reference to the ports store state data
    mixins: [ Reflux.connect(PortsMonitorStore, 'data') ],

    componentDidMount: function() {
        //load the list of ports to populate the port list
        //dropdown menu
        PortsMonitorActions.loadPorts();
        this.startInterval(this.state.data.selectedPort);
    },

    //toggle the state of the graph being displayed on
    //the chart
    toggleGraph: function(key) {
        PortsMonitorActions.toggleGraphDisplay(key);
    },

    //show the status of the selected graph - WORK IN PROGRESS
    showGraphStatus: function(name) {
        PortsMonitorActions.setActiveDetails(name);
        PortsMonitorActions.showStatus(name);
    },

    //handler for selected a port in the dropdown menu
    portSelected: function(port) {
        PortsMonitorActions.setPortSelected(port);
        this.startInterval(port);
    },

    //handler to get the port utilization data
    getPortData: function(port) {
        PortsMonitorActions.loadPortStats(port);
    },

    playGraph: function() {
        PortsMonitorActions.setPausePlayHandler('play', false);
        PortsMonitorActions.setPausePlayHandler('pause', true);
        this.startInterval(this.state.data.selectedPort);
    },

    pauseGraph: function() {
        PortsMonitorActions.setPausePlayHandler('play', true);
        PortsMonitorActions.setPausePlayHandler('pause', false);
        clearInterval(this.state.data.interval);
    },

    startInterval(port) {
        var interval = setInterval(this.getPortData.bind(this, port),
            INTERVAL);
        PortsMonitorActions.setInterval(interval);
    },

    render: function() {
        var t = I18n.text,
            toggleToolbar = {},
            detailsPanels = [];

        //append the port selection dropdown to the tile toolbar
        toggleToolbar.select = (
            <GMenu icon={<GDropCaret/>} label='Select Port'>
                {this.state.data.portList.map(function(port) {
                    return (
                        <div className="portSelectionItem"
                            onClick={this.portSelected.bind(this, port)}>
                                {port}
                        </div>
                    );
                }, this)}
            </GMenu>
        );


        //append pause and play buttons to the tile toolbar
        var pause = this.state.data.pauseHandler ? this.pauseGraph : null;
        var play = this.state.data.playHandler ? this.playGraph : null;

        toggleToolbar.play = (<ActionIcon fa='play'
            onClick={play}
            className="smallIcon" />);
        toggleToolbar.pause = (<ActionIcon fa='pause'
            onClick={pause}
            className="smallIcon iconBorder right"/>);

        for (var i in this.state.data.dataSets) {
            if (this.state.data.dataSets.hasOwnProperty(i)) {
                var data = this.state.data.dataSets[i];
                var color = this.state.data.colors[data.options.colorIndex].stroke;

                //append the graph key and toggle buttons to the
                //tile toolbar
                toggleToolbar[i] = (<GraphToggleButton
                    color = {this.state.data.colors[data.options.colorIndex].stroke}
                    text = {data.title}
                    click = {this.toggleGraph.bind(this, i)}
                    index = {data.options.colorIndex}
                    show = {data.options.show} />);

                //create the status toolbar for the port details
                //tiles
                /*var statusToolbar = {
                    edit: <ActionIcon fa='bar-chart'
                        onClick={this.showGraphStatus.bind(this, i)}/>
                };*/

                //create the row of details tiles based on the
                //datsets in the store
                detailsPanels.push(
                    <div className="viewBox viewFlex1">
                        <ViewBoxHeader title={data.title} />
                        <PortDetails color={color} data={data}/>
                    </div>
                );
            }
        }

        return (
            <div className="viewFill viewCol">
                <div id="portStatsGraphTile" className="viewBox viewFlex0">
                    <ViewBoxHeader title={t('views.portMonitor.portUtil') +
                        this.state.data.selectedPort}
                        toolbar= {toggleToolbar}/>
                    <ChartInstance />
                </div>
                <div className="viewRow viewFlex0">
                    {detailsPanels}
                </div>
            </div>
        );
    }
});