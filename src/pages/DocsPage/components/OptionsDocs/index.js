import React from 'react';
import Highlight from 'react-highlight';
import { Header } from 'semantic-ui-react';
import ObjectDocs from '../ObjectDocs';
import options from '../../api-json/objects/options.json';

const snippet1 = `//Default options
const options = {
  animationDuration: 0.5,
  callbacks: {
    onInit: function() { },
    onFilteringStart: function() { },
    onFilteringEnd: function() { },
    onShufflingStart: function() { },
    onShufflingEnd: function() { },
    onSortingStart: function() { },
    onSortingEnd: function() { }
  },
  controlsSelector: '',
  delay: 0,
  delayMode: 'progressive',
  easing: 'ease-out',
  filter: 'all',
  filterOutCss: {
    opacity: 0,
    transform: 'scale(0.5)'
  },
  filterInCss: {
    opacity: 0,
    transform: 'scale(1)'
  },
  gridItemsSelector: '.filtr-item',
  gutterPixels: 0,
  layout: 'sameSize',
  multifilterLogicalOperator: 'or',
  searchTerm: '',
  setupControls: true,
  spinner: {
    enabled: false,
    fillColor: '#2184D0',
    styles: {
      height: '75px',
      margin: '0 auto',
      width: '75px',
      'z-index': 2,
    },
  },
}`;

const OptionsDocs = () => (
  <>
    <Header as="h3">Preview</Header>
    <Highlight className="javascript">{snippet1}</Highlight>
    <ObjectDocs jsonDefinition={options.fields} />
  </>
);

export default OptionsDocs;