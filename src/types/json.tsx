export interface timetableJSON {
    classNo: string,
    startTime: string,
    endTime: string,
    weeks: {
        start: string,
        end: string
    } | number[]
    venue: string,
    day: string,
    lessonType: string,
    size: number
}

export interface semesterDataJSON {
    semester: number,
    timetable: timetableJSON[]
}
export interface CourseJSON {
    acadYear: string,
    description: string,
    title: string,
    moduleCredit: string,
    moduleCode: string,
    semesterData: semesterDataJSON[]
}