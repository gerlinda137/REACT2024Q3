import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchShowById } from '../../api/apiHandler';
import { RootState } from '../../store';
import { unselectAll } from '../../store/checkboxSlice';
import convertToCSV from '../../utils/convertToCsv';
import './flyout.scss';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.checkboxes.selectedItems
  );

  if (selectedItems.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = async () => {
    const detailsPromises = selectedItems.map((id) => searchShowById(id));
    const details = await Promise.all(detailsPromises);
    const csvData = convertToCSV(details);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flyout">
      <p>
        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
