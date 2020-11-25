import Axios from "axios"
import { ENDPNT_SCENE_STORE_SCENES } from "../../constants/endpoints"
import { URL_SCENE_STORE_SERVICE_HOST } from "../../constants/hosts"


const axios = Axios.create({
    baseURL: URL_SCENE_STORE_SERVICE_HOST
})


async function registerScene(params: any): Promise<any> {
    const data = "" // -> todo
    const response = await axios.post(ENDPNT_SCENE_STORE_SCENES, data)
    return response.data as any
}
