export type Subject = {
    id: string,
    name: string
}

export type Answer = {
    text: string,
    correct: boolean
}

export type Question = {
    text: string,
    answers: [Answer, Answer, Answer, Answer]
}

export type Response = {
    subjects: Subject[],
    questions: {
        [key: string]: Question[]
    }
}