import { useState, useEffect } from 'react';
import useEventCallback from '../utils/useEventCallback';

export default function (props) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartValue, setDragStartValue] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [uncontrolledValue, setUncontrolledValue] = useState(props.defaultValue || 0);

  const isUncontrolled = props.value === undefined;
  const value = isUncontrolled ? uncontrolledValue : props.value;

  const handleDoubleClick = () => {
    const newValue = props.defaultValue || 0;
    if (isUncontrolled) {
      setUncontrolledValue(newValue);
    }
    if (props.onChange) {
      props.onChange(newValue);
    }
  }

  const handleMouseDown = (event) => {
    document.body.style.cursor = 'none';
    setIsDragging(true);
    setDragStartValue(value);
    setDragStartY(event.pageY);
  };

  const handleMouseUp = useEventCallback(() => {
    document.body.style.cursor = 'default';
    setIsDragging(false);
  });

  const handleMouseMove = useEventCallback((event) => {
    if (isDragging) {
      const pivot = dragStartValue * 60;
      const pad = 60 - pivot;
      const newValue = (pivot + Math.max(-pivot, Math.min(pad, dragStartY - event.pageY))) / 60;
      if (isUncontrolled) {
        setUncontrolledValue(newValue);
      }
      if (props.onChange) {
        props.onChange(newValue);
      }
    }
  });

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  return { value, handleDoubleClick, handleMouseDown };
};
