import Filterizr from '../Filterizr';

/**
 * Vertical layout algorithm that arranges all FilterItems in one column. Their height may vary.
 * @param {Object} Filterizr instance.
 * @return {Object[]} positions for the items to assume.
 */
const VerticalLayout = (Filterizr: Filterizr) => {
  const { filterContainer, filteredItems } = Filterizr.props;

  // In this layout top in the end will also
  // be the total height of the FilterContainer
  let top = 0;

  const targetPositions = filteredItems.map(FilterItem => {
    const { h } = FilterItem.props;
    const pos = {
      left: 0,
      top: top,
    };

    top += h;

    return pos;
  });

  // Update the height of the FilterContainer
  filterContainer.updateHeight(top);

  return targetPositions;
};

export default VerticalLayout;