import Axios from "axios";
import { LayerTranslation } from "..";
import { __HOSTS } from "@base-sdk/core";
import {
    GlobalizedKeyRegisterRequest,
    TextTranslationPutRequest,
} from "./requests";
import { GlobalizedKeyRegisterResponse } from "./responses";
const axios = Axios.create({
    baseURL: __HOSTS.G11N_SERVICE_HOST,
});

// TODO
// add docs
export class G11nService {
    constructor(readonly projecId: string) {}

    async registerKey(
        request: GlobalizedKeyRegisterRequest
    ): Promise<GlobalizedKeyRegisterResponse> {
        return await registerTranslationKey(this.projecId, request);
    }

    async updateKeyName(id: string, newKeyName: string) {
        updateKeyName(id, {
            keyName: newKeyName,
        });
    }

    async putTextTranslation(request: TextTranslationPutRequest) {
        return await putTextTranslation(this.projecId, request);
    }

    async fetchTranslation(id: string) {
        return await fetchTextTranslation(id);
    }
}

export async function registerTranslationKey(
    projectId: string,
    request: GlobalizedKeyRegisterRequest
): Promise<GlobalizedKeyRegisterResponse> {
    const resp = await axios.post(`keys/`, request);
    return resp.data as GlobalizedKeyRegisterResponse;
}

export async function updateKeyName(
    id: string,
    request: {
        keyName: string;
    }
) {
    const resp = await axios.patch(`/keys/${id}/name`, request);
    return resp.data;
}

export async function putTextTranslation(
    projectId: string,
    request: TextTranslationPutRequest
) {
    const resp = await axios.put(
        `translations/${request.keyId}/locales/${request.locale}`,
        {
            value: request.value,
        }
    );
    return resp.data;
}

export async function fetchTextTranslation(id: string) {
    const resp = await axios.get(`translations/${id}`);
    return resp.data;
}

export async function putLayerKeyMap(
    projectId: string,
    request: {
        sceneId: string;
        layerId: string;
        keyId: string;
    }
) {
    const resp = await axios.put(
        `scenes/${request.sceneId}/layers/${request.layerId}`,
        {
            keyId: request.keyId,
        }
    );
    return resp.data;
}

export async function fetchTextTranslationFromLayer(
    projectId: string,
    request: {
        sceneId: string;
        layerId: string;
    }
): Promise<LayerTranslation | undefined> {
    try {
        const resp = await axios.get(
            `scenes/${request.sceneId}/layers/${request.layerId}`
        );
        return resp.data;
    } catch (_) {
        if (_.response.status == 404) {
            return undefined;
        }
        throw _;
    }
}

export async function fetchTextTranslationsFromScene(
    projectId: string,
    request: {
        sceneId: string;
    }
): Promise<ReadonlyArray<LayerTranslation>> {
    const resp = await axios.get(`scenes/${request.sceneId}`);
    return resp.data;
}
