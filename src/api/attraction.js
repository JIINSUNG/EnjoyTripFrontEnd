// API 통신 모아놓기
import { localAxios, publicAxios } from '@/utils/http-commons'
const { VITE_PUBLIC_API_ENCODED } = import.meta.env
const local = localAxios()
const publicAPI = publicAxios()

// 행사정보 조회
function searchAttraction(categoryId, pageNo, success, fail) {
  publicAPI
    .get(
      `areaBasedList1?MobileOS=ETC&MobileApp=TRIPOLINE&_type=json&numOfRows=30&pageNo=${pageNo}&contentTypeId=${categoryId}&serviceKey=${VITE_PUBLIC_API_ENCODED}`
    )
    .then(success)
    .catch(fail)
}

// 관광지 검색 ()
function searchByLocation(params, success, fail) {
  local.get('attractionRest/searchByLocation', { params }).then(success).catch(fail)
}

function searchSido(success, fail) {
  local.get('attractionRest').then(success).catch(fail)
}

function searchGugun(param, success, fail) {
  local.get(`attractionRest/findGugun`, { params: param }).then(success).catch(fail)
}

function searchByTitle(params, success, fail) {
  local.get('attractionRest/searchByTitle', { params }).then(success).catch(fail)
}

function getHotPlaces(success, fail) {
  local.get('attractionRest/hotplace').then(success).catch(fail)
}

export { searchByLocation, searchSido, searchGugun, searchByTitle, searchAttraction, getHotPlaces }
