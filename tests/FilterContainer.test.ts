// import test utils
import * as $ from 'jquery';
import { fakeDom } from './testSetup';
// import items to be tested
import Filterizr from '../src/Filterizr';
import FilterContainer from '../src/FilterContainer';
import FilterItem from '../src/FilterItem';
import FilterizrOptions from '../src/FilterizrOptions/FilterizrOptions';

// General setup
(<any>window).$ = $;

/**
 * Test suite for FilterContainer
 */
describe('FilterContainer', () => {
  // Basic setup before all tests
  let filterizr: Filterizr;
  let filterContainer: FilterContainer;

  beforeEach(() => {
    $('body').html(fakeDom);
    filterizr = new Filterizr('.filtr-container', {});
    filterContainer = new FilterContainer(
      document.querySelector('.filtr-container'),
      filterizr.options
    );
  });

  describe('#constructor', () => {
    it('should return a new instance of the FilterContainer class', () => {
      expect(filterContainer instanceof FilterContainer).toBe(true);
    });
  });

  describe('#destroy', () => {
    beforeEach(() => {
      filterizr.filter('1');
    });

    it('should reset all inline styles on the .filtr-container', () => {
      const oldInlineStyles = filterContainer.node.getAttribute('style');
      filterContainer.destroy();
      const newInlineStyles = filterContainer.node.getAttribute('style');

      expect(oldInlineStyles).toBeTruthy();
      expect(newInlineStyles).toEqual(null);
    });

    it('should reset all inline styles on its .filtr-item children', () => {
      const filterItem = filterContainer.node.querySelector('.filtr-item');
      const oldInlineStyles = filterItem.getAttribute('style');
      filterContainer.destroy();
      const newInlineStyles = filterItem.getAttribute('style');

      expect(oldInlineStyles).toBeTruthy();
      expect(newInlineStyles).toEqual(null);
    });
  });

  describe('#push', () => {
    let cloned: Node;

    beforeEach(() => {
      const nodes = filterContainer.node.querySelectorAll('.filtr-item');
      cloned = nodes[nodes.length - 1].cloneNode();
    });

    it('should increase the length of the FilterItems array by 1', () => {
      const oldLength = filterContainer.props.filterItems.length;
      filterContainer.push(<Element>cloned, filterizr.options);
      const newLength = filterContainer.props.filterItems.length;
      expect(newLength).toBeGreaterThan(oldLength);
    });

    it('should set the index property of the newly added FilterItem in the array to array.length', () => {
      const oldLength = filterContainer.props.filterItems.length;
      filterContainer.push(<Element>cloned, filterizr.options);
      const newlyAddedFilterItem = filterContainer.props.filterItems[oldLength];
      expect(newlyAddedFilterItem.props.index).toEqual(oldLength);
    });
  });

  describe('#getFilterItems', () => {
    it('should return an array of FilterItems with length equal to the .filtr-item elements of the DOM', () => {
      expect(filterContainer.getFilterItems(filterizr.options).length).toEqual(
        $('.filtr-item').length
      );
    });
    it('should find and return all .filtr-item elements as FilterItem instances', () => {
      filterContainer.props.filterItems.forEach(filterItem => {
        expect(filterItem instanceof FilterItem).toBe(true);
      });
    });
  });

  describe('#calcColumns', () => {
    it('should return the number of columns that can fit in the FilterContainer', () => {
      // make necessary set up to get 4 columns
      const containerWidth = 1000;
      filterContainer.props.w = containerWidth;
      filterContainer.props.filterItems[0].props.w = containerWidth / 4;
      expect(filterContainer.calcColumns()).toEqual(4);
    });
  });

  describe('#getWidth', () => {
    it('should return the .innerWidth() of the FilterContainer jQuery node', () => {
      expect(filterContainer.getWidth()).toEqual(
        filterContainer.node.clientWidth
      );
    });
  });
});