/*
 (C) Copyright 2015 Hewlett Packard Enterprise Development LP

    Licensed under the Apache License, Version 2.0 (the "License"); you may
    not use this file except in compliance with the License. You may obtain
    a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations
    under the License.
*/

/*
 * Properties table that shows property names and values.
 */

var React = require('react'),
    PropTypes = React.PropTypes,
    ClassNames = require('classnames');

module.exports = React.createClass({

    displayName: 'PropTable',

    propTypes: {
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.array).isRequired
    },

    render: function() {
        var cls = ClassNames(
            'propTable',
            this.props.className
        );

        return (
            <table className={cls}>
                <tbody>
                    {this.props.data.map(function(row) {
                        var name = row[0];
                        name = typeof name === 'string' && name.length > 0 ?
                                name + ':' : '';
                        return (
                            <tr key={name}>
                                <td>{name}</td><td>{row[1]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

});