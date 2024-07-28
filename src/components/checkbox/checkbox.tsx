import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleItem } from '../../store/checkboxSlice';
import './checkbox.scss';

interface CheckboxProps {
  id: string;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label }) => {
  const dispatch = useDispatch();
  const isChecked = useSelector((state: RootState) =>
    state.checkboxes.selectedItems.includes(id)
  );

  const handleCheckboxChange = () => {
    dispatch(toggleItem(id));
  };

  return (
    <label className="checkbox-container">
      {label}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
