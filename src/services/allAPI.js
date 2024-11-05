
//saveVideoApi - post http  request called by add cmponent

import CommonApi from "./CommonApi";
import SERVERURL from "./serverURL";

export const saveVideoApi = async (videoDetails) => {
    return await CommonApi("POST",`${SERVERURL}/uploadVideos`,videoDetails)
} //post is used, since saving the video. this returns promise. 

export const getAllVideosApi = async ()=>{
    return await CommonApi("GET",`${SERVERURL}/uploadVideos`,"")
}

export const saveHistoryApi = async(historyDetails) =>{
    return await CommonApi("POST",`${SERVERURL}/history`,historyDetails)

}

export const getAllHistoryApi = async(historyDetails) =>{
    return await CommonApi("GET",`${SERVERURL}/history`,"")

}

export const deleteHistoryApi = async(id) =>{
    return await CommonApi("DELETE",`${SERVERURL}/history/${id}`,{})

}

export const removeVideoApi = async(id) =>{
    return await CommonApi("DELETE",`${SERVERURL}/uploadVideos/${id}`,{})

}

export const saveCategoryApi = async(categoryDetails) => {
    return await CommonApi("POST",`${SERVERURL}/categories`,categoryDetails)
}

export const getAllCategoryApi = async () => {
    return await CommonApi("GET",`${SERVERURL}/categories`,{})
}

export const removeCategoryApi = async(id) => {
    return await CommonApi("DELETE",`${SERVERURL}/categories/${id}`,{})
}

//put request => drag and drop video => (done when video drop over the category
export const updateCategoryApi = async(categoryDetails) => {
    return await CommonApi("PUT",`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
}
