import migration20190805T151302 from './migrations/20190805T151302-add-version.js'
import migration20190805T191212 from './migrations/20190805T191212-add-vertical-to-range.js'

export default [
  { 'version': '2019-08-05T15:13:02+00:00', migration: migration20190805T151302 },
  { 'version': '2019-08-05T19:12:12+00:00', migration: migration20190805T191212 },
]
