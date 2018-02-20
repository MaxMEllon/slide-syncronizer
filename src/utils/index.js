import queryString from 'query-string'

export const isAdmin = seatchOfLocation => queryString.parse(seatchOfLocation)?.['admin'] === 'true'

export const isFirst = () => window.location.pathname === '/'
