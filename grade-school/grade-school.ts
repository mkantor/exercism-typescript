type Grade = number
type StudentName = string

const insertAlphabetically = (
  names: StudentName[],
  newName: StudentName,
): void => {
  let previousName = ''
  for (let index = 0; index <= names.length; index++) {
    const currentName = names[index]
    if (
      (previousName <= newName && currentName >= newName) ||
      index === names.length
    ) {
      names.splice(index, 0, newName)
      break
    }
    previousName = currentName
  }
}

export class GradeSchool {
  #students = new Map<StudentName, Grade>()

  roster(): Record<Grade, StudentName[]> {
    const roster: Record<Grade, StudentName[]> = {}
    for (const [studentName, grade] of this.#students.entries()) {
      roster[grade] ??= []
      insertAlphabetically(roster[grade], studentName)
    }
    return roster
  }

  add(name: StudentName, grade: Grade): void {
    this.#students.set(name, grade)
  }

  grade(desiredGrade: Grade): StudentName[] {
    const students: StudentName[] = []
    for (const [studentName, grade] of this.#students.entries()) {
      if (grade === desiredGrade) {
        insertAlphabetically(students, studentName)
      }
    }
    return students
  }
}
