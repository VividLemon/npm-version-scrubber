type ProjectDependencies = {
  [packageName: string]: string
}

type Project = {
  devDependencies?: ProjectDependencies
  dependencies?: ProjectDependencies
  peerDependencies?: ProjectDependencies
  // potentially other properties like dependencies, peerDependencies, etc.
}

export type Projects = {
  [projectName: string]: Project
}
