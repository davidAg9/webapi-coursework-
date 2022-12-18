/// <reference types="react" />
type SwapStatusProps = {
    isLoading: boolean;
    isSuccess: boolean;
    msg: string;
    tid: string;
};
export declare function SwapStatus({ tid, isLoading, isSuccess, msg }: SwapStatusProps): JSX.Element;
export {};
