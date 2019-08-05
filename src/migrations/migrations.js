import migration20190805T151302 from './migrations/20190805T151302-add-version.js'
import migration20190805T191212 from './migrations/20190805T191212-add-vertical-to-range.js'
import migration20190805T225927 from './migrations/20190805T225927-add-support-for-multiple-axes.js'

export default [
  { 'version': '2019-08-05T15:13:02+00:00', migration: migration20190805T151302 },
  { 'version': '2019-08-05T19:12:12+00:00', migration: migration20190805T191212 },
  { 'version': '2019-08-05T22:59:27+00:00', migration: migration20190805T225927 },
]
