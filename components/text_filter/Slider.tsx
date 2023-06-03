import { useEffect, useState } from 'react'
import * as RadixSlider from '@radix-ui/react-slider'
import { createStitches } from '@stitches/react'
import { Filter } from '../../pages/text_filter/index'

import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from '@radix-ui/colors'
import React from 'react'

const { styled, createTheme } = createStitches({
  theme: {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
    },
  },
})

const darkTheme = createTheme({
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
})

const Root = styled(RadixSlider.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '300px',
  height: '80px',
})

const Track = styled(RadixSlider.Track, {
  backgroundColor: '$transparent',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '8px',
  border: '2px solid',
  borderColor: '$gray5',
  height: '40px',
  overflow: 'hidden',
})

const Range = styled(RadixSlider.Range, {
  position: 'absolute',
  backgroundColor: '$gray6',
  borderRadius: '0',
  height: '100%',
})

const Thumb = styled(RadixSlider.Thumb, {
  display: 'block',
  width: '20px',
  height: '20px',
  backgroundColor: 'transparent',
  boxShadow: '0 2px 10px $gray2',
  borderRadius: '10px',
  cursor: 'ew-resize',
  // '&:hover': {
  //   backgroundColor: '$gray6',
  // },
  '&:focus': {
    outline: 'none',
    // boxShadow: '0 0 0 5px $gray2',
  },
})

const Desc = styled('div', {
  color: '$gray5',
  '&.active': {
    color: '$gray9'
  }
})


export const Slider = React.forwardRef((props: {
  filter: Filter,
  index: number,
  defaultVal: number,
  changed: boolean,
  onChange: (e: number, i: number) => void },
  forwardedRef
) => {
  const [val, setVal] = useState<number>(props.defaultVal)
  useEffect(() => {
    console.log('mounted')
  }, [])

  return <>
    <Desc className={props.changed ? 'active' : ''}>{props.filter.name}度  {val}  {props.changed.toString()}</Desc>
    <Root
      defaultValue={[props.defaultVal]}
      onValueChange={(v) => {
        setVal(v[0])
        props.onChange(v[0], props.index)
      }}
    >
      <Track>
        <Range />
      </Track>
      <Thumb />
    </Root>
  </>
})
Slider.displayName = 'Slider'

export default Slider
