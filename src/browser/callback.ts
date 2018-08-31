import { Callback } from "../callback";

export class CallbackImpl implements Callback {
    onReady(): void { }

    onDataResult(type: string, data: string) { }

    notifyCommandFromNative(): void { }
}