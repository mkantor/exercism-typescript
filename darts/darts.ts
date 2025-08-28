const circles = [
  { radius: 1, points: 10 },
  { radius: 5, points: 5 },
  { radius: 10, points: 1 },
]

// The circle's origin is `{ x: 0, y: 0 }`.
function withinCircle(
  point: { readonly x: number; readonly y: number },
  circleRadius: number,
): boolean {
  return point.x ** 2 + point.y ** 2 <= circleRadius ** 2
}

export function score(x: number, y: number): number {
  for (const { radius, points } of circles) {
    if (withinCircle({ x, y }, radius)) {
      return points
    }
  }
  return 0
}
