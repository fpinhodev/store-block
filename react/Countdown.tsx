import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick } from './utils/time'
import { useCssHandles } from "vtex.css-handles"
// import { useQuery } from 'react-apollo'
// import useProduct from 'vtex.product-context/useProduct'
// import productReleaseDateQuery from './graphql/productReleaseDate.graphql'

interface CountdownProps { }

// const { product: { linkText } } = useProduct()
// const { data } = useQuery(productReleaseDateQuery, {
//   variables: {
//     slug: "blue-top-retro-camera"
//   },
//   ssr: false
// })

const { data } = {
  data: {
    product: {
      releaseDate: '2020-06-02T00:00:00'
    }
  }
};

const DEFAULT_TARGET_DATE = (new Date('2020-07-25')).toISOString();

const CSS_HANDLES = ["countdown"];

const Countdown: StorefrontFunctionComponent<CountdownProps> = () => {

  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const handles = useCssHandles(CSS_HANDLES);

  tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime)

  return (
    <div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
      <div className={`${handles.countdown} db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    targetDate: {
      title: 'Final date',
      description: 'Final date used in the countdown',
      type: 'string',
      default: null,
    }
  }
}

export default Countdown
