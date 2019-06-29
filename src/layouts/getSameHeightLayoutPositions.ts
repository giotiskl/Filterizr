import Filterizr from '../Filterizr';

/**
 * Same height layout for items that have the same height, but can have varying width
 * @param {object} Filterizr instance.
 */
const getSameHeightLayoutPositions = (Filterizr: Filterizr) => {
  const { filterContainer, filteredItems } = Filterizr.props;
  const gridWidth = filterContainer.props.w,
    itemHeight = filteredItems[0].props.h;
  let row = 0,
    left = 0;

  // calculate array of positions
  const targetPositions = filteredItems.map(FilterItem => {
    const w = FilterItem.props.w;
    // in case the item exceeds the grid then move to next row and reset left
    if (left + w > gridWidth) {
      row++;
      left = 0;
    }

    const targetPosition = {
      left: left,
      top: itemHeight * row,
    };

    left += w;

    return targetPosition;
  });

  // update the height of the FilterContainer
  filterContainer.updateHeight((row + 1) * filteredItems[0].props.h);
  // return the array of new positions
  return targetPositions;
};

export default getSameHeightLayoutPositions;