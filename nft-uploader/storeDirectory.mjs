import { NFTStorage, File } from 'nft.storage'
import { getFilesFromPath } from 'files-from-path'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUzMjdEOThlMTc2OUIyNmY1OTU2NDAwQjQ5MDY1NThDQjZjNTczOTEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NzYxMDk3MTQxNCwibmFtZSI6ImFwaSJ9.Env2c44yAVpZajJys06rukncC0RgzX32mYMxWnTlgdI'

async function main() {
  const path = process.argv.slice(2)
  const files = await getFilesFromPath(path)

  const storage = new NFTStorage({ token })

  console.log(`storing ${files.length} file(s) from ${path}`)
  const cid = await storage.storeDirectory(files, {
      pathPrefix: path, // see the note about pathPrefix below
      hidden: true // use the default of false if you want to ignore files that start with '.'
  })
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)
}
main()