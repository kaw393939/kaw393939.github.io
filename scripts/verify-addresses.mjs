import { resolveCname, resolveNs } from 'node:dns/promises'
import { source } from './knowledge-lab-release.mjs'

const canonical = source.origin + '/'
for (const alias of ['https://www.keithwilliams.org/', 'https://kaw393939.github.io/']) {
  try {
    const response = await fetch(alias, { signal: AbortSignal.timeout(10000) })
    const outcome = alias + ' -> ' + response.url + ' (HTTP ' + response.status + ')'
    if (response.ok && response.url === canonical) console.log('PASS: ' + outcome)
    else console.warn('::warning::Unexpected public redirect: ' + outcome)
    await response.body?.cancel()
  } catch (error) {
    const hostname = new URL(alias).hostname
    console.warn('::warning::Address check: ' + hostname + ' ' + (error.cause?.code || error.message))
    if (error.cause?.cert?.subjectaltname) console.log('Certificate names: ' + error.cause.cert.subjectaltname)
    const aliasTarget = await resolveCname(hostname).catch(err => [err.code])
    const servers = await resolveNs(new URL(canonical).hostname).catch(err => [err.code])
    console.log('CNAME ' + hostname + ': ' + aliasTarget.join(', '))
    console.log('Authoritative nameservers: ' + servers.join(', '))
  }
}
