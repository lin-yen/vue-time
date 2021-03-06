const Time = require('../src/Time');

test('transformTimestampToStr()', () => {
  const t = new Time()
  t.tz('Asia/Taipei')
  expect(t.transformTimestampToStr(1534382333)).toBe('2018-08-16T09:18:53+08:00')
  t.tz('America/New_York')
  expect(t.transformTimestampToStr(1534382333)).toBe('2018-08-15T21:18:53-04:00')
  expect(t.transformTimestampToStr(1534382333, 'YYYY/MM/DD HH:mm:ss')).toBe('2018/08/15 21:18:53')
})

test('transformStrToTimestamp()', () => {
  const t = new Time()
  t.tz('Asia/Taipei')
  expect(t.transformStrToTimestamp('2018/08/16 09:18:53', 'YYYY/MM/DD HH:mm:ss')).toBe(1534382333)
})

test('format()', () => {
  const t = new Time()
  expect(t.format()).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\+|-)\d{2}:\d{2}/)
  expect(t.format('YYYY/MM/DD HH:mm:ss')).toMatch(/\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}/)
})

test('tz()', () => {
  const t = new Time()
  t.tz('America/New_York')
  expect(t.format()).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-04:\d{2}/)

  t.tz('Europe/Amsterdam')
  expect(t.format()).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+02:\d{2}/)
})


test('getTime()', () => {
  const t = new Time()
  expect(String(t.getTime())).toMatch(/\d{12}/)
})

test('getUnixTime()', () => {
  const t = new Time()
  expect(String(t.getUnixTime())).toMatch(/\d{10}/)
})


test('update()', () => {
  const t = new Time()
  expect(t.update(1534382333).getTime()).toBe(1534382333000)
  expect(t.update(1534382333).getUnixTime()).toBe(1534382333)
})
