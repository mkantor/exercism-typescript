const secondsPerYearByPlanet = {
  mercury: 7600544,
  venus: 19414149,
  earth: 31557600,
  mars: 59354033,
  jupiter: 374355659,
  saturn: 929292363,
  uranus: 2651370019,
  neptune: 5200418560,
}

type PlanetName = keyof typeof secondsPerYearByPlanet

export function age(planet: PlanetName, seconds: number): number {
  return Math.round((seconds / secondsPerYearByPlanet[planet]) * 100) / 100
}
