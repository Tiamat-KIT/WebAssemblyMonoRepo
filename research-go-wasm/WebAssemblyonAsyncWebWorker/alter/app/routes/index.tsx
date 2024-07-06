import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import Calcer from '../islands/Calcer'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div>
      <Calcer />
    </div>,
    { title: name }
  )
})
