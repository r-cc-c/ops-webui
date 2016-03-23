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

export const LOCALE = 'en-US';

export const NAVS = {
  bgp: 'BGP',
  demo: 'Demo',
  ecmp: 'ECMP',
  general: 'General',
  interface: 'Interfaces',
  log: 'Log',
  lag: 'LAG',
  overview: 'Overview',
  syslog: 'Syslog',
  vlan: 'VLANs',
};

export const MESSAGES = {
  accessVlanId: 'Access (tag) VLAN ID',
  add: 'Add',
  addVlan: 'Add VLAN',
  adminState: 'Admin State',
  aggregateName: 'Aggregate Name',
  aggregatedInterfaces: 'Aggregated Interfaces',
  aggregationKey: 'Aggregation Key',
  aggregateMode: 'Aggregate Mode',
  aggregationMode: 'Aggregation Mode',
  alert: 'Alert',
  all: 'All',
  apply: 'Apply',
  areYouSure: 'Are you sure?',
  available: 'Available',
  autoNeg: 'Auto Negotiation',
  backToFront: 'Back-to-Front',
  baseMac: 'Base MAC',
  bondStatus: 'Bond Status',
  capsEnabled: 'Caps Enabled',
  capsSupported: 'Caps Supported',
  chassisId: 'Chassis ID',
  chassisName: 'Chassis Name',
  configMgmtInterface: 'How To - Configure the management interface...',
  configVlan: 'How To - Configure a VLAN...',
  confirmation: 'Confirmation',
  connector: 'Connector',
  cpuLoad: 'CPU Load',
  critical: 'Critical',
  currentVlans: 'Current VLANs',
  date: 'Date',
  dataPoints: 'data points',
  debug: 'Debug',
  degreesCelsius: 'C',
  deploy: 'Deploy',
  direction: 'Direction',
  disabled: 'Disabled',
  down: 'Down',
  downAbsent: 'Down (absent)',
  dstIp: 'Destination IP',
  dstPort: 'Destination Port',
  duplex: 'Duplex',
  ecmp: 'ECMP',
  edit: 'Edit',
  emerg: 'Emerg',
  enabled: 'Enabled',
  error: 'Error',
  frontToBack: 'Front-to-Back',
  facility: 'Facility',
  failedRequest: 'Failed Request',
  fallBack: 'FallBack',
  false: 'False',
  fans: 'Fans',
  fanFault: 'Fault',
  fanUninitialized: 'Uninitialized',
  features: 'Features',
  flowControl: 'Flow Control',
  framesRx: 'Frames Rx',
  framesRxDiscarded: 'Frames Rx Discard',
  framesRxUnrecog: 'Frames Rx Unrecog',
  framesTx: 'Frames Tx',
  full: 'Full',
  guides: 'Quick Guides',
  half: 'Half',
  hardware: 'Hardware',
  hostname: 'Hostname',
  id: 'ID',
  identifier: 'Identifier',
  information: 'Information',
  interface: 'Interface',
  interfaces: 'Interfaces',
  interfaceUtiization: 'Interface Utilization',
  invalid: 'Invalid',
  topInterfaceUtilization: 'Top Interface Utilization',
  ip: 'IP',
  ipV4: 'IPv4',
  ipV6: 'IPv6',
  isFetching: 'Is Fetching',
  lag: 'LAG',
  lastHour: 'Last Hour',
  last24hrs: 'Last 24 Hours',
  last7days: 'Last 7 Days',
  lastError: 'Last Error',
  lastUpdate: 'Last Update',
  linkState: 'Link State',
  links: 'Links',
  lldp: 'LLDP',
  lldpNeighborInfo: 'LLDP Neighbor Info',
  lldpPortStats: 'LLDP Port Stats',
  loading: 'Loading...',
  loadBalance: 'Load Balancing By',
  location: 'Location',
  log: 'Log',
  logout: 'Logout',
  mac: 'MAC',
  maxInterfaceSpeed: 'Max Interface Speed',
  memory: 'Memory',
  message: 'Message',
  model: 'Model',
  mtu: 'MTU',
  name: 'Name',
  new: 'New',
  none: 'None',
  notice: 'Notice',
  notConfigured: 'Not Configured',
  noTopInterfaces: 'Currently no traffic data available...',
  off: 'Off',
  ok: 'OK',
  on: 'On',
  onieVersion: 'ONIE Version',
  openSwitch: 'OpenSwitch',
  osApi: 'OpenSwitch API',
  osNet: 'OpenSwitch.Net',
  partNumber: 'Part #',
  portId: 'Port ID',
  powerSupplies: 'Power Supplies',
  powerFaultInput: 'Input Fault',
  powerFaultOutput: 'Output Fault',
  powerAbsent: 'Absent',
  product: 'Product',
  productName: 'Product Name',
  quickGuide: 'Quick Guide',
  readAll: 'Read All',
  reason: 'Reason',
  resilientHash: 'Resilience Hashing',
  rpm: 'RPMs',
  rx: 'Rx',
  rxPackets: 'Rx Packets',
  rxBytes: 'Rx Bytes',
  rxErrors: 'Rx Errors',
  rxDropped: 'Rx Dropped',
  rxtx: 'Rx and Tx',
  search: 'Search',
  serialNumber: 'Serial #',
  severity: 'Severity',
  speed: 'Speed',
  srcIp: 'Source IP',
  srcPort: 'Source Port',
  state: 'State',
  status: 'Status',
  storage: 'Storage',
  sysDesc: 'System Desc',
  system: 'System',
  systemMac: 'System MAC',
  tag: 'Tag',
  temperatures: 'Temperatures',
  text: 'Text',
  time: 'Time',
  totalVlans: 'Total VLANs',
  totalInterfaces: 'Total Interfaces',
  true: 'True',
  trunks: 'Trunks',
  tx: 'Tx',
  txPackets: 'Tx Packets',
  txBytes: 'Tx Bytes',
  txErrors: 'Tx Errors',
  txDropped: 'Tx Dropped',
  txRx: 'Tx+Rx',
  up: 'Up',
  url: 'URL',
  user: 'User',
  userCfgAdmin: 'Configured',
  utilization: 'Utilization',
  vendor: 'Vendor',
  vlanMode: 'VLAN Mode',
  vlans: 'VLANs',
  vlan: 'VLAN',
  vlanId: 'VLAN ID',
  vlanName: 'VLAN Name',
  vlanIdsAvailable: 'VLAN IDs Available',
  version: 'Version',
  warning: 'Warning',
  yes: 'Yes'
};
