import React, { FC, useRef, useEffect } from 'react';

type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type TouchEvents = 'touchstart' | 'touchend';
type Events = MouseEvent | TouchEvent;

type ClickAwayListenerProps = {
  as?: string;
  mouseEvent?: MouseEvents;
  touchEvent?: TouchEvents;
  onClickAway: (event: Events) => void;
};

export const ClickAwayListener: FC<ClickAwayListenerProps> = function ({
  as = 'div',
  onClickAway,
  mouseEvent = 'click',
  touchEvent = 'touchend',
  ...props
}) {
  const node = useRef<HTMLElement>(null);
  const bubbledEvent = useRef<Events | null>(null);

  const handleBubbledEvent = (e: Events | null) => {
    bubbledEvent.current = e;
  };

  useEffect(() => {
    function handleEvent(event: Events) {
      if (
        (node.current && node.current.contains(event.target as Node)) ||
        (bubbledEvent.current && bubbledEvent.current.target === event.target)
      ) {
        return;
      }

      onClickAway(event);
    }

    document.addEventListener(mouseEvent, handleEvent);
    document.addEventListener(touchEvent, handleEvent);

    return () => {
      document.removeEventListener(mouseEvent, handleEvent);
      document.removeEventListener(touchEvent, handleEvent);
    };
  }, []);

  return React.createElement(as, {
    ref: node,
    onClick: handleBubbledEvent,
    onTouchEnd: handleBubbledEvent,
    ...props,
  });
};
