
export function parseTime(time: number | string | Date, cFormat?: string): string | null {
  let cueTime: any = time
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof cueTime === 'object') {
    date = time
  } else {
    if ((typeof cueTime === 'string')) {
      if ((/^[0-9]+$/.test(time as string))) {
        // eslint-disable-next-line radix
        cueTime = parseInt(time as string) // support "1548221490638"
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        cueTime = (time as string).replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof cueTime === 'number') && (time.toString().length === 10)) {
      cueTime = (time as number) * 1000
    }
    date = new Date(cueTime)
  }
  const formatObj:{ [key: string]: any } = {
    y: (date as any).getFullYear(),
    m: (date as any).getMonth() + 1,
    d: (date as any).getDate(),
    h: (date as any).getHours(),
    i: (date as any).getMinutes(),
    s: (date as any).getSeconds(),
    a: (date as any).getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
