/* eslint-disable import/no-unresolved */
import { Data, Meta } from "#miao"
import lodash from "lodash"

let data = Data.readJSON("resources/meta-sr/material/data.json", "miao")

let ret = {}
let abbr2 = {}

lodash.forEach(data, (ds, key) => {
  lodash.forEach(ds, (item) => {
    let { id, type, name, star } = item
    let tmp = {
      poseType: type,
      type: key,
      id,
      name,
      star
    }
    ret[item.name] = tmp
  })
})

let meta = Meta.create("sr", "material")
meta.addData(ret)
meta.addAbbr(abbr2)
