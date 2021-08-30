import {ActionTypes} from "../action-types";


export function fileReducer(state: any, {type, payload}: any) {
    switch (type) {
        case ActionTypes.SELECT_FOLDER:
            return {
                ...state,
                folderId: payload.folderId || null,
                folder: payload.folder,
                childFolders: [],
                childFiles: []
            }
        case ActionTypes.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }
        case ActionTypes.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders
            }
        case ActionTypes.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles
            }
        default:
            return state
    }
}