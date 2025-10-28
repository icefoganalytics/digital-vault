// TODO: update unsafe legacy exports to new style
export * from "./file-storage-service"

// New style exports
import * as Categories from "./categories"
import * as Retentions from "./retentions"
import * as Sources from "./sources"
import * as Submissions from "./submissions"
import * as Users from "./users"

export {
  // avoid prettier wrap
  Categories,
  Retentions,
  Sources,
  Submissions,
  Users,
}

export default {
  Categories,
  Retentions,
  Sources,
  Submissions,
  Users,
}
