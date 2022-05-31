import React from 'react';

export const Icon = React.forwardRef<
  HTMLSpanElement,
  { name: string } & React.HTMLProps<HTMLSpanElement>
>(({ name, ...rest }, ref) => (
  <span ref={ref} className='material-symbols-outlined' {...rest}>
    {name}
  </span>
));
