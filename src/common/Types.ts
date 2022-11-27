export type ContentType = {
    videoId: string | null;
}

export type TimeDuration = {
    minutes: number,
    seconds: number
}

export type LoopTime = {
    start: TimeDuration,
    end: TimeDuration
}

export type YlState = {
    isLooping: boolean,
    loopTime: LoopTime,
}

export enum StartEndEnum {
    START = "start",
    END = "end"
}

export enum MinuteSecondsEnum {
    MINUTES = "minutes",
    SECONDS = "seconds"
}

export type YlRequest = {
    type: string,
    payload?: any
}