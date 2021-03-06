import { utils_url } from "@base-sdk/core";
const HOST_APPBOX_BASE = "https://frames-embed-appbox.bridged.xyz";
const HOST_APPBOX_FRAME_FLUTTER = `${HOST_APPBOX_BASE}/flutter`;
/**
 * state of flutter frame loading
 */
export type FlutterLoadingState =
    | "pre-warming"
    | "compiling"
    | "js-compiled"
    | "engine-loaded"
    | "drawing"
    | "complete"
    | "failed";

export type FlutterFrameSourceMode = "content" | "url" | "unknown";

export interface FlutterFrameQuery {
    id?: string;
    src: string;
    mode?: FlutterFrameSourceMode;
    language: FlutterCompatLanguage;
}

export type FlutterCompatLanguage = "js" | "dart";

/**
 *
 * @param params
 * @param host optional override host. should end withou
 */
export function buildFlutterFrameUrl(params: FlutterFrameQuery, host?: string) {
    const query = new URLSearchParams({ ...params } as Record<string, string>);

    // use default host if no override "host" param givven
    return `${host ?? HOST_APPBOX_FRAME_FLUTTER}?${query.toString()}`;
}

export function checkFlutterFrameSourceMode(
    source: string
): FlutterFrameSourceMode {
    if (utils_url.isUrl(source)) {
        return "url";
    } else {
        return "content";
    }
}
