/*
 * Tile panel that contains header text, content and an optional edit button.
 * @author Kelsey Dedoshka
 */

var React = require('react'),
    PropTypes = React.PropTypes,
    Reflux = require('reflux'),
    BoxGraphicActions = require('BoxGraphicActions'),
    BoxGraphicStore = require('BoxGraphicStore');

/************* HELPER FUNCTIONS ******************/
function generatePortArray(type, data) {
    var portArray = [];
    var ports;

    if ( type === 'Top' ) {
        ports = data.top;
    } else if ( type === 'Bottom' ) {
        ports = data.bottom;
    }

    if ( data.style === 'alternate' ) {
        for (var i in ports) {
            if (ports.hasOwnProperty(i)) {
                var item = ports[i];
                if (item.type === 'group') {
                    for (var j=item.start; j<=item.end; j+=2) {
                        portArray.push(j);
                    }
                } else if (item.type === 'single') {
                    portArray.push(item.num);
                }
            }
        }
    }

    return portArray;
}

// Color Badge component is used for the VLAN page
// This will display VLAN membership color badges
// if the port config vlan show status is set
var ColorBadge = React.createClass({

    displayName: 'ColorBadge',

    propTypes: {
        data: PropTypes.object,
        id: PropTypes.number,
        colors: PropTypes.array,
        vlanStatus: PropTypes.array
    },

    render: function() {
        var portData;
        if (this.props.data) {
            portData = this.props.data[this.props.id];
        }

        var colors = this.props.colors;

        // only load if the graphic is passed portData
        if (portData) {
            var status = this.props.vlanStatus;
            return (
                <table className="portBadgeContainer"><tr>

                    {portData.vlans.map(function(vlan) {
                        var style = {
                            backgroundColor:
                                colors[status[vlan].colorIndex].main
                        };

                        if (status[vlan].show === true) {
                            return (
                                <td key={vlan.id}
                                className="portBadge" style={style}></td>
                            );
                        }
                    }, this)}
                </tr></table>
            );
        }

        // otherwise return null
        return ( null );
    }
});

// Port status is used for the ports page to
// display the status of the shown ports
// Only if the port show variable is true
var PortStatus = React.createClass({

    displayName: 'PortStatus',

    propTypes: {
        port: PropTypes.number,
        data: PropTypes.string
    },

    render: function() {
        if (this.props.data[this.props.port]) {
            var status = this.props.data[this.props.port][0];
            var icon;
            if (status === 'up') {
                icon = 'check';
            } else if (status === 'down') {
                icon = 'times';
            }

            return (
                <div className="portStatus icon">
                    <i className={'fa fa-' + icon}></i>
                </div>
            );

        }

        return ( null );
    }
});


//Component to generate the ports drawn on the box graphic
//Pass a port type - top or bottom to generate the
//correct type of port
var BoxPorts = React.createClass({

    displayName: 'BoxPorts',

    propTypes: {
        type: PropTypes.string,
        portConfig: PropTypes.object,
        colors: PropTypes.array,
        vlanStatus: PropTypes.array,
        portSelected: PropTypes.func
    },

    mixins: [ Reflux.connect(BoxGraphicStore, 'ports')],

    render: function() {
        var classType = 'boxPort' + this.props.type;
        var portsArray = generatePortArray(this.props.type,
            this.state.ports.data);

        return (
            <tr className={'boxPortBackground' + this.props.type}>
                {portsArray.map(function(num) {
                    var portType = ' normal';

                    var portSelectedCallBack = null;
                    if (this.props.portSelected) {
                        portSelectedCallBack =
                            this.props.portSelected.bind(null, num);
                    }

                    // For port status view - if the port is not in
                    // the port table we can assume it is an interface
                    // and style it like so
                    if (this.props.portConfig.showPortStatus &&
                        !(num in this.props.portConfig.config)) {
                        portType = ' interface';
                    }

                    return (
                        <td key={num} id={'portBox' + num}
                            className="portBoxContainer"
                            onClick={portSelectedCallBack}>
                            <div id={'portBoxInner' + num} className={classType +
                                portType}>

                               <ColorBadge data={this.props.portConfig}
                                            id={num}
                                            colors={this.props.colors}
                                            vlanStatus={this.props.vlanStatus}/>

                                {this.props.portConfig.showPortStatus ?
                                    <PortStatus data={this.props.portConfig.config}
                                        port={num}/>
                                    : null}
                            </div>
                        </td>
                    );
                }, this)}
           </tr>
        );
    }
});

// Component to draw the middle section of the box graphic
// Use middlePorts parameter from the config store
var BoxMiddle = React.createClass({

    displayName: 'BoxMiddle',

    mixins: [ Reflux.connect(BoxGraphicStore, 'ports') ],

    render: function() {
        var middleArray = [];
        for (var i=0; i<=this.state.ports.data.middlePorts; i++) {
            middleArray.push(i);
        }

        return (
            <tr className='boxPortBackgroundMiddle'>
                {middleArray.map(function(index) {
                    return (
                        <td key={index}>
                            <div className="boxMiddle">
                                <div className="boxBlack boxBlackTop"></div>
                                <div className="arrowBlack boxArrowUp"></div>
                                <div className="arrowBlack boxArrowDown"></div>
                                <div className="boxBlack boxBlackBottom"></div>
                            </div>
                        </td>
                    );
                }, this)}
            </tr>
        );
    }
});

// Component to draw the port labels on the graphic
var BoxPortLabels = React.createClass({

    displayName: 'BoxPortLabels',

    mixins: [ Reflux.connect(BoxGraphicStore, 'ports') ],

    render: function() {

        //generate port list for both top and bottom ports
        var portNumsTop = generatePortArray('Top', this.state.ports.data);
        var portNumsBottom = generatePortArray('Bottom', this.state.ports.data);
        var tableRows = [];

        for (var i=0; i<portNumsTop.length; i++) {
            tableRows.push(
                <td key={i}>
                    <div className="boxLabels">
                        <div className="boxNumLabels boxTopLabels">
                            {portNumsTop[i]}
                        </div>
                        <div className="arrowWhite boxArrowUpLabel"></div>
                        <div className="arrowWhite boxArrowDownLabel"></div>
                        <div className="boxNumLabels boxBottomLabels">
                            {portNumsBottom[i]}
                        </div>
                    </div>
                </td>
            );
        }

        return (
            <tr>
                {tableRows}
            </tr>
        );
    }
});


//Main box graphic component
module.exports = React.createClass({

    displayName: 'BoxGraphic',

    propTypes: {
        portConfig: PropTypes.object,
        colors: PropTypes.array,
        vlanStatus: PropTypes.array,
        selectedVlan: PropTypes.number,
        portSelected: PropTypes.func
    },

    componentDidMount: function() {
        BoxGraphicActions.loadBoxGraphic();
    },

    render: function() {
        return (
            <div className="boxContainer">
                <table className="innerBoxTable">
                    <BoxPorts type={"Top"}
                        portConfig={this.props.portConfig}
                        colors={this.props.colors}
                        selectedVlan={this.props.selectedVlan}
                        portSelected={this.props.portSelected}
                        vlanStatus={this.props.vlanStatus}/>
                    <BoxMiddle/>
                    <BoxPorts type={"Bottom"}
                        portConfig={this.props.portConfig}
                        colors={this.props.colors}
                        selectedVlan={this.props.selectedVlan}
                        portSelected={this.props.portSelected}
                        vlanStatus={this.props.vlanStatus}/>
                    <BoxPortLabels/>
                </table>
            </div>
        );
    }

});