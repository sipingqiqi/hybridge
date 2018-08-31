export interface Callback {
    onReady(): void,
    onDataResult(type: string, data: string): void,
    notifyCommandFromNative(): void
}
