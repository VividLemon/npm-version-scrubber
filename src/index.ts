import object from './object'
import type {Projects} from './types'

const fun = async () => {
  const updatedProjects: Projects = JSON.parse(JSON.stringify(object)) // Deep copy

  for (const project of Object.keys(object)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const type of Object.keys(object[project])) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const promises = Object.keys(object[project][type])
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .filter((packageName) => !object[project][type][packageName].includes('workspace'))
        .map(async (packageName) => {
          const response = await fetch(`https://registry.npmjs.org/${packageName}`)
          const data = await response.json()
          return {
            packageName,
            latestVersion: data['dist-tags'].latest,
          }
        })

      const results = await Promise.all(promises)

      for (const result of results) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const currentVersion = object[project][type][result.packageName]
        let modifier = ''

        if (currentVersion.startsWith('^')) {
          modifier = '^'
        } else if (currentVersion.startsWith('~')) {
          modifier = '~'
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updatedProjects[project][type][result.packageName] = modifier + result.latestVersion
      }
    }
  }

  await Bun.write('src/updatedProjects.json', JSON.stringify(updatedProjects, null, 2))
}

fun()
