import { atom } from "recoil";
import { Question, Subject } from "../core/types";

export const questionsState = atom<Question[]>({
    key: 'questionsState',
    default: [],
});

export const currentSubjectState = atom<Subject|null>({
    key: 'currentSubjectState',
    default: null,
});